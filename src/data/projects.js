export const projects = [
  { id: 'scooter-works', title: 'Scooter Works', url: 'https://scooterworkscom.myshopify.com/' },
  { id: 'fairhavenhealth', title: 'Fairhaven Health', url: 'https://www.fairhavenhealth.com/' },
  { id: 'aerosoles', title: 'Aerosoles', url: 'https://www.aerosoles.com/' },
  { id: 'balmuda', title: 'Balmuda', url: 'https://us.balmuda.com/' },
  { id: 'singaporemath', title: 'Singapore Math', url: 'https://www.singaporemath.com/' },
  { id: 'grene', title: 'Grene', url: 'https://grene-sm8a5z8w.myshopify.com/' },
  { id: 'wilson', title: 'Wilson', url: 'https://wilson-dev.myshopify.com/' },
].map((project) => ({
  ...project,
  // Auto-generated homepage screenshot; replace with a local image path when available.
  image: `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.url)}?w=800&h=500`,
  viewUrl: project.url,
  liveUrl: project.url,
}))
