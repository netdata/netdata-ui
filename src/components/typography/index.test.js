import React from "react"
import { renderWithProviders } from "testUtilities"
import { DefaultTheme as theme } from "@/theme/default"
import {
  H0,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  TextHuge,
  TextBigger,
  TextBig,
  Text,
  TextSmall,
  TextMicro,
  TextNano,
  TextFemto,
  List,
  ListItem,
} from "./index"

const headers = [H0, H1, H2, H3, H4, H5, H6]
const texts = [TextHuge, TextBigger, TextBig, Text, TextSmall, TextMicro, TextNano, TextFemto]
const typographies = [...headers, ...texts]

const list = [List, ListItem]

it("renders", () => {
  typographies.forEach(Component => {
    const { container, unmount } = renderWithProviders(<Component>Typo content</Component>)
    expect(container.firstChild).toHaveTextContent("Typo content")
    unmount()
  })
})

it("renders headers as semibold weight", () => {
  headers.forEach(Component => {
    const { container, unmount } = renderWithProviders(<Component>Typo content</Component>)
    expect(container.firstChild).toHaveStyleRule("font-weight", "600")
    unmount()
  })
})

it("renders strong texts as semibold weight", () => {
  texts.forEach(Component => {
    const { container, unmount } = renderWithProviders(<Component strong>Typo content</Component>)
    expect(container.firstChild).toHaveStyleRule("font-weight", "600")
    unmount()
  })
})

it("renders headers with strong false as normal weight", () => {
  const { container } = renderWithProviders(<H1 strong={false}>Typo content</H1>)
  expect(container.firstChild).toHaveStyleRule("font-weight", "normal")
})

it("renders the heading and text size scale", () => {
  const scale = [
    [H0, "27px", "32px"],
    [H1, "25px", "28px"],
    [H2, "23px", "26px"],
    [H3, "21px", "24px"],
    [H4, "17px", "21px"],
    [H5, "15px", "18px"],
    [H6, "13px", "14px"],
    [TextHuge, "25px", "32px"],
    [TextBigger, "17px", "18px"],
    [TextBig, "15px", "20px"],
    [Text, "13px", "16px"],
    [TextSmall, "12px", "14px"],
    [TextMicro, "11px", "13px"],
    [TextNano, "9px", "10px"],
    [TextFemto, "8px", "10px"],
  ]
  scale.forEach(([Component, fontSize, lineHeight]) => {
    const { container, unmount } = renderWithProviders(<Component>Typo content</Component>)
    expect(container.firstChild).toHaveStyleRule("font-size", fontSize)
    expect(container.firstChild).toHaveStyleRule("line-height", lineHeight)
    unmount()
  })
})

it("preserves explicit font size and line height overrides", () => {
  const { getByText } = renderWithProviders(
    <>
      <Text fontSize="18px">Inherited line box</Text>
      <TextSmall fontSize="14px" lineHeight="19px">Explicit line box</TextSmall>
    </>
  )
  expect(getByText("Inherited line box")).toHaveStyleRule("font-size", "18px")
  expect(getByText("Inherited line box")).toHaveStyleRule("line-height", "18px")
  expect(getByText("Explicit line box")).toHaveStyleRule("font-size", "14px")
  expect(getByText("Explicit line box")).toHaveStyleRule("line-height", "19px")
})

it("renders texts as normal weight", () => {
  texts.forEach(Component => {
    const { container, unmount } = renderWithProviders(<Component>Typo content</Component>)
    expect(container.firstChild).toHaveStyleRule("font-weight", "normal")
    unmount()
  })
})

it("renders typography default mixins", () => {
  typographies.forEach(Component => {
    const { container, unmount } = renderWithProviders(<Component>Typo content</Component>)

    const expectedColor = headers.includes(Component) ? theme.colors.main : theme.colors.text
    expect(container.firstChild).toHaveStyleRule("color", expectedColor)
    expect(container.firstChild).not.toHaveStyleRule("align-self")
    expect(container.firstChild).not.toHaveStyleRule("margin")
    expect(container.firstChild).not.toHaveStyleRule("padding")
    expect(container.firstChild).not.toHaveStyleRule("text-align")
    expect(container.firstChild).not.toHaveStyleRule("truncate")
    expect(container.firstChild).not.toHaveStyleRule("word-break")
    expect(container.firstChild).toHaveStyleRule("text-transform: none")

    unmount()
  })
})

it("renders typography mixins", () => {
  typographies.forEach(Component => {
    const { container, unmount } = renderWithProviders(
      <Component
        strong
        color="disabled"
        margin={[2, 3]}
        padding={[0]}
        alignSelf="end"
        textAlign="center"
        wordBreak="break-all"
        textTransform="uppercase"
        truncate
      >
        Typo content
      </Component>
    )

    expect(container.firstChild).toHaveStyleRule("color", theme.colors.disabled)
    expect(container.firstChild).toHaveStyleRule("font-weight", "600")
    expect(container.firstChild).toHaveStyleRule("align-self", "flex-end")
    expect(container.firstChild).toHaveStyleRule("margin", "8px 12px")
    expect(container.firstChild).toHaveStyleRule("padding", "0")
    expect(container.firstChild).toHaveStyleRule("text-align", "center")
    expect(container.firstChild).toHaveStyleRule("word-break", "break-all")
    expect(container.firstChild).toHaveStyleRule("text-transform", "uppercase")

    unmount()
  })
})

it("renders list mixins", () => {
  list.forEach(Component => {
    const { container, unmount } = renderWithProviders(
      <Component margin={[2, 3]} padding={[0]} alignSelf="end" />
    )

    expect(container.firstChild).toHaveStyleRule("align-self", "flex-end")
    expect(container.firstChild).toHaveStyleRule("margin", "8px 12px")
    expect(container.firstChild).toHaveStyleRule("padding", "0")

    unmount()
  })
})

describe("heading colour", () => {
  it.each([H0, H1, H2, H3, H4, H5, H6])("headings default to the main ink colour", Heading => {
    const { container } = renderWithProviders(<Heading>Node health</Heading>)
    expect(container.firstChild).toHaveStyleRule("color", theme.colors.main)
  })

  it("keeps body text on the text colour", () => {
    const { container } = renderWithProviders(<Text>12 nodes live</Text>)
    expect(container.firstChild).toHaveStyleRule("color", theme.colors.text)
  })

  it("still lets a heading take an explicit colour", () => {
    const { container } = renderWithProviders(<H3 color="textLite">Node health</H3>)
    expect(container.firstChild).toHaveStyleRule("color", theme.colors.textLite)
  })
})
