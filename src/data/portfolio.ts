export const profile = {
  name: 'Kwete Junior',
  fullName: 'Kwete Ngnouba Rayan Junior',
  username: 'Suraku237',
  github: 'https://github.com/Suraku237',
  linkedin: 'https://www.linkedin.com/in/kwete-ngnouba-junior-rayan-643b97402/',
  email: 'kwetejunior9@gmail.com',
  avatar: 'https://avatars.githubusercontent.com/u/224432643?v=4',
  verifiedAt: '2026-09-11',
  repositorySnapshot: 29,
}

export const categories = ['All projects', 'Web', 'Mobile', 'Backend', 'Tools'] as const
export type Category = (typeof categories)[number]

export interface Project {
  id: string
  number: string
  name: string
  subtitle: string
  description: string
  categories: Category[]
  tags: string[]
  status: string
  role: string
  highlights: string[]
  links: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    id: 'tickety',
    number: '01',
    name: 'Tickety',
    subtitle: 'Less waiting. Better experiences.',
    description: 'A collaborative digital queue system that connects customers, service counters, and staff.',
    categories: ['Web', 'Mobile', 'Backend'],
    tags: ['Flutter', 'React', 'Flask', 'MySQL'],
    status: 'Team project',
    role: 'Contributor across the mobile app, staff dashboard, and backend, with a primary contribution to the Flutter app.',
    highlights: [
      'Mobile ticket queues, priority handling, and service-counter workflows.',
      'A React staff dashboard connected to a Flask API.',
      'Scheduling and estimated wait times to make queues easier to navigate.',
    ],
    links: [
      { label: 'Mobile source', url: 'https://github.com/Suraku237/tickety' },
      { label: 'Dashboard source', url: 'https://github.com/Suraku237/tickety_website' },
      { label: 'Backend source', url: 'https://github.com/Suraku237/tickety_backend' },
      { label: 'Visit website', url: 'https://tickety.duckdns.org' },
    ],
  },
  {
    id: 'smart-tutor',
    number: '02',
    name: 'SmartTutor',
    subtitle: 'A little more possibility in every lesson.',
    description: 'A collaborative learning app bringing lesson PDFs, quizzes, and AI-assisted content together.',
    categories: ['Mobile'],
    tags: ['Flutter', 'Dart', 'Generative AI'],
    status: 'Team project',
    role: 'Credited in the project as Full-Stack & DevOps Engineer, working on backend, VPS, MySQL, and AI integration alongside the mobile UI team.',
    highlights: [
      'Flutter application with lesson and quiz PDF access.',
      'AI-assisted lesson-content generation and client-side API integration.',
      'Collaborative delivery with distinct backend, infrastructure, and UI responsibilities.',
    ],
    links: [
      { label: 'Application source', url: 'https://github.com/Suraku237/smart-tutor' },
      { label: 'Project presentation', url: 'https://github.com/Suraku237/smart-tutor-website' },
    ],
  },
  {
    id: 'marketflow',
    number: '03',
    name: 'MarketFlow / SmartSchool',
    subtitle: 'Connecting the moving parts of a school.',
    description: 'School-management microservices for courses, enrollment, grades, and fee invoicing.',
    categories: ['Backend'],
    tags: ['Node.js', 'Express', 'RabbitMQ', 'Docker'],
    status: 'Academic team project',
    role: 'Collaborator on a school-management backend developed for the SEN4121 practical exam.',
    highlights: [
      'Separate academic and finance services behind an API gateway.',
      'RabbitMQ events connect student enrollments to invoice creation.',
      'MySQL persistence, JWT authentication, and Docker Compose configuration.',
    ],
    links: [{ label: 'View source', url: 'https://github.com/Suraku237/MarketFlow' }],
  },
  {
    id: 'smart-garden',
    number: '04',
    name: 'Smart Garden',
    subtitle: 'A fresh perspective on growing.',
    description: 'A Flutter dashboard concept for garden conditions, irrigation, lighting, and reporting.',
    categories: ['Mobile'],
    tags: ['Flutter', 'Dart', 'fl_chart'],
    status: 'UI prototype',
    role: 'Developer of a garden dashboard prototype. Sensor values are sample data and controls update local UI state; hardware integration is not claimed.',
    highlights: [
      'An at-a-glance interface for temperature, humidity, and garden conditions.',
      'Exploration of irrigation, ventilation, and lighting controls.',
      'Reporting screens and theme switching built with Flutter.',
    ],
    links: [{ label: 'View source', url: 'https://github.com/Suraku237/agri_app' }],
  },
  {
    id: 'fast-travel',
    number: '05',
    name: 'Fast Travel',
    subtitle: 'The beginnings of a smarter itinerary.',
    description: 'A travel API prototype with destination search, preferences, and personal itineraries.',
    categories: ['Backend'],
    tags: ['Python', 'FastAPI', 'Pydantic', 'JWT'],
    status: 'API prototype',
    role: 'Developer of the initial travel-assistant monolith, using JSON-file persistence. This is an early prototype, not a production distributed system.',
    highlights: [
      'JWT-authenticated endpoints and user-specific itineraries.',
      'Destination search and simple preference-based recommendations.',
      'Typed request validation with FastAPI and Pydantic.',
    ],
    links: [{ label: 'View source', url: 'https://github.com/Suraku237/fast_travel' }],
  },
  {
    id: 'camfranglais',
    number: '06',
    name: 'Camfranglais Collector',
    subtitle: 'Making room for the way we speak.',
    description: 'A desktop tool for collecting Camfranglais words, translations, and optional audio.',
    categories: ['Tools'],
    tags: ['Python', 'CustomTkinter', 'NumPy'],
    status: 'In progress',
    role: 'Developer of a language-data collection tool. The classifier and predictor described in the repository are planned, not completed.',
    highlights: [
      'Collect phrases with French and English meanings and categories.',
      'CSV-based storage, editing, and duplicate detection.',
      'Optional audio recording to enrich the dataset.',
    ],
    links: [{ label: 'View source', url: 'https://github.com/Suraku237/francanglaiscompiler' }],
  },
]

export const skillGroups = [
  { name: 'Languages', description: 'The building blocks.', skills: ['JavaScript', 'Python', 'Dart', 'SQL', 'HTML', 'CSS'] },
  { name: 'Frontend & mobile', description: 'Interfaces people interact with.', skills: ['React', 'Flutter', 'Vite', 'Provider'] },
  { name: 'Backend & data', description: 'What makes it all work.', skills: ['Node.js', 'Express', 'Flask', 'FastAPI', 'MySQL', 'SQLAlchemy'] },
  { name: 'Tools & delivery', description: 'From an idea to a shared project.', skills: ['Git & GitHub', 'Docker Compose', 'RabbitMQ', 'REST APIs', 'Agile', 'Scrum'] },
]

export const qualification = {
  title: 'Google Project Management',
  issuer: 'Google',
  platform: 'Coursera',
  completedAt: 'August 22, 2026',
  url: 'https://www.coursera.org/account/accomplishments/specialization/HDRAWMICVJ79',
  id: 'HDRAWMICVJ79',
  courses: [
    { title: 'Foundations of Project Management', id: 'CH8LFSBD0E3H', date: 'August 21, 2026' },
    { title: 'Project Initiation: Starting a Successful Project', id: '81QPW78F9O2W', date: 'August 21, 2026' },
    { title: 'Project Planning: Putting It All Together', id: 'I38VYAKO5KQK', date: 'August 21, 2026' },
    { title: 'Project Execution: Running the Project', id: 'UJRJOM55NOFT', date: 'August 21, 2026' },
    { title: 'Agile Project Management', id: 'I5M3URIKII5X', date: 'August 21, 2026' },
    { title: 'Capstone: Applying Project Management in the Real World', id: '5Z1I9744JYG8', date: 'August 22, 2026' },
    { title: 'Accelerate Your Job Search with AI', id: 'EZK22RWJ864N', date: 'August 22, 2026' },
  ],
}
