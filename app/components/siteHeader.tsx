"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

type SiteHeaderProps = {
  name?: string;
};

export default function SiteHeader({ name = "Adharv Arun" }: SiteHeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    gsap.set(header, { y: -80, autoAlpha: 0 });

    const onScroll = () => {
      const show = window.scrollY > 60;
      gsap.to(header, {
        y: show ? 0 : -80,
        autoAlpha: show ? 1 : 0,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed left-0 top-0 z-50 w-full border-b border-slate-800/70 bg-[#030711]/80 backdrop-blur"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3 font-pd text-lg tracking-[0.15em] text-white">
          <Image src="/logo.png" alt="Logo" width={24} height={24} className="opacity-95" />
          {name.toUpperCase()}
        </a>
        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-cyan-200">
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://www.adharvarun.tech"
            target="_blank"
            className="rounded-full border border-slate-600 px-4 py-2 text-xs text-slate-200"
          >
            Portfolio
          </a>
        </div>
      </nav>
    </header>
  );
}
