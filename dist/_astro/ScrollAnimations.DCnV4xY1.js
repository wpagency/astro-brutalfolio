import"./jsx-runtime.ClP7wGfN.js";import{r as i}from"./index.DK-fsZOb.js";function p(){return i.useEffect(()=>{const c={threshold:.1,rootMargin:"0px 0px -100px 0px"},n=new IntersectionObserver(e=>{e.forEach((t,r)=>{t.isIntersecting&&setTimeout(()=>{t.target.classList.add("animate-in"),t.target.hasAttribute("data-shake")&&(t.target.style.animation="shake 0.5s ease-out")},r*100)})},c);document.querySelectorAll(".animate-on-scroll").forEach(e=>{n.observe(e)});const a=document.createElement("style");a.innerHTML=`
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(40px) rotate(-2deg);
        transition: all 0.8s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      }

      .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0) rotate(0);
      }

      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-10px) rotate(-1deg); }
        20% { transform: translateX(10px) rotate(1deg); }
        30% { transform: translateX(-10px) rotate(-1deg); }
        40% { transform: translateX(10px) rotate(1deg); }
        50% { transform: translateX(0) rotate(0); }
      }

      .brutal-parallax {
        transition: transform 0.5s cubic-bezier(0.17, 0.67, 0.83, 0.67);
      }
    `,document.head.appendChild(a);let o=null;const l=()=>{o===null&&(o=requestAnimationFrame(()=>{const e=window.scrollY;document.querySelectorAll(".parallax-slow").forEach(t=>{const s=-(e*.5);t.style.transform=`translateY(${s}px)`}),document.querySelectorAll(".parallax-fast").forEach(t=>{const s=-(e*1.5);t.style.transform=`translateY(${s}px)`}),document.querySelectorAll(".rotate-on-scroll").forEach(t=>{const r=e*.1;t.style.transform=`rotate(${r}deg)`}),o=null}))};return window.addEventListener("scroll",l,{passive:!0}),()=>{n.disconnect(),window.removeEventListener("scroll",l),a.remove()}},[]),null}export{p as default};
