
(() => {
  "use strict";
  const players = window.SAMURAI_PLAYERS;
  let filter = "ALL";
  const feature = [...players].sort((a,b)=>b.impactScore-a.impactScore)[0];

  document.getElementById("featureStage").innerHTML = `
    <img class="feature-player-img" src="${feature.img}" alt="${feature.name}">
    <div class="feature-info">
      <small>FEATURED PLAYER / ${feature.rarity}</small>
      <h2>${feature.name}</h2>
      <p>${feature.en} — ${feature.club}</p>
      <div class="feature-score">
        <b>${feature.ovr}</b>
        <span>${feature.bestRole}</span>
        <a class="btn" href="player.html?id=${encodeURIComponent(feature.id)}">VIEW</a>
      </div>
    </div>`;

  function render(){
    const list = players.filter(p => filter === "ALL" || p.pos === filter);
    document.getElementById("showcase").innerHTML = list.map(p => `
      <a class="showcase-card" href="player.html?id=${encodeURIComponent(p.id)}">
        <img src="${p.img}" alt="${p.name}">
        <div class="sc-copy">
          <div class="sc-top"><b class="sc-ovr">${p.ovr}</b><span class="sc-pos">${p.pos} / ${p.no}</span></div>
          <h3>${p.name}</h3>
          <div class="sc-club">${p.club}</div>
          <div class="sc-role">${p.bestRole}</div>
        </div>
      </a>`).join("");
  }

  document.querySelectorAll("[data-filter]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      document.querySelectorAll("[data-filter]").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      filter=btn.dataset.filter;
      render();
    });
  });
  render();
})();
