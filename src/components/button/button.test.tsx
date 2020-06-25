/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom/extend-expect"
import "jest-styled-components"
import { fireEvent } from "@testing-library/react"
import { Button, ButtonWrapperProps } from "./button"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"

describe("Button states", () => {
  it(" * should render disabled", () => {
    const { container } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", disabled: true },
      DefaultTheme,
      null
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("opacity", "0.4")
    expect(button).toHaveStyleRule("pointer-events", "none")
  })

  it(" * should render loading text", () => {
    const { getByText } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", loadingLabel: "loading...", isLoading: true },
      DefaultTheme,
      null
    )
    expect(getByText(/loading/)).toBeInTheDocument()
  })

  it(" * should render with icon", () => {
    const { getByText, getByTitle } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", icon: "plus" },
      DefaultTheme,
      null
    )

    expect(getByText(/prop text/)).toBeInTheDocument()
    expect(getByTitle("plus")).toBeInTheDocument()
  })

  it(" * should render only icon", () => {
    const { container } = testWrapper<ButtonWrapperProps>(
      Button,
      { type: "hollow", icon: "plus" },
      DefaultTheme,
      null
    )
    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("width", "32px")
    expect(button).toHaveStyleRule("height", "32px")
  })

  it(" * should render smaller only icon", () => {
    const { container } = testWrapper<ButtonWrapperProps>(
      Button,
      { type: "hollow", icon: "plus", small: true },
      DefaultTheme,
      null
    )
    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("width", "24px")
    expect(button).toHaveStyleRule("height", "24px")
  })

  it(" * should render loading icon", () => {
    const { getByText, getByTitle } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", icon: "plus", isLoading: true },
      DefaultTheme,
      null
    )

    expect(getByText(/prop text/)).toBeInTheDocument()
    expect(getByTitle("loading")).toBeInTheDocument()
  })

  it(" * should be clickable", () => {
    const onClickFn = jest.fn()
    const { getByText } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", onClick: onClickFn },
      DefaultTheme,
      null
    )

    fireEvent.click(getByText(/prop text/))
    expect(onClickFn).toBeCalled()
  })
})

describe("Default Button", () => {
  it(" * should render", () => {
    const { container, getByText } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text" },
      DefaultTheme,
      null
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("width", "128px")
    expect(button).toHaveStyleRule("height", "40px")
    expect(button).toHaveStyleRule("background-color", "#00AB44")
    expect(button).toHaveStyleRule("border-color", "#00AB44")
    expect(button).toHaveStyleRule("color", "#FFF")
    expect(button).toHaveStyleRule("opacity", "1")
    expect(button).toHaveStyleRule("pointer-events", "auto")
  })

  it(" * should render for danger", () => {
    const { container } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", danger: true },
      DefaultTheme,
      null
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FF4136")
    expect(button).toHaveStyleRule("border-color", "#FF4136")
    expect(button).toHaveStyleRule("color", "#FFF")
  })

  it(" * should render for warning", () => {
    const { container } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", warning: true },
      DefaultTheme,
      null
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FFC300")
    expect(button).toHaveStyleRule("border-color", "#FFC300")
    expect(button).toHaveStyleRule("color", "#FFF")
  })
})

describe("Hollow Button", () => {
  it(" * should render", () => {
    const { container, getByText } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", type: "hollow" },
      DefaultTheme,
      null
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("width", "128px")
    expect(button).toHaveStyleRule("height", "40px")
    expect(button).toHaveStyleRule("background-color", "#FFF")
    expect(button).toHaveStyleRule("border-color", "#00AB44")
    expect(button).toHaveStyleRule("color", "#00AB44")
    expect(button).toHaveStyleRule("opacity", "1")
    expect(button).toHaveStyleRule("pointer-events", "auto")
  })

  it(" * should render for danger", () => {
    const { container } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", type: "hollow", danger: true },
      DefaultTheme,
      null
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FFF")
    expect(button).toHaveStyleRule("border-color", "#FF4136")
    expect(button).toHaveStyleRule("color", "#FF4136")
  })

  it(" * should render for warning", () => {
    const { container } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", type: "hollow", warning: true },
      DefaultTheme,
      null
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FFF")
    expect(button).toHaveStyleRule("border-color", "#FFC300")
    expect(button).toHaveStyleRule("color", "#FFC300")
  })
})

describe("Borderless Button", () => {
  it(" * should render", () => {
    const { container, getByText } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", type: "borderless" },
      DefaultTheme,
      null
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("width", "128px")
    expect(button).toHaveStyleRule("height", "40px")
    expect(button).toHaveStyleRule("background-color", "#FFF")
    expect(button).toHaveStyleRule("border-color", "#FFF")
    expect(button).toHaveStyleRule("color", "#00AB44")
    expect(button).toHaveStyleRule("opacity", "1")
    expect(button).toHaveStyleRule("pointer-events", "auto")
  })

  it(" * should render for danger", () => {
    const { container } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", type: "borderless", danger: true },
      DefaultTheme,
      null
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FFF")
    expect(button).toHaveStyleRule("border-color", "#FFF")
    expect(button).toHaveStyleRule("color", "#FF4136")
  })

  it(" * should render for warning", () => {
    const { container } = testWrapper<ButtonWrapperProps>(
      Button,
      { label: "Test prop text", type: "borderless", warning: true },
      DefaultTheme,
      null
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FFF")
    expect(button).toHaveStyleRule("border-color", "#FFF")
    expect(button).toHaveStyleRule("color", "#FFC300")
  })
})
