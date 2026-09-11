import { mkdir, rename, writeFile } from 'node:fs/promises'
import { profile } from '../src/data/portfolio.ts'
import { groupContributionWeeks } from '../src/lib/githubContributions.ts'
import { collectGitHubCalendar } from './github-calendar.ts'

const calendar = await collectGitHubCalendar(profile.username)
const directory = new URL('../src/data/', import.meta.url)
const target = new URL('github-contributions.json', directory)
const temporary = new URL('github-contributions.json.tmp', directory)
await mkdir(directory, { recursive: true })
await writeFile(temporary, `${JSON.stringify(calendar, null, 2)}\n`)
await rename(temporary, target)

const weeks = groupContributionWeeks(calendar.days)
console.log(`Verified ${calendar.total} GitHub contributions across ${calendar.days.length} days and ${weeks.length} weeks.`)
console.log(`${calendar.days[0].date} to ${calendar.days.at(-1)?.date}; collected ${calendar.collectedAt}`)
