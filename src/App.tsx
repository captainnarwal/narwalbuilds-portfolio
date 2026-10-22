import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { posts } from './posts'

const EMAIL = 'mailto:neerajnarwal2000@gmail.com'
const GITHUB = 'https://github.com/captainnarwal'
const LINKEDIN = 'https://linkedin.com/in/captainnarwal'

const STACK = {
  Languages: ['Python', 'JavaScript', 'TypeScript', 'C/C++'],
  Frontend: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express', 'Django', 'Flask'],
  Databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis'],
  Tools: ['Git', 'GitHub', 'Docker', 'Linux', 'VS Code', 'Postman'],
}

export default function App() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const post = posts.find((item) => item.slug === selectedPost)

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
          <a href="#blog" onClick={() => {
            setSelectedPost(null)
            setMenuOpen(false)
          }}>Blog</a>
          <a href={EMAIL}>Contact ↗</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="eyebrow">
            <span className="status-dot" /> AVAILABLE FOR INTERESTING PROJECTS
          </div>

          <h1>
            Building things
            <br />
            <span>that matter.</span>
          </h1>

          <p className="hero-copy">
            Software developer building applications with Python and
            JavaScript, with a focus on AI, backend systems, and automation.
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
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-label">01 / ABOUT</div>
          <h2>Curiosity meets engineering.</h2>
          <p className="section-copy">
            I enjoy taking ideas from concept to implementation:
            designing systems, writing code, solving practical problems,
            and documenting what I learn along the way. Currently focused on
            AI applications, backend development, full-stack projects, and
            system design.
          </p>

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
          <div className="section-label">02 / SELECTED WORK</div>
          <h2>Things I've been building.</h2>

          <div className="project-grid">
            <a
              className="project-card"
              href="https://wheelstop.in"
              target="_blank"
              rel="noreferrer"
            >
              <span className="project-number">PROJECT / 01</span>
              <h3>WheelStop <ArrowUpRight size={20} /></h3>
              <p>
                A searchable marketplace for alloy wheel buyers and sellers in
                India, with filters for fitment, size, PCD, offset, and brand.
              </p>
              <div className="tags">
                <span>React</span><span>FastAPI</span><span>PostgreSQL</span>
              </div>
            </a>

            <article className="project-card">
              <span className="project-number">PROJECT / 02</span>
              <h3>Engineering Lab</h3>
              <p>Experiments in embedded systems, automotive electronics, and automation.</p>
              <div className="tags">
                <span>Python</span><span>Embedded</span><span>Electronics</span>
              </div>
            </article>
          </div>
        </section>

        <section id="blog" className="section">
          <div className="section-label">03 / WRITING</div>
          <h2>{post ? post.title : 'Notes from the workshop.'}</h2>

          {post ? (
            <article className="post-content">
              <button
                className="text-button"
                onClick={() => setSelectedPost(null)}
              >
                ← All articles
              </button>
              <p className="post-date">{post.date}</p>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>
          ) : (
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
                  </span>
                  <ArrowUpRight />
                </button>
              ))}
              {posts.length === 0 && (
                <p>New articles coming soon.</p>
              )}
            </div>
          )}
        </section>

        <section className="contact">
          <div className="section-label">04 / GET IN TOUCH</div>
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
