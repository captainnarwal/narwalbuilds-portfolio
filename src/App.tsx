import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { posts } from './posts'

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d={d} /></svg>
)
const ICONS = {
  GitHub: icon('M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.200v3.300c0 .3.2.7.8.6A12 12 0 0 0 12 .3'),
  LinkedIn: icon('M20.4 20.500h-3.600v-5.600c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.900v5.700H9.400V9h3.400v1.600c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.500zM5.3 7.400a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.100m1.8 13.100H3.600V9h3.600zM22.2 0H1.800C.8 0 0 .8 0 1.700v20.600c0 .9.8 1.7 1.8 1.700h20.400c1 0 1.8-.8 1.8-1.700V1.700C24 .8 23.2 0 22.2 0'),
  Instagram: icon('M12 2.200c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.800s0 3.6-.1 4.800c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.900C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.800C2.4 3.9 4 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.200M12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.900c.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.900s0-3.7-.1-4.900c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0m0 5.800a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.400M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.4-11.800a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9'),
}

const EMAIL = 'mailto:neerajnarwal2000@gmail.com'
const GITHUB = 'https://github.com/captainnarwal'
const LINKEDIN = 'https://linkedin.com/in/captainnarwal'
const INSTAGRAM = 'https://instagram.com/narwalbuilds'

const STACK = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'C/C++'],
  Frontend: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express', 'Django', 'Flask'],
  Databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  Tools: ['Git', 'GitHub', 'Docker', 'Linux', 'VS Code', 'Postman'],
}

const FEATURED = [
  { name: 'WheelStop', url: 'https://wheelstop.in', stars: 0,
    desc: 'A searchable marketplace for alloy wheel buyers and sellers in India, with filters for fitment, size, PCD, offset, and brand.',
    tags: ['React', 'FastAPI', 'PostgreSQL'] },
  { name: 'OBD Analyzer', url: 'https://github.com/captainnarwal/OBD-Anlayzer', stars: 1,
    desc: 'Plug in, read the codes, see what the car is telling you. A simple app to analyse and visualise OBD data.',
    tags: ['OBD-II', 'Data viz', 'Diagnostics'] },
  { name: 'Kali-MCP', url: 'https://github.com/captainnarwal/Kali-MCP', stars: 2,
    desc: 'AI-driven Kali pentesting over MCP: a Streamable HTTP server plus an LLM agent client driving nmap, gobuster, nikto, sqlmap and more.',
    tags: ['Python', 'MCP', 'Pentesting'] },
  { name: 'pptx2img', url: 'https://github.com/captainnarwal/pptx2img', stars: 5,
    desc: 'Open-source Python library that converts PowerPoint slides into images.',
    tags: ['Python', 'Open source'] },
  { name: 'LAIVS', url: 'https://github.com/captainnarwal/LAIVS', stars: 1,
    desc: 'Local AI Video Studio: AI video tooling that runs on your own machine.',
    tags: ['TypeScript', 'Local AI'] },
  { name: 'narwalbuilds', url: 'https://github.com/captainnarwal/narwalbuilds', stars: 1,
    desc: 'The main workshop repo for my builds and experiments.',
    tags: ['Builds'] },
]

const OLDER = [
  { name: 'flappyfish', url: 'https://gregarious-eclair-d7ffb8.netlify.app/' },
  { name: 'royal-retro', url: 'https://github.com/captainnarwal/royal-retro' },
]

const READOUT = [
  ['Scan', 'Complete'],
  ['Status', 'Taking work orders'],
  ['Languages', 'Python, JavaScript, TypeScript'],
  ['Focus', 'AI apps, backend, full-stack'],
  ['Method', 'Find the fault, fix it, test it'],
]

export default function App() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  const post = posts.find((item) => item.slug === selectedPost)

  const closePost = () => {
    setClosing(true)
    setTimeout(() => {
      setSelectedPost(null)
      setClosing(false)
    }, 250)
  }

  useEffect(() => {
    if (!post) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closePost()
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [post])

  // Staggered entrance; content stays visible if script or IntersectionObserver is missing.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        e.target.classList.add('in')
        io.unobserve(e.target)
      })
    }, { threshold: 0.12 })
    els.forEach((el, i) => {
      el.classList.add('rv')
      el.style.setProperty('--d', `${(i % 4) * 70}ms`)
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <div className="site-shell">
      <header className="nav">
        <a className="brand" href="#home">NN<span>.</span></a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#blog" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href={EMAIL}>Contact ↗</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-text">
            <h1>
              I fix code
              <br />
              <span>and cars.</span>
            </h1>

            <p className="hero-copy">
              Software developer by day, wrench-turner by habit. I build with
              Python and JavaScript, and I diagnose bugs and vehicles the same
              way: find the fault, fix it properly, test it.
            </p>

            <div className="hero-actions">
              <a className="button primary" href="#projects">
                Explore my work <ArrowUpRight size={18} />
              </a>
              <a className="button secondary" href="#blog">Read the blog</a>
            </div>

            <div className="socials">
              <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">{ICONS.GitHub}</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">{ICONS.LinkedIn}</a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">{ICONS.Instagram}</a>
            </div>
          </div>

          <div className="readout" data-ui aria-label="Diagnostic readout summarising Neeraj">
            <div className="readout-head">
              <span>OBD-II scan</span>
              <span className="readout-ok">No faults found</span>
            </div>
            <dl>
              {READOUT.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="section about">
          <div data-reveal>
            <h2>Diagnose. Tear down. Rebuild.</h2>
            <p className="section-copy">
              Whether it's a backend that won't start or a car that throws a
              check-engine light, I like getting hands-on, working out what's
              really wrong, and fixing it for good. Currently focused on AI
              applications, backend development, full-stack projects, and
              system design.
            </p>
          </div>

          <div className="stack" data-reveal>
            <h3>Toolbox</h3>
            {Object.entries(STACK).map(([group, items]) => (
              <div key={group} className="stack-row">
                <h4>{group}</h4>
                <div className="tags">
                  {items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <h2 data-reveal>Things I've been building.</h2>

          <div className="jobs">
            {FEATURED.map((r, i) => (
              <a
                className={i === 0 ? 'job featured' : 'job'}
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                data-reveal
              >
                <h3>{r.name}</h3>
                <p>{r.desc}</p>
                <div className="job-meta">
                  <div className="tags">
                    {r.tags.map((t) => <span key={t}>{t}</span>)}
                    {r.stars > 0 && <span className="stars">{r.stars} {r.stars === 1 ? "star" : "stars"}</span>}
                  </div>
                  <span className="job-arrow">View ↗</span>
                </div>
              </a>
            ))}
          </div>

          <div className="parts-bin" data-reveal>
            <h3>Parts bin</h3>
            {OLDER.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noreferrer">{r.name} ↗</a>
            ))}
            <a href={`${GITHUB}?tab=repositories`} target="_blank" rel="noreferrer">
              All repos on GitHub ↗
            </a>
          </div>
        </section>

        <section id="blog" className="section blog">
          <h2 data-reveal>Notes from the workshop.</h2>

          <div className="post-list">
            {posts.map((item) => (
              <button
                className="post-row"
                key={item.slug}
                onClick={() => setSelectedPost(item.slug)}
                data-reveal
              >
                <span>
                  <span className="post-date">{item.date}</span>
                  <strong>{item.title}</strong>
                  <span className="post-description">{item.description}</span>
                  <span className="tags">
                    {item.tags.map((t) => <span key={t}>{t}</span>)}
                  </span>
                </span>
                <ArrowUpRight />
              </button>
            ))}
            {posts.length === 0 && <p>New articles coming soon.</p>}
          </div>

          {post && (
            <div
              className={closing ? 'modal-backdrop closing' : 'modal-backdrop'}
              onClick={closePost}
            >
              <article
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-label={post.title}
                onClick={(e) => e.stopPropagation()}
              >
                <button ref={closeRef} className="modal-close" onClick={closePost} aria-label="Close article">
                  <X />
                </button>
                <p className="post-date">{post.date}</p>
                <h2>{post.title}</h2>
                <div className="post-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {post.content}
                  </ReactMarkdown>
                </div>
              </article>
            </div>
          )}
        </section>

        <section className="contact" id="contact">
          <h2>Have an interesting idea?</h2>
          <a className="button dark" href={EMAIL}>
            Let's talk <ArrowUpRight size={18} />
          </a>
        </section>
      </main>

      <footer>
        <p className="footer-name">Neeraj Narwal</p>
        <div className="footer-row">
          <span>© {new Date().getFullYear()} Neeraj Narwal</span>
          <a href="#home">Back to top ↑</a>
        </div>
      </footer>
    </div>
  )
}
