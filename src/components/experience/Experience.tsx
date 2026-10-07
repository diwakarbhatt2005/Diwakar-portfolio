import { Reveal } from "@/components/Reveal";
import { ContributionList } from "@/components/work/ContributionList";
import { StackChips } from "@/components/work/StackChips";
import { EXPERIENCE, type Experience as Job } from "@/data/experience";

/** Experience: role details on the left, summary / contributions / impact / stack on the right. */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="bg-paper pt-[clamp(80px,9vw,140px)] pb-[clamp(96px,10vw,160px)] text-ink"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-[5.3vw]">
        <Reveal>
          <h2
            id="experience-title"
            className="mb-16 font-display text-[clamp(44px,5.4vw,78px)] leading-none font-medium tracking-[-0.02em]"
          >
            Experience
          </h2>
        </Reveal>

        <ol>
          {EXPERIENCE.map((job, i) => (
            <ExperienceEntry key={`${job.company}-${job.period}`} job={job} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ExperienceEntry({ job, index }: { job: Job; index: number }) {
  return (
    <li className="grid gap-10 border-t-[1.5px] border-line pt-8 pb-[clamp(56px,7vw,96px)] lg:grid-cols-12 lg:gap-x-6 lg:pt-12">
      {/* Role */}
      <Reveal className="lg:col-span-4">
        <div className="flex items-baseline gap-4 lg:sticky lg:top-12">
          <span className="text-[15px] text-grey tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="font-display text-[clamp(26px,2.5vw,38px)] leading-[1.15] font-medium tracking-[-0.015em]">
              {job.role}
            </h3>
            <p className="mt-4 text-[16px] leading-snug">{job.company}</p>
            <p className="mt-1 text-[14px] text-grey">{job.location}</p>
            <p className="mt-5 inline-block rounded-full border border-ink/25 px-3 py-1 text-[13px] tabular-nums">
              {job.period}
            </p>
          </div>
        </div>
      </Reveal>

      {/* Details */}
      <div className="lg:col-span-8 lg:col-start-5">
        <Reveal>
          <p className="max-w-[880px] font-display text-[clamp(20px,1.8vw,26px)] leading-[1.35] font-medium tracking-[-0.01em]">
            {job.summary}
          </p>
        </Reveal>

        <Block label="Key Contributions">
          <ContributionList items={job.contributions} />
        </Block>

        <Block label="Impact">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {job.impact.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="flex flex-col-reverse">
                <dt className="mt-3 text-[14px] leading-snug text-grey">{stat.label}</dt>
                <dd className="font-display text-[clamp(48px,5.4vw,88px)] leading-none font-medium tracking-[-0.03em] text-accent">
                  {stat.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </Block>

        <Block label="Core Stack">
          <Reveal>
            <StackChips stack={job.stack} />
          </Reveal>
        </Block>
      </div>
    </li>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-[clamp(48px,6vw,80px)]">
      <h4 className="mb-6 text-[11px] tracking-[0.14em] text-grey uppercase">{label}</h4>
      {children}
    </div>
  );
}
