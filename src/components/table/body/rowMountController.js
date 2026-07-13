const rowMountIntervalMs = 24
const rowMountBatchSize = 4

export const createRowMountController = () => {
  let scrolling = false
  let timer = null
  const scheduled = new Set()

  const flush = () => {
    timer = null
    if (scrolling) return

    let executed = 0
    for (const entry of scheduled) {
      if (executed === rowMountBatchSize) break
      scheduled.delete(entry)
      entry.callback()
      executed += 1
    }

    if (executed) start()
  }

  const start = () => {
    if (scrolling || timer !== null || !scheduled.size) return
    timer = setTimeout(flush, rowMountIntervalMs)
  }

  const setScrolling = next => {
    const value = Boolean(next)
    if (scrolling === value) return

    scrolling = value
    if (scrolling && timer !== null) {
      clearTimeout(timer)
      timer = null
    } else {
      start()
    }
  }

  const schedule = callback => {
    const entry = { callback }
    scheduled.add(entry)
    start()

    return () => scheduled.delete(entry)
  }

  const dispose = () => {
    if (timer !== null) clearTimeout(timer)
    timer = null
    scheduled.clear()
  }

  return { dispose, isScrolling: () => scrolling, schedule, setScrolling }
}
