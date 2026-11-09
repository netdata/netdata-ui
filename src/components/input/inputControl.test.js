import React, { createRef } from "react"
import { fireEvent, renderWithProviders, screen } from "testUtilities"
import { InputControl } from "@/index"

it("exposes a native field with refs, validation and exact geometry", () => {
  expect(InputControl).toBeDefined()
  const ref = createRef()
  const onChange = jest.fn()
  const onBlur = jest.fn()
  const { container } = renderWithProviders(
    <InputControl
      ref={ref}
      className="variable-filter"
      role="combobox"
      aria-label="Filter variables"
      aria-expanded="true"
      aria-invalid="true"
      aria-errormessage="variable-error"
      autoComplete="off"
      value="cpu"
      hasValue
      height={7}
      width={{ base: "100%", min: "0" }}
      padding={[0, 2.75]}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
  const input = screen.getByRole("combobox", { name: "Filter variables" })
  expect(container.children).toHaveLength(1)
  expect(container.firstElementChild).toBe(input)
  expect(ref.current).toBe(input)
  expect(input.tagName).toBe("INPUT")
  expect(input).toHaveClass("variable-filter")
  expect(input).toHaveAttribute("aria-invalid", "true")
  expect(input).toHaveAttribute("aria-errormessage", "variable-error")
  expect(input).toHaveAttribute("autocomplete", "off")
  expect(input).toHaveStyleRule("height", "28px")
  expect(input).toHaveStyleRule("padding", "0 11px")
  expect(input).toHaveStyleRule("width", "100%")
  expect(input).toHaveStyleRule("min-width", "0")
  fireEvent.change(input, { target: { value: "cpu.idle" } })
  expect(onChange).toHaveBeenCalledTimes(1)
  fireEvent.blur(input)
  expect(onBlur).toHaveBeenCalledTimes(1)
})
