import { parse } from 'yaml'

const files = import.meta.glob('./posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export type BlogPost = {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
}

export const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const match = raw.match(
      /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/
    )

    if (!match) {
      throw new Error(`Missing frontmatter in ${path}`)
    }

    const metadata = parse(match[1]) ?? {}

    return {
      slug: path.split('/').pop()!.replace(/\.md$/, ''),
      title: metadata.title ?? 'Untitled',
      date: metadata.date ?? '',
      description: metadata.description ?? '',
      tags: metadata.tags ?? [],
      content: raw.slice(match[0].length),
    }
  })
  .sort((a, b) => b.date.localeCompare(a.date))
