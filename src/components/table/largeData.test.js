import {
  containsWindowRange,
  getBufferedWindowRange,
  getVirtualWindowRange,
  getWindowPublication,
} from "./largeData"

describe("large-data table window", () => {
  it("keeps a virtual range inside its current materialized window", () => {
    expect(
      containsWindowRange({ startIndex: 100, endIndex: 200 }, { startIndex: 120, endIndex: 180 })
    ).toBe(true)
    expect(
      containsWindowRange({ startIndex: 100, endIndex: 200 }, { startIndex: 80, endIndex: 180 })
    ).toBe(false)
  })

  it("buffers a new materialized window within the logical row count", () => {
    expect(getBufferedWindowRange({ startIndex: 100, endIndex: 130 }, 50_000)).toEqual({
      startIndex: 50,
      endIndex: 180,
    })
    expect(getBufferedWindowRange({ startIndex: 49_990, endIndex: 50_000 }, 50_000)).toEqual({
      startIndex: 49_940,
      endIndex: 50_000,
    })
  })

  it("publishes only the requested rows from a 50k logical source", () => {
    const getRow = jest.fn(index => ({ id: `node-${index}` }))
    const source = {
      getRowCount: () => 50_000,
      getRow,
      getRowId: index => `node-${index}`,
    }

    const publication = getWindowPublication(source, {
      startIndex: 12_345,
      endIndex: 12_375,
    })

    expect(publication.startIndex).toBe(12_345)
    expect(publication.rows).toHaveLength(30)
    expect(publication.rowIds).toEqual(
      Array.from({ length: 30 }, (_, index) => `node-${12_345 + index}`)
    )
    expect(getRow).toHaveBeenCalledTimes(30)
  })

  it("uses the complete virtual range instead of classifying range overlap", () => {
    const virtualItems = [{ index: 0 }, { index: 20_001 }, { index: 20_002 }, { index: 20_003 }]

    expect(getVirtualWindowRange(virtualItems, 50_000)).toEqual({
      startIndex: 20_000,
      endIndex: 20_003,
    })
  })

  it("clamps stale virtual indexes when the logical source shrinks", () => {
    expect(getVirtualWindowRange([{ index: 0 }, { index: 10 }], 5)).toEqual({
      startIndex: 5,
      endIndex: 5,
    })
  })
})
