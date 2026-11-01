// Run against a production build. Playwright is supplied by the test environment.
// THEME_TEST_URL=http://localhost:3000 PLAYWRIGHT_MODULE=... node scripts/check-browser-theme.cjs
const assert = require('node:assert/strict');
const { chromium, webkit } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.THEME_TEST_URL || 'http://localhost:3000';
const engine = process.env.THEME_TEST_ENGINE || 'chromium';
const origin = new URL(base).origin;
const key = 'odyomuh-theme-v2';
const checks = [];
const scenarios = [
  { name: 'fresh', expected: 'light' },
  { name: 'legacy-dark', legacy: 'dark', expected: 'light' },
  { name: 'saved-dark', saved: 'dark', legacy: 'light', expected: 'dark' },
  { name: 'saved-light', saved: 'light', legacy: 'dark', expected: 'light' },
  { name: 'unavailable-theme-storage', blocked: true, expected: 'light' },
  { name: 'missing-bootstrap', skipBootstrap: true, saved: 'dark', expected: 'dark' },
];
function luminance(rgb) {
  const components = rgb.match(/[\d.]+/g).slice(0, 3).map(Number).map(v => {
    v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
  });
  return components[0] * .2126 + components[1] * .7152 + components[2] * .0722;
}
async function checkTheme(page, theme, language, interactive = true) {
  await page.waitForFunction(t => document.documentElement.dataset.theme === t, theme);
  if (interactive) await page.waitForFunction(t => document.querySelector('.header-theme-icon')?.textContent === (t === 'dark' ? '☀' : '☾'), theme);
  // Read a computed style to start any pending theme transitions, then wait for them.
  await page.evaluate(() => getComputedStyle(document.querySelector('[data-archive-home]')).color);
  await page.waitForFunction(() => document.getAnimations().every(a => !(a instanceof CSSTransition) || a.playState !== 'running'));
  const state = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('section[aria-label="Tarih araçları"] > a, section[aria-label="Explore the archive"] > a')];
    return {
      scheme: getComputedStyle(document.documentElement).colorScheme,
      icon: document.querySelector('.header-theme-icon').textContent,
      cards: cards.map(card => {
        const title = card.querySelector('strong');
        return { text: title.textContent, visible: !!title.getClientRects().length,
          color: getComputedStyle(title).color, background: getComputedStyle(card).backgroundColor };
      }),
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
    };
  });
  assert.equal(state.scheme, theme);
  if (interactive) assert.equal(state.icon, theme === 'dark' ? '☀' : '☾');
  assert.equal(state.cards.length, 3);
  for (const card of state.cards) {
    assert.ok(card.text && card.visible, `${language}: hidden utility title`);
    const a = luminance(card.color), b = luminance(card.background);
    assert.ok((Math.max(a, b) + .05) / (Math.min(a, b) + .05) >= 4.5,
      `${language}: unreadable utility title: ${JSON.stringify(card)}`);
  }
  assert.equal(state.overflow, false);
}
async function setup(browser, scenario, javaScriptEnabled = true) {
  const context = await browser.newContext({ viewport: { width: 393, height: 690 },
    isMobile: true, hasTouch: true, colorScheme: 'dark', javaScriptEnabled,
    serviceWorkers: 'block' });
  if (javaScriptEnabled) await context.addInitScript(({ scenario, key }) => {
    if (!sessionStorage.getItem('theme-test-seeded')) {
      if (scenario.saved) localStorage.setItem(key, scenario.saved);
      if (scenario.legacy) localStorage.setItem('odyomuh-theme', scenario.legacy);
      sessionStorage.setItem('theme-test-seeded', '1');
    }
    localStorage.setItem('odyomuh-cookie-consent', 'rejected');
    if (scenario.blocked) {
      const get = Storage.prototype.getItem, set = Storage.prototype.setItem;
      Storage.prototype.getItem = function(k) { if (k === key) throw new DOMException('Blocked', 'SecurityError'); return get.call(this, k); };
      Storage.prototype.setItem = function(k, v) { if (k === key) throw new DOMException('Blocked', 'SecurityError'); return set.call(this, k, v); };
    }
  }, { scenario, key });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.route('**/*', async route => {
    try {
      const url = route.request().url();
      if (new URL(url).origin !== origin) return route.abort();
      const all = await route.request().allHeaders();
      const headers = Object.fromEntries(Object.entries(all).filter(([k]) =>
        ['rsc', 'next-router-state-tree', 'next-router-prefetch', 'next-router-segment-prefetch', 'next-url', 'accept'].includes(k)));
      const relay = process.env.THEME_TEST_RELAY;
      const transport = relay ? relay + '?url=' + encodeURIComponent(url) + '&headers=' + encodeURIComponent(JSON.stringify(headers)) : url;
      const response = await page.request.get(transport, { headers: relay ? {} : headers, timeout: 45000 });
      let body = await response.body();
      if (scenario.skipBootstrap && route.request().resourceType() === 'document') {
        // Preserve the script node to avoid manufacturing a hydration mismatch.
        body = Buffer.from(body.toString().replace(/<script>\(function\(\)\{(?:try\{var saved|var root=document.documentElement)[\s\S]*?<\/script>/, '<script>/* initialization unavailable */</script>'));
      }
      await route.fulfill({ status: response.status(), body,
        headers: Object.fromEntries(Object.entries(response.headers()).filter(([k]) =>
          ['content-type', 'vary', 'cache-control'].includes(k) || k.startsWith('x-nextjs-'))) });
    } catch (e) {
      if (!/Target.*closed|context disposed|Route is already handled|Request.*canceled/i.test(e.message)) throw e;
    }
  });
  return { context, page, errors };
}
(async () => {
  const browser = await (engine === 'webkit' ? webkit : chromium).launch({
    ...(process.env.THEME_TEST_EXECUTABLE ? { executablePath: process.env.THEME_TEST_EXECUTABLE } : {}),
    ...(engine === 'chromium' ? { args: ['--no-sandbox'] } : {}),
  });
  try {
    for (const language of ['tr', 'en']) {
      const path = language === 'tr' ? '/' : '/en';
      for (const scenario of scenarios) {
        const { context, page, errors } = await setup(browser, scenario);
        try {
          console.error(language, scenario.name);
          await page.goto(base + path, { waitUntil: 'load', timeout: 60000 });
          await page.waitForFunction(() => !!document.documentElement.style.getPropertyValue('--visual-viewport-height'));
          await checkTheme(page, scenario.expected, language);
          if (process.env.THEME_TEST_SCREENSHOT_DIR && language === 'tr' && ['fresh', 'saved-dark'].includes(scenario.name)) {
            const fs = require('node:fs');
            fs.mkdirSync(process.env.THEME_TEST_SCREENSHOT_DIR, { recursive: true });
            await page.screenshot({ path: process.env.THEME_TEST_SCREENSHOT_DIR + '/' + engine + '-' + scenario.name + '.png' });
          }
          await page.locator('.header-theme-button').click();
          await checkTheme(page, scenario.expected === 'dark' ? 'light' : 'dark', language);
          const restored = scenario.blocked ? 'light' : scenario.expected === 'dark' ? 'light' : 'dark';
          await page.reload({ waitUntil: 'load' });
          await checkTheme(page, restored, language);
          const article = page.locator('[data-archive-home] a[aria-label]').first();
          await article.click();
          await page.waitForURL(u => u.pathname !== path);
          await page.waitForFunction(t => document.documentElement.dataset.theme === t, restored);
          await page.goBack({ waitUntil: 'load' });
          await checkTheme(page, restored, language);
          for (const width of [320, 430, 1440]) {
            await page.setViewportSize({ width, height: 780 });
            await checkTheme(page, restored, language);
          }
          if (!scenario.blocked) {
            await page.evaluate(key => { localStorage.setItem(key, 'dark'); window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })); }, key);
            await checkTheme(page, 'dark', language);
            await page.evaluate(key => { localStorage.setItem(key, 'light'); window.dispatchEvent(new StorageEvent('storage', { key, newValue: 'light' })); }, key);
            await checkTheme(page, 'light', language);
          }
          assert.deepEqual(errors, []);
          checks.push(`${language}: ${scenario.name}: initial load, first click, reload, article/back, 320–1440px, readable cards`);
        } finally { await page.unrouteAll({ behavior: 'ignoreErrors' }); await context.close(); }
      }
      const { context, page } = await setup(browser, {}, false);
      try {
        await page.goto(base + path, { waitUntil: 'load' });
        await checkTheme(page, 'light', language, false);
        checks.push(`${language}: JavaScript disabled: consistent readable light theme`);
      } finally { await page.unrouteAll({ behavior: 'ignoreErrors' }); await context.close(); }
    }
    console.log(JSON.stringify({ engine, base, checkedAt: new Date().toISOString(), checks }, null, 2));
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exit(1); });
