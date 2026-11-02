# Priya Prajapati — Shopify Developer Portfolio

A modern, responsive developer portfolio built with React, Vite, and Tailwind CSS, with Framer Motion animations and Lucide icons.

## Tech Stack

- React 18
- Vite 5
- Tailwind CSS 3
- Framer Motion (animations)
- Lucide React (icons)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

### 3. Build for production

```bash
npm run build
```

Output is generated in the `dist/` folder.

### 4. Preview the production build

```bash
npm run preview
```

## Project Structure

```
priya-prajapati-portfolio/
├── public/              # Static assets (favicon, etc.)
├── src/
│   ├── assets/          # Local images/assets (add your own here)
│   ├── components/      # Reusable UI components (Navbar, Footer, SectionHeading)
│   ├── data/            # Editable content files (see below)
│   ├── sections/        # Page sections (Hero, About, Skills, Experience, Projects, Services, Process, Contact)
│   ├── App.jsx          # Main application layout
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles and Tailwind layers
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Editing Content

All editable content lives in `src/data/`:

- **`profile.js`** — name, role, tagline, intro, contact email, location, social links, resume link, avatar image.
- **`navigation.js`** — nav bar links.
- **`skills.js`** — technical skill groups and badges.
- **`experience.js`** — work experience timeline. **Placeholder entries are marked `isPlaceholder: true`** — replace with verified roles, companies, durations, and contributions, and remove that flag once real.
- **`projects.js`** — featured projects. **All current entries are demo/sample content marked `isDemo: true`** — replace titles, descriptions, tech, `image`, `viewUrl`, and `liveUrl` with real project data, and remove the flag.
- **`services.js`** — services list and the 4-step development process.

### Adding real images

Place image files in `src/assets/`, import them at the top of the relevant data file or component, and reference the imported variable instead of `null`, e.g.:

```js
import avatar from '../assets/avatar.jpg'
// ...
avatar: avatar,
```

For project screenshots, do the same in `src/data/projects.js` for each project's `image` field.

## Contact Form

The contact form in `src/sections/Contact.jsx` is wired up to [Web3Forms](https://web3forms.com/), a service that forwards form submissions to your email without needing a backend, with hCaptcha for spam protection. It is not active until you provide an access key:

1. Enter the email address that should receive messages at [web3forms.com](https://web3forms.com/) and copy the access key they email you. Messages always go to the address the key was created for.
2. Copy `.env.example` to `.env` in the project root and paste the key:
   ```
   VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
3. Restart the dev server (`npm run dev`) so Vite picks up the new environment variable.
4. When deploying, set the same variable in your hosting provider's environment settings, since `.env` is not committed.

Vite includes this value in the browser bundle. That is expected: Web3Forms access keys are public by design and can only be used to send email to the key's owner. Never put real secrets in a `VITE_` variable.

Until the key is set, submitting the form shows a clear "not connected yet" notice instead of silently failing. Once configured, the form validates the fields and captcha, shows a sending state, then a success or error message.

If you'd rather use a different provider (EmailJS, a custom serverless function, etc.), replace the `handleSubmit` function in `src/sections/Contact.jsx` with your own integration.

## SEO

- **Head tags and structured data:** the title, description, canonical URL, robots, Open Graph, Twitter Card, and JSON-LD (`WebSite`, `ProfilePage`, `Person`) are in `index.html`. Keep the JSON-LD in step with what the page shows.
- **Crawling:** `public/robots.txt` and `public/sitemap.xml`. Update `<lastmod>` in the sitemap after meaningful content changes.
- **Prerendering:** `npm run build` also renders the page into `dist/index.html` through `src/entry-server.jsx` and `scripts/prerender.js`, so crawlers get the content as HTML. Components must not read `window` or `document` during render; use `useEffect` instead.
- **Images:** the hero photo and social sharing image are in `public/images/`. The hero is referenced from `src/data/profile.js` and preloaded in `index.html`.

If the site moves to a custom domain, replace `https://priya-prajapati.vercel.app` in `index.html`, `public/robots.txt`, and `public/sitemap.xml`.

## Notes

- All work experience and project content shipped with this template is **placeholder/demo content** for layout purposes only — no real client names, results, or project URLs have been invented. Replace before publishing.
- Social links (LinkedIn, GitHub) in `src/data/profile.js` are placeholders — update with real profile URLs.
