/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/extend-expect"
import { Table } from "./table"
import { UserHeader } from "./components/UserHeader"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"
import "jest-styled-components"

const MOCK_PROPS = {
  sortedBy: ["user"],
  columns: UserHeader,
  data: [
    {
      user: { photo: "https://i.pravatar.cc/30", name: "Fry", mail: "noway@noway.com" },
      dots: "123",
    },
    {
      user: { photo: "https://i.pravatar.cc/31", name: "Amy", mail: "amy@vong.com" },
      dots: "123",
    },
    {
      user: {
        photo: "https://i.pravatar.cc/32",
        name: "dr. Zoidberg",
        mail: "drZ@planetmail.com",
      },
      dots: "123",
    },
  ],
  selectedItemsClb: items => items,
}

describe("Table component test", () => {
  it(" * should render with MOCK_PROPS", () => {
    const { container } = testWrapper(Table, { ...MOCK_PROPS }, DefaultTheme, {})
    const result = container.querySelector("table")
    expect(result && result.textContent).not.toBeNull()
  })
  it(" * should render data", () => {
    const { getByText } = testWrapper(Table, { ...MOCK_PROPS }, DefaultTheme, {})
    const result = getByText("dr. Zoidberg (drZ@planetmail.com)")
    expect(result).not.toBeEmpty()
  })
})
