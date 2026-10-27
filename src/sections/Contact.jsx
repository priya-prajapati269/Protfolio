import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Loader2, Mail, MapPin, Send } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/profile'

// Formspree form endpoint ID, e.g. "abcdwxyz" from https://formspree.io/forms/<id>/integration
// Set VITE_FORMSPREE_FORM_ID in a .env file (see .env.example) to enable real submissions.
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error' | 'not-configured'

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!FORMSPREE_FORM_ID) {
      setStatus('not-configured')
      return
    }

    setStatus('sending')

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(event.target),
      })

      if (response.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container-base grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something great together."
            description="Have a project in mind? Send a message and I'll get back to you."
          />

          <div className="mt-10 space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 text-sm text-white/70 hover:text-accent-300"
            >
              <Mail size={18} /> {profile.email}
            </a>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <MapPin size={18} /> {profile.location}
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 hover:border-accent-300/40 hover:text-accent-300"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub profile"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 hover:border-accent-300/40 hover:text-accent-300"
              >
                <Github size={16} />
              </a>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          onSubmit={handleSubmit}
          className="card-surface rounded-2xl p-6 shadow-soft sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-white/70">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent-300/50 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-white/70">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent-300/50 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="subject" className="text-sm font-medium text-white/70">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={form.subject}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent-300/50 focus:outline-none"
              placeholder="What's this about?"
            />
          </div>

          <div className="mt-5">
            <label htmlFor="message" className="text-sm font-medium text-white/70">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={form.message}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent-300/50 focus:outline-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-300 px-6 py-3 text-sm font-semibold text-ink-950 shadow-glow transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
          >
            {status === 'sending' ? (
              <>
                Sending <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                Send Message <Send size={16} />
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="mt-4 text-sm text-accent-300">
              Thanks! Your message has been sent — I&apos;ll get back to you soon.
            </p>
          )}

          {status === 'error' && (
            <p className="mt-4 text-sm text-plum-400">
              Something went wrong sending your message. Please try again, or email me directly
              at <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a>.
            </p>
          )}

          {status === 'not-configured' && (
            <p className="mt-4 text-sm text-plum-400">
              This form isn&apos;t connected to an email service yet, so your message wasn&apos;t
              sent. Set <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
                VITE_FORMSPREE_FORM_ID
              </code>{' '}
              in a <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">.env</code> file
              (see <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">.env.example</code>{' '}
              and the README) to enable real submissions.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
