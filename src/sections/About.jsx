import { motion } from 'framer-motion'
import { Code2, Palette, Rocket } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/profile'

const highlights = [
  {
    icon: Code2,
    title: 'Theme Development',
    text: 'Clean, scalable Liquid architecture built for the Shopify theme editor.',
  },
  {
    icon: Palette,
    title: 'Design-Accurate Builds',
    text: 'Faithful conversion of Figma designs into responsive, production-ready pages.',
  },
  {
    icon: Rocket,
    title: 'Performance Minded',
    text: 'Storefronts optimized for speed, accessibility, and search visibility.',
  },
]

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="container-base grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionHeading
          eyebrow="About Me"
          title="A developer who bridges design and e-commerce."
          description={`${profile.name} is a Shopify Developer focused on theme development, responsive design, custom sections, and polished e-commerce experiences.`}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card-surface rounded-2xl p-6 shadow-soft">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-300/10 text-accent-300">
                <Icon size={20} />
              </div>
              <h3 className="section-heading mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/60">{text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
