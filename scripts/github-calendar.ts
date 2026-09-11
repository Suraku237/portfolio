import { isContributionCalendar } from '../src/lib/githubContributions.ts'
import type { ContributionDay } from '../src/lib/githubContributions.ts'

function attributes(markup: string) {
  return new Map(Array.from(markup.matchAll(/([\w-]+)\s*=\s*(["'])(.*?)\2/g),
    (match) => [match[1], match[3]]))
}

function plainText(markup: string) {
  return markup.replace(/<[^>]*>/g, '').replace(/&nbsp;|&#160;/g, ' ').replace(/\s+/g, ' ').trim()
}

export function parseGitHubCalendar(html: string, username: string, collectedAt: string) {
  const heading = Array.from(html.matchAll(/<h2\b([^>]*)>([\s\S]*?)<\/h2>/g))
    .find((match) => attributes(match[1]).get('id') === 'js-contribution-activity-description')
  const totalMatch = heading && plainText(heading[2]).match(/^([\d,]+) contributions? in the last year\b/i)
  if (!totalMatch) throw new Error('GitHub did not return its trailing-year contribution total.')

  const tooltips = new Map<string, string>()
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = attributes(match[1]).get('for')
    if (id) tooltips.set(id, plainText(match[2]))
  }

  const days: ContributionDay[] = []
  for (const match of html.matchAll(/<td\b([^>]*)>/g)) {
    const cell = attributes(match[1])
    const date = cell.get('data-date')
    if (!date) continue
    const id = cell.get('id')
    const level = cell.get('data-level')
    const count = id && tooltips.get(id)?.match(/^(No|[\d,]+) contributions?\b/i)
    if (!count || level === undefined) {
      throw new Error(`GitHub contribution count or level is missing for ${date}.`)
    }
    days.push({
      date,
      count: count[1].toLowerCase() === 'no' ? 0 : Number(count[1].replaceAll(',', '')),
      level: Number(level),
    })
  }
  days.sort((left, right) => left.date.localeCompare(right.date))
  const calendar = {
    username,
    source: `https://github.com/users/${username}/contributions`,
    collectedAt,
    total: Number(totalMatch[1].replaceAll(',', '')),
    days,
  }
  if (!isContributionCalendar(calendar, username)) {
    throw new Error('GitHub calendar dates, counts, or total failed validation; keeping the previous snapshot.')
  }
  return calendar
}

export async function collectGitHubCalendar(username: string) {
  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: { Accept: 'text/html', 'Accept-Language': 'en-US', 'User-Agent': 'portfolio-contribution-collector' },
    signal: AbortSignal.timeout(30_000),
  })
  if (!response.ok) throw new Error(`GitHub calendar returned HTTP ${response.status}.`)
  return parseGitHubCalendar(await response.text(), username, new Date().toISOString())
}
