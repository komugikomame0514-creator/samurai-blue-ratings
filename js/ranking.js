
const tbody=document.querySelector("#rankingBody");
const pos=document.querySelector("#positionFilter");
function render(){
  const list=[...window.SAMURAI_PLAYERS]
    .filter(p=>pos.value==="ALL"||p.pos===pos.value)
    .sort((a,b)=>b.ovr-a.ovr);
  tbody.innerHTML=list.map((p,i)=>`
    <tr><td>${i+1}</td><td><a href="player.html?id=${p.id}">${p.name}</a></td><td>${p.pos}</td><td>${p.club}</td><td>${p.ovr}</td><td>${p.worldRank}位</td></tr>
  `).join("");
}
pos.addEventListener("change",render);render();
