import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

interface Repository {
  name: string
  html_url: string
  updated_at: string
  language: string | null
  fork: boolean
}

interface GitHubState {
  status: 'loading' | 'live' | 'unavailable'
  repositories: number
  recent: Repository[]
}

function isRepository(value: unknown): value is Repository {
  if (typeof value !== 'object' || value === null) return false
  return 'name' in value && typeof value.name === 'string'
    && 'html_url' in value && typeof value.html_url === 'string'
    && value.html_url.startsWith(`${profile.github}/`)
    && 'updated_at' in value && typeof value.updated_at === 'string'
    && Number.isFinite(Date.parse(value.updated_at))
    && 'language' in value && (typeof value.language === 'string' || value.language === null)
    && 'fork' in value && typeof value.fork === 'boolean'
}

async function getJson(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal, headers: { Accept: 'application/vnd.github+json' } })
  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}`)
  return response.json()
}

export function useGitHub() {
  const [state, setState] = useState<GitHubState>({
    status: 'loading',
    repositories: profile.repositorySnapshot,
    recent: [],
  })

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 10_000)
    let active = true

    async function load() {
      try {
        const [user, repos] = await Promise.all([
          getJson(`https://api.github.com/users/${profile.username}`, controller.signal),
          getJson(`https://api.github.com/users/${profile.username}/repos?sort=updated&per_page=100`, controller.signal),
        ])
        if (typeof user !== 'object' || user === null
          || !('public_repos' in user) || typeof user.public_repos !== 'number'
          || !Number.isInteger(user.public_repos) || user.public_repos < 0
          || !Array.isArray(repos) || !repos.every(isRepository)) {
          throw new Error('GitHub returned an unexpected profile response')
        }
        if (active) setState({
          status: 'live',
          repositories: user.public_repos,
          recent: repos.filter((repo) => !repo.fork && repo.name !== profile.username).slice(0, 3),
        })
      } catch (error) {
        if (active) {
          console.warn('Live GitHub data is unavailable. Displaying the dated, verified snapshot.', error)
          setState((previous) => ({ ...previous, status: 'unavailable' }))
        }
      } finally {
        window.clearTimeout(timeout)
      }
    }

    void load()
    return () => {
      active = false
      controller.abort()
      window.clearTimeout(timeout)
    }
  }, [])

  return state
}
