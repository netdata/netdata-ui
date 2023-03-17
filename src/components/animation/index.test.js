import React from "react"
import { render, waitForElementToBeRemoved } from "testUtilities"
import { config } from "react-transition-group"
import Animation from "."

beforeAll(() => {
  config.disabled = false
})

afterAll(() => {
  config.disabled = true
})

it("toggles content", async () => {
  const { queryByText, rerender } = render(<Animation in>{() => "myContent"}</Animation>)
  expect(queryByText("myContent")).toBeInTheDocument()

  rerender(<Animation>{() => "myContent"}</Animation>)
  await waitForElementToBeRemoved(() => queryByText("myContent"))

  rerender(<Animation in>{() => "myContent"}</Animation>)
  expect(queryByText("myContent")).toBeInTheDocument()
})

it("Mounts", () => {
  const { queryByText } = render(<Animation mount>{() => "myContent"}</Animation>)
  expect(queryByText("myContent")).toBeInTheDocument()
})

it("provides render props", () => {
  const spy = jest.fn()
  let props
  const { queryByText } = render(
    <Animation in toggle="width: 200px;">
      {p => {
        spy()
        props = p
        return "myContent"
      }}
    </Animation>
  )

  expect(queryByText("myContent")).toBeInTheDocument()
  expect(spy).toBeCalledTimes(1)
  expect(props.transition).toBe("entered")
})

it("renders in a wrapper", () => {
  const spy = jest.fn()
  const wrapperSpy = jest.fn()
  const Wrapper = ({ children }) => {
    wrapperSpy()
    return children
  }
  render(
    <Animation as={Wrapper} in toggle="width: 200px;">
      {() => {
        spy()
        return "myContent"
      }}
    </Animation>
  )

  expect(spy).toBeCalledTimes(1)
  expect(wrapperSpy).toBeCalledTimes(1)
})
