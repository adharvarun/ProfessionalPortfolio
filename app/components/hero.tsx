"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import LaptopModel from "./laptopModel";

type HeroProps = {
  name?: string;
  subtitle?: string;
  bio?: string;
};

export default function Hero({
  name = "Adharv Arun",
  subtitle = "Error Loading Data",
  bio = "Please Refresh the Page",
}: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const flashlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = heroRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 42, autoAlpha: 0, filter: "blur(6px)", letterSpacing: "0.05em" },
        { y: 0, autoAlpha: 1, filter: "blur(0px)", letterSpacing: "0em", duration: 0.95 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6 },
          "-=0.35"
        )
        .fromTo(
          bioRef.current,
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.58 },
          "-=0.34"
        );

      if (!reduceMotion) {
        gsap.fromTo(
          section,
          { "--hero-glow": 0.08 },
          {
            "--hero-glow": 0.16,
            duration: 2.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          }
        );

        gsap.to(titleRef.current, {
          textShadow: "0 0 18px rgba(103, 232, 249, 0.22)",
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, heroRef);

    const onMove = (event: MouseEvent) => {
      const overlay = flashlightRef.current;
      if (!overlay) return;
      const rect = section.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      overlay.style.setProperty("--fx", `${x}px`);
      overlay.style.setProperty("--fy", `${y}px`);
    };

    section.addEventListener("mousemove", onMove);

    return () => {
      section.removeEventListener("mousemove", onMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-root panel py-5 relative min-h-screen w-full overflow-hidden"
    >
      <div className="hero-loader absolute inset-0 pointer-events-none" />
      <div ref={flashlightRef} className="hero-flashlight pointer-events-none absolute inset-0 z-10" />
      <LaptopModel />
      <div className="relative z-10 flex min-h-screen items-center justify-center p-8 text-center md:p-14">
        <div className="flex max-w-4xl flex-col items-center justify-center">
          <h1
            ref={titleRef}
            className="hero-text font-pd text-6xl font-semibold leading-[0.95] text-white md:text-9xl"
          >
            {name}
          </h1>
          <p
            ref={subtitleRef}
            className="hero-text mt-6 text-xl font-medium tracking-wide text-cyan-300"
          >
            {subtitle}
          </p>
          <p
            ref={bioRef}
            className="hero-text mt-3 max-w-2xl text-lg text-slate-300 md:text-lg"
          >
            {bio}
          </p>
        </div>
      </div>
    </section>
  );
}