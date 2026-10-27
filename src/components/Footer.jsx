import { Github, Linkedin } from 'lucide-react'
import { navLinks } from '../data/navigation'
import { profile } from '../data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-ink-950 py-10">
      <div className="container-base flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <span className="section-heading text-lg font-semibold text-white">
            {profile.name}
          </span>
          <p className="mt-1 text-sm text-white/50">
            {profile.role} — crafting fast, beautiful Shopify experiences.
          </p>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-white/60 hover:text-accent-300">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-accent-300/40 hover:text-accent-300"
          >
            <Linkedin size={15} />
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-accent-300/40 hover:text-accent-300"
          >
            <Github size={15} />
          </a>
        </div>
      </div>

      <p className="container-base mt-8 border-t border-white/5 pt-6 text-center text-xs text-white/40">
        &copy; {year} {profile.name}. All rights reserved.
      </p>
    </footer>
  )
}
