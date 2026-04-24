"use client";

import Image from "next/image";
import { urlFor } from "@/src/sanity/lib/image";
import type { ProjectItem } from "@/src/sanity/types";

type ProjectModalProps = {
  project: ProjectItem | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#02050d]/90 p-4">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-700 bg-slate-950 p-5 md:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-pd text-3xl text-white">{project.title ?? "Project"}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-600 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300 cursor-pointer"
          >
            Close
          </button>
        </div>
        {project.image ? (
          <div className="relative mb-6 h-70 overflow-hidden rounded-xl border border-slate-800">
            <Image
              src={urlFor(project.image).width(2000).height(900).url()}
              alt={project.title ?? "Project image"}
              fill
              className="object-cover"
            />
          </div>
        ) : null}
        <p className="text-base leading-relaxed text-slate-200">
          {project.description ?? "This project highlights product thinking, visual detail, and polished execution."}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-slate-700/80 bg-slate-900/40 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Tags</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
          <article className="rounded-xl border border-slate-700/80 bg-slate-900/40 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Technologies</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.technologies?.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300"
                >
                  {technology}
                </span>
              ))}
            </div>
          </article>
          <article className="rounded-xl border border-slate-700/80 bg-slate-900/40 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Links</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" className="rounded-full border border-cyan-400/60 px-4 py-1 text-xs text-cyan-200">
                  Visit project
                </a>
              ) : null}
              {project.github ? (
                <a href={project.github} target="_blank" rel="noreferrer" className="rounded-full border border-cyan-400/60 px-4 py-1 text-xs text-cyan-200">
                  View code
                </a>
              ) : null}
              {project.demovideo ? (
                <a href={project.demovideo} target="_blank" rel="noreferrer" className="rounded-full border border-cyan-400/60 px-4 py-1 text-xs text-cyan-200">
                  Watch demo
                </a>
              ) : null}
            </div>
          </article>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
        </div>
      </div>
    </div>
  );
}
