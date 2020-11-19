import "jest-styled-components"

afterEach(() => jest.restoreAllMocks())
afterEach(() => jest.clearAllMocks())
afterEach(() => jest.clearAllTimers())

jest.setTimeout(10000)
jest.retryTimes(2)
