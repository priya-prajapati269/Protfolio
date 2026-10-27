import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Eye, LayoutGrid } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { projects } from '../data/projects'

export default function Projects() {
  const trackRef = useRef(null)

  const slide = (dir) => {
    const el = trackRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  return (
    <section id="projects" className="relative bg-ink-900/40 py-20 sm:py-28">
      <div className="container-base">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured Projects"
            title="A sample of Shopify work."
            description="Live Shopify stores and theme builds I've worked on — browse the projects below or open any of them to see the work in action."
          />

          <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous projects"
            onClick={() => slide(-1)}
            className="rounded-full border border-white/10 p-2 text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            onClick={() => slide(1)}
            className="rounded-full border border-white/10 p-2 text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: 'easeOut' }}
              className="card-surface group w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl shadow-soft sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-plum-500/20 via-ink-800 to-accent-300/10">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <LayoutGrid size={32} className="text-white/30" />
                )}
              </div>

              <div className="p-6">
                <h3 className="section-heading text-lg font-semibold text-white">
                  {project.title}
                </h3>

                <div className="mt-5 flex items-center gap-4">
                  <a
                    href={project.viewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-accent-300"
                  >
                    <Eye size={15} /> View Project
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-accent-300"
                  >
                    <ExternalLink size={15} /> Live Preview
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
