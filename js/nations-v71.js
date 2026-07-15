
(() => {
  const nations=window.YATA_NATIONS;
  nationGrid.innerHTML=nations.map(n=>`
    <a class="panel nation-card" href="nation.html?id=${n.id}" data-code="${n.code}" style="--nation-accent:${n.accent}">
      <div class="nation-status"><span>${n.tier}</span><b>${n.deep?"DEEP DIVE":"OPEN"}</b></div>
      <div class="nation-flag">${n.flag}</div><h3>${n.name}</h3>
      <div class="nation-en">${n.en} / ${n.code}</div>
      <div class="nation-identity">${n.identity}</div>
      <div class="nation-record">${n.record}</div>
    </a>`).join("");
})();
