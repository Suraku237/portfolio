import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import { runInNewContext } from 'node:vm'

const source = await readFile(new URL('../public/theme.js', import.meta.url), 'utf8')

function createHarness({ stored = null, dark = false, blocked = false, full = false } = {}) {
  const values = new Map(stored === null ? [] : [['portfolio-theme', stored]])
  const warnings = []
  const events = new Map()
  const root = { dataset: {}, style: {} }
  const meta = { content: '', setAttribute(_, value) { this.content = value } }
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem(key, value) {
      if (full) throw new DOMException('Storage is full', 'QuotaExceededError')
      values.set(key, value)
    },
  }
  const media = {
    matches: dark,
    addEventListener: (name, listener) => events.set(name, listener),
  }
  const browser = {
    localStorage: storage,
    matchMedia: () => media,
    addEventListener: (name, listener) => events.set(name, listener),
  }
  if (blocked) Object.defineProperty(browser, 'localStorage', {
    get() { throw new DOMException('Storage is blocked', 'SecurityError') },
  })
  runInNewContext(source, {
    window: browser,
    document: { documentElement: root, querySelector: () => meta },
    DOMException,
    console: { warn: (...args) => warnings.push(args) },
  })
  return {
    service: browser.portfolioTheme,
    root,
    meta,
    storage,
    warnings,
    systemChange(matches) {
      media.matches = matches
      events.get('change')({ matches })
    },
    storageChange(newValue, key = 'portfolio-theme', storageArea = storage) {
      events.get('storage')({ newValue, key, storageArea })
    },
  }
}

test('initializes light and dark system defaults before React, including browser chrome', () => {
  for (const dark of [false, true]) {
    const { service, root, meta, storage } = createHarness({ dark })
    const theme = dark ? 'dark' : 'light'
    assert.equal(service.getSnapshot().theme, theme)
    assert.equal(root.dataset.theme, theme)
    assert.equal(root.style.colorScheme, theme)
    assert.equal(meta.content, dark ? '#17151d' : '#fcfbf8')
    assert.equal(root.style.backgroundColor, meta.content)
    assert.equal(storage.getItem('portfolio-theme'), null)
  }
})

test('explicit choices override the device default and survive reloads', () => {
  const page = createHarness({ dark: true })
  page.service.setTheme('light')
  assert.equal(page.storage.getItem('portfolio-theme'), 'light')
  const reloaded = createHarness({ dark: true, stored: page.storage.getItem('portfolio-theme') })
  assert.equal(reloaded.service.getSnapshot().theme, 'light')
  reloaded.service.setTheme('dark')
  assert.equal(reloaded.root.dataset.theme, 'dark')
  assert.equal(reloaded.meta.content, '#17151d')
})

test('follows system changes until a theme is explicitly selected', () => {
  const page = createHarness()
  page.systemChange(true)
  assert.equal(page.service.getSnapshot().theme, 'dark')
  page.systemChange(false)
  assert.equal(page.service.getSnapshot().theme, 'light')
  page.service.setTheme('dark')
  page.systemChange(false)
  assert.equal(page.service.getSnapshot().theme, 'dark')
})

test('synchronizes choices across tabs and returns to system default when cleared', () => {
  const page = createHarness()
  page.storageChange('dark')
  assert.equal(page.service.getSnapshot().theme, 'dark')
  page.storageChange(null, null)
  assert.equal(page.service.getSnapshot().theme, 'light')
  page.storageChange('dark', 'unrelated-key')
  assert.equal(page.service.getSnapshot().theme, 'light')
  page.storageChange('dark', 'portfolio-theme', {})
  assert.equal(page.service.getSnapshot().theme, 'light')
})

test('keeps controls working and surfaces a notice when storage is blocked or full', () => {
  for (const options of [{ blocked: true }, { full: true }]) {
    const page = createHarness(options)
    page.service.setTheme('dark')
    assert.equal(page.service.getSnapshot().theme, 'dark')
    assert.equal(page.root.dataset.theme, 'dark')
    assert.match(page.service.getSnapshot().persistenceNotice, /this visit only/)
    assert.ok(page.warnings.length > 0)
  }
})

test('ignores invalid stored preferences with a warning and rejects invalid controls', () => {
  const page = createHarness({ stored: 'invalid', dark: true })
  assert.equal(page.service.getSnapshot().theme, 'dark')
  assert.equal(page.warnings.length, 1)
  assert.throws(() => page.service.setTheme('invalid'), /light or dark/)
  assert.equal(page.service.getSnapshot().theme, 'dark')
})

test('notifies subscribers on changes and supports cleanup without unstable snapshots', () => {
  const page = createHarness()
  assert.equal(page.service.getSnapshot(), page.service.getSnapshot())
  let changes = 0
  const unsubscribe = page.service.subscribe(() => { changes += 1 })
  page.service.setTheme('dark')
  page.service.setTheme('dark')
  assert.equal(changes, 1)
  unsubscribe()
  page.service.setTheme('light')
  assert.equal(changes, 1)
})
