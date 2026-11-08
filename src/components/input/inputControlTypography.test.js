import React from "react"
import { createRef } from "react"
import { fireEvent, renderWithProviders, screen } from "testUtilities"
import { DefaultTheme, DarkTheme } from "@/theme"
import { InputControl, TextInput } from "."

it.each([
  ["light", DefaultTheme],
  ["dark", DarkTheme],
])("honors explicit native field typography and the theme face in %s", (_, base) => {
  const theme = { ...base, constants: { ...base.constants, FONT_MONOSPACE: "Editor Mono" } }
  renderWithProviders(
    <InputControl
      aria-label="Job name"
      readOnly
      value="job"
      monospace
      fontSize={4}
      fontWeight={600}
      lineHeight="24px"
    />,
    { theme }
  )
  const input = screen.getByRole("textbox", { name: "Job name" })
  expect(input).toHaveStyleRule("font-family", "Editor Mono")
  expect(input).toHaveStyleRule("font-size", "16px")
  expect(input).toHaveStyleRule("font-weight", "600")
  expect(input).toHaveStyleRule("line-height", "24px")
})

it("keeps textarea refs, native selection and IME events with CSS font metrics", () => {
  const ref = createRef()
  const onCompositionEnd = jest.fn()
  renderWithProviders(
    <InputControl
      as="textarea"
      ref={ref}
      aria-label="Formula"
      aria-controls="variables"
      data-editor="formula"
      defaultValue="$this * 2"
      fontSize="12px"
      fontWeight="normal"
      lineHeight={1.5}
      onCompositionEnd={onCompositionEnd}
    />
  )
  const input = screen.getByRole("textbox", { name: "Formula" })
  expect(ref.current).toBe(input)
  expect(input.tagName).toBe("TEXTAREA")
  expect(input).toHaveAttribute("aria-controls", "variables")
  expect(input).toHaveAttribute("data-editor", "formula")
  input.focus()
  input.setSelectionRange(1, 5)
  expect(input).toHaveFocus()
  expect([input.selectionStart, input.selectionEnd]).toEqual([1, 5])
  fireEvent.compositionStart(input)
  fireEvent.compositionEnd(input, { data: "文字" })
  expect(onCompositionEnd).toHaveBeenCalledTimes(1)
  expect(input).toHaveStyleRule("font-size", "12px")
  expect(input).toHaveStyleRule("font-weight", "normal")
  expect(input).toHaveStyleRule("line-height", "1.5")
})

it("falls back to the shared face when the theme has no monospace constant", () => {
  const constants = { ...DefaultTheme.constants }
  delete constants.FONT_MONOSPACE
  renderWithProviders(<InputControl aria-label="Name" monospace />, {
    theme: { ...DefaultTheme, constants },
  })
  expect(screen.getByRole("textbox", { name: "Name" })).toHaveStyleRule(
    "font-family",
    "ui-monospace,SFMono-Regular,Menlo,Consolas,monospace"
  )
})

it("keeps the wrapped TextInput defaults when no typography is supplied", () => {
  renderWithProviders(<TextInput name="Value" value="cpu" onChange={() => {}} />)
  const input = screen.getByRole("textbox", { name: "Value" })
  expect(input).toHaveStyleRule("font-family", "inherit")
  expect(input).toHaveStyleRule("font-size", "13px")
  expect(input).toHaveStyleRule("line-height", "16px")
  expect(input).not.toHaveStyleRule("font-weight")
})
