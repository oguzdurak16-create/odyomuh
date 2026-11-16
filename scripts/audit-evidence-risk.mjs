import fs from 'node:fs';
import { allTurkishPosts, allEnglishPosts } from '../lib/content-collections.js';
import { legacyFactcheckRevisions } from '../data/legacy-factcheck-revisions.js';

// Prioritization only. A warning is NOT a finding of misinformation.
const docs = [...allTurkishPosts().map(p=>({lang:'tr',...p})),...allEnglishPosts().map(p=>({lang:'en',...p}))];
const clean = (s='') => String(s).replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:[a-z]+|#\d+);/gi,' ').replace(/\s+/g,' ').trim();
const riskyTitle = /(gizli|bilinmeyen|saklı|ilk\s+(?:kez|defa|bilinen)|şok|mucize|enerji|uzaylı|crystal\s+energy|secret|mystery|astonishing)/i;
const unbounded = /(kesin olarak kanıtlandı|bilim insanları şaşkın|dünyanın ilk|ilk defa bulundu|tarihi baştan yazdı|gerçeği ortaya çıktı|sınırsız enerji|magnetic energy grid|ancient alien proof)/i;
const snippet = s => String(s||'').slice(0,125);
const entries=docs.filter(p=>p.primaryPath).map(p=>{
  const body=clean(p.contentHtml);
  const explicitSources=(p.sources||[]).filter(s=>/https?:\/\//.test(String(s))).length;
  const htmlLinks=(String(p.contentHtml||'').match(/<a\b[^>]*href\s*=\s*["']https?:\/\//gi)||[]).length;
  const words=body.split(/\s+/).filter(Boolean).length;
  const titleRisk=riskyTitle.test(p.title||'');
  const strongClaim=unbounded.test(body);
  const riskScore=(explicitSources<2?4:0)+(explicitSources===0&&htmlLinks===0?3:0)+(titleRisk?2:0)+(strongClaim?3:0)+(words<350?2:0);
  return {lang:p.lang,path:p.primaryPath,title:snippet(p.title),sourceCount:explicitSources,externalLinksInBody:htmlLinks,words,titleRisk,strongClaim,riskScore,reviewedInThisPass:Boolean(legacyFactcheckRevisions[p.primaryPath])};
});
const ranked=entries.filter(x=>!x.reviewedInThisPass).sort((a,b)=>b.riskScore-a.riskScore||a.path.localeCompare(b.path));
const report={generatedAt:new Date().toISOString(),method:'Heuristic editorial triage only; no automated fact-verification or Google penalty finding',totals:{all:entries.length,tr:entries.filter(x=>x.lang==='tr').length,en:entries.filter(x=>x.lang==='en').length,noExplicitSource:entries.filter(x=>x.sourceCount===0).length,lessThanTwoSources:entries.filter(x=>x.sourceCount<2).length,noSourcesAndBodyLinks:entries.filter(x=>x.sourceCount===0&&x.externalLinksInBody===0).length,flaggedTitle:entries.filter(x=>x.titleRisk).length,strongClaims:entries.filter(x=>x.strongClaim).length,verifiedCorrectionsInThisPass:entries.filter(x=>x.reviewedInThisPass).length},ranked};
const path='evidence-risk-report.json';
fs.writeFileSync(path,JSON.stringify(report,null,2)+'\n');
console.log('EVIDENCE AUDIT (prioritization; warnings are not factual judgments)');
console.log(JSON.stringify(report.totals,null,2));
console.log('TOP 35 REQUIRING SOURCE REVIEW');
ranked.slice(0,35).forEach((x,i)=>console.log(String(i+1).padStart(2,'0')+' score='+x.riskScore+' ['+x.lang+'] sources='+x.sourceCount+' words='+x.words+' '+x.path));
const allPaths=new Set(entries.map(x=>x.path));
for(const [url,rev] of Object.entries(legacyFactcheckRevisions)){
  if(!allPaths.has(url)) throw new Error('Corrected article missing from canonical collection: '+url);
  const result=entries.find(x=>x.path===url);
  if(result.sourceCount<2 || !clean(rev.contentHtml).includes('16 Kasım 2026 düzeltmesi'))throw new Error('Fact check missing sources or correction note: '+url);
}
console.log('Verified four source-backed corrections remain routable.');