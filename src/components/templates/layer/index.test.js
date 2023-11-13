import React from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { DefaultTheme as theme } from "@/theme/default"
import Layer from "./index"

const base = theme.constants.SIZE_SUB_UNIT

it("renders", () => {
  const { getByText, getByTestId } = renderWithProviders(<Layer>layer content</Layer>)
  expect(getByTestId("layer-backdropContainer")).toBeInTheDocument()
  expect(getByText("layer content")).toBeVisible()
})

it("renders without backdrop", () => {
  const { getByText, queryByTestId } = renderWithProviders(
    <Layer backdrop={false}>layer content</Layer>
  )
  expect(queryByTestId("layer-backdropContainer")).not.toBeInTheDocument()
  expect(getByText("layer content")).toBeVisible()
})

it("renders with backdrop blur", () => {
  const { queryByTestId } = renderWithProviders(
    <Layer backdrop backdropProps={{ backdropBlur: true }}>
      layer content
    </Layer>
  )
  expect(queryByTestId("layer-backdropContainer")).toBeInTheDocument()
  expect(queryByTestId("layer-backdrop")).toBeInTheDocument()
  expect(queryByTestId("layer-backdrop")).toHaveStyleRule("backdrop-filter", "blur(10px)")
})

const positions = [
  { position: "top-left", left: "0", top: "0" },
  { position: "top", left: "50%", top: "0" },
  { position: "top-right", right: "0", top: "0" },
  { position: "left", left: "0", top: "50%" },
  { position: "center", left: "50%", top: "50%" },
  { position: "right", right: "0", top: "50%" },
  { position: "bottom-left", left: "0", bottom: "0" },
  { position: "bottom", left: "50%", bottom: "0" },
  { position: "bottom-right", right: "0", bottom: "0" },
]

it("renders on positions", () => {
  const { getByText, rerender } = renderWithProviders()

  const expectRule = (rule, value) => {
    return value
      ? expect(getByText("layer content")).toHaveStyleRule(rule, value)
      : expect(getByText("layer content")).not.toHaveStyleRule(rule)
  }

  positions.forEach(({ position, top, right, bottom, left }) => {
    rerender(<Layer position={position}>layer content</Layer>)
    expectRule("top", top)
    expectRule("right", right)
    expectRule("bottom", bottom)
    expectRule("left", left)
  })
})

it("fulls", () => {
  const { getByText, rerender } = renderWithProviders()

  rerender(<Layer full="vertical">layer content</Layer>)
  expect(getByText("layer content")).toHaveStyleRule("top", "0")
  expect(getByText("layer content")).toHaveStyleRule("bottom", "0")
  expect(getByText("layer content")).toHaveStyleRule("left", "50%")

  rerender(<Layer full="horizontal">layer content</Layer>)
  expect(getByText("layer content")).toHaveStyleRule("top", "50%")
  expect(getByText("layer content")).toHaveStyleRule("left", "0")
  expect(getByText("layer content")).toHaveStyleRule("right", "0")

  rerender(<Layer full>layer content</Layer>)
  expect(getByText("layer content")).toHaveStyleRule("top", "0")
  expect(getByText("layer content")).toHaveStyleRule("right", "0")
  expect(getByText("layer content")).toHaveStyleRule("bottom", "0")
  expect(getByText("layer content")).toHaveStyleRule("left", "0")
})

it("clicks outside", () => {
  const onClickOutside = jest.fn()
  const { getByText } = renderWithProviders(
    <div>
      <div>outside content</div>
      <Layer backdrop={false} onClickOutside={onClickOutside}>
        layer content
      </Layer>
    </div>
  )

  fireEvent.mouseDown(getByText("layer content"))
  expect(onClickOutside).toBeCalledTimes(0)

  fireEvent.mouseDown(getByText("outside content"))
  expect(onClickOutside).toBeCalledTimes(1)
})

it("clicks escape", async () => {
  const onEsc = jest.fn()
  renderWithProviders(
    <div>
      <div>Outside content</div>
      <Layer onEsc={onEsc}>layer content</Layer>
    </div>
  )

  fireEvent.keyDown(document, { keyCode: 27 })
  expect(onEsc).toBeCalledTimes(1)
})

it("renders border shadow", async () => {
  const { getByText, rerender } = renderWithProviders(<Layer borderShadow>layer content</Layer>)
  expect(getByText("layer content")).toHaveStyleRule("boxShadow")

  rerender(<Layer>layer content</Layer>)
  expect(getByText("layer content")).not.toHaveStyleRule("boxShadow")
})

it("sets margin", () => {
  const { getByText, rerender } = renderWithProviders(
    <Layer margin={[1, 2, 3, 4]}>layer content</Layer>
  )
  expect(getByText("layer content")).toHaveStyleRule(
    "max-width",
    `calc((100% - ${base * 4}px) - ${base * 2}px)`
  )
  expect(getByText("layer content")).toHaveStyleRule(
    "max-height",
    `calc((100% - ${base}px) - ${base * 3}px)`
  )
  expect(getByText("layer content")).toHaveStyleRule("top", "50%")
  expect(getByText("layer content")).toHaveStyleRule("left", "50%")

  rerender(<Layer margin={[1, 0, 0, 0]}>layer content</Layer>)
  expect(getByText("layer content")).toHaveStyleRule("max-height", `calc(100% - ${base}px)`)

  rerender(<Layer margin={[0, 0, 1, 0]}>layer content</Layer>)
  expect(getByText("layer content")).toHaveStyleRule("max-height", `calc(100% - ${base}px)`)
})

it("sets margin on full layer", () => {
  const { getByText } = renderWithProviders(
    <Layer full margin={[1, 2, 3, 4]}>
      layer content
    </Layer>
  )
  expect(getByText("layer content")).toHaveStyleRule(
    "max-width",
    `calc((100% - ${base * 4}px) - ${base * 2}px)`
  )
  expect(getByText("layer content")).toHaveStyleRule(
    "max-height",
    `calc((100% - ${base}px) - ${base * 3}px)`
  )
  expect(getByText("layer content")).toHaveStyleRule("top", `${base}px`)
  expect(getByText("layer content")).toHaveStyleRule("right", `${base * 2}px`)
  expect(getByText("layer content")).toHaveStyleRule("bottom", `${base * 3}px`)
  expect(getByText("layer content")).toHaveStyleRule("left", `${base * 4}px`)
})
