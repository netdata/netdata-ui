/**
 * @jest-environment jsdom
 */
import React from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { Button } from "./button"

describe("Button states", () => {
  it(" * should render disabled", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" disabled />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("opacity", "0.4", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("pointer-events", "none", {
      modifier: "&&",
    })
  })

  it(" * should render with uppercase", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" uppercase />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("text-transform", "uppercase", {
      modifier: "&&",
    })
  })

  it(" * should render loading text", () => {
    const { getByText } = renderWithProviders(
      <Button label="Test prop text" loadingLabel="loading..." isLoading />
    )
    expect(getByText(/loading/)).toBeInTheDocument()
  })

  it(" * should render with icon", () => {
    const { getByText, getByTitle } = renderWithProviders(
      <Button label="Test prop text" icon="plus" />
    )

    expect(getByText(/prop text/)).toBeInTheDocument()
    expect(getByTitle("plus")).toBeInTheDocument()
  })

  it(" * should render only icon", () => {
    const { container } = renderWithProviders(<Button flavour="hollow" icon="plus" />)
    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("width", "32px", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("height", "32px", {
      modifier: "&&",
    })
  })

  it(" * should render smaller only icon", () => {
    const { container } = renderWithProviders(<Button flavour="hollow" icon="plus" small />)
    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("width", "24px", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("height", "24px", {
      modifier: "&&",
    })
  })

  it(" * should render loading icon", () => {
    const { container, getByText, queryByTitle } = renderWithProviders(
      <Button label="Test prop text" icon="plus" isLoading />
    )

    expect(container.firstChild).toMatchSnapshot()
    expect(getByText(/prop text/)).toBeInTheDocument()
    expect(queryByTitle("plus")).not.toBeInTheDocument()
  })

  it(" * should be clickable", () => {
    const onClickFn = jest.fn()
    const { getByText } = renderWithProviders(<Button label="Test prop text" onClick={onClickFn} />)

    fireEvent.click(getByText(/prop text/))
    expect(onClickFn).toBeCalled()
  })
})

describe("Default Button", () => {
  it(" * should render", () => {
    const { container, getByText } = renderWithProviders(<Button label="Test prop text" />)

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("width", "128px", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("height", "40px", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("background-color", "#00AB44", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#00AB44", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FDFDFD", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("opacity", "1", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("pointer-events", "auto", {
      modifier: "&&",
    })
  })

  it(" * should render for danger", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" danger />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FF4136", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#FF4136", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FDFDFD", {
      modifier: "&&",
    })
  })

  it(" * should render for warning", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" warning />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FFC300", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#FFC300", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FDFDFD", {
      modifier: "&&",
    })
  })

  it(" * should render neutral", () => {
    const { container } = renderWithProviders(<Button label="Test prop text" neutral />)
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#35414A", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#35414A", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FDFDFD", {
      modifier: "&&",
    })
  })
})

describe("Hollow Button", () => {
  it(" * should render", () => {
    const { container, getByText } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" />
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("width", "128px", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("height", "40px", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("background-color", "#FFF", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#00AB44", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#00AB44", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("opacity", "1", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("pointer-events", "auto", {
      modifier: "&&",
    })
  })

  it(" * should render for danger", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" danger />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FFF", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#FF4136", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FF4136", {
      modifier: "&&",
    })
  })

  it(" * should render for warning", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" warning />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FFF", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#FFC300", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#FFC300", {
      modifier: "&&",
    })
  })

  it(" * should render for neutral", () => {
    const { container } = renderWithProviders(
      <Button label="Test prop text" flavour="hollow" neutral />
    )
    const button = container.firstChild
    expect(button).toHaveStyleRule("background-color", "#FFF", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "#35414A", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#35414A", {
      modifier: "&&",
    })
  })
})

describe("Borderless Button", () => {
  it(" * should render", () => {
    const { container, getByText } = renderWithProviders(
      <Button label="Test prop text" flavour="borderless" />
    )

    expect(getByText(/prop text/)).toBeInTheDocument()

    const button = container.firstChild
    expect(button).toMatchSnapshot()
    expect(button).toHaveStyleRule("width", "128px", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("height", "40px", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("background-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("border-color", "rgba(255,255,255,0.0)", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("color", "#00AB44", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("opacity", "1", {
      modifier: "&&",
    })
    expect(button).toHaveStyleRule("pointer-events", "auto", {
      modifier: "&&",
    })
  })

  it(" * should render for danger", () => {
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
    expect(button).toHaveStyleRule("color", "#FF4136", {
      modifier: "&&",
    })
  })

  it(" * should render for warning", () => {
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
    expect(button).toHaveStyleRule("color", "#FFC300", {
      modifier: "&&",
    })
  })

  it(" * should render for neutral", () => {
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
    expect(button).toHaveStyleRule("color", "#35414A", {
      modifier: "&&",
    })
  })
})
