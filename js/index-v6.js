
(() => {
  "use strict";
  const players = window.SAMURAI_PLAYERS;
  const grid = document.getElementById("playerGrid");
  const search = document.getElementById("search");
  const boot = document.getElementById("boot");
  let filter = "ALL";

  const particles = document.getElementById("particles");
  for (let i = 0; i < 60; i++) {
    const dot = document.createElement("i");
    dot.style.left = Math.random() * 100 + "%";
    dot.style.animationDuration = 5 + Math.random() * 8 + "s";
    dot.style.animationDelay = -Math.random() * 9 + "s";
    dot.style.opacity = Math.random();
    particles.appendChild(dot);
  }
  document.getElementById("enterBtn").addEventListener("click", () => boot.classList.add("hidden"));

  const featured = [...players].sort((a,b) => b.ovr - a.ovr)[0];
  document.getElementById("featuredPlayer").innerHTML = `
    <img src="${featured.img}" alt="${featured.name}">
    <div class="featured-copy">
      <div class="featured-kicker">FEATURED PLAYER / ${featured.rarity}</div>
      <h2>${featured.name}</h2>
      <p>${featured.en} — ${featured.club}</p>
      <div class="featured-meta">
        <b class="featured-ovr">${featured.ovr}</b>
        <span class="featured-role">${featured.bestRole}</span>
        <a class="btn" href="player.html?id=${encodeURIComponent(featured.id)}">VIEW PROFILE</a>
      </div>
    </div>`;

  const avg = players.reduce((sum,p)=>sum+p.ovr,0)/players.length;
  document.getElementById("countPlayers").textContent = players.length;
  document.getElementById("avgOvr").textContent = avg.toFixed(1);
  document.getElementById("topOvr").textContent = Math.max(...players.map(p=>p.ovr));
  document.getElementById("youngest").textContent = Math.min(...players.map(p=>p.age));

  function render() {
    const q = search.value.trim().toLowerCase();
    const list = players.filter(p =>
      (filter === "ALL" || p.pos === filter) &&
      `${p.name} ${p.en} ${p.club} ${p.bestRole}`.toLowerCase().includes(q)
    );
    grid.innerHTML = list.map(p => `
      <a class="player-card" href="player.html?id=${encodeURIComponent(p.id)}">
        <img src="${p.img}" alt="${p.name}">
        <div class="card-copy">
          <div class="card-pos">${p.pos} / ${p.rarity}</div>
          <div class="card-no">${p.no}</div>
          <h2>${p.name}</h2>
          <div class="card-en">${p.en}</div>
          <div class="card-club">${p.club}</div>
          <div class="card-ovr">${p.ovr}</div>
        </div>
      </a>`).join("");
  }

  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filter = btn.dataset.filter;
      render();
    });
  });
  search.addEventListener("input", render);
  render();
})();
