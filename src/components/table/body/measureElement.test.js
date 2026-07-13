import { measureTableElement } from "./measureElement"

const createInstance = ({ cached, estimate = 35, horizontal = false } = {}) => ({
  indexFromElement: jest.fn(() => 2),
  itemSizeCache: new Map(cached === undefined ? [] : [["row-2", cached]]),
  options: {
    estimateSize: jest.fn(() => estimate),
    getItemKey: jest.fn(index => `row-${index}`),
    horizontal,
  },
})

describe("measureTableElement", () => {
  it("uses TanStack's rounded ResizeObserver border-box height", () => {
    const element = { offsetHeight: 0 }
    const instance = createInstance()
    const entry = { borderBoxSize: [{ blockSize: 34.4, inlineSize: 200.8 }] }

    expect(measureTableElement(element, entry, instance)).toBe(34)
  })

  it("uses TanStack's offset-size fallback", () => {
    const element = { offsetHeight: 53 }
    const instance = createInstance()

    expect(measureTableElement(element, undefined, instance)).toBe(53)
  })

  it("reuses a cached measurement without forcing layout", () => {
    const element = { offsetHeight: 53 }
    const instance = createInstance({ cached: 44.8 })

    expect(measureTableElement(element, undefined, instance)).toBe(44.8)
  })

  it("uses TanStack's rounded width for a horizontal virtualizer", () => {
    const element = { offsetWidth: 0 }
    const instance = createInstance({ horizontal: true })
    const entry = { borderBoxSize: [{ blockSize: 34.4, inlineSize: 200.8 }] }

    expect(measureTableElement(element, entry, instance)).toBe(201)
  })
})
