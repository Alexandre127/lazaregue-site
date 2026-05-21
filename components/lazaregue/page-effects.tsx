"use client";

import { useEffect } from "react";

export function PageEffects() {
  useEffect(() => {
    document.body.classList.add("laz-site", "cursor-custom");

    const c1 = document.getElementById("laz-c1");
    const c2 = document.getElementById("laz-c2");
    if (!c1 || !c2) return;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      c1.style.left = `${mx}px`;
      c1.style.top = `${my}px`;
    };

    const loop = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      c2.style.left = `${rx}px`;
      c2.style.top = `${ry}px`;
      raf = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      c2.style.transform = "translate(-50%, -50%) scale(2)";
      c2.style.opacity = "0.8";
    };
    const onLeave = () => {
      c2.style.transform = "translate(-50%, -50%) scale(1)";
      c2.style.opacity = "0.5";
    };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    const interactive = document.querySelectorAll(
      "button, a, .laz-stat, .laz-btn-primary",
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      document.body.classList.remove("laz-site", "cursor-custom");
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div className="laz-cur" id="laz-c1" aria-hidden />
      <div className="laz-cur2" id="laz-c2" aria-hidden />
      <div className="laz-glow" aria-hidden />
    </>
  );
}
