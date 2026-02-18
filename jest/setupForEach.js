import "jest-styled-components"

afterEach(() => jest.restoreAllMocks())
afterEach(() => jest.clearAllMocks())
afterEach(() => jest.clearAllTimers())

jest.setTimeout(10000)
jest.retryTimes(2)

Element.prototype.getOriginalBoundingClientRect = Element.prototype.getBoundingClientRect
Element.prototype.getBoundingClientRect = jest.fn(() => {
  return {
    width: 120,
    height: 120,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
})

Object.defineProperties(Element.prototype, {
  scrollHeight: { get: () => 500, configurable: true },
  scrollWidth: { get: () => 500, configurable: true },
  clientHeight: { get: () => 500, configurable: true },
  clientWidth: { get: () => 500, configurable: true },
  offsetHeight: { get: () => 500, configurable: true },
  offsetWidth: { get: () => 500, configurable: true },
  offsetTop: { get: () => 0, configurable: true },
  offsetLeft: { get: () => 0, configurable: true },
  scrollTop: { get: () => 0, set: () => {}, configurable: true },
  scrollLeft: { get: () => 0, set: () => {}, configurable: true },
})
