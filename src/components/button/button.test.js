/**
 * @jest-environment jsdom
 */
import React from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { Button } from "./button"

describe("Button states", () => {
  it("renders disabled", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" disabled />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("opacity", "0.4", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("pointer-events", "none", {
      modifier: "&&",
    })
  })

  it("renders a button with text being in default format", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "lowercase", {
      modifier: "&& > span",
    })
    expect(button).toHaveStyleRule("text-transform", "uppercase", {
      modifier: "&& > span::first-letter",
    })
  })

  it("renders a button with text that has no text-transform", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="none" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "none", {
      modifier: "&& > span",
    })
  })

  it("renders a button with text being capitalized", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="capitalize" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "capitalize", {
      modifier: "&& > span",
    })
  })

  it("renders a button with text being in uppercase", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="uppercase" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "uppercase", {
      modifier: "&& > span",
    })
  })

  it("renders a button with text being in lowercase", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="lowercase" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "lowercase", {
      modifier: "&& > span",
    })
  })

  it("renders a button with text being in full-width", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="fullWidth" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "full-width", {
      modifier: "&& > span",
    })
  })

  it("renders a text with only one capital letter, the first one", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" textTransform="firstLetter" />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "lowercase", {
      modifier: "&& > span",
    })
    expect(button).toHaveStyleRule("text-transform", "uppercase", {
      modifier: "&& > span::first-letter",
    })
  })

  it("renders loading text", () => {
    const { getByText } = renderWithProviders(
      <Button label="Test prop text" loadingLabel="loading..." isLoading />
    )
    expect(getByText(/loading/)).toBeInTheDocument()
  })

  it("renders with icon", () => {
    const { container, getByText, getByTitle } = renderWithProviders(
      <Button label="Test prop text" icon="plus" />
    )
    const button = container.firstChild

    expect(getByText(/prop text/)).toBeInTheDocument()
    expect(button).toHaveStyleRule("margin-left", "4px", {
      modifier: "&& > span",
    })
    expect(getByTitle("plus")).toBeInTheDocument()
  })

  it("renders only icon", () => {
    const { container } = renderWithProviders(<Button flavour="hollow" icon="plus" />)
    const button = container.firstChild
    expect(button).toMatchSnapshot()
  })

  it("renders smaller only icon", () => {
    const { container } = renderWithProviders(<Button flavour="hollow" icon="plus" small />)
    const button = container.firstChild
    expect(button).toMatchSnapshot()
  })

  it("renders loading icon", () => {
    const { container, getByText, queryByTitle } = renderWithProviders(
      <Button label="Test prop text" icon="plus" isLoading />
    )

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText(/prop text/)).toBeInTheDocument()
    expect(queryByTitle("plus")).not.toBeInTheDocument()
  })

  it("is clickable", () => {
    const onClickFn = jest.fn()
    const { getByText } = renderWithProviders(<Button label="Test prop text" onClick={onClickFn} />)

    fireEvent.click(getByText(/prop text/))
    expect(onClickFn).toBeCalled()
  })
})

describe("Default Button", () => {
  it("renders", () => {
    const { container, getByText } = renderWithProviders(
      <Button label="Test prop text" textTransform="fullWidth" />
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("background-color", "#00AB44", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#00AB44", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#F6F7F7", {
      modifier: "&&",
    })

    expect(button).toHaveStyleRule("pointer-events", "auto", {
      modifier: "&&",
    })
  })

  it("renders for danger", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" danger />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#DB162F", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#DB162F", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#F6F7F7", {
      modifier: "&&",
    })
  })

  it("renders for warning", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" warning />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FF9700", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#FF9700", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#F6F7F7", {
      modifier: "&&",
    })
  })

  it("renders neutral", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" neutral />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#526161", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#526161", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#F6F7F7", {
      modifier: "&&",
    })
  })
})

describe("Hollow Button", () => {
  it("renders", () => {
    const { container, getByText } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" />
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#00AB44", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#00AB44", {
      modifier: "&&",
    })

    expect(button).toHaveStyleRule("pointer-events", "auto", {
      modifier: "&&",
    })
  })

  it("renders for danger", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" danger />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#DB162F", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#DB162F", {
      modifier: "&&",
    })
  })

  it("renders for warning", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" warning />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#FF9700", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FF9700", {
      modifier: "&&",
    })
  })

  it("renders for neutral", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" neutral />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#C0CACA", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#526161", {
      modifier: "&&",
    })
  })
})

describe("Borderless Button", () => {
  it("renders", () => {
    const { container, getByText } = renderWithProviders(
      <Button label="Test prop text" flavour="borderless" />
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#00AB44", {
      modifier: "&&",
    })

    expect(button).toHaveStyleRule("pointer-events", "auto", {
      modifier: "&&",
    })
  })

  it("renders for danger", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="borderless" danger />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#DB162F", {
      modifier: "&&",
    })
  })

  it("renders for warning", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="borderless" warning />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FF9700", {
      modifier: "&&",
    })
  })

  it("renders for neutral", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="borderless" neutral />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#526161", {
      modifier: "&&",
    })
  })
})
