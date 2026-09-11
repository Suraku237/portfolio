import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { profile } from '../src/data/portfolio.ts'
import { groupContributionWeeks, isContributionCalendar } from '../src/lib/githubContributions.ts'
import type { ContributionDay } from '../src/lib/githubContributions.ts'
import { parseGitHubCalendar } from './github-calendar.ts'

const collectedAt = '2026-09-11T12:00:00Z'
const days: ContributionDay[] = Array.from({ length: 370 }, (_, index) => ({
  date: new Date(Date.UTC(2025, 8, 7 + index)).toISOString().slice(0, 10),
  count: index === 0 ? 1001 : index === 365 ? 1 : 0,
  level: index === 0 ? 4 : index === 365 ? 1 : 0,
}))

function calendarHtml() {
  const cells = [...days].reverse().map((day, index) =>
    `<td data-level="${day.level}" id="day-${index}" data-date="${day.date}"></td>
     <tool-tip for="day-${index}">${day.count === 0 ? 'No' : day.count.toLocaleString('en-US')} contribution${day.count === 1 ? '' : 's'} on a date.</tool-tip>`,
  ).join('')
  return `<h2 id="js-contribution-activity-description">1,002 contributions in the last year</h2>${cells}`
}

test('parses exact counts, zero days, singular and comma-separated counts, and preserves GitHub levels', () => {
  const calendar = parseGitHubCalendar(calendarHtml(), profile.username, collectedAt)
  assert.deepEqual(calendar.days, days)
  assert.equal(calendar.total, 1002)
})

test('rejects missing tooltips instead of inventing zero activity', () => {
  const html = calendarHtml().replace(/<tool-tip\b[^>]*>[\s\S]*?<\/tool-tip>/, '')
  assert.throws(() => parseGitHubCalendar(html, profile.username, collectedAt), /missing/)
})

test('rejects totals that differ from the sum of daily contributions', () => {
  const html = calendarHtml().replace('1,002 contributions in the last year', '1,003 contributions in the last year')
  assert.throws(() => parseGitHubCalendar(html, profile.username, collectedAt), /failed validation/)
})

test('rejects unexpected GitHub markup or a selected-year calendar', () => {
  assert.throws(() => parseGitHubCalendar('<html>Rate limited</html>', profile.username, collectedAt), /total/)
  assert.throws(() => parseGitHubCalendar(calendarHtml().replace('in the last year', 'in 2026'), profile.username, collectedAt), /total/)
})

test('rejects gaps, duplicates, invalid levels, invalid dates, and wrong usernames', () => {
  const calendar = parseGitHubCalendar(calendarHtml(), profile.username, collectedAt)
  assert.equal(isContributionCalendar({ ...calendar, days: days.slice(1) }, 'another-user'), false)
  assert.equal(isContributionCalendar({ ...calendar, days: days.filter((_, index) => index !== 10) }, profile.username), false)
  assert.equal(isContributionCalendar({ ...calendar, days: [...days, days[369]] }, profile.username), false)
  assert.equal(isContributionCalendar({ ...calendar, days: days.map((day, index) => index === 0 ? { ...day, level: 5 } : day) }, profile.username), false)
  assert.equal(isContributionCalendar({ ...calendar, days: days.map((day, index) => index === 0 ? { ...day, date: '2025-02-30' } : day) }, profile.username), false)
})

test('groups by Sunday boundaries, preserves partial weeks, and sums every daily count once', () => {
  const weeks = groupContributionWeeks(days)
  assert.equal(weeks.length, 53)
  assert.equal(weeks[0].count, 1001)
  assert.equal(weeks[52].start, '2026-09-06')
  assert.equal(weeks[52].end, '2026-09-11')
  assert.equal(weeks[52].days.length, 6)
  assert.equal(weeks[52].count, 1)
  assert.equal(weeks.reduce((sum, week) => sum + week.count, 0), 1002)
  assert.deepEqual(weeks.flatMap((week) => week.days), days)
})

test('handles a partial first week and a leap day without shifting GitHub dates', () => {
  const leapDays = ['2024-02-29', '2024-03-01', '2024-03-02', '2024-03-03']
    .map((date) => ({ date, count: 2, level: 1 }))
  const weeks = groupContributionWeeks(leapDays)
  assert.deepEqual(weeks.map((week) => week.count), [6, 2])
  assert.deepEqual(weeks.flatMap((week) => week.days), leapDays)
})

test('the shipped real GitHub snapshot has consistent daily, weekly, and overall totals', async () => {
  const snapshot: unknown = JSON.parse(await readFile(new URL('../src/data/github-contributions.json', import.meta.url), 'utf8'))
  assert.ok(isContributionCalendar(snapshot, profile.username))
  assert.equal(groupContributionWeeks(snapshot.days).reduce((sum, week) => sum + week.count, 0), snapshot.total)
})
