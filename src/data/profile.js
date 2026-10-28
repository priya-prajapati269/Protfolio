// Drop your photo into src/assets/ named avatar.jpg / .jpeg / .png / .webp and it shows in the hero.
const avatarFiles = import.meta.glob('../assets/avatar.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})
const avatar = Object.values(avatarFiles)[0] ?? null

// Edit this file to update basic profile details shown across the site.
export const profile = {
  name: 'Priya Prajapati',
  role: 'Shopify Developer',
  tagline: 'Priya Prajapati Shopify Developer.',
  intro:
    "Results-driven Shopify Web Designer and Developer with 4+ years of experience building, customising, and scaling high-converting e-commerce stores, using Liquid, HTML5, CSS3, and JavaScript.",
  location: 'Surat, Gujarat',
  email: 'prajapatipriya269@gmail.com',
  resumeUrl: '#',
  socials: {
    linkedin: 'https://www.linkedin.com/in/priyaprajapati-dev',
    github: 'https://github.com/your-profile',
  },
  avatar,
}
