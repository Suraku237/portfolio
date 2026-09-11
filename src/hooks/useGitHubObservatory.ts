import { useEffect, useState } from 'react'
import { profile } from '../data/portfolio'

export interface ObservatoryRepository {
  name: string
  htmlUrl: string
  description: string | null
  language: string | null
  stars: number
  forks: number
  pushedAt: string
}

interface GitHubObservatoryState {
  status: 'loading' | 'live' | 'unavailable'
  publicRepositories: number
  repositories: ObservatoryRepository[]
  collectedAt: string | null
  error: string | null
}

interface ApiRepository {
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  pushed_at: string
  fork: boolean
}

function isFiniteNonNegativeInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0
}

function isApiRepository(value: unknown): value is ApiRepository {
  if (typeof value !== 'object' || value === null) return false
  return 'name' in value && typeof value.name === 'string'
    && 'html_url' in value && typeof value.html_url === 'string'
    && value.html_url.startsWith(`${profile.github}/`)
    && 'description' in value && (typeof value.description === 'string' || value.description === null)
    && 'language' in value && (typeof value.language === 'string' || value.language === null)
    && 'stargazers_count' in value && isFiniteNonNegativeInteger(value.stargazers_count)
    && 'forks_count' in value && isFiniteNonNegativeInteger(value.forks_count)
    && 'pushed_at' in value && typeof value.pushed_at === 'string'
    && Number.isFinite(Date.parse(value.pushed_at))
    && 'fork' in value && typeof value.fork === 'boolean'
}

async function getJson(url: string, signal: AbortSignal): Promise<unknown> {
  const response = await fetch(url, {
    signal,
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}`)
  return response.json()
}

export function useGitHubObservatory() {
  const [state, setState] = useState<GitHubObservatoryState>({
    status: 'loading',
    publicRepositories: profile.repositorySnapshot,
    repositories: [],
    collectedAt: null,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 30_000)
    let active = true

    async function load() {
      try {
        const [userPayload, repositoriesPayload] = await Promise.all([
          getJson(`https://api.github.com/users/${profile.username}`, controller.signal),
          getJson(`https://api.github.com/users/${profile.username}/repos?type=owner&sort=pushed&per_page=100`, controller.signal),
        ])

        if (typeof userPayload !== 'object' || userPayload === null
          || !('public_repos' in userPayload) || !isFiniteNonNegativeInteger(userPayload.public_repos)
          || !Array.isArray(repositoriesPayload) || !repositoriesPayload.every(isApiRepository)) {
          throw new Error('GitHub returned an unexpected profile response')
        }

        const ownedRepositories = repositoriesPayload.filter((repository) => !repository.fork)

        if (active) {
          setState({
            status: 'live',
            publicRepositories: userPayload.public_repos,
            repositories: ownedRepositories.map((repository) => ({
              name: repository.name,
              htmlUrl: repository.html_url,
              description: repository.description,
              language: repository.language,
              stars: repository.stargazers_count,
              forks: repository.forks_count,
              pushedAt: repository.pushed_at,
            })),
            collectedAt: new Date().toISOString(),
            error: null,
          })
        }
      } catch (error) {
        if (active) {
          const message = error instanceof Error ? error.message : 'Unknown GitHub API error'
          console.warn('GitHub Observatory data could not be loaded.', error)
          setState((previous) => ({
            ...previous,
            status: 'unavailable',
            error: message,
          }))
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
