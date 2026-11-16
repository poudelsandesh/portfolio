(() => {
'use strict';
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-header nav');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){menu.click();menu.focus();}});
const copy=document.querySelector('#copy-email');copy?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('Spoudel2@illinois.edu');document.querySelector('#copy-status').textContent='Email address copied.';}catch{document.querySelector('#copy-status').textContent='Spoudel2@illinois.edu';}});
const list=document.querySelector('#publications-list');
if(list){document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(t=>{t.classList.toggle('active',t===b);t.setAttribute('aria-pressed',String(t===b));});list.innerHTML=window.WRITING.filter(p=>b.dataset.filter==='all'||p[1]===b.dataset.filter).map(p=>`<article class="publication"><span>${p[0]}</span><div><h3>${p[2]}</h3><p>${p[3]}</p></div><small>${p[1]==='review'?'Under review':p[1]==='book'?'Book':'Published'}</small></article>`).join('');}));}
const photo=document.querySelector('#hero-photo');
if(photo){
const slides=[{image:'field-robot.jpg',title:'Agricultural Robotics in the Field',description:'Connecting aerial imagery, perception, and mechanical action',alt:'Sandesh operating a drone beside a Farm-ng Amiga robot in a horseradish field',position:'50% 62%'},{image:'lab-robot.jpg',title:'Engineering from the Ground Up',description:'Prototyping, sensor integration, and mechanical design',alt:'Sandesh developing sensor and actuation hardware on an agricultural robot in a laboratory',position:'50% 50%'},{image:'field-research.jpg',title:'Research Grounded in Real Conditions',description:'Understanding crops, weeds, and the field environment',alt:'Researchers working among crop rows in a horseradish field',position:'50% 50%'}];
let i=0,timer=null,paused=matchMedia('(prefers-reduced-motion: reduce)').matches,hover=false;
const carousel=document.querySelector('.carousel'),pause=document.querySelector('#carousel-pause');
function show(n){i=(n+slides.length)%slides.length;const s=slides[i];photo.src=''+s.image;photo.alt=s.alt;photo.style.objectPosition=s.position;document.querySelector('#slide-title').textContent=s.title;document.querySelector('#slide-description').textContent=s.description;document.querySelectorAll('[data-index]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.index===i)));}
function schedule(){clearInterval(timer);if(!paused&&!hover&&!document.hidden)timer=setInterval(()=>show(i+1),6000);}
function pauseLabel(){pause.textContent=paused?'▷':'Ⅱ';pause.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');}
pause.addEventListener('click',()=>{paused=!paused;pauseLabel();schedule();});
document.querySelectorAll('[data-slide]').forEach(b=>b.addEventListener('click',()=>{show(i+(b.dataset.slide==='next'?1:-1));schedule();}));
document.querySelectorAll('[data-index]').forEach(b=>b.addEventListener('click',()=>{show(+b.dataset.index);schedule();}));
carousel.addEventListener('mouseenter',()=>{hover=true;schedule();});carousel.addEventListener('mouseleave',()=>{hover=false;schedule();});carousel.addEventListener('focusin',()=>{hover=true;schedule();});carousel.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget)){hover=false;schedule();}});carousel.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();show(i+(e.key==='ArrowRight'?1:-1));schedule();}});document.addEventListener('visibilitychange',schedule);pauseLabel();schedule();
}
})();


// Continuous motion measured from the actual rendered logo group.
document.querySelectorAll('.connections-window').forEach(view=>{const track=view.querySelector('.connections-track'),group=track.querySelector('.connections-group');let x=0,last=0,paused=false;view.addEventListener('mouseenter',()=>paused=true);view.addEventListener('mouseleave',()=>paused=false);view.addEventListener('focusin',()=>paused=true);view.addEventListener('focusout',e=>{if(!view.contains(e.relatedTarget))paused=false});function frame(now){const dt=last?Math.min(now-last,50):0;last=now;const width=group.getBoundingClientRect().width;if(width>0&&!paused&&!document.hidden){x=(x+dt*.035)%width;track.style.transform=`translate3d(${-x}px,0,0)`;}requestAnimationFrame(frame)}requestAnimationFrame(frame);});
