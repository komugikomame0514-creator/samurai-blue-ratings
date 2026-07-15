
(() => {
  const players = window.SAMURAI_PLAYERS;
  const six = ["スピード","シュート","パス","ドリブル","ディフェンス","フィジカル"];
  let left = players.find(p=>p.id==="kubo") || players[0];
  let right = players.find(p=>p.id==="mitoma") || players[1];

  const makeOptions = selected => players.map(p =>
    `<option value="${p.id}" ${p.id===selected.id?"selected":""}>${p.name}</option>`
  ).join("");

  function cardHTML(p, side){
    return `
      <select id="${side}Select" class="compare-select">${makeOptions(p)}</select>
      <img src="${p.img}" alt="${p.name}">
      <div class="compare-copy">
        <small>${p.pos} / ${p.rarity}</small>
        <h2>${p.name}</h2>
        <div class="en">${p.en}</div>
        <div class="club">${p.club}</div>
        <div class="ovr">${p.ovr} <span style="font-size:14px;color:#9eb1cb">OVR</span></div>
      </div>`;
  }

  function drawRadar(canvas,p,color){
    const labels=["スピード","シュート","パス","ドリブル","テクニック","フィジカル","スタミナ","ディフェンス","メンタル","ポジショニング"];
    const vals=labels.map(k=>p.displayStats[k]);
    const w=420,h=340,dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width="100%";canvas.style.height="auto";
    const x=canvas.getContext("2d");x.setTransform(dpr,0,0,dpr,0,0);
    const cx=w/2,cy=h/2+6,R=104;
    for(let l=1;l<=5;l++){
      const r=R*l/5;x.beginPath();
      labels.forEach((_,i)=>{const a=-Math.PI/2+i*Math.PI*2/labels.length,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;i?x.lineTo(px,py):x.moveTo(px,py)});
      x.closePath();x.strokeStyle=l===5?"rgba(248,245,236,.70)":"rgba(164,187,224,.22)";x.lineWidth=l===5?2:1;x.stroke();
    }
    x.beginPath();
    vals.forEach((v,i)=>{const a=-Math.PI/2+i*Math.PI*2/vals.length,r=R*v/100,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;i?x.lineTo(px,py):x.moveTo(px,py)});
    x.closePath();x.fillStyle=color+"55";x.fill();x.strokeStyle=color;x.lineWidth=3;x.stroke();
  }

  function render(){
    document.getElementById("leftCard").innerHTML=cardHTML(left,"left");
    document.getElementById("rightCard").innerHTML=cardHTML(right,"right");

    document.getElementById("compareBars").innerHTML=six.map(k=>`
      <div class="compare-row">
        <b>${left.stats[k]}</b>
        <div class="compare-track left"><i style="width:${left.stats[k]}%"></i></div>
        <div class="compare-label">${k}</div>
        <div class="compare-track right"><i style="width:${right.stats[k]}%"></i></div>
        <b>${right.stats[k]}</b>
      </div>`).join("");

    document.getElementById("leftRadarName").textContent=left.name;
    document.getElementById("rightRadarName").textContent=right.name;
    drawRadar(document.getElementById("leftRadar"),left,"#6e9cff");
    drawRadar(document.getElementById("rightRadar"),right,"#63dd9f");

    document.getElementById("compareSummary").innerHTML=`
      <div class="summary-box">
        <span>LEFT PLAYER</span><b>${left.name} — ${left.bestRole}</b>
        <p>${left.aiReview}</p>
      </div>
      <div class="summary-box">
        <span>RIGHT PLAYER</span><b>${right.name} — ${right.bestRole}</b>
        <p>${right.aiReview}</p>
      </div>`;

    document.getElementById("leftSelect").addEventListener("change",e=>{left=players.find(p=>p.id===e.target.value);render()});
    document.getElementById("rightSelect").addEventListener("change",e=>{right=players.find(p=>p.id===e.target.value);render()});
  }
  render();
})();
