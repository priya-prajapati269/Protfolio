import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Loader2, Mail, MapPin, Send } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import { profile } from '../data/profile'

// Web3Forms access key from https://web3forms.com — submissions are emailed to the address it was created for.
// Set VITE_WEB3FORMS_ACCESS_KEY in a .env file (see .env.example) to enable real submissions.
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

// Public hCaptcha site key Web3Forms provides for its free plan.
const HCAPTCHA_SITE_KEY = '50b2fe65-b00b-4b9e-ad62-3ba471098be2'
const HCAPTCHA_SCRIPT_URL = 'https://js.hcaptcha.com/1/api.js?recaptchacompat=off'
// Narrowest viewport where the 302px "normal" widget fits inside the form card's padding.
const HCAPTCHA_NORMAL_MIN_WIDTH = 400

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'invalid' | 'error' | 'not-configured'
  const [errorMessage, setErrorMessage] = useState('')
  const captchaRef = useRef(null)

  useEffect(() => {
    if (!WEB3FORMS_ACCESS_KEY || document.querySelector(`script[src="${HCAPTCHA_SCRIPT_URL}"]`)) {
      return
    }

    // Load the captcha only as the form nears the viewport, since it adds 300 KB+ of third-party code.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        // Set here, not in JSX, because the prerendered page has no viewport to measure.
        captchaRef.current.dataset.size =
          window.innerWidth < HCAPTCHA_NORMAL_MIN_WIDTH ? 'compact' : 'normal'

        // The script renders the widget into the .h-captcha element once it loads.
        const script = document.createElement('script')
        script.src = HCAPTCHA_SCRIPT_URL
        script.async = true
        document.body.appendChild(script)
      },
      { rootMargin: '800px' },
    )

    observer.observe(captchaRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))

    if (name === 'email') {
      event.target.setCustomValidity(
        value && !EMAIL_PATTERN.test(value) ? 'Please enter a valid email address' : '',
      )
    }
  }

  const showInvalid = (message) => {
    setErrorMessage(message)
    setStatus('invalid')
  }

  const showError = (message) => {
    setErrorMessage(message.replace(/\.?$/, '.'))
    setStatus('error')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus('not-configured')
      return
    }

    if (Object.values(form).some((value) => !value.trim())) {
      showInvalid('Kindly complete all fields.')
      return
    }

    const captcha = event.target.querySelector('textarea[name="h-captcha-response"]')

    if (!captcha) {
      showError("The captcha couldn't load, so your message wasn't sent.")
      return
    }

    if (!captcha.value) {
      showInvalid('Please fill out the captcha field.')
      return
    }

    const payload = Object.fromEntries(new FormData(event.target))

    setStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...payload, access_key: WEB3FORMS_ACCESS_KEY }),
      })
      const result = await response.json()

      if (response.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        showError(result.message || 'Something went wrong sending your message.')
      }
    } catch {
      showError('Something went wrong sending your message.')
    } finally {
      // Captcha tokens are single use, so every attempt needs a fresh one.
      window.hcaptcha?.reset()
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="container-base grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build your Shopify store together."
            description="Looking for a Shopify developer in India? Send a message about your project or role and I'll get back to you."
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

          {WEB3FORMS_ACCESS_KEY && (
            <div
              ref={captchaRef}
              className="h-captcha mt-5 min-h-[78px]"
              data-sitekey={HCAPTCHA_SITE_KEY}
              data-theme="dark"
            />
          )}

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

          {status === 'invalid' && <p className="mt-4 text-sm text-plum-400">{errorMessage}</p>}

          {status === 'error' && (
            <p className="mt-4 text-sm text-plum-400">
              {errorMessage} Please try again, or email me directly
              at <a href={`mailto:${profile.email}`} className="underline">{profile.email}</a>.
            </p>
          )}

          {status === 'not-configured' && (
            <p className="mt-4 text-sm text-plum-400">
              This form isn&apos;t connected to an email service yet, so your message wasn&apos;t
              sent. Set <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">
                VITE_WEB3FORMS_ACCESS_KEY
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
