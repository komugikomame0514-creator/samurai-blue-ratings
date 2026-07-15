
(() => {
 const canvas=document.getElementById("globeCanvas"),ctx=canvas.getContext("2d");
 const nations=[
  {flag:"🇧🇷",name:"BRAZIL",lat:-14.2,lon:-51.9,url:"brazil.html"},
  {flag:"🇦🇷",name:"ARGENTINA",lat:-38.4,lon:-63.6,url:"nation.html?id=argentina"},
  {flag:"🇯🇵",name:"JAPAN",lat:36.2,lon:138.2,url:"index.html#players"},
  {flag:"🇫🇷",name:"FRANCE",lat:46.2,lon:2.2,url:"nation.html?id=france"},
  {flag:"🇪🇸",name:"SPAIN",lat:40.5,lon:-3.7,url:"nation.html?id=spain"},
  {flag:"🇩🇪",name:"GERMANY",lat:51.1,lon:10.4,url:"nation.html?id=germany"},
  {flag:"🏴",name:"ENGLAND",lat:52.3,lon:-1.5,url:"nation.html?id=england"},
  {flag:"🇵🇹",name:"PORTUGAL",lat:39.5,lon:-8.0,url:"nation.html?id=portugal"},
  {flag:"🇮🇹",name:"ITALY",lat:42.8,lon:12.5,url:"nations.html"},
  {flag:"🇳🇱",name:"NETHERLANDS",lat:52.2,lon:5.3,url:"nations.html"},
  {flag:"🇺🇾",name:"URUGUAY",lat:-32.5,lon:-55.8,url:"nations.html"}
 ];
 const continents=[
  // simplified polygons in [lon,lat], projected on sphere
  [[-168,70],[-135,58],[-125,40],[-105,20],[-85,12],[-74,45],[-52,60],[-80,74]],
  [[-82,12],[-68,7],[-52,-5],[-45,-25],[-58,-55],[-73,-42],[-80,-15]],
  [[-12,71],[18,72],[42,60],[35,42],[13,36],[-10,45]],
  [[-18,35],[12,38],[35,30],[48,10],[32,-35],[15,-35],[-5,5]],
  [[35,70],[80,75],[145,60],[170,40],[135,5],[100,20],[70,5],[45,30]],
  [[112,-10],[155,-10],[155,-44],[115,-44]]
 ];
 let rotLon=18,rotLat=-8,drag=false,lastX=0,lastY=0,auto=true,markers=[];
 function resize(){
   const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);
   canvas.width=Math.round(r.width*d);canvas.height=Math.round(r.height*d);
   ctx.setTransform(d,0,0,d,0,0);draw();
 }
 function xyz(lat,lon){
   const p=lat*Math.PI/180,l=(lon+rotLon)*Math.PI/180;
   let x=Math.cos(p)*Math.sin(l),y=Math.sin(p),z=Math.cos(p)*Math.cos(l);
   const a=rotLat*Math.PI/180;
   const yy=y*Math.cos(a)-z*Math.sin(a),zz=y*Math.sin(a)+z*Math.cos(a);
   return {x,y:yy,z:zz};
 }
 function project(lat,lon,cx,cy,R){
   const p=xyz(lat,lon);return {x:cx+p.x*R,y:cy-p.y*R,z:p.z};
 }
 function draw(){
   const w=canvas.clientWidth,h=canvas.clientHeight,cx=w/2,cy=h/2,R=Math.min(w,h)*.38;
   ctx.clearRect(0,0,w,h);
   const g=ctx.createRadialGradient(cx-R*.34,cy-R*.35,R*.05,cx,cy,R);
   g.addColorStop(0,"#3d8eff");g.addColorStop(.46,"#164c9e");g.addColorStop(1,"#04142f");
   ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
   ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.clip();
   // latitude/longitude grid
   ctx.strokeStyle="rgba(175,211,255,.16)";ctx.lineWidth=1;
   for(let lat=-60;lat<=60;lat+=30){ctx.beginPath();let started=false;for(let lon=-180;lon<=180;lon+=3){const p=project(lat,lon,cx,cy,R);if(p.z>0){started?ctx.lineTo(p.x,p.y):(ctx.moveTo(p.x,p.y),started=true)}else started=false}ctx.stroke()}
   for(let lon=-150;lon<=180;lon+=30){ctx.beginPath();let started=false;for(let lat=-90;lat<=90;lat+=3){const p=project(lat,lon,cx,cy,R);if(p.z>0){started?ctx.lineTo(p.x,p.y):(ctx.moveTo(p.x,p.y),started=true)}else started=false}ctx.stroke()}
   // continents
   for(const poly of continents){
     const visible=poly.map(([lon,lat])=>project(lat,lon,cx,cy,R));
     if(visible.every(p=>p.z<=-.15)) continue;
     ctx.beginPath();let first=true;
     visible.forEach(p=>{if(p.z>-.12){first?(ctx.moveTo(p.x,p.y),first=false):ctx.lineTo(p.x,p.y)}});
     ctx.closePath();ctx.fillStyle="rgba(77,178,125,.75)";ctx.strokeStyle="rgba(174,237,198,.42)";ctx.lineWidth=1.5;ctx.fill();ctx.stroke();
   }
   ctx.restore();
   ctx.beginPath();ctx.arc(cx,cy,R,0,Math.PI*2);ctx.strokeStyle="rgba(184,218,255,.55)";ctx.lineWidth=2;ctx.stroke();
   ctx.shadowColor="rgba(55,133,255,.45)";ctx.shadowBlur=30;ctx.stroke();ctx.shadowBlur=0;
   markers=[];
   nations.forEach(n=>{
     const p=project(n.lat,n.lon,cx,cy,R);
     if(p.z<=0) return;
     const scale=.65+.35*p.z,r=22*scale;
     ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle="rgba(3,15,36,.88)";ctx.fill();ctx.strokeStyle="rgba(238,211,111,.85)";ctx.lineWidth=2;ctx.stroke();
     ctx.textAlign="center";ctx.textBaseline="middle";ctx.font=`${22*scale}px sans-serif`;ctx.fillText(n.flag,p.x,p.y+1);
     ctx.textBaseline="alphabetic";ctx.font="700 9px sans-serif";ctx.fillStyle="#f4f7fb";ctx.fillText(n.name,p.x,p.y+r+15);
     markers.push({...n,x:p.x,y:p.y,r:r+8});
   });
 }
 function tick(){if(auto&&!drag)rotLon+=.045;draw();requestAnimationFrame(tick)}
 canvas.addEventListener("pointerdown",e=>{drag=true;auto=false;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)});
 canvas.addEventListener("pointermove",e=>{if(!drag)return;rotLon+=(e.clientX-lastX)*.28;rotLat=Math.max(-70,Math.min(70,rotLat+(e.clientY-lastY)*.22));lastX=e.clientX;lastY=e.clientY});
 canvas.addEventListener("pointerup",e=>{drag=false;setTimeout(()=>auto=true,1800)});
 canvas.addEventListener("click",e=>{const r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const m=markers.find(m=>Math.hypot(x-m.x,y-m.y)<m.r);if(m)location.href=m.url});
 globeNationList.innerHTML=nations.slice(0,8).map((n,i)=>`<button class="globe-nation-btn" data-i="${i}"><span>${n.flag} ${n.name}</span><span>→</span></button>`).join("");
 document.querySelectorAll(".globe-nation-btn").forEach(b=>b.onclick=()=>{const n=nations[+b.dataset.i];rotLon=-n.lon;rotLat=-n.lat*.45;auto=false;setTimeout(()=>auto=true,2500)});
 addEventListener("resize",resize);resize();tick();
})();
