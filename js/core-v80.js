
(() => {
  const transition=document.createElement("div");
  transition.className="route-transition";
  document.body.appendChild(transition);

  document.addEventListener("click",e=>{
    const a=e.target.closest("a");
    if(!a) return;
    const href=a.getAttribute("href");
    if(!href || href.startsWith("#") || href.startsWith("http") || a.target==="_blank") return;
    e.preventDefault();
    transition.classList.add("active");
    setTimeout(()=>location.href=href,460);
  });

  const theme=document.body.dataset.theme || "japan";
  document.documentElement.dataset.theme=theme;
})();
