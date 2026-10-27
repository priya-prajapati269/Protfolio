import { motion } from 'framer-motion'
import {
  Bug,
  LayoutTemplate,
  Paintbrush,
  PenTool,
  Rows3,
  ShoppingCart,
  SlidersHorizontal,
  Zap,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data/services'

const icons = [
  LayoutTemplate,
  Rows3,
  ShoppingCart,
  PenTool,
  SlidersHorizontal,
  Paintbrush,
  Bug,
  Zap,
]

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="container-base">
        <SectionHeading
          eyebrow="Services"
          title="How I can help your store."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => {
            const Icon = icons[idx % icons.length]
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.08, ease: 'easeOut' }}
                className="card-surface rounded-2xl p-6 shadow-soft transition-transform hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-plum-500/15 text-plum-400">
                  <Icon size={20} />
                </div>
                <h3 className="section-heading mt-5 text-base font-semibold text-white">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-white/60">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
