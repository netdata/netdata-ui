import { measureTableElement } from "./measureElement"

const createInstance = ({ cached, estimate = 35, horizontal = false } = {}) => ({
  indexFromElement: jest.fn(() => 2),
  itemSizeCache: new Map(cached === undefined ? [] : [["row-2", cached]]),
  options: {
    estimateSize: jest.fn(() => estimate),
    getItemKey: jest.fn(index => `row-${index}`),
    horizontal,
    useCachedMeasurements: false,
  },
})

describe("measureTableElement", () => {
  it("preserves a fractional ResizeObserver border-box height", () => {
    const element = { getBoundingClientRect: jest.fn() }
    const instance = createInstance()
    const entry = { borderBoxSize: [{ blockSize: 34.4, inlineSize: 200.8 }] }

    expect(measureTableElement(element, entry, instance)).toBe(34.4)
    expect(element.getBoundingClientRect).not.toHaveBeenCalled()
  })

  it("preserves a fractional bounding-client-rect fallback", () => {
    const element = { getBoundingClientRect: jest.fn(() => ({ height: 52.8, width: 400.8 })) }
    const instance = createInstance()

    expect(measureTableElement(element, undefined, instance)).toBe(52.8)
  })

  it("reuses a cached measurement without forcing layout", () => {
    const element = { getBoundingClientRect: jest.fn() }
    const instance = createInstance({ cached: 44.8 })

    expect(measureTableElement(element, undefined, instance)).toBe(44.8)
    expect(element.getBoundingClientRect).not.toHaveBeenCalled()
  })

  it("measures fractional width for a horizontal virtualizer", () => {
    const element = { getBoundingClientRect: jest.fn() }
    const instance = createInstance({ horizontal: true })
    const entry = { borderBoxSize: { blockSize: 34.4, inlineSize: 200.8 } }

    expect(measureTableElement(element, entry, instance)).toBe(200.8)
  })
})
