import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, ShoppingBag } from 'lucide-react'
import { profile } from '../data/profile'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-grid-glow pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="container-base grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="chip text-accent-300 border-accent-300/30 bg-accent-300/5">
            Hello I'm
          </span>

          <h1 className="section-heading mt-6 text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {profile.tagline.split(' ').slice(0, -2).join(' ')}{' '}
            <span className="gradient-text">
              {profile.tagline.split(' ').slice(-2).join(' ')}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/65">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent-300 px-6 py-3 text-sm font-semibold text-ink-950 shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Explore My Work <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-accent-300/50 hover:text-accent-300"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-accent-300/40 hover:text-accent-300"
            >
              <Linkedin size={18} />
            </a>
            {/* <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-accent-300/40 hover:text-accent-300"
            >
              <Github size={18} />
            </a> */}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96"
        >
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-plum-500/20 via-ink-900/40 to-accent-300/10" />
          <div className="animate-float absolute inset-6 flex items-center justify-center rounded-[2rem] card-surface shadow-soft">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full rounded-[2rem] object-cover object-center"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 text-white/70">
                <ShoppingBag size={48} className="text-accent-300" />
                <span className="section-heading text-2xl text-white">
                  {profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
                <span className="text-xs uppercase tracking-[0.25em] text-white/40">
                  {profile.role}
                </span>
              </div>
            )}
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-accent-300/30 bg-ink-950/80 px-4 py-1.5 text-xs font-medium text-accent-200 backdrop-blur-sm">
            Shopify &middot; Liquid &middot; E-commerce
          </span>
        </motion.div>
      </div>
    </section>
  )
}
