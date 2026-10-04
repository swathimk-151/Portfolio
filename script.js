const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,root=document.documentElement;
try{const t=localStorage.getItem('theme');if(t)root.dataset.theme=t}catch(e){}
$('#tg').onclick=()=>{const d=root.dataset.theme?root.dataset.theme==='dark':matchMedia('(prefers-color-scheme:dark)').matches;root.dataset.theme=d?'light':'dark';try{localStorage.setItem('theme',root.dataset.theme)}catch(e){}};
$('#menu').onclick=()=>$('#links').classList.toggle('open');
$$('#links a').forEach(a=>a.onclick=()=>$('#links').classList.remove('open'));

/* typed role */
// cspell:disable-next-line
const roles=['Frontend Developer','UI/UX Designer','Responsive Web Designer','Full-Stack Developer','MERN Stack Developer'];let ri=0,ci=0,dl=false;
(function t(){const w=roles[ri],el=$('#typed');if(reduce){el.textContent=roles[0];return}
 el.textContent=w.slice(0,ci);if(!dl&&ci===w.length){dl=true;return setTimeout(t,1400)}
 if(dl&&ci===0){dl=false;ri=(ri+1)%roles.length}ci+=dl?-1:1;setTimeout(t,dl?35:75)})();

/* split headings into animated words */
$$('.split').forEach(h=>{h.innerHTML=h.textContent.split(' ').map((w,i)=>`<span class="w"><i style="transition-delay:${i*90}ms">${w}</i></span>`).join(' ')});

/* reveal + counters */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.2});
$$('.rv').forEach(el=>io.observe(el));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const n=+e.target.dataset.n,t0=performance.now();
 (function f(t){const k=Math.min((t-t0)/1100,1);e.target.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)}));
$$('[data-n]').forEach(el=>co.observe(el));

/* scroll: progress, timeline, active link */
const secs=$$('section[id]'),lk=$$('#links a');
addEventListener('scroll',()=>{$('#bar').style.width=scrollY/(root.scrollHeight-innerHeight)*100+'%';
 const tl=$('#tl'),r=tl.getBoundingClientRect();tl.style.setProperty('--p',Math.max(0,Math.min(100,(innerHeight*.7-r.top)/r.height*100))+'%');
 let c='';secs.forEach(s=>{if(s.getBoundingClientRect().top<innerHeight*.4)c=s.id});lk.forEach(a=>a.classList.toggle('on',a.hash==='#'+c))},{passive:true});

/* cursor ring + magnetic buttons */
const ring=$('#ring');addEventListener('pointermove',e=>{ring.style.left=e.clientX+'px';ring.style.top=e.clientY+'px'});
$$('a,button,.proj').forEach(el=>{el.addEventListener('pointerenter',()=>ring.classList.add('h'));el.addEventListener('pointerleave',()=>ring.classList.remove('h'))});
if(!reduce)$$('.mag').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});

/* hero parallax chips */
const st=$('#stage');if(!reduce)st.parentElement.addEventListener('pointermove',e=>{const r=st.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
 $$('.chip').forEach(c=>{const d=+c.dataset.d;c.style.transform=`translate(${x*-26*d}px,${y*-26*d}px) rotateY(${x*18}deg) rotateX(${-y*18}deg)`})});

/* skills: bento grid */
const B=[
 {col:0,t:'Frontend',s:'Interfaces',g:'</>',c:'#2563eb',c2:'#06b6d4',k:['HTML','CSS','Bootstrap','JavaScript','React']},
 {col:1,t:'Backend',s:'Servers & APIs',g:'{ }',c:'#059669',c2:'#14b8a6',k:['Node.js','Express.js']},
 {col:1,t:'Database',s:'Data storage',g:'DB',c:'#d97706',c2:'#f97316',k:['MySQL','MongoDB']},
 {col:2,t:'Languages',s:'Core programming',g:'01',c:'#7c3aed',c2:'#ec4899',k:['C','Java']},
 {col:2,t:'Workflow',s:'Version control',g:'⇄',c:'#e11d48',c2:'#f59e0b',k:['Git','GitHub']},
 {col:0,t:'Cloud',s:'Hosting & infra',g:'☁',c:'#0284c7',c2:'#6366f1',k:['AWS Cloud','Google Cloud']}
];
const bn=$('#bento');let cn=0;
const cards=B.map((b,i)=>`<div class="bt${b.w?' w2':''}" style="--c:${b.c};--c2:${b.c2};--d:${i*110}ms"><span class="blob2"></span><span class="gl">${b.g}</span><div class="bh"><div class="bi">${b.g}</div><div><h3>${b.t}</h3><small>${b.s} · ${b.k.length} skills</small></div></div><div class="cs">${b.k.map(k=>`<span class="cp" style="--cd:${i*110+300+(cn++)*70}ms">${k}</span>`).join('')}</div></div>`);
bn.innerHTML=[0,1,2].map(c=>`<div class="bcol">${cards.filter((_,i)=>B[i].col===c).join('')}</div>`).join('');
$$('.bt').forEach(el=>el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-r.left)+'px');el.style.setProperty('--my',(e.clientY-r.top)+'px')}));
new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting){ob.disconnect();setTimeout(()=>bn.classList.add('ready'),3200)}},{threshold:.15}).observe(bn);

/* projects */
const VID_DDR="assets/videos/damaged-document-restoration.mp4";
/* TO ADD A PROJECT VIDEO: put the .mp4 in assets/videos/ and set v:'assets/videos/your-file.mp4' for that project below */
const IMG_GLOW="assets/glowpearl-banner.svg";
const IMG_LUMA="assets/lumanest-banner.svg";
const IMG_TREND="assets/trendora-banner.svg";
const P=[
 {v:VID_DDR,t:'Damaged Document Restoration',e:'📄',g:['#ccfbf1','#c7d2fe'],d:'An AI web app that predicts and reconstructs missing text in incomplete documents using NLP and the Gemini API.',p:['File upload with Multer','Gemini API text reconstruction','MongoDB storage and retrieval','REST APIs with Axios'],s:['React.js','Node.js','Express.js','Gemini API','MongoDB','Axios']},
 {v:'',i:IMG_GLOW,u:'https://glowpearl-website.onrender.com',t:'Glow Pearl Skincare Website',e:'🧴',g:['#fce7f3','#ffe4d6'],d:'A responsive skincare and beauty storefront with product categories, best sellers, a flash-sale offer, cart and login pages, customer reviews and a beauty blog.',p:['Skincare, makeup and body care categories','Best-seller product cards with prices and discounts','Cart, login, about and blog pages','Fully responsive layout built with Bootstrap'],s:['HTML','CSS','Bootstrap']},
 {v:'',i:IMG_LUMA,u:'https://lumanest-furniture.onrender.com',t:'Lumanest Furniture Website',e:'🛋️',g:['#f5e9da','#e8d5bd'],d:'A modern, responsive furniture website with a clean layout and interactive browsing, built to showcase home furniture across mobile and desktop.',p:['Clean, modern furniture showcase','Interactive features powered by JavaScript','Responsive layout for mobile and desktop','Deployed live on Render'],s:['HTML','CSS','JavaScript']},
 {v:'',i:IMG_TREND,u:'https://trendora-styledress.onrender.com',t:'Trendora Fashion Website',e:'👗',g:['#ede4fb','#dccdf5'],d:'A modern, responsive fashion website with a stylish interface, built with React and Redux for smooth, interactive browsing across mobile and desktop.',p:['Stylish, modern fashion storefront','Built with React and Redux state management','Interactive UI powered by JavaScript','Responsive layout and live deployment on Render'],s:['HTML','CSS','JavaScript','React','Redux']}
];
$('#pg').innerHTML=P.map((p,i)=>`<div class="card proj" data-i="${i}" tabindex="0" role="button"><div class="ban" style="--g1:${p.g[0]};--g2:${p.g[1]}">${p.i?`<img class="pimg" src="${p.i}" alt="${p.t} preview" loading="lazy">`:`<div class="scr"><b></b><b></b><b></b><b></b></div><span class="em">${p.e}</span>${p.v?'':'<span class="soon">Demo video coming soon</span>'}`}${p.v?`<video src="${p.v}" autoplay muted loop playsinline preload="metadata" disablepictureinpicture disableremoteplayback controlslist="nodownload nofullscreen noplaybackrate noremoteplayback" tabindex="-1" aria-hidden="true"></video>`:''}</div><div class="pb"><h3>${p.t}</h3><p>${p.d}</p><div class="tags">${p.s.slice(0,4).map(x=>`<span>${x}</span>`).join('')}</div>${p.u?`<a class="btn g dep" href="${p.u}" target="_blank" rel="noopener">🚀 Deploy</a>`:''}</div></div>`).join('');
$$('#pg video').forEach(v=>{v.muted=true;v.defaultMuted=true;v.setAttribute('muted','');v.play().catch(()=>{})});
const dlg=$('#dlg');
$$('.proj').forEach(c=>{c.onclick=()=>{const p=P[c.dataset.i];$('#dt').textContent=p.t;const dp=$('#dep');if(p.u){dp.href=p.u;dp.style.display=''}else dp.style.display='none';$('#dd').textContent=p.d;$('#dl').innerHTML=p.p.map(x=>`<li>${x}</li>`).join('');$('#dtg').innerHTML=p.s.map(x=>`<span>${x}</span>`).join('');dlg.showModal()};
 c.onmousemove=e=>{if(reduce)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`rotateY(${x*12}deg) rotateX(${-y*12}deg) translateY(-6px)`};
 c.onmouseleave=()=>c.style.transform=''});
$$('.dep').forEach(a=>a.addEventListener('click',e=>e.stopPropagation()));
$$('.proj').forEach(c=>c.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target===c)c.click()}));
$('#dc').onclick=()=>dlg.close();dlg.onclick=e=>{if(e.target===dlg)dlg.close()};

document.addEventListener('visibilitychange',()=>$$('video').forEach(v=>v.play().catch(()=>{})));
/* reveal contact with particle burst */
$('#rev').onclick=e=>{const b=e.currentTarget,r=b.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
 if(!reduce)for(let i=0;i<26;i++){const p=document.createElement('i');p.className='pt';p.style.left=cx+'px';p.style.top=cy+'px';p.style.background=i%2?'#2563eb':'#14b8c4';document.body.append(p);
  const a=Math.random()*6.283,d=70+Math.random()*130;p.animate([{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${Math.cos(a)*d}px,${Math.sin(a)*d}px) scale(0)`,opacity:0}],{duration:900,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=()=>p.remove()}
 b.classList.add('done');const c=$('#cinfo');c.classList.add('show');$$('#cinfo a').forEach((a,i)=>a.style.transitionDelay=i*120+'ms')};

/* resume download */
function getResume(){const a=document.createElement('a');a.href='assets/Swathi_M_K_Resume.pdf';a.download='Swathi_M_K_Resume.pdf';document.body.append(a);a.click();a.remove()}
$$('.dl').forEach(b=>b.addEventListener('click',getResume));
