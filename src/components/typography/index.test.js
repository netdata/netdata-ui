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

it("renders headers as bold weight", () => {
  headers.forEach(Component => {
    const { container, unmount } = renderWithProviders(<Component>Typo content</Component>)
    expect(container.firstChild).toHaveStyleRule("font-weight", "bold")
    unmount()
  })
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

    expect(container.firstChild).toHaveStyleRule("color", theme.colors.text)
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
    expect(container.firstChild).toHaveStyleRule("font-weight", "bold")
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
