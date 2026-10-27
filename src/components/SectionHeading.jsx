import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`max-w-2xl ${alignment}`}
    >
      {eyebrow && (
        <span className="chip text-accent-300 border-accent-300/30 bg-accent-300/5">
          {eyebrow}
        </span>
      )}
      <h2 className="section-heading mt-4 text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base text-white/60 sm:text-lg">{description}</p>}
    </motion.div>
  )
}
