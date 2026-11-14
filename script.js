const photos=[
 ["photos/portrait-smile.jpg","A smiling portrait"],
 ["photos/portrait-closeup.jpg","A close-up portrait"],
 ["photos/photo-strip-blue.jpg","A playful photo strip"],
 ["photos/photo-strip-scarf.jpg","Another playful photo strip"],
 ["photos/portrait-black.jpg","A portrait in a black shirt"],
 ["photos/portrait-school.jpg","A portrait in a school uniform"],
 ["photos/portrait-smile2.jpg","A smiling portrait"],
 ["photos/portrait-pose.jpg","A playful portrait"],
];
const v=document.querySelector(".lightbox"),img=v.querySelector(".lb-image"),cap=v.querySelector(".lb-caption");
let a=0,tx=null;
function show(i){a=(i+photos.length)%photos.length;img.src=photos[a][0];img.alt=photos[a][1];cap.textContent=`${a+1} of ${photos.length}`}
document.querySelectorAll(".photo-trigger").forEach(b=>b.addEventListener("click",()=>{show(+b.dataset.photo);v.showModal()}));
v.querySelector(".lb-close").onclick=()=>v.close();
v.querySelector(".lb-prev").onclick=()=>show(a-1);
v.querySelector(".lb-next").onclick=()=>show(a+1);
v.addEventListener("click",e=>{if(e.target===v)v.close()});
v.addEventListener("keydown",e=>{if(e.key==="ArrowLeft")show(a-1);if(e.key==="ArrowRight")show(a+1)});
v.addEventListener("touchstart",e=>{tx=e.touches[0].clientX},{passive:true});
v.addEventListener("touchend",e=>{if(tx===null)return;const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>50)show(a+(d<0?1:-1));tx=null},{passive:true});
// little hearts when the teddy is tapped
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelector(".teddy-spot").addEventListener("click",e=>{
  if(reduce)return;
  const r=e.currentTarget.getBoundingClientRect(),x0=e.clientX||r.left+r.width/2,y0=e.clientY||r.top+r.height/2;
  for(let i=0;i<8;i++){
    const h=document.createElement("span");h.className="float-heart";h.textContent=["♥","♡","🌼"][i%3];
    h.style.left=(x0-10+Math.random()*60-30)+"px";h.style.top=(y0-10)+"px";
    h.style.setProperty("--x",(Math.random()*120-60)+"px");h.style.setProperty("--s",(16+Math.random()*18)+"px");
    h.style.setProperty("--d",(2.4+Math.random()*1.6)+"s");h.style.setProperty("--r",(Math.random()*60-30)+"deg");
    document.body.appendChild(h);setTimeout(()=>h.remove(),4200);
  }
});
