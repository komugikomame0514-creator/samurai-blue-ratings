
(() => {
  const $=id=>document.getElementById(id);
  const p=window.getPlayerById(new URLSearchParams(location.search).get("id"));
  if(!p) return;

  $("photo").src=p.img;$("photo").alt=p.name;$("ovr").textContent=p.ovr;
  $("position").textContent=p.pos;$("rarity").textContent=p.rarity;
  $("name").textContent=p.name;$("english").textContent=p.en;
  $("clubName").textContent=p.club;$("number").textContent=`#${p.no}`;
  $("bestRole").textContent=p.bestRole;$("aiReview").textContent=p.aiReview;
  $("impactScore").textContent=p.impactScore;$("growthPotential").textContent=p.growthPotential;
  $("keyStrengths").innerHTML=p.keyStrengths.map(x=>`<em>${x}</em>`).join("");
  $("traits").innerHTML=(p.traits||[]).map(x=>`<em>${x}</em>`).join("");

  $("statStack").innerHTML=Object.entries(p.displayStats).map(([k,v])=>`
    <div class="stat-item"><span>${k}</span><div class="stat-bar"><i style="width:${v}%"></i></div><b>${v}</b></div>
  `).join("");

  $("profileStack").innerHTML=`
    <div class="profile-row"><span>PROFILE</span><b>${p.birth}（${p.age}歳） / ${p.body} / ${p.foot}</b></div>
    <div class="profile-row"><span>NATIONAL TEAM</span><b>${p.caps}試合 / ${p.goals}得点 / ${p.assists}アシスト / W杯${p.wc}回</b></div>
    <div class="profile-row"><span>MARKET VALUE</span><b>${p.market}</b></div>
    <div class="profile-row"><span>TRANSFER HISTORY</span><p>${p.career}</p></div>
    <div class="profile-row"><span>CONTRACT / SALARY</span><p>${p.salary}</p></div>
  `;

  const labels=["スピード","シュート","パス","ドリブル","テクニック","フィジカル","スタミナ","ディフェンス","メンタル","ポジショニング"];
  const vals=labels.map(k=>p.displayStats[k]);

  function draw(){
    const c=$("radar"),rect=c.getBoundingClientRect();
    const w=Math.max(420,Math.round(rect.width||520)),h=Math.round(w*.82),dpr=Math.min(devicePixelRatio||1,2);
    c.width=w*dpr;c.height=h*dpr;c.style.width=`${w}px`;c.style.height="auto";
    const x=c.getContext("2d");x.setTransform(dpr,0,0,dpr,0,0);
    const cx=w/2,cy=h/2+4,R=Math.min(w,h)*.31;
    for(let l=1;l<=5;l++){
      const r=R*l/5;x.beginPath();
      labels.forEach((_,i)=>{const a=-Math.PI/2+i*Math.PI*2/labels.length,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;i?x.lineTo(px,py):x.moveTo(px,py)});
      x.closePath();x.strokeStyle=l===5?"rgba(248,245,236,.78)":"rgba(164,187,224,.26)";x.lineWidth=l===5?2:1;x.stroke();
    }
    labels.forEach((_,i)=>{const a=-Math.PI/2+i*Math.PI*2/labels.length;x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);x.strokeStyle="rgba(128,156,205,.22)";x.stroke()});
    x.beginPath();
    vals.forEach((v,i)=>{const a=-Math.PI/2+i*Math.PI*2/vals.length,r=R*v/100,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;i?x.lineTo(px,py):x.moveTo(px,py)});
    x.closePath();x.fillStyle="rgba(41,101,232,.42)";x.fill();x.strokeStyle="#8db8ff";x.lineWidth=3;x.stroke();
    vals.forEach((v,i)=>{const a=-Math.PI/2+i*Math.PI*2/vals.length,r=R*v/100,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;x.beginPath();x.arc(px,py,4,0,Math.PI*2);x.fillStyle="#f8f5ec";x.fill();x.strokeStyle="#5b94ff";x.lineWidth=2;x.stroke()});
    labels.forEach((lab,i)=>{const a=-Math.PI/2+i*Math.PI*2/labels.length,r=R+48,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;x.textAlign="center";x.fillStyle="#f8f5ec";x.font='700 13px "Yu Gothic UI"';x.fillText(lab,px,py-8);x.fillStyle="#d7b96b";x.font='700 13px "Segoe UI"';x.fillText(vals[i],px,py+12)});
  }
  requestAnimationFrame(draw);
  addEventListener("resize",()=>{clearTimeout(window.__r);window.__r=setTimeout(draw,150)});
})();
