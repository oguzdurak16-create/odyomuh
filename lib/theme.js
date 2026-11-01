// Shared by the pre-paint script and the hydrated navigation.
export const THEME_STORAGE_KEY = 'odyomuh-theme-v2';

export function readStoredTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function applyTheme(theme) {
  const resolved = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
  return resolved;
}

// Storage may be unavailable in private/restricted browser contexts. A consent
// storage failure must not prevent the theme from being initialized.
export const themeBootstrap = `(function(){var root=document.documentElement;var theme='light';try{theme=localStorage.getItem('${THEME_STORAGE_KEY}')==='dark'?'dark':'light';}catch(e){}root.setAttribute('data-theme',theme);root.style.colorScheme=theme;try{var consent=localStorage.getItem('odyomuh-cookie-consent');if(consent==='accepted'||consent==='rejected')root.dataset.consentKnown='true';}catch(e){}})();`;
