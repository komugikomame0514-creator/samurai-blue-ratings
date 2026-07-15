
(() => {
  const eras=window.YATAGARASU_ERAS;
  let active=eras[eras.length-1];
  const labels=["PAC","SHO","PAS","DRI","DEF","PHY"];

  function initials(name){
    return name.replace(/\s/g,"").slice(0,2);
  }
  function renderTabs(){
    eraTabs.innerHTML=eras.map(e=>`<button class="era-tab ${e.year===active.year?"active":""}" data-year="${e.year}">${e.year} ${e.host}</button>`).join("");
    document.querySelectorAll("[data-year]").forEach(btn=>btn.onclick=()=>{active=eras.find(e=>e.year==btn.dataset.year);render()});
  }
  function render(){
    document.documentElement.style.setProperty("--era-accent",active.accent);
    renderTabs();
    eraHero.dataset.year=active.year;
    eraHero.innerHTML=`
      <div class="era-copy">
        <small>${active.year} FIFA WORLD CUP / ${active.host}</small>
        <h2>${active.title}</h2>
        <div class="host">${active.identity}</div>
        <p class="era-story">${active.story}</p>
      </div>
      <div class="era-facts">
        <div class="era-fact"><span>TOURNAMENT STAGE</span><b>${active.stage}</b></div>
        <div class="era-fact"><span>MATCH RECORD</span><b>${active.record}</b></div>
        <div class="era-fact"><span>KEY PLAYERS</span><b>${active.players.length}名</b></div>
      </div>`;
    legendGrid.innerHTML=active.players.map(p=>`
      <article class="panel legend-card" data-initials="${initials(p.name)}">
        <div class="legend-no">${p.no}</div>
        <div class="legend-pos">${p.pos}</div>
        <h3>${p.name}</h3>
        <div class="legend-en">${p.en}</div>
        <div class="legend-role">${p.role}</div>
        <div class="legend-stats">${p.stats.map((v,i)=>`<div class="legend-stat">${labels[i]}<b>${v}</b></div>`).join("")}</div>
        <div class="legend-ovr">${p.ovr}<small> OVR</small></div>
      </article>`).join("");
    sourceNote.innerHTML=`大会の物語・出場記録はJFA「ワールドカップヒストリー」を参考に構成。選手の能力値と役割は本サイト独自査定です。<br><a href="${active.source}" target="_blank" rel="noopener">JFA公式資料を開く</a>`;
  }
  render();
})();
