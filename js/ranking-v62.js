
(() => {
  const players = window.SAMURAI_PLAYERS;
  const rankType=document.getElementById("rankType");
  const pos=document.getElementById("positionFilter");

  function sortedList(){
    let list=[...players].filter(p=>pos.value==="ALL"||p.pos===pos.value);
    if(rankType.value==="impactScore") list.sort((a,b)=>b.impactScore-a.impactScore);
    else if(rankType.value==="ageAsc") list.sort((a,b)=>a.age-b.age||b.ovr-a.ovr);
    else list.sort((a,b)=>b.ovr-a.ovr||b.impactScore-a.impactScore);
    return list;
  }

  function render(){
    const list=sortedList();
    document.getElementById("podium").innerHTML=list.slice(0,3).map((p,i)=>`
      <a class="panel podium-card" href="player.html?id=${p.id}">
        <img src="${p.img}" alt="${p.name}">
        <div class="podium-copy">
          <div class="podium-rank">${i+1}</div>
          <h2>${p.name}</h2>
          <div class="club">${p.club}</div>
          <div class="ovr">${rankType.value==="impactScore"?p.impactScore:p.ovr}</div>
        </div>
      </a>`).join("");

    document.getElementById("rankingList").innerHTML=list.slice(3).map((p,i)=>`
      <div class="rank-row">
        <div class="rank-badge">${i+4}</div>
        <a href="player.html?id=${p.id}">${p.name}</a>
        <div>${p.pos}</div>
        <div>${p.club}</div>
        <div class="rank-ovr">${p.ovr}</div>
        <div class="rank-world">${p.worldRank}位</div>
      </div>`).join("");
  }
  rankType.addEventListener("change",render);
  pos.addEventListener("change",render);
  render();
})();
