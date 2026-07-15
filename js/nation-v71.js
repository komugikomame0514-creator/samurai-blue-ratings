
(() => {
  const id = new URLSearchParams(location.search).get("id");
  const nation = window.YATA_NATIONS.find(n => n.id === id) || window.YATA_NATIONS[1];

  document.title = `${nation.name} | PROJECT YATAGARASU`;
  document.documentElement.style.setProperty("--nation-accent", nation.accent);

  nationHero.dataset.code = nation.code;
  nationHero.innerHTML = `
    <div class="nation-detail-copy">
      <div class="kicker">${nation.tier}</div>
      <div class="flag">${nation.flag}</div>
      <h1>${nation.name}<span>${nation.en}</span></h1>
      <p>${nation.summary}</p>
      <a class="btn" href="nations.html">← NATIONS GATEへ戻る</a>
    </div>
    <div class="nation-detail-visual">
      <div class="nation-emblem">${nation.flag}</div>
    </div>`;

  nationInfoGrid.innerHTML = `
    <article class="panel nation-info-card"><span>TACTICAL IDENTITY</span><b>${nation.identity}</b></article>
    <article class="panel nation-info-card"><span>HISTORIC RECORD</span><b>${nation.record}</b></article>
    <article class="panel nation-info-card"><span>DATABASE STATUS</span><b>${nation.status}</b></article>`;

  comingPanel.innerHTML = `
    <div class="kicker">NATION DATABASE BLUEPRINT</div>
    <h2>${nation.en} DATABASE</h2>
    <p>この国のページでは、現代表メンバー、歴代ベストXI、ワールドカップ成績、レジェンド、チーム戦術、年代別能力推移を順次実装する。</p>
    <div class="coming-list">
      <div class="coming-item">CURRENT SQUAD</div>
      <div class="coming-item">LEGENDS</div>
      <div class="coming-item">WORLD CUP HISTORY</div>
      <div class="coming-item">BEST XI</div>
      <div class="coming-item">TACTICAL IDENTITY</div>
      <div class="coming-item">ERAS</div>
    </div>`;
})();
