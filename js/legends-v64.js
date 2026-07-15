
(() => {
  const eras=window.YATAGARASU_ERAS; let active=eras[eras.length-1];
  const labels=["PAC","SHO","PAS","DRI","DEF","PHY"];
  function renderTabs(){
    eraTabs.innerHTML=eras.map(e=>`<button class="era-tab ${e.year===active.year?"active":""}" data-year="${e.year}">${e.year} ${e.host}</button>`).join("");
    document.querySelectorAll("[data-year]").forEach(btn=>btn.onclick=()=>{active=eras.find(e=>e.year==btn.dataset.year);render()});
  }
  function render(){
    document.documentElement.style.setProperty("--era-accent",active.accent);renderTabs();eraHero.dataset.year=active.year;
    eraHero.innerHTML=`<img class="era-hero-image" src="${active.heroImage}" alt="${active.year} 日本代表" referrerpolicy="no-referrer"><div class="era-hero-overlay"></div>
      <div class="era-copy"><small>${active.year} FIFA WORLD CUP / ${active.host}</small><h2>${active.title}</h2><div class="host">${active.identity}</div><p class="era-story">${active.story}</p><div class="photo-credit">写真：JFAワールドカップヒストリー掲載の大会当時写真</div></div>
      <div class="era-facts"><div class="era-fact"><span>TOURNAMENT STAGE</span><b>${active.stage}</b></div><div class="era-fact"><span>MATCH RECORD</span><b>${active.record}</b></div><div class="era-fact"><span>KEY PLAYERS</span><b>${active.players.length}名</b></div></div>`;
    legendGrid.innerHTML=active.players.map(p=>`<a class="legend-card-link" href="legend-player.html?era=${active.year}&id=${encodeURIComponent(p.id)}"><article class="panel legend-card">
      <img class="legend-photo" src="${p.image}" alt="${active.year} ${p.name}" loading="lazy" referrerpolicy="no-referrer"><div class="legend-no">${p.no}</div><div class="legend-pos">${p.pos} / ${p.legacy}</div><h3>${p.name}</h3><div class="legend-en">${p.en}</div><div class="legend-role">${p.role}</div>
      <div class="legend-stats">${p.stats.map((v,i)=>`<div class="legend-stat">${labels[i]}<b>${v}</b></div>`).join("")}</div><div class="legend-ovr">${p.ovr}<small> OVR</small></div></article></a>`).join("");
    sourceNote.innerHTML=`大会の物語・戦績・写真はJFA「ワールドカップヒストリー」を参照。能力値、役割、AI総評は本サイト独自査定です。<br><a href="${active.source}" target="_blank" rel="noopener">JFA公式資料を開く</a>`;
  } render();
})();
