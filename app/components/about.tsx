"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { AboutData } from "@/src/sanity/types";

type AboutSectionProps = {
  about: AboutData | null;
};

export default function AboutSection({ about }: AboutSectionProps) {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = aboutRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-item",
        { y: 24, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
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
    <section
      id="about"
      ref={aboutRef}
      className="panel section-shell about-root relative min-h-screen w-full overflow-hidden py-24"
    >
      <div className="about-loader absolute inset-0 pointer-events-none" />
      <div className="section-content relative z-10 mx-auto max-w-5xl px-6">
        <a className="about-item text-xs uppercase tracking-[0.28em] text-cyan-200" href="">Resume</a>
        <h2 className="about-item mt-3 font-pd text-4xl text-white md:text-6xl">Profile / About me</h2>
        <p className="about-item mt-6 max-w-3xl text-lg text-slate-300">
          {about?.description ??
            "I build polished interactive products with strong storytelling, clear UX, and performance-first engineering."}
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_1.6fr]">
          <aside className="about-item rounded-2xl border border-cyan-900/60 bg-slate-950/65 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
              Profile
            </p>

            <h3 className="mt-2 text-lg text-white">Adharv Arun</h3>

            <p className="mt-2 text-sm text-slate-400">
              Engineering-focused student working at the intersection of AI, robotics, and software development. I build intelligent systems that solve real-world problems through practical, production-ready implementations.
            </p>

            <div className="mt-4 text-sm text-slate-400 space-y-1">
              <p><span className="text-slate-300">Focus:</span> AI, Robotics, Full-Stack Development</p>
              <p><span className="text-slate-300">Strength:</span> Systems + Implementation</p>
              <p><span className="text-slate-300">Goal:</span> Real World impact through Tech</p>
            </div>

            <div className="mt-5 flex gap-3">
              <a
                href="https://drive.google.com/file/d/1qxLp8dgP4uWqXQVdmsR8Ca4Ydgl715_S/view?usp=sharing"
                target="_blank"
                className="text-sm px-3 py-2 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 hover:bg-cyan-500/20 transition"
              >
                Resume
              </a>

              <a
                href="https://blog.adharvarun.tech/"
                target="_blank"
                className="text-sm px-3 py-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-600 hover:bg-slate-700 transition"
              >
                Blog
              </a>
            </div>
          </aside>
          <div className="grid gap-4 md:grid-cols-2">
            {(about?.titles?.length
              ? about.titles
              : ["Software Developer", "AI Engineer", "Robotics Engineer", "Student at JSS Private School"]
            ).map((item) => (
              <article
                key={item}
                className="about-item rounded-2xl border border-slate-700/70 bg-slate-900/40 p-5"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">
                  Core Domain
                </p>

                <h3 className="mt-2 text-lg text-white">{item}</h3>

                {item === "Software Developer" && (
                  <p className="mt-2 text-sm text-slate-400">
                    I build scalable, production-ready applications with a focus on performance, clean architecture, and seamless user experiences.
                  </p>
                )}

                {item === "AI Engineer" && (
                  <p className="mt-2 text-sm text-slate-400">
                    I develop intelligent systems using machine learning and LLMs, focusing on real-world applications like chatbots, RAG pipelines, and predictive models.
                  </p>
                )}

                {item === "Robotics Engineer" && (
                  <p className="mt-2 text-sm text-slate-400">
                    I design hardware-software systems integrating sensors, microcontrollers, and real-time processing to build responsive, automated solutions.
                  </p>
                )}

                {item === "Student at JSS Private School" && (
                  <p className="mt-2 text-sm text-slate-400">
                    I actively explore AI, robotics, and software engineering through hands-on projects, competitions, and continuous learning.
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
        <article className="about-item mt-8 rounded-2xl border border-slate-700/70 bg-slate-900/40 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Skills</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(about?.skills?.length
              ? about.skills
              : ["React", "Next.js", "TypeScript", "GSAP", "Problem Solving", "Collaboration"]
            ).map((skill) => (
              <span key={skill} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                {skill}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}