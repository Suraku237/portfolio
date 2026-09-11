import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  Activity, ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Award, BookOpen,
  Boxes, Braces, Check, ChevronDown, Code2, Database, ExternalLink, GitBranch,
  Gamepad2, GitFork, GraduationCap, Layers3, Leaf, Mail, Menu, Monitor, Moon, Play,
  Radio, RefreshCw, Server, Sparkles, Sprout, Star, Sun, Terminal, Ticket, Users, X,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  SiCplusplus, SiCss, SiDart, SiDocker, SiExpress, SiFastapi, SiFlask, SiFlutter,
  SiGit, SiGithubactions, SiHtml5, SiJavascript, SiJenkins, SiMysql,
  SiKotlin, SiNodedotjs, SiOpenjdk, SiPython, SiRabbitmq, SiReact, SiSqlalchemy, SiVite,
} from 'react-icons/si'
import { Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { Github, Linkedin } from './components/SocialIcons'
import { categories, games, profile, projects, qualification, skillGroups } from './data/portfolio'
import type { Category, Game, Project } from './data/portfolio'
import { useGitHub } from './hooks/useGitHub'
import { useGitHubObservatory } from './hooks/useGitHubObservatory'
import { useGitHubContributions } from './hooks/useGitHubContributions'
import { useTheme } from './hooks/useTheme'
import { groupContributionWeeks } from './lib/githubContributions'
import './App.css'

function ExternalLinkButton({ href, children, className = '', label }: {
  href: string; children: ReactNode; className?: string; label?: string
}) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
    {children}
  </a>
}

const navigation = [
  { path: '/work', label: 'Work' },
  { path: '/games', label: 'Games' },
  { path: '/about', label: 'About' },
  { path: '/skills', label: 'Skills' },
  { path: '/credentials', label: 'Credentials' },
  { path: '/github', label: 'GitHub' },
]

const technologyIcons: Record<string, IconType> = {
  javascript: SiJavascript,
  python: SiPython,
  dart: SiDart,
  java: SiOpenjdk,
  cplusplus: SiCplusplus,
  html: SiHtml5,
  css: SiCss,
  react: SiReact,
  flutter: SiFlutter,
  kotlin: SiKotlin,
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
  if (icon === 'pygame') return <Gamepad2 aria-hidden="true" />
  if (icon === 'graphics') return <Code2 aria-hidden="true" />
  if (icon === 'agile') return <RefreshCw aria-hidden="true" />
  return <Users aria-hidden="true" />
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme, persistenceNotice } = useTheme()
  const toggle = useRef<HTMLButtonElement>(null)

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
      <Link className="brand" to="/" aria-label="Kwete Junior, home" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark">k<span>.</span></span>
        <span className="brand-name">kwete<span>.junior</span></span>
      </Link>
      <nav id="main-navigation" className={`navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
        {navigation.map(({ path, label }) => <NavLink key={path} to={path}
          onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
        <a href={`mailto:${profile.email}`} className="mobile-contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowUpRight size={16} /></a>
      </nav>
      <div className="header-actions">
        <button className="theme-toggle icon-button" onClick={toggleTheme} aria-label="Dark mode"
          aria-pressed={theme === 'dark'} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </button>
        <a className="header-contact" href={`mailto:${profile.email}`}>Let&apos;s talk <ArrowUpRight size={16} /></a>
        <button ref={toggle} className="menu-toggle icon-button" onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </div>
    {persistenceNotice && <p className="theme-notice" role="status">{persistenceNotice}</p>}
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
  if (!game.video && game.poster) {
    return <div className="game-video game-video-preview">
      <img className="game-poster" src={game.poster} alt={game.posterAlt ?? `${game.name} preview`} loading="lazy" />
      <p className="game-preview-note">Gameplay preview <span>Video coming soon</span></p>
    </div>
  }

  return <div className="game-video">
    {game.video ? <video controls preload="metadata" poster={game.poster} playsInline aria-label={`${game.name} gameplay video`}>
      <source src={game.video} type="video/mp4" />
      Your browser does not support embedded video.
    </video> : <>
      <GameArtwork game={game} />
      <div className="video-placeholder">
        <span className="video-play"><Play size={21} fill="currentColor" /></span>
        <span><strong>Gameplay video coming soon</strong><small>A dedicated video space is ready.</small></span>
      </div>
    </>}
  </div>
}

function PageIntro({ index, label, title, emphasis, description }: {
  index: string
  label: string
  title: string
  emphasis: string
  description: string
}) {
  return <section className="page-intro container" data-reveal="up">
    <span className="eyebrow"><span className="section-index">{index} /</span> {label}</span>
    <div className="page-intro-grid">
      <h1>{title}<br /><span className="serif-word">{emphasis}</span></h1>
      <p>{description}</p>
    </div>
  </section>
}

function ContactCta() {
  return <section className="contact-section container page-contact" data-reveal="up">
    <div className="contact-decoration" aria-hidden="true">✳</div>
    <span className="eyebrow"><span className="status-dot" /> GOOD THINGS START WITH A CONVERSATION</span>
    <h2>Have an idea?<br />Let&apos;s make it <span className="serif-word">something.</span></h2>
    <p>A project, a collaboration, or just a shared curiosity.<br />I&apos;d love to hear from you.</p>
    <div className="contact-actions"><a className="button button-primary" href={`mailto:${profile.email}`}>Say hello <Mail size={17} /></a><ExternalLinkButton href={profile.linkedin} className="button button-light"><Linkedin size={17} /> Connect on LinkedIn <ArrowUpRight size={17} /></ExternalLinkButton></div>
    <a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={14} /></a>
  </section>
}

function HomePage({ repositoryCount, github }: {
  repositoryCount: number
  github: ReturnType<typeof useGitHub>
}) {
  const pageCards = [
    { path: '/work', number: '01', label: 'Selected work', copy: 'Web, mobile, APIs, and practical experiments.', icon: Layers3 },
    { path: '/games', number: '02', label: 'Game lab', copy: 'Playable ideas, gameplay footage, and game projects.', icon: Gamepad2 },
    { path: '/about', number: '03', label: 'About me', copy: 'My mindset, interests, and way of working.', icon: Users },
    { path: '/skills', number: '04', label: 'Toolkit', copy: 'Languages, frameworks, CI/CD, and delivery tools.', icon: Code2 },
    { path: '/credentials', number: '05', label: 'Credentials', copy: 'Verified learning and project-management training.', icon: Award },
    { path: '/github', number: '06', label: 'GitHub Observatory', copy: 'Live repositories, languages, stars, and public commit activity.', icon: Activity },
  ]

  return <>
    <section id="home" className="hero container">
      <div className="hero-copy" data-reveal="left">
        <div className="eyebrow hero-eyebrow"><span className="status-dot" /> BUILDING. LEARNING. EVOLVING.</div>
        <h1>Turning ideas<br />into things<br />that <span className="hero-accent">matter<svg viewBox="0 0 295 15" fill="none" aria-hidden="true"><path d="M3 10C75 1 185 1 291 7M26 13C101 5 201 5 272 10" /></svg></span><span className="purple-period">.</span></h1>
        <p className="hero-description">Hi, I&apos;m <strong>Kwete Junior</strong> — a software developer building thoughtful web experiences, useful mobile apps, games, and the systems behind them.</p>
        <div className="hero-actions"><Link to="/work" className="button button-primary">Explore my work <ArrowDownRight size={19} /></Link><ExternalLinkButton href={profile.github} className="hero-github"><Github size={18} /> My GitHub <ArrowUpRight size={14} /></ExternalLinkButton></div>
        <div className="hero-note"><span className="tiny-avatars"><Code2 size={15} /><Gamepad2 size={15} /><Terminal size={15} /></span><span>Web, mobile, games & everything in between.</span></div>
      </div>
      <div data-reveal="right"><HeroArtwork /></div>
      <a className="scroll-note" href="#explore"><span>EXPLORE THE PORTFOLIO</span><ArrowDown size={14} /></a>
    </section>

    <section className="highlights container" aria-label="Portfolio highlights" data-reveal="up">
      <div className="highlight-intro"><span className="eyebrow">SMALL STEPS.</span><strong>Meaningful progress.</strong><span className="snapshot-label">{github.status === 'live' ? 'Repository count synced with GitHub' : 'Verified GitHub snapshot'}</span></div>
      <div className="stat"><strong>{String(repositoryCount).padStart(2, '0')}<span>↗</span></strong><span>Public repositories</span></div>
      <div className="stat"><strong>{String(projects.length).padStart(2, '0')}</strong><span>Selected projects</span></div>
      <div className="stat"><strong>{String(games.length).padStart(2, '0')}</strong><span>Game projects</span></div>
      <div className="stat"><strong>{String(qualification.courses.length).padStart(2, '0')}</strong><span>Course certificates</span></div>
    </section>

    <section id="explore" className="section container">
      <div className="section-heading" data-reveal="up"><div><span className="eyebrow">EXPLORE BY AREA</span><h2>Six spaces.<br />One growing <span className="serif-word">journey.</span></h2></div><p>Each area has its own page,<br />context, and room to grow.</p></div>
      <div className="page-directory">{pageCards.map(({ path, number, label, copy, icon: Icon }) => <Link to={path} className="page-directory-card" key={path} data-reveal="up"><span>{number}</span><Icon size={25} /><h3>{label}</h3><p>{copy}</p><ArrowUpRight size={18} /></Link>)}</div>
    </section>

    <section className="section container github-section" aria-labelledby="github-heading">
      <div className="github-intro" data-reveal="left"><span className="eyebrow"><Github size={16} /> THE JOURNEY CONTINUES</span><h2 id="github-heading">A work in <span className="serif-word">progress.</span><br />And proud of it.</h2><p>Follow my repositories, explore the code, and see what I&apos;m working on next.</p><ExternalLinkButton href={profile.github} className="button button-secondary"><Github size={17} /> Follow on GitHub <ArrowUpRight size={17} /></ExternalLinkButton></div>
      <div className="github-panel" data-reveal="right"><div className="github-panel-heading"><div><Github size={23} /><strong>{profile.username}<span>Building in public</span></strong></div><span className={`github-status ${github.status === 'live' ? 'is-live' : ''}`} role="status"><span className="status-dot" />{github.status === 'live' ? 'Live from GitHub' : github.status === 'loading' ? 'Connecting' : 'Verified snapshot'}</span></div>
        <div className="github-panel-label">{github.status === 'live' ? 'RECENTLY UPDATED REPOSITORIES' : 'EXPLORE THE SOURCE'}</div>
        {github.status === 'live' && github.recent.length > 0 ? github.recent.map((repo) => <ExternalLinkButton href={repo.html_url} className="repo-row" key={repo.name}><span className="repo-icon"><GitBranch size={18} /></span><span><strong>{repo.name}</strong><small>{repo.language ?? 'Repository'} · Updated {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</small></span><ArrowUpRight size={17} /></ExternalLinkButton>) : projects.slice(0, 3).map((project) => <ExternalLinkButton href={project.links[0].url} className="repo-row" key={project.id}><span className="repo-icon"><GitBranch size={18} /></span><span><strong>{project.name}</strong><small>{project.tags.slice(0, 2).join(' · ')} · Featured project</small></span><ArrowUpRight size={17} /></ExternalLinkButton>)}
        <div className="github-panel-footer">{github.status === 'live' ? 'Public activity. Real projects. Always evolving.' : 'Showing verified project links.'}<ExternalLink size={13} /></div>
      </div>
    </section>
    <ContactCta />
  </>
}

function WorkPage() {
  const [category, setCategory] = useState<Category>('All projects')
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const projectTrigger = useRef<HTMLButtonElement | null>(null)
  const filteredProjects = projects.filter((project) => category === 'All projects' || project.categories.includes(category))
  const visibleProjects = category === 'All projects' && !showAll ? filteredProjects.slice(0, 4) : filteredProjects

  function openProject(project: Project, trigger: HTMLButtonElement) {
    projectTrigger.current = trigger
    setSelectedProject(project)
  }

  function closeProject() {
    setSelectedProject(null)
    projectTrigger.current?.focus()
  }

  return <>
    <PageIntro index="01" label="SELECTED WORK" title="Practical ideas." emphasis="Thoughtfully built." description="A closer look at collaborative products, academic systems, prototypes, and experiments across web, mobile, APIs, and desktop tooling." />
    <section className="page-detail-strip container" data-reveal="up"><div><strong>Full-stack range</strong><span>Interfaces, mobile clients, APIs, data, and deployment.</span></div><div><strong>Honest scope</strong><span>Team work, prototypes, and in-progress features are clearly labeled.</span></div><div><strong>Source first</strong><span>Every featured project connects to its public implementation.</span></div></section>
    <section className="section container page-section">
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
    <ContactCta />
    <ProjectDialog project={selectedProject} onClose={closeProject} />
  </>
}

function GamesPage() {
  return <>
    <div className="games-page">
      <PageIntro index="02" label="GAME LAB" title="Playful ideas." emphasis="Built to be played." description="A dedicated home for game concepts, playable challenges, original artwork, and gameplay footage." />
      <section className="page-detail-strip container game-detail-strip" data-reveal="up"><div><strong>Grid Survival</strong><span>Gameplay recording available with native controls.</span></div><div><strong>Math Runner</strong><span>A look inside the game, with a gameplay recording to come.</span></div><div><strong>Game toolkit</strong><span>Pygame, C++, graphics.h, logic, and interaction design.</span></div></section>
    </div>
    <section className="games-section games-page-content"><div className="container">
      <div className="games-grid">{games.map((game, index) => <article className={`game-card game-card-${game.id}`} key={game.id} data-reveal={index % 2 === 0 ? 'left' : 'right'}><GameVideo game={game} /><div className="game-copy"><div className="game-meta"><span>0{index + 1}</span><span><Gamepad2 size={13} /> {game.genre}</span></div><h3>{game.name}</h3><p className="game-tagline">{game.tagline}</p><p>{game.description}</p><ExternalLinkButton href={game.repository ?? `${profile.github}?tab=repositories`} className="text-link">{game.repository ? 'View game source' : 'Explore my GitHub'} <ArrowUpRight size={15} /></ExternalLinkButton></div></article>)}</div>
      <p className="games-note" data-reveal="up"><Play size={14} /> Add future MP4/WebM recordings in <code>public/videos</code> and connect their paths in the portfolio data.</p>
    </div></section>
    <ContactCta />
  </>
}

function AboutPage() {
  return <>
    <PageIntro index="03" label="ABOUT ME" title="A builder’s mindset." emphasis="A learner’s curiosity." description="The person behind the projects: what motivates me, how I approach unfamiliar problems, and what I value when building with others." />
    <section className="about-section page-about"><div className="container about-grid">
      <div className="about-visual" data-reveal="left"><div className="about-topline"><span>THE PERSON BEHIND THE CODE</span><Sparkles size={18} /></div><div className="personal-photo-frame"><img src={profile.photo} alt="Kwete Junior" width="768" height="1020" loading="lazy" /><span className="photo-corner photo-corner-top" /><span className="photo-corner photo-corner-bottom" /><span className="profile-label"><span className="status-dot" /> @Suraku237</span><span className="profile-orbit-icon"><Code2 size={24} /></span></div><div className="about-visual-bottom"><strong>Curiosity-led.<br />Purpose-driven.</strong><ArrowUpRight size={37} strokeWidth={1.2} /></div></div>
      <div className="about-copy" data-reveal="right"><span className="eyebrow">HOW I THINK</span><h2>Connecting ideas,<br />people, and <span className="serif-word">systems.</span></h2><p>I&apos;m {profile.name}, a developer who likes connecting the dots — between an idea and an interface, a mobile app and its API, a problem and a practical solution.</p><p>My work spans digital queues, education, school-management systems, language tools, and games. Some projects are team efforts, others are experiments. Each one is a chance to learn something and build it a little better.</p><p>Google&apos;s Project Management specialization adds another perspective: planning deliberately, communicating clearly, managing uncertainty, and helping work move from idea to delivery.</p><div className="about-values"><span><Code2 size={17} /> Build with intention</span><span><BookOpen size={17} /> Keep learning</span><span><GitBranch size={17} /> Grow together</span></div><ExternalLinkButton href={profile.linkedin} className="text-link">More about my journey <ArrowUpRight size={16} /></ExternalLinkButton></div>
    </div></section>
    <section className="section container"><div className="about-details"><article data-reveal="up"><span><Sparkles size={21} /></span><h3>What drives me</h3><p>Turning an uncertain starting point into something tangible, testable, and useful.</p></article><article data-reveal="up"><span><Users size={21} /></span><h3>How I collaborate</h3><p>Clear responsibilities, shared context, honest progress, and respect for every contributor.</p></article><article data-reveal="up"><span><BookOpen size={21} /></span><h3>How I grow</h3><p>Learning by building, reviewing what worked, and carrying those lessons into the next project.</p></article></div></section>
    <ContactCta />
  </>
}

function SkillsPage() {
  const descriptions = [
    'Languages help me choose the right level of control—from expressive application code to typed and systems-oriented development.',
    'Frontend, mobile, and game tools turn logic into interfaces and experiences that people can see, touch, and play.',
    'Backend and data technologies connect clients to reliable APIs, persistence, authentication, and asynchronous workflows.',
    'Delivery tools support collaboration, repeatable builds, automation, containers, events, and organized execution.',
  ]
  return <>
    <PageIntro index="04" label="MY TOOLKIT" title="The right tools." emphasis="An open mind." description="A detailed view of the languages, frameworks, libraries, CI/CD systems, and delivery practices I know and continue to develop." />
    <section className="section container page-section"><div className="skills-grid skills-page-grid">{skillGroups.map((group, index) => {
      const Icon = [Code2, Monitor, Server, GitBranch][index]
      return <article className="skill-card skill-card-detailed" key={group.name} data-reveal="up"><div className="skill-card-top"><span className="skill-icon"><Icon size={23} strokeWidth={1.5} /></span><span>0{index + 1}</span></div><h3>{group.name}</h3><p>{group.description}</p><div className="skill-tags">{group.skills.map((skill) => <span className="technology-chip" key={skill.name} style={{ color: skill.color }}><TechnologyIcon icon={skill.icon} /><span>{skill.name}</span></span>)}</div><p className="skill-detail">{descriptions[index]}</p></article>
    })}</div><p className="toolkit-note"><Sparkles size={15} /> No progress bars or made-up percentages. These are technologies I know or have worked with, with room to keep improving.</p></section>
    <section className="skills-principles"><div className="container"><div className="section-heading" data-reveal="up"><div><span className="eyebrow">BEYOND THE TOOL NAME</span><h2>How I use the <span className="serif-word">toolkit.</span></h2></div></div><div className="principles-grid"><article data-reveal="up"><Check size={18} /><h3>Choose for the problem</h3><p>Start from constraints and users instead of forcing every idea into the same stack.</p></article><article data-reveal="up"><Check size={18} /><h3>Connect the layers</h3><p>Understand how interface, state, network, API, data, and delivery decisions affect each other.</p></article><article data-reveal="up"><Check size={18} /><h3>Automate repeatable work</h3><p>Use Jenkins, GitHub Actions, and containers to make delivery more consistent.</p></article></div></div></section>
    <ContactCta />
  </>
}

function CredentialsPage() {
  return <>
    <PageIntro index="05" label="VERIFIED LEARNING" title="Curiosity meets" emphasis="commitment." description="A verified record of structured learning in project planning, delivery, Agile practices, communication, and career development." />
    <section className="credentials-section credentials-page"><div className="container"><div className="credential-layout">
      <article className="credential-card" data-reveal="left"><div className="credential-top"><span className="google-wordmark" aria-label="Google"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span><span className="verified-badge"><Check size={12} /> Verified credential</span></div><div className="credential-award"><Award size={49} strokeWidth={1.2} /></div><span className="eyebrow">SPECIALIZATION CERTIFICATE</span><h3>Google Project<br />Management</h3><p>Seven courses covering project initiation, planning, execution, Agile delivery, a practical capstone, and career preparation.</p><div className="credential-recipient"><span>AWARDED TO</span><strong>{profile.fullName}</strong></div><div className="credential-details"><span><span className="status-dot" /> Completed {qualification.completedAt}</span><span>Via Coursera</span></div><ExternalLinkButton href={qualification.url} className="button button-primary">View official credential <ArrowUpRight size={17} /></ExternalLinkButton></article>
      <div className="course-list" data-reveal="right"><div className="course-list-heading"><h3>One journey. Seven milestones.</h3><span>{qualification.courses.length} / {qualification.courses.length} completed</span></div>{qualification.courses.map((course, index) => <ExternalLinkButton key={course.id} href={`https://www.coursera.org/account/accomplishments/certificate/${course.id}`} className="course-row" label={`Verify ${course.title} certificate`}><span className="course-number">{String(index + 1).padStart(2, '0')}</span><span className="course-name">{course.title}<small>Google · {course.date}</small></span><ArrowUpRight size={17} /></ExternalLinkButton>)}<p className="credential-footnote"><Check size={14} /> Every credential links to its public Coursera verification.</p></div>
    </div><div className="credential-outcomes"><article data-reveal="up"><h3>Plan deliberately</h3><p>Define scope, objectives, stakeholders, documentation, timelines, and risks before execution.</p></article><article data-reveal="up"><h3>Deliver adaptively</h3><p>Use Agile and Scrum practices to learn, adjust, communicate, and deliver value iteratively.</p></article><article data-reveal="up"><h3>Lead collaboratively</h3><p>Support teams with clear communication, accountability, problem-solving, and stakeholder awareness.</p></article></div></div></section>
    <ContactCta />
  </>
}

const languageColors = ['var(--purple)', '#a892c6', '#8e9a78', '#8496b1', '#ad967c', '#b87f89', '#c1b1d5']

function GitHubPage() {
  const github = useGitHubObservatory()
  const [viewedAt] = useState(() => Date.now())
  const { calendar, refreshError } = useGitHubContributions()
  const activity = useMemo(() => {
    const weeks = groupContributionWeeks(calendar.days)
    return {
      weeks,
      weekMaximum: Math.max(1, ...weeks.map((week) => week.count)),
      start: calendar.days[0].date,
      end: calendar.days[calendar.days.length - 1].date,
    }
  }, [calendar])

  const languages = useMemo(() => {
    const counts = new Map<string, number>()
    for (const repository of github.repositories) {
      if (repository.language) counts.set(repository.language, (counts.get(repository.language) ?? 0) + 1)
    }
    const total = Array.from(counts.values()).reduce((sum, count) => sum + count, 0)
    return Array.from(counts, ([name, count]) => ({
      name,
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
    })).sort((left, right) => right.count - left.count)
  }, [github.repositories])

  const stars = github.repositories.reduce((total, repository) => total + repository.stars, 0)
  const forks = github.repositories.reduce((total, repository) => total + repository.forks, 0)
  const loaded = github.status === 'live'
  const calendarIsStale = viewedAt - Date.parse(calendar.collectedAt) > 48 * 60 * 60 * 1000
  const statusLabel = github.status === 'loading'
    ? 'Collecting from GitHub'
    : github.status === 'live'
      ? 'Repositories live from GitHub'
      : 'Live repository data unavailable'

  return <>
    <PageIntro index="06" label="DEVELOPER OBSERVATORY" title="Behind the code." emphasis="A growing journey." description="A public view of my repository activity and the languages behind my projects. Real GitHub data, with its context intact." />
    <section className="container observatory-summary" aria-label="GitHub overview" data-reveal="up">
      <div className="observatory-source">
        <span role="status"><span className={`status-dot ${loaded ? 'is-live' : ''}`} /> {statusLabel}</span>
        <ExternalLinkButton href={profile.github} className="button button-secondary"><Github size={16} /> View my GitHub <ArrowUpRight size={16} /></ExternalLinkButton>
      </div>
      {github.error && <p className="observatory-notice" role="status">{github.error}</p>}
      <div className="observatory-metrics">
        <article className="skill-card"><Code2 className="skill-icon" size={40} /><strong>{loaded ? github.publicRepositories.toLocaleString() : '—'}</strong><span>Public repositories</span></article>
        <article className="skill-card"><Star className="skill-icon" size={40} /><strong>{loaded ? stars.toLocaleString() : '—'}</strong><span>Stars across owned repositories</span></article>
        <article className="skill-card"><Activity className="skill-icon" size={40} /><strong>{calendar.total.toLocaleString()}</strong><span>Contributions in GitHub&apos;s last-year calendar</span></article>
        <article className="skill-card"><GitFork className="skill-icon" size={40} /><strong>{loaded ? forks.toLocaleString() : '—'}</strong><span>Forks across owned repositories</span></article>
      </div>
    </section>

    <section className="section observatory-section container" data-reveal="up">
      <div className="section-heading observatory-heading"><div><span className="eyebrow">PRIMARY LANGUAGES</span><h2>Language <span className="serif-word">landscape.</span></h2></div>{loaded && <span>{github.repositories.length} included repositories</span>}</div>
      {loaded && languages.length > 0
        ? <div className="language-landscape observatory-panel">
          <div className="language-stack" aria-label="Primary language distribution">{languages.map((language, index) =>
            <span key={language.name} style={{ width: `${language.percentage}%`, backgroundColor: languageColors[index % languageColors.length] }} />)}</div>
          <div className="language-legend">{languages.map((language, index) => <div key={language.name}>
            <span className="language-swatch" style={{ backgroundColor: languageColors[index % languageColors.length] }} />
            <strong>{language.name}</strong><span>{language.count} {language.count === 1 ? 'repo' : 'repos'} · {language.percentage.toFixed(0)}%</span>
          </div>)}</div>
        </div>
        : <div className="observatory-empty">{github.status === 'loading' ? 'Reading repository languages…' : loaded ? 'No primary languages reported by GitHub.' : 'Language data is unavailable.'}</div>}
    </section>

    <section className="section observatory-section container" data-reveal="up">
      <div className="section-heading observatory-heading"><div><span className="eyebrow">THE GITHUB CONTRIBUTION CALENDAR</span><h2>Developer <span className="serif-word">activity.</span></h2></div><span>{calendar.total.toLocaleString()} contributions / {calendar.days.length} days</span></div>
      <div className="observatory-panel">
      <div className="calendar-source"><span>Verified from GitHub · Updated <time dateTime={calendar.collectedAt}>{new Date(calendar.collectedAt).toLocaleString()}</time></span><ExternalLinkButton href={calendar.source} className="text-link">Compare with GitHub <ArrowUpRight size={14} /></ExternalLinkButton></div>
      {refreshError && <p className="observatory-notice" role="status">{refreshError}</p>}
      {calendarIsStale && <p className="observatory-notice" role="status">This calendar snapshot is more than two days old. See GitHub for the latest activity.</p>}
      <div className="activity-scroll" tabIndex={0} aria-label="Horizontally scrollable GitHub contribution calendar">
        <div className="activity-calendar" role="img" style={{ gridTemplateColumns: `repeat(${activity.weeks.length}, minmax(13px, 1fr))` }} aria-label={`${calendar.total} GitHub contributions between ${activity.start} and ${activity.end}. Daily counts are available in View contribution data below.`}>
          {activity.weeks.map((week) => <div className="activity-week" key={week.start} aria-hidden="true">
            {week.days.map((day) => <span key={day.date} className={`activity-cell level-${day.level}`} data-date={day.date} data-count={day.count}
              style={{ gridRow: new Date(`${day.date}T00:00:00Z`).getUTCDay() + 1 }}
              title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`} />)}
          </div>)}
        </div>
        <div className="activity-dates"><span>{activity.start}</span><span>{activity.end}</span></div>
      </div>
      <div className="activity-legend" aria-label="Contribution intensity, from less to more"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i className={`activity-cell level-${level}`} key={level} aria-hidden="true" />)}<span>More</span></div>
      <div className="weekly-heading"><h3><Activity size={22} /> Weekly rhythm</h3><span>GITHUB CONTRIBUTIONS / SUNDAY–SATURDAY</span></div>
      <div className="weekly-scroll" tabIndex={0} aria-label="Horizontally scrollable weekly contribution chart">
        <div className="weekly-chart" role="img" aria-label={`Weekly totals of the same ${calendar.total} GitHub contributions; the final week may be incomplete.`}>
          {activity.weeks.map((week) => <span key={week.start} className="weekly-column" aria-hidden="true" data-count={week.count} data-start={week.start} title={`${week.start} to ${week.end}: ${week.count} contributions`}>
            <i style={{ height: `${(week.count / activity.weekMaximum) * 100}%` }} />
          </span>)}
        </div>
      </div>
      <details className="contribution-data"><summary>View contribution data</summary><div className="contribution-table-scroll" tabIndex={0} aria-label="Daily GitHub contributions"><table><caption>Exact daily counts and their weekly totals from GitHub</caption><thead><tr><th scope="col">Date</th><th scope="col">Contributions</th><th scope="col">Week total</th></tr></thead><tbody>{activity.weeks.flatMap((week) => week.days.map((day) => <tr key={day.date}><th scope="row">{day.date}</th><td>{day.count}</td><td>{week.count}</td></tr>))}</tbody></table></div></details>
      </div>
    </section>

    <section className="section observatory-section container" data-reveal="up">
      <div className="section-heading observatory-heading"><div><span className="eyebrow">LATEST PUSHES</span><h2>Recently active <span className="serif-word">repositories.</span></h2></div><ExternalLinkButton href={`${profile.github}?tab=repositories`} className="text-link">View all <ArrowUpRight size={14} /></ExternalLinkButton></div>
      {loaded && github.repositories.length > 0 ? <div className="observatory-repositories">{github.repositories.slice(0, 6).map((repository) =>
        <ExternalLinkButton href={repository.htmlUrl} className="skill-card observatory-repo" key={repository.name}>
          <div><GitBranch size={18} /><strong>{repository.name}</strong></div>
          <p>{repository.description ?? 'Public source repository.'}</p>
          <div><span>{repository.language ?? 'No primary language'}</span><span><Star size={13} /> {repository.stars}</span><span>Updated {new Date(repository.pushedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span><ArrowUpRight size={15} /></div>
        </ExternalLinkButton>)}</div> : <div className="observatory-empty">{github.status === 'loading' ? 'Reading recent repositories…' : loaded ? 'No public repositories to show yet.' : 'Repository data is unavailable.'}</div>}
    </section>

    <details className="observatory-method container" data-reveal="up">
      <summary>Data sources & methodology</summary>
      <div><p>Repository totals, stars, forks, primary languages, and push dates come from GitHub&apos;s public REST API at page load. Repository details use its first 100 results, excluding forks.</p>
        <p>The activity calendar preserves every date, contribution count, and intensity level shown on my public GitHub profile. These are GitHub contributions (including eligible commits, pull requests, issues, and reviews), not a sample of the latest commits. Any private activity is included only as anonymous counts if publicly shared on GitHub.</p>
        <p>Weekly rhythm sums these exact daily counts into Sunday–Saturday weeks, retaining partial weeks. The displayed dates follow GitHub&apos;s own calendar rather than recalculating dates from commit timestamps.</p>
        <p>A scheduled collection refreshes the published calendar every six hours. A dated, verified copy ships with the site and remains visible if a refresh is unavailable. No access tokens are exposed in the browser.</p>
        {github.collectedAt && <p>Repository data collected {new Date(github.collectedAt).toLocaleString()}.</p>}</div>
    </details>
    <ContactCta />
  </>
}

function App() {
  const location = useLocation()
  const scrollProgress = useRef<HTMLDivElement | null>(null)
  const github = useGitHub()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.classList.remove('reveal-enabled')
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
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' })
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Kwete Junior — Developer & Builder',
      '/work': 'Work — Kwete Junior',
      '/games': 'Games — Kwete Junior',
      '/about': 'About — Kwete Junior',
      '/skills': 'Skills — Kwete Junior',
      '/credentials': 'Credentials — Kwete Junior',
      '/github': 'GitHub Observatory — Kwete Junior',
    }
    document.title = titles[location.pathname] ?? titles['/']
  }, [location.pathname])

  useEffect(() => {
    let frame = 0
    function updateProgress() {
      const indicator = scrollProgress.current
      if (!indicator) return
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      indicator.style.transform = `scaleX(${scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0})`
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
  }, [location.pathname])

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div ref={scrollProgress} className="scroll-progress" aria-hidden="true" />
    <Header />
    <main id="main" key={location.pathname}>
      <Routes>
        <Route path="/" element={<HomePage repositoryCount={github.repositories} github={github} />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/games" element={<GamesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/credentials" element={<CredentialsPage />} />
        <Route path="/github" element={<GitHubPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <footer className="container footer"><Link className="brand footer-brand" to="/"><span className="brand-mark">k<span>.</span></span><span>Made with purpose. Built with React.</span></Link><span>© {new Date().getFullYear()} {profile.name}</span><div className="footer-links"><ExternalLinkButton href={profile.github} label="Kwete Junior on GitHub"><Github size={19} /></ExternalLinkButton><ExternalLinkButton href={profile.linkedin} label="Kwete Junior on LinkedIn"><Linkedin size={19} /></ExternalLinkButton><Link to="/" aria-label="Back home"><ArrowUpRight size={20} /></Link></div></footer>
  </>
}

export default App
