import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ContributionList } from "@/components/work/ContributionList";
import { NextProject } from "@/components/work/NextProject";
import { ProjectCover } from "@/components/work/ProjectCover";
import { ProjectHero } from "@/components/work/ProjectHero";
import { StackChips } from "@/components/work/StackChips";
import { PROJECTS, coverOf, galleryOf, getNextProject, getProject } from "@/data/projects";

// Only the slugs in data/projects.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — Diwakar Bhatt`;
  return {
    title,
    description: project.short,
    openGraph: {
      title,
      description: project.short,
      type: "article",
      images: [{ url: coverOf(project.slug), width: 1920, height: 1080, alt: project.title }],
    },
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const gallery = Array.from({ length: project.gallery }, (_, i) => galleryOf(project.slug, i + 1));

  return (
    <main className="min-h-svh bg-paper text-ink">
      <div className="mx-auto max-w-[1600px] px-5 md:px-[5.3vw]">
        {/* Top bar */}
        <div className="flex items-center justify-between pt-6 text-[14px] md:pt-9">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">
              ←
            </span>
            Back to work
          </Link>
          <span className="text-grey tabular-nums">
            {project.index} / {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>

        <ProjectHero project={project} />

        <div className="mt-[clamp(32px,4vw,56px)]">
          <ProjectCover src={coverOf(project.slug)} alt={`${project.title} cover`} />
        </div>

        {/* Overview */}
        <Section label="Overview">
          <div className="space-y-6 font-display text-[clamp(20px,1.8vw,26px)] leading-[1.35] font-medium tracking-[-0.01em]">
            {project.intro.map((paragraph) => (
              <Reveal key={paragraph}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {project.stats && (
            <div className="mt-[clamp(48px,6vw,80px)] grid grid-cols-2 gap-6 border-t-[1.5px] border-line pt-8">
              {project.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.1}>
                  <p className="font-display text-[clamp(56px,7vw,112px)] leading-none font-medium tracking-[-0.03em] text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-3 text-[14px] text-grey">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          )}
        </Section>

        <Section label="My contribution">
          <ContributionList items={project.contribution} />
        </Section>

        <Section label="Stack">
          <Reveal>
            <StackChips stack={project.stack} />
          </Reveal>
        </Section>

        {/* Gallery */}
        <div className="mt-[clamp(80px,10vw,150px)] grid gap-4 md:grid-cols-2 md:gap-6">
          {gallery.map((src, i) => (
            <Reveal key={src} delay={(i % 2) * 0.08}>
              <div className="relative aspect-[14/9] overflow-hidden rounded-[2px] bg-line">
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 768px) 46vw, 92vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <NextProject project={next} />
      </div>
    </main>
  );
}

/** Small label on the left, content on the right (stacked on mobile). */
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-[clamp(80px,10vw,150px)] grid gap-6 lg:grid-cols-12 lg:gap-x-6">
      <h2 className="text-[11px] tracking-[0.14em] text-grey uppercase lg:col-span-3 lg:pt-2">{label}</h2>
      <div className="lg:col-span-9 lg:max-w-[920px]">{children}</div>
    </section>
  );
}
