import React from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { DefaultTheme } from "@/theme"
import Menu from "./index"

const render = props =>
  renderWithProviders(
    <Menu
      label="character"
      items={[
        { value: "narrator", label: "The Narrator" },
        { value: "durgen", label: "Tyler Durden" },
        { value: "singer", label: "Marla Singer" },
      ]}
      {...props}
    />
  )

it("renders", () => {
  const { queryByText, queryByTestId } = render()

  expect(queryByText("character")).toBeVisible()
  expect(queryByTestId("drop")).not.toBeInTheDocument()
  expect(queryByText("The Narrator")).not.toBeInTheDocument()
})

it("renders open", async () => {
  const { getByText, findByText, queryByTestId } = render()

  fireEvent.click(getByText("character"))

  expect(getByText("character")).toBeVisible()
  expect(queryByTestId("drop")).toBeInTheDocument()
  expect(await findByText("The Narrator")).toBeInTheDocument()
})

it("closes on item click", async () => {
  const onOpen = jest.fn()
  const onClose = jest.fn()
  const { getByText, findByText, queryByTestId } = render({ onOpen, onClose })

  fireEvent.click(getByText("character"))
  expect(onOpen).toHaveBeenCalled()

  fireEvent.click(await findByText("Tyler Durden"))
  expect(onClose).toHaveBeenCalled()
  expect(queryByTestId("drop")).not.toBeInTheDocument()
})

it("renders controlled", async () => {
  const onChange = jest.fn()
  const { getByText, findByText, queryByTestId } = render({
    value: "durgen",
    onChange,
    label: null,
  })

  fireEvent.click(getByText("Tyler Durden"))
  fireEvent.click(await findByText("Marla Singer"))
  expect(onChange).toHaveBeenCalledWith("singer")
  expect(queryByTestId("drop")).not.toBeInTheDocument()
})

it("respects a closeOnClick change after mount", async () => {
  const items = [
    { value: "narrator", label: "The Narrator" },
    { value: "durgen", label: "Tyler Durden" },
  ]
  const { getByText, findByText, queryByTestId, rerender } = renderWithProviders(
    <Menu label="character" items={items} />
  )

  rerender(<Menu label="character" items={items} closeOnClick={false} />)
  fireEvent.click(getByText("character"))
  fireEvent.click(await findByText("Tyler Durden"))

  expect(queryByTestId("drop")).toBeInTheDocument()
})

it("calls the latest onChange", async () => {
  const first = jest.fn()
  const latest = jest.fn()
  const items = [{ value: "singer", label: "Marla Singer" }]
  const { getByText, findByText, rerender } = renderWithProviders(
    <Menu label="character" items={items} onChange={first} />
  )

  rerender(<Menu label="character" items={items} onChange={latest} />)
  fireEvent.click(getByText("character"))
  fireEvent.click(await findByText("Marla Singer"))

  expect(first).not.toHaveBeenCalled()
  expect(latest).toHaveBeenCalledWith("singer")
})

it("closes on escape", async () => {
  const { getByText, findByText, queryByTestId } = render()

  fireEvent.click(getByText("character"))
  await findByText("The Narrator")
  fireEvent.keyDown(document, { key: "Escape", keyCode: 27 })

  expect(queryByTestId("drop")).not.toBeInTheDocument()
})

it("announces the popup state on the trigger", () => {
  const { getByRole } = render()
  const trigger = getByRole("button")

  expect(trigger).toHaveAttribute("aria-haspopup", "listbox")
  expect(trigger).toHaveAttribute("aria-expanded", "false")
  fireEvent.click(trigger)
  expect(trigger).toHaveAttribute("aria-expanded", "true")
})

describe("MenuButton", () => {
  it("aligns the default trigger with other 30px controls", () => {
    const { getByRole } = render()
    const trigger = getByRole("button")
    expect(trigger).toHaveStyleRule("min-height", "30px")
    expect(trigger).toHaveStyleRule("padding", "4px 16px")
  })

  it("preserves an explicit trigger height and padding", () => {
    const { getByRole } = render({ height: 6, padding: [0, 2] })
    const trigger = getByRole("button")
    expect(trigger).toHaveStyleRule("height", "24px")
    expect(trigger).not.toHaveStyleRule("min-height")
    expect(trigger).toHaveStyleRule("padding", "0 8px")
  })

  it("is keyboard reachable", () => {
    const { getByRole } = render()

    expect(getByRole("button")).toHaveAttribute("tabindex", "0")
  })

  it("shows the shared green focus ring", () => {
    const { getByRole } = render()

    expect(getByRole("button")).toHaveStyleRule(
      "outline",
      `2px solid ${DefaultTheme.colors.primary}`,
      {
        modifier: ":focus-visible",
      }
    )
  })

  it("turns the caret smoothly and honours reduced motion", () => {
    const { getByRole } = render()

    expect(getByRole("button")).toHaveStyleRule("transition", "transform 120ms ease-out", {
      modifier: "> svg:last-child",
    })
    expect(getByRole("button")).toHaveStyleRule("transition", "none", {
      media: "(prefers-reduced-motion: reduce)",
      modifier: "> svg:last-child",
    })
  })
})
