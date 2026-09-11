import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

interface ThemeSnapshot {
  theme: Theme
  persistenceNotice: string
}

declare global {
  interface Window {
    portfolioTheme: {
      getSnapshot: () => ThemeSnapshot
      subscribe: (listener: () => void) => () => void
      setTheme: (theme: Theme) => void
    }
  }
}

export function useTheme() {
  const service = window.portfolioTheme
  const snapshot = useSyncExternalStore(service.subscribe, service.getSnapshot)
  return {
    ...snapshot,
    toggleTheme: () => service.setTheme(snapshot.theme === 'dark' ? 'light' : 'dark'),
  }
}
