"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useMemo } from "react";
import type { ExperienceItem } from "@/src/sanity/types";

type ExperienceSectionProps = {
  items: ExperienceItem[];
};

export default function ExperienceSection({ items }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const aEnd = a.endYear === "Now" ? Infinity : Number(a.endYear) || 0;
      const bEnd = b.endYear === "Now" ? Infinity : Number(b.endYear) || 0;

      if (bEnd !== aEnd) return bEnd - aEnd;

      const aStart = a.startYear || 0;
      const bStart = b.startYear || 0;

      return bStart - aStart;
    });
  }, [items]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".xp-card",
        { x: -25, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="panel section-shell min-h-screen w-full py-24">
      <div className="section-content mx-auto max-w-5xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Timeline</p>
        <h2 className="mt-3 font-pd text-4xl text-white md:text-6xl">Experience</h2>
        <div className="mt-10 space-y-4">
          {(sortedItems.length
            ? sortedItems
            : [{ _id: "fallback", title: "Error Loading Data", company: "" }]
          ).map((item) => (
            <article key={item._id} className="xp-card rounded-2xl border border-slate-700/80 bg-slate-900/40 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-pd text-2xl text-white">{item.title ?? "Role"}</h3>
                <div className="text-right">
                  <p className="text-sm text-slate-300">
                    {item.startYear && item.endYear
                      ? `${item.startYear} - ${item.endYear}`
                      : item.startYear || item.endYear || "Period"}
                  </p>
                  {item.duration && <p className="text-xs text-slate-400">{item.duration}</p>}
                </div>
              </div>
              <p className="mt-2 text-cyan-200">{item.company ?? "Please Reload"}</p>
              <p className="mt-4 text-slate-300">{item.description ?? "Error Loading Data"}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}