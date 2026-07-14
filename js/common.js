
window.SIX_STATS = ["スピード","シュート","パス","ドリブル","ディフェンス","フィジカル"];

window.getPlayerById = function(id){
  return window.SAMURAI_PLAYERS.find(p => p.id === id) || window.SAMURAI_PLAYERS[0];
};

window.drawRadar = function(canvas, labels, sets){
  const ctx = canvas.getContext("2d");
  const cx = canvas.width/2, cy = canvas.height/2, R = Math.min(canvas.width, canvas.height)*.31;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let level=1;level<=5;level++){
    const r=R*level/5;
    ctx.beginPath();
    labels.forEach((_,i)=>{
      const a=-Math.PI/2+i*Math.PI*2/labels.length;
      const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    });
    ctx.closePath();ctx.strokeStyle="rgba(255,255,255,.18)";ctx.stroke();
  }
  sets.forEach(set=>{
    ctx.beginPath();
    labels.forEach((_,i)=>{
      const a=-Math.PI/2+i*Math.PI*2/labels.length;
      const r=R*set.values[i]/100;
      const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    });
    ctx.closePath();ctx.fillStyle=set.fill;ctx.fill();ctx.strokeStyle=set.stroke;ctx.lineWidth=3;ctx.stroke();
  });
  labels.forEach((label,i)=>{
    const a=-Math.PI/2+i*Math.PI*2/labels.length;
    const r=R+40,x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;
    ctx.fillStyle="#f8fbff";ctx.font="700 13px sans-serif";ctx.textAlign="center";ctx.fillText(label,x,y);
  });
};
