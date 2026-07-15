
(() => {
 const d=window.BRAZIL_DB;
 const tabs=[
  ["overview","OVERVIEW"],["squad","CURRENT SQUAD"],["legends","LEGENDS"],["xi","GREATEST XI"],
  ["worldcup","WORLD CUP"],["timeline","TIMELINE"],["culture","CULTURE & CLUBS"],["records","RECORDS"]
 ];
 dashboardTabs.innerHTML=tabs.map((t,i)=>`<button class="dashboard-tab ${i===0?"active":""}" data-panel="${t[0]}">${t[1]}</button>`).join("");
 function head(k,t,p){return `<div class="panel-header-v74"><div><div class="brazil-kicker">${k}</div><h2>${t}</h2></div><p>${p}</p></div>`}
 const features=[
  ["⚽","CURRENT SQUAD","2026代表26名"],["♛","LEGENDS","王国の不滅の選手"],["▦","GREATEST XI","歴代ベスト11"],
  ["🏆","WORLD CUP","1930〜2026"],["◴","TIMELINE","王国の転換点"],["⚔","RIVALRIES","宿命の対決"],
  ["⌂","ACADEMIES","才能の生産地"],["⬡","TOP CLUBS","国内名門"],["◉","MANAGERS","歴代指揮官"],
  ["★","HALL OF FAME","殿堂入り"],["◎","PLAY STYLE","Jogo Bonito"],["▥","RECORDS","歴代記録"]
 ];
 document.getElementById("panel-overview").innerHTML=head("ENCYCLOPEDIA DIRECTORY","EXPLORE BRAZIL","カテゴリー別に整理")+
 `<div class="feature-grid">${features.map((x,i)=>`<article class="panel feature-card" data-index="${String(i+1).padStart(2,"0")}"><small>${x[0]}</small><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("")}</div>`;
 document.getElementById("panel-squad").innerHTML=head("CURRENT SQUAD","2026 SELEÇÃO","一覧性を優先したカード表示")+
 `<div class="compact-grid">${d.squad.map(p=>`<article class="compact-card"><div class="top"><span class="no">#${p[0]} ${p[2]}</span><b class="ovr">${p[4]}</b></div><h3>${p[1]}</h3><p>${p[3]}</p></article>`).join("")}</div>`;
 document.getElementById("panel-legends").innerHTML=head("HALL OF IMMORTALS","LEGENDS","役割と時代を簡潔に表示")+
 `<div class="legend-grid-v74">${d.legends.map(p=>`<article class="legend-card-v74"><div class="rating">${p[1]}</div><div class="title">${p[2]}</div><h3>${p[0]}</h3><p>${p[3]} / ${p[4]}</p></article>`).join("")}</div>`;
 const coords=[[8,50],[22,20],[22,80],[38,35],[38,65],[58,36],[58,64],[75,50],[91,20],[91,50],[91,80]];
 document.getElementById("panel-xi").innerHTML=head("ALL-TIME GREATEST","GREATEST XI","ピッチを横向きへ変更")+
 `<div class="pitch-horizontal"><div class="pitch-box left"></div><div class="pitch-box right"></div>${d.xi.map((p,i)=>`<div class="xi-player-v74" style="left:${coords[i][0]}%;top:${coords[i][1]}%"><div class="xi-dot-v74">${p[0]}</div><div class="xi-name-v74">${p[1]}</div></div>`).join("")}</div>`;
 document.getElementById("panel-worldcup").innerHTML=head("1930–2026","WORLD CUP ARCHIVE","優勝大会を強調")+
 `<div class="cups-grid-v74">${d.worldcups.map(x=>`<div class="cup-v74 ${x[1]==="CHAMPION"?"champion":""}"><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div>`;
 document.getElementById("panel-timeline").innerHTML=head("THE HISTORY OF A KINGDOM","TIMELINE","転換点だけをカード化")+
 `<div class="timeline-cards">${d.timeline.map(x=>`<article class="timeline-card"><b>${x[0]}</b><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("")}</div>`;
 document.getElementById("panel-culture").innerHTML=head("FOOTBALL CULTURE","CLUBS, ACADEMIES & RIVALRIES","文化を3つの視点で整理")+
 `<div class="info-columns">
  <article class="panel info-block"><h3>ACADEMIES</h3><div class="clean-list">${d.academies.map(x=>`<div class="clean-row"><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div></article>
  <article class="panel info-block"><h3>RIVALRIES</h3><div class="clean-list">${d.rivals.map(x=>`<div class="clean-row"><b>${x[0]} — ${x[1]}</b><span>${x[2]}</span></div>`).join("")}</div></article>
  <article class="panel info-block"><h3>TOP CLUBS</h3><div class="clean-list">${d.clubs.map(x=>`<div class="clean-row"><b>${x}</b><span>BRAZILIAN INSTITUTION</span></div>`).join("")}</div></article>
  <article class="panel info-block"><h3>MANAGERS</h3><div class="clean-list">${d.managers.map(x=>`<div class="clean-row"><b>${x[0]} / ${x[1]}</b><span>${x[2]}</span></div>`).join("")}</div></article>
 </div>`;
 document.getElementById("panel-records").innerHTML=head("RECORD BOOK","BRAZIL RECORDS","主要記録のみを強調")+
 `<div class="compact-grid">${d.records.map(x=>`<article class="compact-card"><div class="top"><span class="no">★</span><b class="ovr">${x[1]}</b></div><h3>${x[0]}</h3><p>SELEÇÃO RECORD</p></article>`).join("")}</div>`;
 document.querySelectorAll(".dashboard-tab").forEach(btn=>btn.onclick=()=>{
   document.querySelectorAll(".dashboard-tab").forEach(x=>x.classList.remove("active"));
   document.querySelectorAll(".dashboard-panel").forEach(x=>x.classList.remove("active"));
   btn.classList.add("active");document.getElementById("panel-"+btn.dataset.panel).classList.add("active");
 });
 const intro=document.getElementById("brazilOpening");
 document.getElementById("brazilEnter").onclick=()=>{intro.classList.add("hidden");setTimeout(()=>intro.remove(),950)};
})();
