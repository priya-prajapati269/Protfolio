import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="container-base">
        <SectionHeading
          eyebrow="Work Experience"
          title="Where I've put these skills to work."
          description="A quick look at my roles and what I focus on."
        />

        <div className="relative mt-14 border-l border-white/10 pl-8 sm:pl-10">
          {experience.map((job, idx) => (
            <motion.div
              key={`${job.company}-${idx}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              className="relative mb-12 last:mb-0"
            >
              <span className="absolute -left-[41px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-accent-300/40 bg-ink-950 text-accent-300 sm:-left-[49px]">
                <Briefcase size={14} />
              </span>

              <div className="card-surface rounded-2xl p-6 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="section-heading text-lg font-semibold text-white">
                    {job.title} &middot; {job.company}
                  </h3>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
                    {job.duration}
                  </span>
                </div>

                <ul className="mt-4 space-y-1.5 text-sm text-white/60">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
