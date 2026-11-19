// Inline script placed in <head> by app/layout.js. It runs before the page paints:
// 1. adds `js-reveal` to <html> so CSS can hide `.reveal` elements (only when JS and IntersectionObserver
//    exist and the visitor has not asked for reduced motion);
// 2. watches every `.reveal` element (including ones added later by client-side navigation) and sets
//    `data-in` when it enters the viewport, which plays the CSS transition once.
// Safety: if the watcher has not started within 3 s, everything is revealed, so content can never stay hidden.
export const REVEAL_SCRIPT = `(function(){try{
var d=document,h=d.documentElement;
if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
h.classList.add('js-reveal');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-in','');io.unobserve(e.target);}});},{rootMargin:'0px 0px -6% 0px',threshold:0});
function scan(){d.querySelectorAll('.reveal:not([data-in]):not([data-watch])').forEach(function(el){el.setAttribute('data-watch','');io.observe(el);});}
var ok=0;function start(){ok=1;scan();new MutationObserver(scan).observe(d.body,{childList:true,subtree:true});}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',start);else start();
setTimeout(function(){if(!ok)h.classList.add('reveal-safe');},3000);
}catch(e){document.documentElement.classList.remove('js-reveal');}})();`;
