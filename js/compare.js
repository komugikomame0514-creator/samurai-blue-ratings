
const players=window.SAMURAI_PLAYERS;
const a=document.querySelector("#playerA"),b=document.querySelector("#playerB");
const options=players.map(p=>`<option value="${p.id}">${p.name}</option>`).join("");
a.innerHTML=options;b.innerHTML=options;a.value="kubo";b.value="doan";
function render(){
  const p1=getPlayerById(a.value),p2=getPlayerById(b.value);
  document.querySelector("#compareRows").innerHTML=SIX_STATS.map(k=>`
    <div class="compare-row"><b>${p1.stats[k]}</b><div class="compare-bar"><i style="width:${p1.stats[k]}%"></i></div><span>${k}</span><div class="compare-bar right"><i style="width:${p2.stats[k]}%"></i></div><b>${p2.stats[k]}</b></div>
  `).join("");
  drawRadar(document.querySelector("#compareRadar"),SIX_STATS,[
    {values:SIX_STATS.map(k=>p1.stats[k]),fill:"rgba(52,117,255,.24)",stroke:"#6da6ff"},
    {values:SIX_STATS.map(k=>p2.stats[k]),fill:"rgba(66,214,139,.18)",stroke:"#42d68b"}
  ]);
}
a.addEventListener("change",render);b.addEventListener("change",render);render();
