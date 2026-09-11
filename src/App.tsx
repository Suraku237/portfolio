import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Award, BookOpen,
  Boxes, Braces, Check, ChevronDown, Code2, Database, ExternalLink, GitBranch,
  Gamepad2, GraduationCap, Layers3, Leaf, Mail, Menu, Monitor, Play,
  Radio, RefreshCw, Server, Sparkles, Sprout, Terminal, Ticket, Users, X,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  SiCss, SiDart, SiDocker, SiExpress, SiFastapi, SiFlask, SiFlutter,
  SiGit, SiGithubactions, SiHtml5, SiJavascript, SiJenkins, SiMysql,
  SiNodedotjs, SiPython, SiRabbitmq, SiReact, SiSqlalchemy, SiVite,
} from 'react-icons/si'
import { Github, Linkedin } from './components/SocialIcons'
import { categories, games, profile, projects, qualification, skillGroups } from './data/portfolio'
import type { Category, Game, Project } from './data/portfolio'
import { useGitHub } from './hooks/useGitHub'
import './App.css'

function ExternalLinkButton({ href, children, className = '', label }: {
  href: string; children: ReactNode; className?: string; label?: string
}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
    {children}
  </a>
}

const navigation = [
  { id: 'work', label: 'Work' },
  { id: 'games', label: 'Games' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
]

const technologyIcons: Record<string, IconType> = {
  javascript: SiJavascript,
  python: SiPython,
  dart: SiDart,
  html: SiHtml5,
  css: SiCss,
  react: SiReact,
  flutter: SiFlutter,
  vite: SiVite,
  node: SiNodedotjs,
  express: SiExpress,
  flask: SiFlask,
  fastapi: SiFastapi,
  mysql: SiMysql,
  sqlalchemy: SiSqlalchemy,
  git: SiGit,
  jenkins: SiJenkins,
  'github-actions': SiGithubactions,
  docker: SiDocker,
  rabbitmq: SiRabbitmq,
}

function TechnologyIcon({ icon }: { icon: string }) {
  const BrandIcon = technologyIcons[icon]
  if (BrandIcon) return <BrandIcon aria-hidden="true" />
  if (icon === 'database') return <Database aria-hidden="true" />
  if (icon === 'provider') return <Boxes aria-hidden="true" />
  if (icon === 'api') return <Braces aria-hidden="true" />
  if (icon === 'agile') return <RefreshCw aria-hidden="true" />
  return <Users aria-hidden="true" />
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      }
    }, { rootMargin: '-15% 0px -60% 0px' })
    for (const id of ['home', ...navigation.map((item) => item.id), 'contact']) {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return <header className="site-header">
    <div className="container header-inner">
      <a className="brand" href="#home" aria-label="Kwete Junior, home" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark">k<span>.</span></span>
        <span className="brand-name">kwete<span>.junior</span></span>
      </a>
      <nav id="main-navigation" className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {navigation.map(({ id, label }) => <a key={id} href={`#${id}`}
          aria-current={activeSection === id ? 'location' : undefined}
          onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a href="#contact" className="mobile-contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowUpRight size={16} /></a>
      </nav>
      <a className="header-contact" href="#contact">Let&apos;s talk <ArrowUpRight size={16} /></a>
      <button ref={toggle} className="menu-toggle icon-button" onClick={() => setMenuOpen(!menuOpen)}
        aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </div>
  </header>
}

function HeroArtwork() {
  return <div className="hero-art" aria-label="Illustration of a developer workspace">
    <div className="art-grid" />
    <span className="art-coordinate">IDEAS → CODE → IMPACT</span>
    <div className="orbit orbit-one" /><div className="orbit orbit-two" />
    <div className="floating-symbol symbol-braces"><Braces size={30} strokeWidth={1.5} /></div>
    <div className="floating-symbol symbol-spark"><Sparkles size={25} /></div>
    <div className="code-window">
      <div className="window-bar">
        <span className="traffic-lights"><i /><i /><i /></span>
        <span>developer.js</span><Code2 size={14} />
      </div>
      <div className="code-body" aria-hidden="true">
        <div><span className="line-number">01</span><span className="code-purple">const</span> developer = {'{'}</div>
        <div><span className="line-number">02</span>  name: <span className="code-green">&quot;Kwete Junior&quot;</span>,</div>
        <div><span className="line-number">03</span>  builds: [<span className="code-green">&quot;web&quot;</span>, <span className="code-green">&quot;mobile&quot;</span>],</div>
        <div><span className="line-number">04</span>  mindset: <span className="code-green">&quot;always learning&quot;</span>,</div>
        <div><span className="line-number">05</span>  ideas: <span className="code-orange">Infinity</span></div>
        <div><span className="line-number">06</span>{'}'};</div>
        <div className="code-spacer"><span className="line-number">07</span></div>
        <div><span className="line-number">08</span><span className="code-comment">// A little better, every commit.</span></div>
        <div><span className="line-number">09</span>developer.<span className="code-blue">build</span>();<span className="code-cursor" /></div>
      </div>
      <div className="editor-footer"><span><GitBranch size={11} /> main</span><span>JavaScript <Check size={11} /></span></div>
    </div>
    <div className="cert-float"><span className="cert-float-icon"><Award size={24} /></span>
      <div><strong>Google certified</strong><span>Project Management</span></div><span className="tiny-check"><Check size={10} /></span>
    </div>
    <div className="art-footer"><span className="status-dot" /> Curiosity is part of the stack.</div>
    <span className="art-asterisk" aria-hidden="true">✳</span>
  </div>
}

function ProjectPreview({ id }: { id: string }) {
  return <div className={`project-preview preview-${id}`} aria-hidden="true">
    {id === 'tickety' && <div className="mini-dashboard">
      <aside><span className="mini-logo"><Ticket size={16} /> tickety</span><span className="mini-nav selected"><Layers3 size={10} /> Overview</span><span className="mini-nav"><Ticket size={10} /> My tickets</span><span className="mini-nav"><Monitor size={10} /> Counters</span><div className="mini-user">K<span>Your workspace</span></div></aside>
      <div className="mini-content"><div className="mini-header">Let&apos;s make every minute count.<span>Overview</span></div><div className="mini-stat-row"><div>In queue<strong>12 <small>people</small></strong></div><div>Avg. wait time<strong>08 <small>min</small></strong></div></div><div className="queue-card"><span className="queue-icon"><Ticket size={23} /></span><div>Your turn is coming<strong>Ticket #A024</strong><small>General service · Counter 02</small></div><span className="queue-status">In queue</span></div><div className="mini-chart">{[30, 54, 41, 70, 52, 82, 65, 94, 75, 60, 86, 72].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div></div>
    </div>}
    {id === 'smart-tutor' && <><div className="tutor-copy"><span><Sparkles size={14} /> MADE FOR CURIOUS MINDS</span><strong>Small lessons.<br />Big possibilities.</strong><div className="tutor-books"><BookOpen size={26} /><GraduationCap size={26} /><Sparkles size={26} /></div></div><div className="mini-phone"><div className="phone-notch" /><div className="phone-header"><span className="phone-avatar">K</span><span>Let&apos;s learn something.<strong>Hello, learner!</strong></span></div><div className="lesson-banner"><Sparkles size={20} /><strong>Your next<br />lightbulb moment.</strong><span>Explore your lessons →</span></div><span className="phone-label">Your learning space</span><div className="phone-lesson"><BookOpen size={20} /><div>Lesson library<span>Make room for a new idea</span></div></div><div className="phone-lesson"><GraduationCap size={20} /><div>Practice & grow<span>One quiz at a time</span></div></div><div className="phone-bottom"><BookOpen size={15} /><Layers3 size={15} /><span className="phone-avatar">K</span></div></div></>}
    {id === 'marketflow' && <div className="architecture"><span className="architecture-caption"><Server size={13} /> SMARTSCHOOL / SYSTEM OVERVIEW</span><div className="service gateway"><Layers3 size={20} /><span>API Gateway<small>A single point of connection</small></span><span className="service-dot" /></div><div className="connector-line" /><div className="service-row"><div className="service"><GraduationCap size={19} /><span>Academic<small>Courses · Enrollment</small></span></div><div className="service"><Braces size={19} /><span>Finance<small>Invoices · Fees</small></span></div></div><div className="event-bus"><Radio size={13} /><span>RabbitMQ event bus</span><span className="bus-line" /></div><div className="db-label"><Server size={12} /> MySQL persistence</div></div>}
    {id === 'smart-garden' && <div className="garden-dashboard"><div className="garden-header"><span><Sprout size={19} /> smart garden<span className="garden-period">.</span></span><small>Your little ecosystem</small></div><div className="garden-body"><div className="garden-greeting"><span>GROW A LITTLE EVERY DAY</span><strong>A good day<br />to be green.</strong><Leaf size={69} strokeWidth={1.1} /><small>Garden overview</small></div><div className="garden-metrics"><div><span>Temperature</span><strong>24<small>°C</small></strong><i>Comfortable</i></div><div><span>Soil moisture</span><strong>68<small>%</small></strong><i>Just right</i></div><div className="garden-toggle"><span>Irrigation</span><span className="toggle-track" /></div></div></div></div>}
    {id === 'fast-travel' && <div className="api-preview"><span className="api-kicker"><Terminal size={16} /> FAST TRAVEL API</span><h3>A world of possibilities.<br />One endpoint away.</h3><div className="endpoint"><b>GET</b><code>/destinations?discover=true</code><span>200 OK</span></div><div className="api-response"><code>{'{'}<br />  &quot;next_stop&quot;: &quot;somewhere new&quot;,<br />  &quot;ready_to_explore&quot;: true<br />{'}'}</code></div></div>}
    {id === 'camfranglais' && <div className="language-preview"><span className="language-kicker"><Braces size={15} /> WORDS THAT CONNECT US</span><div className="word-bubble word-one">Camfranglais<span>Everyday language. Worth collecting.</span></div><div className="word-bubble word-two">French <ArrowRight size={16} /> English</div><div className="audio-wave">{[12, 23, 38, 22, 48, 60, 36, 20, 42, 56, 30, 17, 35, 24, 12].map((height, i) => <i key={i} style={{ height }} />)}<span>Words. Meanings. Voices.</span></div></div>}
    <span className="preview-note">Interface concept</span>
  </div>
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!project) return
    const element = dialog.current
    element?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      element?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [project])

  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title"
    onKeyDown={(event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dialog.current?.close()
      }
    }}
    onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
    {project && <div className="dialog-content">
      <button className="icon-button dialog-close" aria-label="Close project details" onClick={() => dialog.current?.close()}><X size={20} /></button>
      <span className="eyebrow">{project.status}</span>
      <h2 id="project-dialog-title">{project.name}</h2>
      <p className="dialog-subtitle">{project.subtitle}</p>
      <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <h3>My contribution & scope</h3><p>{project.role}</p>
      <h3>Inside the project</h3>
      <ul className="project-highlights">{project.highlights.map((item) => <li key={item}><Check size={17} /><span>{item}</span></li>)}</ul>
      <div className="dialog-links">{project.links.map((link) => <ExternalLinkButton key={link.url} href={link.url} className="button button-secondary">{link.label}<ArrowUpRight size={16} /></ExternalLinkButton>)}</div>
      <p className="preview-disclaimer">Portfolio previews are original interface illustrations, not application screenshots. Source links show the actual implementation.</p>
    </div>}
  </dialog>
}

function GameArtwork({ game }: { game: Game }) {
  if (game.id === 'grid-survival') {
    return <div className="game-art grid-survival-art" aria-hidden="true">
      <span className="game-hud">WAVE 07 <i /> SCORE 02480</span>
      <div className="survival-grid">{Array.from({ length: 30 }, (_, index) => <i key={index} className={index === 14 ? 'player-cell' : index % 7 === 0 ? 'danger-cell' : ''} />)}</div>
      <span className="survival-player"><Gamepad2 size={22} /></span>
      <span className="game-art-label">STAY INSIDE THE GRID</span>
    </div>
  }

  return <div className="game-art math-runner-art" aria-hidden="true">
    <span className="game-hud">DISTANCE 1,240M <i /> STREAK ×8</span>
    <div className="runner-equation"><span>12</span><b>+</b><span>7</span><b>=</b><strong>?</strong></div>
    <div className="runner-track"><span className="runner-character">K</span>{[19, 21, 17].map((answer) => <i key={answer}>{answer}</i>)}</div>
    <span className="game-art-label">CHOOSE. RUN. LEVEL UP.</span>
  </div>
}

function GameVideo({ game }: { game: Game }) {
  return <div className="game-video">
    {game.video ? <video controls preload="metadata" poster={game.poster} playsInline aria-label={`${game.name} gameplay video`}>
      <source src={game.video} type="video/mp4" />
      Your browser does not support embedded video.
    </video> : <>
      {game.poster
        ? <img className="game-poster" src={game.poster} alt={`${game.name} game poster`} loading="lazy" />
        : <GameArtwork game={game} />}
      <div className="video-placeholder">
        <span className="video-play"><Play size={21} fill="currentColor" /></span>
        <span><strong>Gameplay video coming soon</strong><small>A dedicated video space is ready.</small></span>
      </div>
    </>}
  </div>
}

function App() {
  const [category, setCategory] = useState<Category>('All projects')
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const projectTrigger = useRef<HTMLButtonElement | null>(null)
  const scrollProgress = useRef<HTMLDivElement | null>(null)
  const github = useGitHub()
  const filteredProjects = projects.filter((project) => category === 'All projects' || project.categories.includes(category))
  const visibleProjects = category === 'All projects' && !showAll ? filteredProjects.slice(0, 4) : filteredProjects

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    document.documentElement.classList.add('reveal-enabled')
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })

    const elements = document.querySelectorAll('[data-reveal]:not(.is-visible)')
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [category, showAll])

  useEffect(() => {
    if (!scrollProgress.current) return
    let frame = 0

    function updateProgress() {
      const indicator = scrollProgress.current
      if (!indicator) return
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
      indicator.style.transform = `scaleX(${progress})`
      frame = 0
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateProgress)
    }

    updateProgress()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  function openProject(project: Project, trigger: HTMLButtonElement) {
    projectTrigger.current = trigger
    setSelectedProject(project)
  }

  function closeProject() {
    setSelectedProject(null)
    projectTrigger.current?.focus()
  }

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div ref={scrollProgress} className="scroll-progress" aria-hidden="true" />
    <Header />
    <main id="main">
      <section id="home" className="hero container">
        <div className="hero-copy" data-reveal="left">
          <div className="eyebrow hero-eyebrow"><span className="status-dot" /> BUILDING. LEARNING. EVOLVING.</div>
          <h1>Turning ideas<br />into things<br />that <span className="hero-accent">matter<svg viewBox="0 0 295 15" fill="none" aria-hidden="true"><path d="M3 10C75 1 185 1 291 7M26 13C101 5 201 5 272 10" /></svg></span><span className="purple-period">.</span></h1>
          <p className="hero-description">Hi, I&apos;m <strong>Kwete Junior</strong> — a software developer building thoughtful web experiences, useful mobile apps, and the systems behind them.</p>
          <div className="hero-actions"><a href="#work" className="button button-primary">Explore my work <ArrowDownRight size={19} /></a><ExternalLinkButton href={profile.github} className="hero-github"><Github size={18} /> My GitHub <ArrowUpRight size={14} /></ExternalLinkButton></div>
          <div className="hero-note"><span className="tiny-avatars"><Code2 size={15} /><Layers3 size={15} /><Terminal size={15} /></span><span>Web, mobile & everything in between.</span></div>
        </div>
        <div data-reveal="right"><HeroArtwork /></div>
        <a className="scroll-note" href="#highlights"><span>THERE&apos;S MORE BELOW</span><ArrowDown size={14} /></a>
      </section>

      <section id="highlights" className="highlights container" aria-label="Portfolio highlights" data-reveal="up">
        <div className="highlight-intro"><span className="eyebrow">SMALL STEPS.</span><strong>Meaningful progress.</strong><span className="snapshot-label">{github.status === 'live' ? 'Repository count synced with GitHub' : `GitHub snapshot · Sep 11, 2026${github.status === 'loading' ? ' · Updating' : ''}`}</span></div>
        <div className="stat"><strong>{String(github.repositories).padStart(2, '0')}<span>↗</span></strong><span>Public repositories</span></div>
        <div className="stat"><strong>{String(projects.length).padStart(2, '0')}</strong><span>Selected projects</span></div>
        <div className="stat"><strong>{String(qualification.courses.length).padStart(2, '0')}</strong><span>Course certificates</span></div>
        <div className="stat"><strong>01<span className="stat-award"><Award size={23} /></span></strong><span>Google specialization</span></div>
      </section>

      <section id="work" className="section container">
        <div className="section-heading" data-reveal="up"><div><span className="eyebrow"><span className="section-index">01 /</span> SELECTED WORK</span><h2>A few things I&apos;ve <span className="serif-word">built.</span></h2></div><p>Real problems. Thoughtful solutions.<br />A little bit of me in every project.</p></div>
        <div className="work-toolbar"><div className="project-filters" role="group" aria-label="Filter projects">{categories.map((item) => <button key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setShowAll(false) }}>{item}{item === 'All projects' && <span>{projects.length}</span>}</button>)}</div><span className="work-caption">A mix of teamwork & exploration <ArrowDownRight size={15} /></span></div>
        <p className="sr-only" role="status">Showing {visibleProjects.length} of {filteredProjects.length} {category.toLowerCase()}.</p>
        <div className="projects-grid">{visibleProjects.map((project) => <article className="project-card" key={project.id} data-reveal="up">
          <button className="project-preview-button" onClick={(event) => openProject(project, event.currentTarget)} aria-label={`Explore ${project.name}`}>
            <ProjectPreview id={project.id} /><span className="preview-open"><ArrowUpRight size={23} /></span>
          </button>
          <div className="project-meta"><span>{project.number} / {project.status}</span><span>{project.categories.join(' + ')}</span></div>
          <div className="project-title-row"><h3><button onClick={(event) => openProject(project, event.currentTarget)}>{project.name}</button></h3><ExternalLinkButton href={project.links[0].url} className="project-source icon-button" label={`${project.name} source on GitHub`}><ArrowUpRight size={22} /></ExternalLinkButton></div>
          <p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </article>)}</div>
        {category === 'All projects' && <div className="more-projects"><button className="button button-secondary" onClick={() => setShowAll(!showAll)} aria-expanded={showAll}>{showAll ? 'Show selected projects' : 'Two more from the workshop'}<ChevronDown size={17} className={showAll ? 'rotate-icon' : ''} /></button><ExternalLinkButton href={`${profile.github}?tab=repositories`} className="text-link">All repositories on GitHub <ArrowUpRight size={15} /></ExternalLinkButton></div>}
      </section>

      <section id="games" className="games-section">
        <div className="container">
          <div className="section-heading games-heading" data-reveal="up"><div><span className="eyebrow"><span className="section-index">02 /</span> GAME LAB</span><h2>Playful ideas.<br />Built to be <span className="serif-word">played.</span></h2></div><p>A dedicated home for my game projects,<br />their stories, and gameplay footage.</p></div>
          <div className="games-grid">{games.map((game, index) => <article className={`game-card game-card-${game.id}`} key={game.id} data-reveal={index % 2 === 0 ? 'left' : 'right'}>
            <GameVideo game={game} />
            <div className="game-copy">
              <div className="game-meta"><span>0{index + 1}</span><span><Gamepad2 size={13} /> {game.genre}</span></div>
              <h3>{game.name}</h3>
              <p className="game-tagline">{game.tagline}</p>
              <p>{game.description}</p>
              <ExternalLinkButton href={game.repository ?? `${profile.github}?tab=repositories`} className="text-link">
                {game.repository ? 'View game source' : 'Explore my GitHub'} <ArrowUpRight size={15} />
              </ExternalLinkButton>
            </div>
          </article>)}</div>
          <p className="games-note" data-reveal="up"><Play size={14} /> To publish gameplay, add MP4/WebM files in <code>public/videos</code> and set each game&apos;s video path in the portfolio data.</p>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container about-grid">
          <div className="about-visual" data-reveal="left"><div className="about-topline"><span>THE PERSON BEHIND THE CODE</span><Sparkles size={18} /></div><div className="personal-photo-frame"><img src={profile.photo} alt="Kwete Junior" width="768" height="1020" loading="lazy" /><span className="photo-corner photo-corner-top" /><span className="photo-corner photo-corner-bottom" /><span className="profile-label"><span className="status-dot" /> @Suraku237</span><span className="profile-orbit-icon"><Code2 size={24} /></span></div><div className="about-visual-bottom"><strong>Curiosity-led.<br />Purpose-driven.</strong><ArrowUpRight size={37} strokeWidth={1.2} /></div></div>
          <div className="about-copy" data-reveal="right"><span className="eyebrow"><span className="section-index">03 /</span> A LITTLE ABOUT ME</span><h2>A builder&apos;s mindset.<br />A learner&apos;s <span className="serif-word">curiosity.</span></h2><p>I&apos;m {profile.name}, a developer who likes connecting the dots — between an idea and an interface, a mobile app and its API, a problem and a practical solution.</p><p>My projects span digital queues, education, school-management systems, and language tools. Some are team efforts, others are experiments. Each one is a chance to learn something and build it a little better.</p><p>Alongside code, I&apos;ve completed Google&apos;s Project Management specialization. It brings a useful second perspective: not just how to build, but how to plan, collaborate, and move work forward.</p><div className="about-values"><span><Code2 size={17} /> Build with intention</span><span><BookOpen size={17} /> Keep learning</span><span><GitBranch size={17} /> Grow together</span></div><ExternalLinkButton href={profile.linkedin} className="text-link">More about my journey <ArrowUpRight size={16} /></ExternalLinkButton></div>
        </div>
      </section>

      <section id="skills" className="section container">
        <div className="section-heading" data-reveal="up"><div><span className="eyebrow"><span className="section-index">04 /</span> MY TOOLKIT</span><h2>The right tools.<br className="mobile-break" /> An open <span className="serif-word">mind.</span></h2></div><p>Technologies I&apos;ve used in public projects.<br />Always room for something new.</p></div>
        <div className="skills-grid">{skillGroups.map((group, index) => {
          const Icon = [Code2, Monitor, Server, GitBranch][index]
          return <article className="skill-card" key={group.name} data-reveal="up"><div className="skill-card-top"><span className="skill-icon"><Icon size={23} strokeWidth={1.5} /></span><span>0{index + 1}</span></div><h3>{group.name}</h3><p>{group.description}</p><div className="skill-tags">{group.skills.map((skill) => <span className="technology-chip" key={skill.name} style={{ color: skill.color }}><TechnologyIcon icon={skill.icon} /><span>{skill.name}</span></span>)}</div></article>
        })}</div>
        <p className="toolkit-note"><Sparkles size={15} /> No progress bars or made-up percentages. Just tools I&apos;ve worked with, and a willingness to keep improving.</p>
      </section>

      <section id="credentials" className="credentials-section">
        <div className="container">
          <div className="section-heading" data-reveal="up"><div><span className="eyebrow"><span className="section-index">05 /</span> LEARNING, WITH RECEIPTS</span><h2>Curiosity meets <span className="serif-word">commitment.</span></h2></div><p>Not just collecting skills.<br />Putting in the work to earn them.</p></div>
          <div className="credential-layout">
            <article className="credential-card" data-reveal="left"><div className="credential-top"><span className="google-wordmark" aria-label="Google"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span><span className="verified-badge"><Check size={12} /> Verified credential</span></div><div className="credential-award"><Award size={49} strokeWidth={1.2} /></div><span className="eyebrow">SPECIALIZATION CERTIFICATE</span><h3>Google Project<br />Management</h3><p>From the first project plan to the final retrospective. Seven courses in planning, delivery, Agile, and collaboration.</p><div className="credential-recipient"><span>AWARDED TO</span><strong>{profile.fullName}</strong></div><div className="credential-details"><span><span className="status-dot" /> Completed {qualification.completedAt}</span><span>Via Coursera</span></div><ExternalLinkButton href={qualification.url} className="button button-primary">View official credential <ArrowUpRight size={17} /></ExternalLinkButton></article>
            <div className="course-list" data-reveal="right"><div className="course-list-heading"><h3>One journey. Seven milestones.</h3><span>{qualification.courses.length} / {qualification.courses.length} completed</span></div>{qualification.courses.map((course, index) => <ExternalLinkButton key={course.id} href={`https://www.coursera.org/account/accomplishments/certificate/${course.id}`} className="course-row" label={`Verify ${course.title} certificate`}><span className="course-number">{String(index + 1).padStart(2, '0')}</span><span className="course-name">{course.title}<small>Google · {course.date}</small></span><ArrowUpRight size={17} /></ExternalLinkButton>)}<p className="credential-footnote"><Check size={14} /> Every credential links to its public Coursera verification.</p></div>
          </div>
        </div>
      </section>

      <section className="section container github-section" aria-labelledby="github-heading">
        <div className="github-intro" data-reveal="left"><span className="eyebrow"><Github size={16} /> THE JOURNEY CONTINUES</span><h2 id="github-heading">A work in <span className="serif-word">progress.</span><br />And proud of it.</h2><p>The projects here are just part of the story. Follow my repositories, explore the code, and see what I&apos;m working on next.</p><ExternalLinkButton href={profile.github} className="button button-secondary"><Github size={17} /> Follow on GitHub <ArrowUpRight size={17} /></ExternalLinkButton></div>
        <div className="github-panel" data-reveal="right"><div className="github-panel-heading"><div><Github size={23} /><strong>{profile.username}<span>Building in public</span></strong></div><span className={`github-status ${github.status === 'live' ? 'is-live' : ''}`} role="status"><span className="status-dot" />{github.status === 'live' ? 'Live from GitHub' : github.status === 'loading' ? 'Connecting' : 'Verified snapshot'}</span></div>
          <div className="github-panel-label">{github.status === 'live' ? 'RECENTLY UPDATED REPOSITORIES' : 'EXPLORE THE SOURCE'}</div>
          {github.status === 'live' && github.recent.length > 0 ? github.recent.map((repo) => <ExternalLinkButton href={repo.html_url} className="repo-row" key={repo.name}><span className="repo-icon"><GitBranch size={18} /></span><span><strong>{repo.name}</strong><small>{repo.language ?? 'Repository'} · Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</small></span><ArrowUpRight size={17} /></ExternalLinkButton>) : projects.slice(0, 3).map((project) => <ExternalLinkButton href={project.links[0].url} className="repo-row" key={project.id}><span className="repo-icon"><GitBranch size={18} /></span><span><strong>{project.name}</strong><small>{project.tags.slice(0, 2).join(' · ')} · Featured project</small></span><ArrowUpRight size={17} /></ExternalLinkButton>)}
          <div className="github-panel-footer">{github.status === 'live' ? 'Public activity. Real projects. Always evolving.' : github.status === 'loading' ? 'Fetching public updates from GitHub…' : 'Live updates unavailable. Showing verified projects from Sep 11, 2026.'}<ExternalLink size={13} /></div>
        </div>
      </section>

      <section id="contact" className="contact-section container" data-reveal="up"><div className="contact-decoration" aria-hidden="true">✳</div><span className="eyebrow"><span className="status-dot" /> GOOD THINGS START WITH A CONVERSATION</span><h2>Have an idea?<br />Let&apos;s make it <span className="serif-word">something.</span></h2><p>A project, a collaboration, or just a shared curiosity.<br />I&apos;d love to hear from you.</p><div className="contact-actions"><a className="button button-primary" href={`mailto:${profile.email}`}>Say hello <Mail size={17} /></a><ExternalLinkButton href={profile.linkedin} className="button button-light"><Linkedin size={17} /> Connect on LinkedIn <ArrowUpRight size={17} /></ExternalLinkButton></div><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={14} /></a></section>
    </main>
    <footer className="container footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">k<span>.</span></span><span>Made with purpose. Built with React.</span></a><span>© {new Date().getFullYear()} {profile.name}</span><div className="footer-links"><ExternalLinkButton href={profile.github} label="Kwete Junior on GitHub"><Github size={19} /></ExternalLinkButton><ExternalLinkButton href={profile.linkedin} label="Kwete Junior on LinkedIn"><Linkedin size={19} /></ExternalLinkButton><a href="#home" aria-label="Back to top"><ArrowUpRight size={20} /></a></div></footer>
    <ProjectDialog project={selectedProject} onClose={closeProject} />
  </>
}

export default App
