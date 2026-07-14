
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const params = new URLSearchParams(window.location.search);
  const playerId = params.get("id");
  const p = window.getPlayerById(playerId);

  if (!p) {
    document.querySelector(".player-main").innerHTML =
      '<section class="panel error-panel"><h2>選手データを読み込めませんでした</h2><p>選手一覧へ戻って、もう一度選択してください。</p></section>';
    return;
  }

  const clamp = (value, min = 30, max = 99) =>
    Math.max(min, Math.min(max, Math.round(Number(value) || min)));

  // Ver5.0以前のdata.jsでも動くように、15能力をその場で生成する。
  const base = p.stats || {};
  const speed = clamp(base["スピード"] ?? 60);
  const shoot = clamp(base["シュート"] ?? 50);
  const pass = clamp(base["パス"] ?? 60);
  const dribble = clamp(base["ドリブル"] ?? 60);
  const defense = clamp(base["ディフェンス"] ?? 50);
  const physical = clamp(base["フィジカル"] ?? 60);
  const seed = [...String(p.id || p.name)].reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const offset = (n, range = 5) => (seed + n * 17) % range - Math.floor(range / 2);

  const generatedStats = {
    "スピード": speed,
    "シュート": shoot,
    "パス": pass,
    "ドリブル": dribble,
    "ディフェンス": defense,
    "フィジカル": physical,
    "スタミナ": clamp((speed + physical) / 2 + offset(1, 7)),
    "テクニック": clamp((pass + dribble) / 2 + offset(2, 7)),
    "メンタル": clamp((Number(p.ovr) + defense) / 2 + offset(3, 7)),
    "ポジショニング": clamp((Number(p.ovr) + pass + defense) / 3 + 3 + offset(4, 5)),
    "決定力": clamp(shoot + offset(5, 9)),
    "キック精度": clamp((shoot + pass) / 2 + 2 + offset(6, 5)),
    "クロス": clamp(pass + offset(7, 7)),
    "フリーキック": clamp((shoot + pass) / 2 - 3 + offset(8, 7)),
    "カーブ": clamp(pass + offset(9, 7))
  };

  if (p.pos === "GK") {
    generatedStats["決定力"] = clamp(30 + offset(10, 9));
    generatedStats["テクニック"] = clamp(pass - 4);
    generatedStats["キック精度"] = clamp(pass + 4);
    generatedStats["クロス"] = clamp(pass - 2);
    generatedStats["フリーキック"] = clamp(pass - 8);
    generatedStats["カーブ"] = clamp(pass - 5);
  }

  const displayStats =
    p.displayStats && Object.keys(p.displayStats).length >= 10
      ? { ...generatedStats, ...p.displayStats }
      : generatedStats;

  document.title = `${p.name} | PROJECT YATAGARASU`;

  $("photo").src = p.img;
  $("photo").alt = p.name;
  $("ovr").textContent = p.ovr;
  $("radarOvr").textContent = p.ovr;
  $("position").textContent = p.pos;
  $("name").textContent = p.name;
  $("english").textContent = p.en;
  $("birth").textContent = `${String(p.birth).replaceAll("/", ".")}（${p.age}歳）`;
  $("clubName").textContent = p.club;
  $("number").textContent = p.no;
  $("description").textContent = p.desc;

  $("traits").innerHTML = (p.traits || [])
    .map((trait) => `<span>${trait}</span>`)
    .join("");

  $("longStats").innerHTML = Object.entries(displayStats)
    .map(
      ([name, value]) => `
        <div class="long-stat">
          <div class="name"><i class="stat-dot"></i><span>${name}</span></div>
          <div class="long-bar"><i style="width:${value}%"></i></div>
          <b>${value}</b>
        </div>`
    )
    .join("");

  $("profileGrid").innerHTML = `
    <article class="metric-card">
      <h3>所属クラブ</h3>
      <div class="metric-value club-value">${p.club}</div>
      <div class="metric-sub">CURRENT CLUB</div>
    </article>
    <article class="metric-card emphasis">
      <h3>市場価値</h3>
      <div class="metric-value">${p.market || "非公表"}</div>
      <div class="metric-sub">ESTIMATED VALUE</div>
    </article>
    <article class="metric-card emphasis">
      <h3>代表実績</h3>
      <div class="metric-value">${p.caps ?? 0} 試合</div>
      <div class="metric-sub">${p.goals ?? 0}得点 / ${p.assists ?? 0}アシスト</div>
    </article>
    <article class="metric-card emphasis">
      <h3>W杯出場</h3>
      <div class="metric-value">${p.wc ?? 0} 回</div>
      <div class="metric-sub">WORLD CUP APPEARANCES</div>
    </article>
    <article class="metric-card transfer-card">
      <h3>主な移籍歴</h3>
      <p>${p.career || "情報なし"}</p>
    </article>
    <article class="metric-card">
      <h3>生年月日</h3>
      <div class="metric-value">${p.birth}</div>
      <div class="metric-sub">${p.age}歳</div>
    </article>
    <article class="metric-card">
      <h3>身長 / 体重</h3>
      <div class="metric-value">${p.body}</div>
      <div class="metric-sub">PHYSICAL DATA</div>
    </article>
    <article class="metric-card">
      <h3>利き足</h3>
      <div class="metric-value">${p.foot}</div>
      <div class="metric-sub">PREFERRED FOOT</div>
    </article>
    <article class="metric-card">
      <h3>背番号</h3>
      <div class="metric-value">${p.no}</div>
      <div class="metric-sub">SQUAD NUMBER</div>
    </article>
    <article class="metric-card contract-card">
      <h3>年俸・契約情報</h3>
      <p>${p.salary || "非公表"}</p>
    </article>`;

  const radarLabels = [
    "スピード",
    "シュート",
    "パス",
    "ドリブル",
    "テクニック",
    "フィジカル",
    "スタミナ",
    "ディフェンス",
    "メンタル",
    "ポジショニング"
  ];

  const drawRadar = () => {
    const canvas = $("radar");
    const rect = canvas.getBoundingClientRect();
    const cssWidth = Math.max(520, Math.round(rect.width || 720));
    const cssHeight = Math.round(cssWidth * 0.82);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    canvas.style.width = `${cssWidth}px`;
    canvas.style.maxWidth = "100%";
    canvas.style.height = "auto";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssWidth, cssHeight);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    const cx = cssWidth / 2;
    const cy = cssHeight / 2 + 10;
    const radius = Math.min(cssWidth, cssHeight) * 0.31;
    const values = radarLabels.map((key) => clamp(displayStats[key]));

    for (let level = 1; level <= 5; level++) {
      const r = (radius * level) / 5;
      ctx.beginPath();
      radarLabels.forEach((_, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / radarLabels.length;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.strokeStyle =
        level === 5 ? "rgba(235,242,255,.88)" : "rgba(150,181,230,.34)";
      ctx.lineWidth = level === 5 ? 2.2 : 1.25;
      ctx.stroke();
    }

    radarLabels.forEach((_, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / radarLabels.length;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(angle) * radius,
        cy + Math.sin(angle) * radius
      );
      ctx.strokeStyle = "rgba(120,160,220,.26)";
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    ctx.beginPath();
    values.forEach((value, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
      const r = (radius * value) / 100;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();

    const fill = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
    fill.addColorStop(0, "rgba(34,91,220,.30)");
    fill.addColorStop(1, "rgba(29,101,255,.64)");
    ctx.fillStyle = fill;
    ctx.fill();

    ctx.shadowColor = "#398cff";
    ctx.shadowBlur = 10;
    ctx.strokeStyle = "#8ab8ff";
    ctx.lineWidth = 3.5;
    ctx.stroke();
    ctx.shadowBlur = 0;

    values.forEach((value, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
      const r = (radius * value) / 100;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.strokeStyle = "#428eff";
      ctx.lineWidth = 2.5;
      ctx.stroke();
    });

    radarLabels.forEach((label, index) => {
      const angle = -Math.PI / 2 + (index * Math.PI * 2) / radarLabels.length;
      const labelRadius = radius + 52;
      const x = cx + Math.cos(angle) * labelRadius;
      const y = cy + Math.sin(angle) * labelRadius;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#f5f8ff";
      ctx.font = '700 15px "Yu Gothic UI", sans-serif';
      ctx.fillText(label, x, y - 9);
      ctx.fillStyle = "#a9c5ff";
      ctx.font = '700 14px "Segoe UI", sans-serif';
      ctx.fillText(values[index], x, y + 13);
    });
  };

  requestAnimationFrame(drawRadar);
  window.addEventListener("resize", () => {
    clearTimeout(window.__radarResizeTimer);
    window.__radarResizeTimer = setTimeout(drawRadar, 150);
  });
})();
