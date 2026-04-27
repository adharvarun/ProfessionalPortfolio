"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProjectModal from "./projectModal";
import { urlFor } from "@/src/sanity/lib/image";
import type { ProjectItem } from "@/src/sanity/types";

type ProjectsSectionProps = {
  projects: ProjectItem[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-card",
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        }
      );
      gsap.to(".project-card", {
        y: -12,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="panel section-shell min-h-screen w-full py-24">
      <div className="section-content mx-auto max-w-6xl px-6">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Gallery</p>
            <h2 className="mt-3 font-pd text-4xl text-white md:text-6xl">Projects gallery</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <button
              type="button"
              key={project._id}
              className="project-card text-left rounded-2xl border border-slate-700/80 bg-slate-900/45 p-4"
              onClick={() => setSelected(project)}
            >
              <div className="relative h-52 overflow-hidden rounded-xl border border-slate-800">
                {project.image ? (
                  <Image
                    src={urlFor(project.image).width(900).height(560).url()}
                    alt={project.title ?? "Project cover"}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-slate-400">No image</div>
                )}
              </div>
              <h3 className="mt-4 font-pd text-2xl text-white">{project.title ?? "Untitled"}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-300">{project.description ?? "No summary yet."}</p>
              <p className="mt-2 line-clamp-2 text-sm text-slate-300">About Project &rarr;</p>
            </button>
          ))}
        </div>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
