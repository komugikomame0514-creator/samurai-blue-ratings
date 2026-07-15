
(()=>{const n=[
["🇧🇷","BRAZIL",25,67,"brazil.html",1],["🇦🇷","ARGENTINA",28,80,"nation.html?id=argentina",1],["🇯🇵","JAPAN",85,43,"index.html#players",1],
["🇫🇷","FRANCE",52,31,"nation.html?id=france",1],["🇪🇸","SPAIN",48,35,"nation.html?id=spain",1],["🇩🇪","GERMANY",55,28,"nation.html?id=germany",1],
["🏴","ENGLAND",49,24,"nation.html?id=england",1],["🇵🇹","PORTUGAL",46,34,"nation.html?id=portugal",1],
["🇮🇹","ITALY",56,35,"nations.html",0],["🇳🇱","NETHERLANDS",53,26,"nations.html",0],["🇺🇾","URUGUAY",29,77,"nations.html",0]
];worldPins.innerHTML=n.map(x=>`<a class="map-pin ${x[5]?"open":""}" href="${x[4]}" style="left:${x[2]}%;top:${x[3]}%"><div class="map-pin-flag">${x[0]}</div><div class="map-pin-name">${x[1]}</div></a>`).join("")})();
