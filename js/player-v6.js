
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  const p = window.getPlayerById(params.get("id"));
  if (!p) {
    document.querySelector(".player-main").innerHTML = '<section class="panel ai-panel"><h2>選手データを読み込めませんでした</h2></section>';
    return;
  }

  document.title = `${p.name} | PROJECT YATAGARASU`;
  $("photo").src = p.img; $("photo").alt = p.name;
  $("ovr").textContent = p.ovr; $("radarOvr").textContent = p.ovr;
  $("position").textContent = p.pos; $("name").textContent = p.name;
  $("english").textContent = p.en;
  $("birth").textContent = `${String(p.birth).replaceAll("/", ".")}（${p.age}歳）`;
  $("clubName").textContent = p.club; $("number").textContent = p.no;
  $("rarity").textContent = p.rarity;
  $("description").textContent = p.desc;
  $("traits").innerHTML = (p.traits || []).map(t => `<span>${t}</span>`).join("");
  $("aiReview").textContent = p.aiReview;
  $("bestRole").textContent = p.bestRole;
  $("impactScore").textContent = p.impactScore;
  $("growthPotential").textContent = p.growthPotential;
  $("keyStrengths").innerHTML = p.keyStrengths.map(x => `<em>${x}</em>`).join("");

  const stats = p.displayStats;
  $("longStats").innerHTML = Object.entries(stats).map(([name,value]) => `
    <div class="long-stat">
      <div class="name"><i class="stat-dot"></i><span>${name}</span></div>
      <div class="long-bar"><i style="width:${value}%"></i></div>
      <b>${value}</b>
    </div>`).join("");

  $("profileGrid").innerHTML = `
    <article class="metric-card"><h3>所属クラブ</h3><div class="metric-value">${p.club}</div><div class="metric-sub">CURRENT CLUB</div></article>
    <article class="metric-card emphasis"><h3>市場価値</h3><div class="metric-value">${p.market || "非公表"}</div><div class="metric-sub">ESTIMATED VALUE</div></article>
    <article class="metric-card emphasis"><h3>代表実績</h3><div class="metric-value">${p.caps ?? 0} 試合</div><div class="metric-sub">${p.goals ?? 0}得点 / ${p.assists ?? 0}アシスト</div></article>
    <article class="metric-card emphasis"><h3>W杯出場</h3><div class="metric-value">${p.wc ?? 0} 回</div><div class="metric-sub">WORLD CUP APPEARANCES</div></article>
    <article class="metric-card transfer-card"><h3>主な移籍歴</h3><p>${p.career || "情報なし"}</p></article>
    <article class="metric-card"><h3>生年月日</h3><div class="metric-value">${p.birth}</div><div class="metric-sub">${p.age}歳</div></article>
    <article class="metric-card"><h3>身長 / 体重</h3><div class="metric-value">${p.body}</div><div class="metric-sub">PHYSICAL DATA</div></article>
    <article class="metric-card"><h3>利き足</h3><div class="metric-value">${p.foot}</div><div class="metric-sub">PREFERRED FOOT</div></article>
    <article class="metric-card"><h3>背番号</h3><div class="metric-value">${p.no}</div><div class="metric-sub">SQUAD NUMBER</div></article>
    <article class="metric-card contract-card"><h3>年俸・契約情報</h3><p>${p.salary || "非公表"}</p></article>`;

  const labels = ["スピード","シュート","パス","ドリブル","テクニック","フィジカル","スタミナ","ディフェンス","メンタル","ポジショニング"];

  function drawRadar() {
    const canvas = $("radar");
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(520, Math.round(rect.width || 720));
    const h = Math.round(w * .80);
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = w*dpr; canvas.height = h*dpr;
    canvas.style.width = `${w}px`; canvas.style.maxWidth = "100%"; canvas.style.height = "auto";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,w,h); ctx.lineJoin="round"; ctx.lineCap="round";
    const cx=w/2, cy=h/2+10, R=Math.min(w,h)*.31;
    const vals=labels.map(k=>stats[k]);

    for(let level=1;level<=5;level++){
      const r=R*level/5; ctx.beginPath();
      labels.forEach((_,i)=>{
        const a=-Math.PI/2+i*Math.PI*2/labels.length;
        const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
        i?ctx.lineTo(x,y):ctx.moveTo(x,y);
      });
      ctx.closePath();
      ctx.strokeStyle=level===5?"rgba(235,242,255,.88)":"rgba(150,181,230,.34)";
      ctx.lineWidth=level===5?2.2:1.25;ctx.stroke();
    }
    labels.forEach((_,i)=>{
      const a=-Math.PI/2+i*Math.PI*2/labels.length;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);
      ctx.strokeStyle="rgba(120,160,220,.26)";ctx.lineWidth=1;ctx.stroke();
    });
    ctx.beginPath();
    vals.forEach((v,i)=>{
      const a=-Math.PI/2+i*Math.PI*2/vals.length,r=R*v/100;
      const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    });
    ctx.closePath();
    const fill=ctx.createRadialGradient(cx,cy,10,cx,cy,R);
    fill.addColorStop(0,"rgba(34,91,220,.30)");
    fill.addColorStop(1,"rgba(29,101,255,.64)");
    ctx.fillStyle=fill;ctx.fill();
    ctx.shadowColor="#398cff";ctx.shadowBlur=10;
    ctx.strokeStyle="#8ab8ff";ctx.lineWidth=3.5;ctx.stroke();ctx.shadowBlur=0;
    vals.forEach((v,i)=>{
      const a=-Math.PI/2+i*Math.PI*2/vals.length,r=R*v/100;
      const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
      ctx.beginPath();ctx.arc(x,y,4.5,0,Math.PI*2);ctx.fillStyle="#fff";ctx.fill();
      ctx.strokeStyle="#428eff";ctx.lineWidth=2.5;ctx.stroke();
    });
    labels.forEach((label,i)=>{
      const a=-Math.PI/2+i*Math.PI*2/labels.length,r=R+52;
      const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
      ctx.textAlign="center";ctx.textBaseline="middle";
      ctx.fillStyle="#f5f8ff";ctx.font='700 15px "Yu Gothic UI",sans-serif';ctx.fillText(label,x,y-9);
      ctx.fillStyle="#a9c5ff";ctx.font='700 14px "Segoe UI",sans-serif';ctx.fillText(vals[i],x,y+13);
    });
  }
  requestAnimationFrame(drawRadar);
  addEventListener("resize",()=>{clearTimeout(window.__radarTimer);window.__radarTimer=setTimeout(drawRadar,150)});
})();
