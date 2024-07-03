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
