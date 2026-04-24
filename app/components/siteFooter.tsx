import ParticleAnimation from "./particleAnimation";
import type { ContactData, LinkItem } from "@/src/sanity/types";

type SiteFooterProps = {
  name?: string;
  contacts: ContactData[];
  links: LinkItem[];
};

export default function SiteFooter({ name = "Portfolio", contacts, links }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-10 border-t border-slate-800/80 bg-[#02060f]">
      <ParticleAnimation />
      <div className="mx-auto max-w-6xl px-6 pb-8 pt-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-pd text-3xl text-white">{name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Navigation</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
              <a href="#home" className="hover:text-cyan-200">Home</a>
              <a href="#projects" className="hover:text-cyan-200">Projects</a>
              <a href="#about" className="hover:text-cyan-200">About</a>
              <a href="#contact" className="hover:text-cyan-200">Contact</a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Connect</p>
            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-300">
              {contacts?.length ? (
                contacts.map((item) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan-200"
                  >
                    {item.name ?? "Contact"}
                  </a>
                ))
              ) : (
                <p>No contact methods available</p>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {links.map((link) => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-cyan-300 hover:text-cyan-200"
                >
                  {link.title ?? "Link"}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-5 text-xs text-slate-500">
          Built By Adharv Arun, {year}
        </div>
      </div>
    </footer>
  );
}