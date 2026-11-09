import { getScrollInset } from "./getScrollInset"

const scroller = () => {
  const element = document.createElement("div")
  element.style.border = "solid"
  element.style.borderWidth = "3px 1px 4px 2px"
  Object.defineProperties(element, {
    offsetWidth: { value: 120 },
    clientWidth: { value: 102 },
    offsetHeight: { value: 100 },
    clientHeight: { value: 88 },
  })
  return element
}

describe("getScrollInset", () => {
  it("subtracts only inline borders from the default width measurement", () => {
    expect(getScrollInset(scroller())).toBe(15)
  })

  it("uses block borders for the height measurement", () => {
    expect(getScrollInset(scroller(), { dimension: "height" })).toBe(5)
  })

  it("can retain the full box difference for each dimension", () => {
    const element = scroller()
    expect([
      getScrollInset(element, { includeBorder: true }),
      getScrollInset(element, { dimension: "height", includeBorder: true }),
    ]).toEqual([18, 12])
  })

  it("clamps negative scrollbar space caused by fractional borders", () => {
    const element = scroller()
    element.style.borderLeftWidth = "9.5px"
    element.style.borderRightWidth = "9px"

    expect(getScrollInset(element)).toBe(0)
  })
})
