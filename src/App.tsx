import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { posts } from './posts'

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

export default function App() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const [closing, setClosing] = useState(false)

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
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [post])

  return (
    <div className="site-shell">
      <header className="nav">
        <a className="brand" href="#home">NN<span>.</span></a>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#blog" onClick={() => setMenuOpen(false)}>Blog</a>
          <a href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href={EMAIL}>Contact ↗</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="eyebrow">
            <span className="status-dot" /> GARAGE OPEN · TAKING WORK ORDERS
          </div>

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
              Explore my work <ArrowUpRight size={17} />
            </a>
            <a className="button secondary" href="#blog">Read the blog</a>
          </div>

          <div className="socials">
            <a href={GITHUB} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram ↗</a>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-label">01 / ABOUT</div>
          <h2>Diagnose. Tear down. Rebuild.</h2>
          <p className="section-copy">
            Whether it's a backend that won't start or a car that throws a
            check-engine light, I like getting hands-on, working out what's
            really wrong, and fixing it for good. Currently focused on AI
            applications, backend development, full-stack projects, and
            system design.
          </p>

          <div className="section-label toolbox-label">TOOLBOX</div>
          <div className="stack">
            {Object.entries(STACK).map(([group, items]) => (
              <div key={group}>
                <span className="project-number">{group.toUpperCase()}</span>
                <div className="tags">
                  {items.map((item) => <span key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-label">02 / WORK ORDERS</div>
          <h2>Things I've been building.</h2>

          <div className="project-grid">
            {FEATURED.map((r, i) => (
              <a
                className="project-card"
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="project-number">
                  JOB / {String(i + 1).padStart(2, '0')}
                  {r.stars > 0 && <span className="stars"> · ★ {r.stars}</span>}
                </span>
                <h3>{r.name} <ArrowUpRight size={20} /></h3>
                <p>{r.desc}</p>
                <div className="tags">
                  {r.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </a>
            ))}
          </div>

          <div className="parts-bin">
            <span className="project-number">PARTS BIN</span>
            {OLDER.map((r) => (
              <a key={r.name} href={r.url} target="_blank" rel="noreferrer">{r.name} ↗</a>
            ))}
            <a href={`${GITHUB}?tab=repositories`} target="_blank" rel="noreferrer">
              All repos on GitHub ↗
            </a>
          </div>
        </section>

        <section id="blog" className="section">
          <div className="section-label">03 / SHOP NOTES</div>
          <h2>Notes from the workshop.</h2>

          <div className="post-list">
            {posts.map((item) => (
              <button
                className="post-row"
                key={item.slug}
                onClick={() => setSelectedPost(item.slug)}
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
                <button className="modal-close" onClick={closePost} aria-label="Close article">
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

        <section className="contact">
          <div className="section-label">04 / BOOK A SLOT</div>
          <h2>Have an interesting idea?</h2>
          <a className="button primary" href={EMAIL}>
            Let's talk <ArrowUpRight size={17} />
          </a>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Neeraj Narwal</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </div>
  )
}
