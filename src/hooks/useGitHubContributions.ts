import { useEffect, useState } from 'react'
import snapshot from '../data/github-contributions.json'
import { profile } from '../data/portfolio'
import { isContributionCalendar } from '../lib/githubContributions'

export function useGitHubContributions() {
  const [state, setState] = useState(() => {
    if (!isContributionCalendar(snapshot, profile.username)) {
      throw new Error('The bundled GitHub contribution calendar is invalid. Run npm run refresh:github.')
    }
    return { calendar: snapshot, refreshError: '' }
  })

  useEffect(() => {
    if (import.meta.env.DEV) return
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 10_000)
    let active = true

    async function refresh() {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/${profile.username}/portfolio/main/src/data/github-contributions.json`,
          { signal: controller.signal, cache: 'no-cache' },
        )
        if (!response.ok) throw new Error(`Published GitHub calendar returned HTTP ${response.status}.`)
        const calendar: unknown = await response.json()
        if (!isContributionCalendar(calendar, profile.username)) {
          throw new Error('Published GitHub calendar failed validation.')
        }
        if (active) setState((previous) => Date.parse(calendar.collectedAt) >= Date.parse(previous.calendar.collectedAt)
          ? { calendar, refreshError: '' }
          : previous)
      } catch (error) {
        if (active) {
          console.warn('GitHub calendar refresh failed; displaying the dated, verified bundled calendar.', error)
          setState((previous) => ({
            ...previous,
            refreshError: 'Calendar refresh unavailable. Showing the dated, verified snapshot.',
          }))
        }
      } finally {
        window.clearTimeout(timeout)
      }
    }

    void refresh()
    return () => {
      active = false
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [])

  return state
}
