"use client";

import { useEffect, useRef } from "react";

const interactiveSelector =
  "a, button, input, textarea, select, summary, [role='button'], [tabindex]:not([tabindex='-1'])";

export default function PointerGlow() {
  const haloRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const halo = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const allowsMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || !allowsMotion) return;

    let frame = 0;
    let visible = false;
    let hoveringInteractive = false;
    let pressed = false;

    const setVisible = (nextVisible: boolean) => {
      visible = nextVisible;
      const opacity = visible ? "1" : "0";
      if (haloRef.current) haloRef.current.style.opacity = visible ? "0.55" : "0";
      if (ringRef.current) ringRef.current.style.opacity = opacity;
      if (dotRef.current) dotRef.current.style.opacity = opacity;
    };

    const setHover = (nextHoveringInteractive: boolean) => {
      if (hoveringInteractive === nextHoveringInteractive) return;

      hoveringInteractive = nextHoveringInteractive;

      const ringSize = hoveringInteractive ? "44px" : "30px";
      const haloSize = hoveringInteractive ? "104px" : "76px";

      if (haloRef.current) {
        haloRef.current.style.width = haloSize;
        haloRef.current.style.height = haloSize;
        haloRef.current.style.opacity = visible ? (hoveringInteractive ? "0.78" : "0.55") : "0";
      }

      if (ringRef.current) {
        ringRef.current.style.width = ringSize;
        ringRef.current.style.height = ringSize;
        ringRef.current.style.borderColor = hoveringInteractive
          ? "rgba(79, 133, 139, 0.42)"
          : "rgba(79, 133, 139, 0.28)";
        ringRef.current.style.backgroundColor = hoveringInteractive
          ? "rgba(79, 133, 139, 0.06)"
          : "rgba(79, 133, 139, 0.018)";
        ringRef.current.style.boxShadow = hoveringInteractive
          ? "0 12px 38px rgba(79, 133, 139, 0.14)"
          : "0 10px 30px rgba(79, 133, 139, 0.09)";
      }
    };

    const animate = () => {
      ring.current.x += (pointer.current.x - ring.current.x) * 0.155;
      ring.current.y += (pointer.current.y - ring.current.y) * 0.155;
      halo.current.x += (pointer.current.x - halo.current.x) * 0.085;
      halo.current.y += (pointer.current.y - halo.current.y) * 0.085;

      const ringScale = pressed ? 0.86 : hoveringInteractive ? 1.04 : 1;

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${halo.current.x}px, ${halo.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;

      if (!visible) {
        ring.current.x = event.clientX;
        ring.current.y = event.clientY;
        halo.current.x = event.clientX;
        halo.current.y = event.clientY;
        setVisible(true);
      }

      const target = event.target;
      setHover(target instanceof Element && Boolean(target.closest(interactiveSelector)));

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handlePointerDown = () => {
      pressed = true;
    };

    const handlePointerUp = () => {
      pressed = false;
    };

    const handleMouseLeave = () => {
      pressed = false;
      setVisible(false);
    };

    frame = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={haloRef}
        aria-hidden="true"
        className="pointer-glow-halo pointer-events-none fixed left-0 top-0 z-[79] h-[76px] w-[76px] rounded-full opacity-0 transition-[width,height,opacity] duration-200"
        style={{
          background:
            "radial-gradient(circle, rgba(79, 133, 139, 0.11) 0%, rgba(79, 133, 139, 0.055) 34%, transparent 68%)",
          filter: "blur(2px)",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-glow-ring pointer-events-none fixed left-0 top-0 z-[80] h-[30px] w-[30px] rounded-full border opacity-0 transition-[width,height,border-color,background-color,box-shadow,opacity] duration-200"
        style={{
          backgroundColor: "rgba(79, 133, 139, 0.018)",
          borderColor: "rgba(79, 133, 139, 0.28)",
          boxShadow: "0 10px 30px rgba(79, 133, 139, 0.09)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-glow-dot pointer-events-none fixed left-0 top-0 z-[81] h-1.5 w-1.5 rounded-full bg-[#4f858b] opacity-0 shadow-[0_0_10px_rgba(79,133,139,0.42)] transition-opacity duration-200"
      />
    </>
  );
}
