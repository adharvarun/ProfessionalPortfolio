import type { LinkItem } from "@/src/sanity/types";

type ContactSectionProps = {
  links: LinkItem[];
};

export default function ContactSection({ links }: ContactSectionProps) {
  return (
    <section id="contact" className="panel section-shell w-full py-24">
      <div className="section-content mx-auto max-w-5xl px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-200">Details</p>
        <h2 className="mt-3 font-pd text-4xl text-white md:text-6xl">Contact Me</h2>
        <p className="mt-6 max-w-2xl text-slate-300">
          Open to internships, collaborations, and building impactful digital solutions.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a className="rounded-xl border border-slate-700 p-4 text-slate-200" href="mailto:adharvarun.10@gmail.com">adharvarun.10@gmail.com</a>
          <p className="rounded-xl border border-slate-700 p-4 text-slate-200">+971 56 983 6024</p>
          <a className="rounded-xl border border-slate-700 p-4 text-slate-200" href="https://www.github.com/adharvarun">GitHub</a>
          <a className="rounded-xl border border-slate-700 p-4 text-slate-200" href="https://www.linkedin.com/in/adharv-arun/">LinkedIn</a>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {links.map((link) => (
            <a
              key={link._id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:border-cyan-300 hover:text-cyan-200"
            >
              {link.title ?? "Link"}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
