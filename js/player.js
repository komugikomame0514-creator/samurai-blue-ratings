
const params = new URLSearchParams(location.search);
const player = getPlayerById(params.get("id"));
const stats = player.stats;
document.title = `${player.name} | SAMURAI BLUE RATINGS`;
document.querySelector("#photo").src = player.img;
document.querySelector("#position").textContent = `${player.pos} / ${player.no}`;
document.querySelector("#name").textContent = player.name;
document.querySelector("#english").textContent = player.en;
document.querySelector("#ovr").textContent = player.ovr;
document.querySelector("#ovrPos").textContent = player.pos;
document.querySelector("#meta").innerHTML =
  `🇯🇵 日本<br>生年月日：${player.birth}（${player.age}歳）<br>身長 / 体重：${player.body}<br>利き足：${player.foot}`;
document.querySelector("#status").textContent = player.status;
document.querySelector("#statList").innerHTML = SIX_STATS.map(k=>`
  <div class="stat-row"><span>${k}</span><div class="bar"><i style="width:${stats[k]}%"></i></div><b>${stats[k]}</b></div>
`).join("");
document.querySelector("#profileGrid").innerHTML = `
  <div class="info-box wide"><h3>プレースタイル</h3><p>${player.desc}</p></div>
  <div class="info-box"><h3>所属クラブ</h3><p>${player.club}</p></div>
  <div class="info-box"><h3>市場価値</h3><p>${player.market}</p></div>
  <div class="info-box"><h3>代表実績</h3><p>${player.caps}試合 / ${player.goals}得点 / ${player.assists}アシスト</p></div>
  <div class="info-box"><h3>W杯出場</h3><p>${player.wc}回</p></div>
  <div class="info-box wide"><h3>主な移籍歴</h3><p>${player.career}</p></div>
  <div class="info-box wide"><h3>年俸・契約情報</h3><p>${player.salary}</p></div>
`;
drawRadar(document.querySelector("#radar"), SIX_STATS, [{
  values:SIX_STATS.map(k=>stats[k]), fill:"rgba(52,117,255,.35)", stroke:"#6da6ff"
}]);
document.querySelectorAll("[data-tab]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll("[data-tab],.tab-panel").forEach(el=>el.classList.remove("active"));
    btn.classList.add("active");
    document.querySelector(`#${btn.dataset.tab}`).classList.add("active");
  });
});
