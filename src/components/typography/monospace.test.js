import { createRef } from "react"
import { StyleSheetManager } from "styled-components"
import isPropValid from "@emotion/is-prop-valid"
import { renderWithProviders, screen } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { TextBig } from "./index"

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])(
  "uses the %s theme monospace family without changing title geometry or native props",
  (_, base) => {
    const family = "Editor Mono, monospace"
    const theme = { ...base, constants: { ...base.constants, FONT_MONOSPACE: family } }
    const ref = createRef()
    renderWithProviders(
      <StyleSheetManager
        shouldForwardProp={(prop, target) => typeof target !== "string" || isPropValid(prop)}
      >
        <TextBig monospace id="literal" ref={ref}>
          plain
        </TextBig>
        <TextBig monospace strong>
          strong
        </TextBig>
        <TextBig>default</TextBig>
      </StyleSheetManager>,
      { theme }
    )
    const plain = screen.getByText("plain")
    expect(plain.tagName).toBe("SPAN")
    expect(plain.id).toBe("literal")
    expect(ref.current).toBe(plain)
    expect(plain).toHaveStyle({
      fontFamily: family,
      fontSize: "15px",
      lineHeight: "20px",
      fontWeight: "normal",
    })
    expect(screen.getByText("strong")).toHaveStyle({
      fontFamily: family,
      fontSize: "15px",
      lineHeight: "20px",
      fontWeight: "600",
    })
    expect(
      getComputedStyle(screen.getByText("default")).fontFamily.startsWith('"IBM Plex Sans"')
    ).toBe(true)
  }
)

it("falls back to the shared editor monospace stack when a custom theme omits it", () => {
  renderWithProviders(
    <StyleSheetManager
      shouldForwardProp={(prop, target) => typeof target !== "string" || isPropValid(prop)}
    >
      <TextBig monospace>literal</TextBig>
    </StyleSheetManager>,
    {
      theme: {
        ...DefaultTheme,
        constants: { ...DefaultTheme.constants, FONT_MONOSPACE: undefined },
      },
    }
  )
  expect(getComputedStyle(screen.getByText("literal")).fontFamily).toBe(
    "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
  )
})
