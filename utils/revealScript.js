// Inline script placed in <head> by app/layout.js. It runs before the page paints:
// 0. tracks the mouse over interactive cards (.fx) for their light-up border (styles/globals.css);
// 1. adds `js-reveal` to <html> so CSS can hide `.reveal` elements (only when JS and IntersectionObserver
//    exist and the visitor has not asked for reduced motion);
// 2. watches every `.reveal` element (including ones added later by client-side navigation) and sets
//    `data-in` when it enters the viewport, which plays the CSS transition once.
// Backup: on every scroll frame, anything already above the bottom of the screen is shown too, so a very
// fast scroll can never leave content hidden.
// Safety: if the watcher has not started within 3 s, everything is revealed, so content can never stay hidden.
export const REVEAL_SCRIPT = `(function(){try{
var d=document,h=d.documentElement;
d.addEventListener('pointermove',function(e){if(e.pointerType!=='mouse')return;var c=e.target&&e.target.closest&&e.target.closest('.fx');if(!c)return;var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px');},{passive:true});
if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
h.classList.add('js-reveal');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute('data-in','');io.unobserve(e.target);}});},{rootMargin:'0px 0px -6% 0px',threshold:0});
function scan(){d.querySelectorAll('.reveal:not([data-in]):not([data-watch])').forEach(function(el){el.setAttribute('data-watch','');io.observe(el);});}
var ok=0;var tick=0;function catchUp(){tick=0;var vh=innerHeight;d.querySelectorAll('.reveal:not([data-in])').forEach(function(el){if(el.getBoundingClientRect().top<vh*0.94){el.setAttribute('data-in','');io.unobserve(el);}});}
addEventListener('scroll',function(){if(!tick){tick=1;requestAnimationFrame(catchUp);}},{passive:true});
function start(){ok=1;scan();catchUp();new MutationObserver(scan).observe(d.body,{childList:true,subtree:true});}
if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',start);else start();
setTimeout(function(){if(!ok)h.classList.add('reveal-safe');},3000);
}catch(e){document.documentElement.classList.remove('js-reveal');}})();`;
