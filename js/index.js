
const players = window.SAMURAI_PLAYERS;
const grid = document.querySelector("#playerGrid");
const search = document.querySelector("#search");
let filter = "ALL";

function render(){
  const q = search.value.trim().toLowerCase();
  const list = players.filter(p =>
    (filter === "ALL" || p.pos === filter) &&
    `${p.name} ${p.en} ${p.club}`.toLowerCase().includes(q)
  );
  grid.innerHTML = list.map(p => `
    <a class="player-card" href="player.html?id=${encodeURIComponent(p.id)}">
      <img src="${p.img}" alt="${p.name}">
      <div class="card-copy">
        <div class="card-pos">${p.pos}</div>
        <div class="card-no">${p.no}</div>
        <h2>${p.name}</h2>
        <div class="card-en">${p.en}</div>
        <div class="card-club">${p.club}</div>
        <div class="card-ovr">${p.ovr}</div>
      </div>
    </a>
  `).join("");
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
