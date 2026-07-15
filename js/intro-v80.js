
(() => {
  const intro=document.getElementById("y80Intro");
  if(!intro) return;
  const key="yata-v80-intro";
  const force=new URLSearchParams(location.search).get("intro")==="1";
  if(sessionStorage.getItem(key) && !force){intro.remove();return}
  const close=()=>{sessionStorage.setItem(key,"1");intro.classList.add("hidden");setTimeout(()=>intro.remove(),1050)};
  document.getElementById("y80Enter")?.addEventListener("click",close);
})();
