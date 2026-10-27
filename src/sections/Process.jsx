import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import { process } from '../data/services'

export default function Process() {
  return (
    <section className="relative bg-ink-900/40 py-20 sm:py-28">
      <div className="container-base">
        <SectionHeading
          eyebrow="My Development Process"
          title="A clear path from idea to launch."
          align="center"
        />

        <div className="relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              className="card-surface relative rounded-2xl p-6 shadow-soft"
            >
              <span className="section-heading text-4xl font-semibold text-accent-300/30">
                {item.step}
              </span>
              <h3 className="section-heading mt-3 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/60">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
