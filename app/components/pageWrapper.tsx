"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import CustomCursor from "./customCursor";
import { usePathname } from "next/navigation";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const pageRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const container = pageRef.current;
    if (!container) return;

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const setMouseX = gsap.quickTo(container, "--mx", {
      duration: 0.5,
      ease: "power3.out",
    });

    const setMouseY = gsap.quickTo(container, "--my", {
      duration: 0.5,
      ease: "power3.out",
    });

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      setMouseX(x);
      setMouseY(y);
    };

    window.addEventListener("mousemove", onMove);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="page-root flex flex-col min-h-screen flex-1 bg-[#040913]"
    >
      {!pathname.startsWith("/studio") && <CustomCursor />}
      {children}
    </div>
  );
}