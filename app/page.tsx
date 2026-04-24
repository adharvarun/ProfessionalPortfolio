import AboutSection from "./components/about";
import ContactSection from "./components/contactSection";
import ExperienceSection from "./components/experienceSection";
import Hero from "./components/hero";
import PageWrapper from "./components/pageWrapper";
import ProjectsSection from "./components/projectsSection";
import SiteFooter from "./components/siteFooter";
import SiteHeader from "./components/siteHeader";
import { client } from "@/src/sanity/lib/client";
import {
  aboutQuery,
  contactQuery,
  experienceQuery,
  linksQuery,
  projectsQuery,
} from "@/src/sanity/queries";
import type {
  AboutData,
  ContactData,
  ExperienceItem,
  LinkItem,
  ProjectItem,
} from "@/src/sanity/types";

export default async function Home() {
  const [about, projects, experience, contact, links] = await Promise.all([
    client.fetch<AboutData>(aboutQuery),
    client.fetch<ProjectItem[]>(projectsQuery),
    client.fetch<ExperienceItem[]>(experienceQuery),
    client.fetch<ContactData[]>(contactQuery),
    client.fetch<LinkItem[]>(linksQuery),
  ]);

  return (
    <PageWrapper>
      <SiteHeader name={about?.title} />
      <Hero
        name={about?.title}
        subtitle={about?.titles?.join(" | ")}
        bio={about?.shortDescription}
      />
      <ProjectsSection projects={projects ?? []} />
      <AboutSection about={about} />
      <ExperienceSection items={experience ?? []} />
      <ContactSection links={links ?? []} />
      <SiteFooter name={about?.title} contacts={contact ?? []} links={links ?? []} />
    </PageWrapper>
  );
}