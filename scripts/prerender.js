// Writes the rendered page into dist/index.html so crawlers get real content without running JavaScript.
import { readFile, rm, writeFile } from 'node:fs/promises'

const ROOT_PLACEHOLDER = '<div id="root"></div>'
const htmlUrl = new URL('../dist/index.html', import.meta.url)
const serverDirUrl = new URL('../dist-ssr/', import.meta.url)

const prerender = async () => {
  const { render } = await import(new URL('entry-server.js', serverDirUrl).href)
  const html = await readFile(htmlUrl, 'utf8')

  if (!html.includes(ROOT_PLACEHOLDER)) {
    throw new Error(`Prerender failed: ${ROOT_PLACEHOLDER} not found in dist/index.html`)
  }

  await writeFile(htmlUrl, html.replace(ROOT_PLACEHOLDER, () => `<div id="root">${render()}</div>`))
  await rm(serverDirUrl, { recursive: true })
}

prerender()
