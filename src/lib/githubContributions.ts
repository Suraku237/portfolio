export interface ContributionDay {
  date: string
  count: number
  level: number
}

export interface ContributionCalendar {
  username: string
  source: string
  collectedAt: string
  total: number
  days: ContributionDay[]
}

const dayMilliseconds = 86_400_000

function isContributionDay(value: unknown): value is ContributionDay {
  if (typeof value !== 'object' || value === null) return false
  return 'date' in value && typeof value.date === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(value.date) && Number.isFinite(Date.parse(value.date))
    && new Date(value.date).toISOString().slice(0, 10) === value.date
    && 'count' in value && typeof value.count === 'number'
    && Number.isSafeInteger(value.count) && value.count >= 0
    && 'level' in value && typeof value.level === 'number'
    && Number.isInteger(value.level) && value.level >= 0 && value.level <= 4
    && (value.count === 0 ? value.level === 0 : value.level > 0)
}

export function isContributionCalendar(value: unknown, username: string): value is ContributionCalendar {
  if (typeof value !== 'object' || value === null) return false
  if (!('username' in value) || value.username !== username
    || !('source' in value) || value.source !== `https://github.com/users/${username}/contributions`
    || !('collectedAt' in value) || typeof value.collectedAt !== 'string'
    || !Number.isFinite(Date.parse(value.collectedAt))
    || !('total' in value) || typeof value.total !== 'number'
    || !Number.isSafeInteger(value.total) || value.total < 0
    || !('days' in value) || !Array.isArray(value.days) || !value.days.every(isContributionDay)) {
    return false
  }

  const days = value.days
  return days.length >= 365 && days.length <= 371
    && days.reduce((sum, day) => sum + day.count, 0) === value.total
    && days.every((day, index) => index === 0
      || Date.parse(day.date) - Date.parse(days[index - 1].date) === dayMilliseconds)
}

export function groupContributionWeeks(days: ContributionDay[]) {
  const weeks: { start: string; end: string; count: number; days: ContributionDay[] }[] = []
  for (const day of days) {
    const previous = weeks.at(-1)
    if (!previous || new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0) {
      weeks.push({ start: day.date, end: day.date, count: day.count, days: [day] })
    } else {
      previous.end = day.date
      previous.count += day.count
      previous.days.push(day)
    }
  }
  return weeks
}
