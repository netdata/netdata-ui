import { fireEvent, renderWithProviders } from "testUtilities"
import { DarkTheme, DefaultTheme } from "@/theme"
import Tooltip from "./index"

it.each([DefaultTheme, DarkTheme])(
  "keeps rich surface hints on the themed popover surface",
  theme => {
    const { getByRole, getByText } = renderWithProviders(
      <Tooltip
        appearance="surface"
        maxWidth={120}
        delay={0}
        content={{ title: "Default", description: <code>10s</code> }}
      >
        <button>Help</button>
      </Tooltip>,
      { theme }
    )
    fireEvent.mouseOver(getByRole("button", { name: "Help" }))

    const title = getByText("Default")
    const surface = title.parentElement
    expect(surface).toHaveStyleRule("background-color", theme.colors.popoverBackground)
    expect(surface).toHaveStyleRule("max-width", "480px")
    expect(surface).toHaveStyleRule("padding", "8px 10px")
    expect(surface).toHaveStyleRule("border-radius", "8px")
    expect(surface).toHaveStyleRule("color", theme.colors.textFocus)
    expect(title).toHaveStyleRule("text-transform", "uppercase")
    expect(getByText("10s")).toBeInTheDocument()
  }
)
