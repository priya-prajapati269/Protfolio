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
    "I'm a Shopify Developer who turns Figma designs into fast, reliable, conversion-ready online stores — combining clean Liquid architecture with thoughtful, responsive front-end craft.",
  location: 'India',
  email: 'hello@priyaprajapati.dev',
  resumeUrl: '#',
  socials: {
    linkedin: 'https://www.linkedin.com/in/your-profile',
    github: 'https://github.com/your-profile',
  },
  avatar,
}
