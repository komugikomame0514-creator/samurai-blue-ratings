
(() => {
 const d=window.BRAZIL_DB;
 const modes=[
 ["⚽","CURRENT SQUAD","2026代表メンバー","#current"],["♛","LEGENDS","歴代レジェンド","#legends"],
 ["▦","GREATEST XI","歴代ベスト11","#xi"],["◉","MANAGERS","歴代監督","#managers"],
 ["🏆","WORLD CUP","全大会史","#worldcup"],["◈","COPA AMÉRICA","南米王者の歴史","#timeline"],
 ["★","HALL OF FAME","殿堂入り","#legends"],["☀","GOLDEN GENERATIONS","黄金世代","#timeline"],
 ["▥","RECORDS","歴代記録","#records"],["◆","ICONS","国民的スター","#legends"],
 ["◎","PLAY STYLE","Jogo Bonito","#timeline"],["⚔","RIVALRIES","宿命の対決","#rivals"],
 ["⌂","ACADEMIES","育成組織","#academies"],["⬡","TOP CLUBS","国内名門","#clubs"],
 ["◴","TIMELINE","年代別変化","#timeline"],["▧","GALLERY","名シーン集","#worldcup"]
 ];
 brazilModes.innerHTML=modes.map((m,i)=>`<a class="panel brazil-mode" href="${m[3]}" data-number="${String(i+1).padStart(2,"0")}"><div class="brazil-mode-state">OPEN</div><div class="brazil-mode-icon">${m[0]}</div><h3>${m[1]}</h3><p>${m[2]}</p></a>`).join("");
 brazilSquad.innerHTML=d.squad.map(p=>`<div class="squad-row"><div class="squad-no">${p[0]}</div><div><b>${p[1]}</b><small>${p[2]} / ${p[3]}</small></div><div class="squad-ovr">${p[4]}</div></div>`).join("");
 brazilLegends.innerHTML=d.legends.map(p=>`<article class="panel brazil-legend" data-ovr="${p[1]}"><div class="legend-title">${p[2]}</div><h3>${p[0]}</h3><div>${p[1]} OVR</div><div class="legend-era">${p[3]} / ${p[4]}</div></article>`).join("");
 const coords=[[50,91],[84,76],[65,76],[35,76],[16,76],[67,51],[34,51],[50,38],[82,20],[50,13],[18,20]];
 brazilPitch.innerHTML=d.xi.map((p,i)=>`<div class="xi-player" style="left:${coords[i][0]}%;top:${coords[i][1]}%"><div class="xi-dot">${p[0]}</div><div class="xi-name">${p[1]}</div></div>`).join("");
 brazilCups.innerHTML=d.worldcups.map(x=>`<div class="cup-card ${x[1]==="CHAMPION"?"champion":""}"><b>${x[0]}</b><span>${x[1]}</span></div>`).join("");
 brazilTimeline.innerHTML=d.timeline.map(x=>`<div class="timeline-item"><div class="timeline-year">${x[0]}</div><div><h3>${x[1]}</h3><p>${x[2]}</p></div></div>`).join("");
 brazilRivals.innerHTML=d.rivals.map(x=>`<div class="info-row"><b>${x[0]} — ${x[1]}</b><span>${x[2]}</span></div>`).join("");
 brazilManagers.innerHTML=d.managers.map(x=>`<div class="info-row"><b>${x[0]} / ${x[1]}</b><span>${x[2]}</span></div>`).join("");
 brazilAcademies.innerHTML=d.academies.map(x=>`<div class="info-row"><b>${x[0]}</b><span>${x[1]}</span></div>`).join("");
 brazilClubs.innerHTML=d.clubs.map(x=>`<div class="info-row"><b>${x}</b><span>BRAZILIAN FOOTBALL INSTITUTION</span></div>`).join("");
 brazilRecords.innerHTML=d.records.map(x=>`<div class="squad-row"><div class="squad-no">★</div><div><b>${x[0]}</b><small>SELEÇÃO RECORD</small></div><div class="squad-ovr">${x[1]}</div></div>`).join("");
 const intro=document.getElementById("brazilOpening");
 document.getElementById("brazilEnter").onclick=()=>{intro.classList.add("hidden");setTimeout(()=>intro.remove(),950)};
})();
