import React from "react"
import { getHeaderTooltipContent } from "./cell"

it("uses the canonical header string before rendered header content", () => {
  expect(
    getHeaderTooltipContent({
      header: <span>Rendered abbreviation</span>,
      headerString: () => "Complete column name",
    })
  ).toBe("Complete column name")
})

it("uses a literal header when no canonical header string exists", () => {
  expect(getHeaderTooltipContent({ header: "Complete column name" })).toBe("Complete column name")
})

it("marks complex headers for lazy visible-text resolution", () => {
  expect(getHeaderTooltipContent({ header: <span>Complete column name</span> })).toBe("")
  expect(getHeaderTooltipContent({})).toBeUndefined()
})
