import React from "react"
import { renderWithProviders, fireEvent, waitFor } from "testUtilities"
import Drop from "./index"

const getStyle = el => {
  const { left, top, width } = el.style
  return { left, top, width }
}

beforeEach(() => {
  Element.prototype.getBoundingClientRect = Element.prototype.getOriginalBoundingClientRect
})

it("renders", async () => {
  const div = document.createElement("div")
  div.getBoundingClientRect = jest.fn(() => ({
    bottom: 200,
    left: 300,
    width: 100,
    height: 100,
  }))

  const { getByTestId, getByText } = renderWithProviders(
    <Drop target={div} animation>
      Drop content
    </Drop>
  )
  expect(getByTestId("drop")).toBeInTheDocument()
  expect(getByTestId("drop").parentNode.parentNode).toBe(document.body)

  await waitFor(() => expect(getByText("Drop content").style.top).toBeTruthy())

  expect(getStyle(getByText("Drop content"))).toEqual({
    left: "300px",
    top: "200px",
    width: "100px",
  })
})

const positions = [
  { target: { top: "top" }, result: { left: "300px", top: "100px", width: "100px" } },
  {
    target: { top: "top", right: "left" },
    result: { left: "200px", top: "100px", width: "100px" },
  },
  {
    target: { top: "top", right: "right" },
    result: { left: "400px", top: "100px", width: "100px" },
  },
  { target: { top: "top", left: "left" }, result: { left: "300px", top: "100px", width: "100px" } },
  {
    target: { top: "top", left: "right" },
    result: { left: "500px", top: "100px", width: "100px" },
  },
  { target: { top: "bottom" }, result: { left: "300px", top: "200px", width: "100px" } },
  {
    target: { top: "bottom", right: "left" },
    result: { left: "200px", top: "200px", width: "100px" },
  },
  {
    target: { top: "bottom", right: "right" },
    result: { left: "400px", top: "200px", width: "100px" },
  },
  {
    target: { top: "bottom", left: "left" },
    result: { left: "300px", top: "200px", width: "100px" },
  },
  {
    target: { top: "bottom", left: "right" },
    result: { left: "500px", top: "200px", width: "100px" },
  },
  { target: { bottom: "bottom" }, result: { left: "300px", top: "200px", width: "100px" } },
  {
    target: { bottom: "bottom", right: "left" },
    result: { left: "200px", top: "200px", width: "100px" },
  },
  {
    target: { bottom: "bottom", right: "right" },
    result: { left: "400px", top: "200px", width: "100px" },
  },
  {
    target: { bottom: "bottom", left: "left" },
    result: { left: "300px", top: "200px", width: "100px" },
  },
  {
    target: { bottom: "bottom", left: "right" },
    result: { left: "500px", top: "200px", width: "100px" },
  },
  { target: { bottom: "top" }, result: { left: "300px", top: "100px", width: "100px" } },
  {
    target: { bottom: "top", right: "left" },
    result: { left: "200px", top: "100px", width: "100px" },
  },
  {
    target: { bottom: "top", right: "right" },
    result: { left: "400px", top: "100px", width: "100px" },
  },
  {
    target: { bottom: "top", left: "left" },
    result: { left: "300px", top: "100px", width: "100px" },
  },
  {
    target: { bottom: "top", left: "right" },
    result: { left: "500px", top: "100px", width: "100px" },
  },
  { target: { right: "right" }, result: { left: "400px", top: "150px", width: "100px" } },
  { target: { left: "left" }, result: { left: "300px", top: "150px", width: "100px" } },
  { target: {}, result: { left: "300px", top: "150px", width: "100px" } },
]

it("renders aligns", async () => {
  const div = document.createElement("div")
  div.getBoundingClientRect = jest.fn(() => ({
    top: 100,
    right: 500,
    bottom: 200,
    left: 300,
    width: 100,
    height: 100,
  }))

  const { getByText, rerender } = renderWithProviders()

  for (let i = 0; i < positions.length; ++i) {
    const { target, result } = positions[i]
    rerender(
      <Drop target={div} align={target}>
        Drop content {JSON.stringify(target)}
      </Drop>
    )
    await waitFor(() => expect(getStyle(getByText(/Drop content/))).toEqual(result))
  }
})

it("boundaries", async () => {
  window.innerWidth = 400
  window.innerHeight = 400

  const div = document.createElement("div")
  div.getBoundingClientRect = jest.fn(() => ({
    top: 100,
    right: 300,
    bottom: 300,
    left: 100,
    width: 200,
    height: 200,
  }))

  const { getByText, rerender } = renderWithProviders(
    <Drop target={div} align={{ right: "left", top: "top" }}>
      Drop content
    </Drop>
  )

  await waitFor(() =>
    expect(getStyle(getByText("Drop content"))).toEqual({
      top: "100px",
      left: "0px",
      width: "200px",
    })
  )

  rerender(
    <Drop target={div} align={{ left: "right", top: "top" }}>
      Drop content
    </Drop>
  )

  await waitFor(() =>
    expect(getStyle(getByText("Drop content"))).toEqual({
      top: "100px",
      left: "200px",
      width: "200px",
    })
  )
})

it("stretch", async () => {
  const div = document.createElement("div")
  div.getBoundingClientRect = jest.fn(() => ({
    top: 100,
    right: 300,
    bottom: 300,
    left: 100,
    width: 200,
    height: 200,
  }))

  const { getByText, rerender } = renderWithProviders(
    <Drop target={div} stretch={false} align={{ left: "left", top: "bottom" }}>
      Drop content
    </Drop>
  )

  await waitFor(() => expect(getStyle(getByText("Drop content")).width).toBe(""))

  rerender(
    <Drop target={div} stretch="align" align={{ left: "right", top: "top" }}>
      Drop content
    </Drop>
  )

  await waitFor(() => expect(getStyle(getByText("Drop content")).width).toBe("0px"))
})

it("clicks outside", () => {
  const onClickOutside = jest.fn()
  const div = document.createElement("div")
  const { getByText } = renderWithProviders(
    <div>
      <div>Outside content</div>
      <Drop target={div} onClickOutside={onClickOutside}>
        Drop content
      </Drop>
    </div>
  )

  fireEvent.mouseDown(getByText("Drop content"))
  expect(onClickOutside).toBeCalledTimes(0)

  fireEvent.mouseDown(getByText("Outside content"))
  expect(onClickOutside).toBeCalledTimes(1)
})

it("clicks escape", async () => {
  const onEsc = jest.fn()
  const div = document.createElement("div")
  renderWithProviders(
    <div>
      <div>Outside content</div>
      <Drop target={div} onEsc={onEsc}>
        Drop content
      </Drop>
    </div>
  )

  fireEvent.keyDown(document, { keyCode: 27 })
  expect(onEsc).toBeCalledTimes(1)
})
