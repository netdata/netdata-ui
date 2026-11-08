import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import { DarkTheme, DefaultTheme, getRgbColor } from "@/theme"
import Modal, { ModalContent } from "./index"

it.each([
  [DefaultTheme, 0.28, 0.2],
  [DarkTheme, 0.5, 0.5],
])("preserves the compact dialog silhouette and scrim", (theme, scrim, shadow) => {
  renderWithProviders(
    <Modal appearance="dialog" data-testid="dialog-layer">
      <ModalContent appearance="dialog" testId="dialog-content">
        Content
      </ModalContent>
    </Modal>,
    { theme }
  )

  expect(screen.getByTestId("dialog-content")).toHaveStyleRule("border-radius", "12px")
  expect(screen.getByTestId("dialog-content")).toHaveStyleRule(
    "box-shadow",
    `0 16px 48px ${getRgbColor("onColorDark", shadow)({ theme })}`
  )
  expect(screen.getByTestId("layer-backdrop")).toHaveStyleRule(
    "background-color",
    getRgbColor("onColorDark", scrim)({ theme })
  )
  expect(screen.getByTestId("layer-backdrop")).toHaveStyleRule("backdrop-filter", "blur(2px)")
})
