
(() => {
  const id = new URLSearchParams(location.search).get("id");
  const n = window.YATA_NATIONS.find(x=>x.id===id) || window.YATA_NATIONS[0];
  const root=document.getElementById("nationPage");
  root.style.setProperty("--nation-accent",n.accent);
  document.title=`${n.name} | PROJECT YATAGARASU`;

  nationHero.dataset.code=n.code;
  nationHero.innerHTML=`
    <div class="nation-copy-v72">
      <div class="kicker">${n.tier}</div>
      <div class="flag">${n.flag}</div>
      <h1>${n.name}<span>${n.en}</span></h1>
      <div class="motto">${n.motto}</div>
      <p>${n.summary}</p>
      <div class="nation-tags"><span>${n.identity}</span><span>${n.formation}</span><span>${n.status}</span></div>
    </div>
    <div class="nation-symbol-zone">
      <div class="orbit-line"></div>
      <div class="nation-symbol">
        <div class="nation-symbol-inner">
          <div class="nation-symbol-mark">${n.symbolMark}</div>
          <div class="nation-symbol-name">${n.symbol}</div>
        </div>
      </div>
    </div>`;

  nationSnapshot.innerHTML=`
    <article class="panel snapshot-card"><span>HISTORIC RECORD</span><b>${n.record}</b></article>
    <article class="panel snapshot-card"><span>MAJOR TITLES</span><b>${n.titles}</b></article>
    <article class="panel snapshot-card"><span>BASE FORMATION</span><b>${n.formation}</b></article>
    <article class="panel snapshot-card"><span>DATABASE STATUS</span><b>${n.deep?"DEEP DIVE":"BASE ARCHIVE"}</b></article>`;

  const modes=[
    ["⚽","CURRENT SQUAD","現代表メンバー、所属クラブ、能力値、AI総評。"],
    ["♛","LEGENDS","歴代スター、大会時OVR、レガシークラス。"],
    ["🏆","WORLD CUP HISTORY","大会別成績、名試合、中心選手。"],
    ["▦","BEST XI","歴代ベストXIと現役ベストXI。"],
    ["◎","TACTICAL IDENTITY","フォーメーション、攻守の原則、文化。"],
    ["◴","ERAS","年代別の代表、戦術、中心選手の変化。"]
  ];
  modeGrid.innerHTML=modes.map((m,i)=>`
    <article class="panel mode-card-v72" data-index="0${i+1}">
      <div class="mode-state">${n.deep&&i<3?"OPEN":"ARCHIVE"}</div>
      <div class="mode-icon">${m[0]}</div><h3>${m[1]}</h3><p>${m[2]}</p>
    </article>`).join("");

  nationDeepGrid.innerHTML=`
    <article class="panel deep-panel">
      <div class="kicker">CURRENT ICONS</div><h3>現代の代表格</h3>
      <div class="name-list">${n.featured.map((x,i)=>`<div class="name-row"><span>${x}</span><span>0${i+1}</span></div>`).join("")}</div>
    </article>
    <article class="panel deep-panel">
      <div class="kicker">ALL-TIME LEGENDS</div><h3>歴代レジェンド</h3>
      <div class="name-list">${n.legends.map((x,i)=>`<div class="name-row"><span>${x}</span><span>ICON</span></div>`).join("")}</div>
    </article>
    <article class="panel deep-panel">
      <div class="kicker">WORLD CUP ARCHIVE</div><h3>大会史</h3>
      <div class="timeline">${n.worldCup.map(x=>{const [y,...rest]=x.split(" ");return `<div class="timeline-row"><b>${y}</b><span>${rest.join(" ")}</span></div>`}).join("")}</div>
    </article>
    <article class="panel deep-panel">
      <div class="kicker">ERA TIMELINE</div><h3>時代の変化</h3>
      <div class="timeline">${n.eras.map(x=>{const [y,...rest]=x.split(" ");return `<div class="timeline-row"><b>${y}</b><span>${rest.join(" ")}</span></div>`}).join("")}</div>
    </article>`;

  stylePanel.innerHTML=`
    <div class="section-head-v72"><div><div class="kicker">TACTICAL DNA</div><h3>${n.identity}</h3></div><p>${n.motto}</p></div>
    <div class="style-bars">${Object.entries(n.styleScores).map(([k,v])=>`
      <div class="style-row"><span>${k}</span><div class="style-track"><i style="width:${v}%"></i></div><b>${v}</b></div>`).join("")}</div>`;
})();
