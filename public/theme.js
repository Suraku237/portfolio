(() => {
  const storageKey = 'portfolio-theme'
  const colors = { light: '#fcfbf8', dark: '#17151d' }
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
  const listeners = new Set()
  let storage
  let preference = null
  let persistenceNotice = ''

  function parsePreference(value) {
    if (value === null || value === 'light' || value === 'dark') return value
    console.warn('Ignoring an invalid saved portfolio theme.')
    return null
  }

  function storageUnavailable(error) {
    if (!(error instanceof DOMException)
      || (error.name !== 'SecurityError' && error.name !== 'QuotaExceededError')) {
      throw error
    }
    console.warn('Portfolio theme could not be saved in browser storage.', error)
    return 'Your theme cannot be saved in this browser. It will apply for this visit only.'
  }

  try {
    storage = window.localStorage
    preference = parsePreference(storage.getItem(storageKey))
  } catch (error) {
    persistenceNotice = storageUnavailable(error)
  }

  let snapshot = Object.freeze({
    theme: preference ?? (systemTheme.matches ? 'dark' : 'light'),
    persistenceNotice,
  })

  function applyTheme() {
    const root = document.documentElement
    root.dataset.theme = snapshot.theme
    root.style.colorScheme = snapshot.theme
    root.style.backgroundColor = colors[snapshot.theme]
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', colors[snapshot.theme])
  }

  function update(theme, notice = '') {
    if (snapshot.theme === theme && snapshot.persistenceNotice === notice) return
    snapshot = Object.freeze({ theme, persistenceNotice: notice })
    applyTheme()
    for (const listener of listeners) listener()
  }

  window.portfolioTheme = {
    getSnapshot: () => snapshot,
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    setTheme(theme) {
      if (theme !== 'light' && theme !== 'dark') throw new TypeError('Expected a light or dark theme.')
      preference = theme
      let notice = ''
      try {
        storage = window.localStorage
        storage.setItem(storageKey, theme)
      } catch (error) {
        notice = storageUnavailable(error)
      }
      update(theme, notice)
    },
  }

  systemTheme.addEventListener('change', (event) => {
    if (preference === null) update(event.matches ? 'dark' : 'light', snapshot.persistenceNotice)
  })
  window.addEventListener('storage', (event) => {
    if (event.storageArea !== storage || (event.key !== storageKey && event.key !== null)) return
    preference = parsePreference(event.newValue)
    update(preference ?? (systemTheme.matches ? 'dark' : 'light'))
  })

  applyTheme()
})()
