import { renderWithProviders, screen } from "testUtilities"
import userEvent from "@testing-library/user-event"
import { DefaultTheme, DarkTheme } from "@/theme"

import Modal, { ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from "./index"

describe("Modal", () => {
  it("Should render Modal", () => {
    renderWithProviders(
      <Modal>
        <ModalContent>
          <ModalHeader>
            Header
            <ModalCloseButton testId="close-button" />
          </ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter>Footer</ModalFooter>
        </ModalContent>
      </Modal>
    )
    expect(screen.getByText("Header")).toBeInTheDocument()
    expect(screen.getByText("Body")).toBeInTheDocument()
    expect(screen.getByTestId("close-button")).toBeInTheDocument()
    expect(screen.getByText("Footer")).toBeInTheDocument()
  })

  it("Should click the close button", async () => {
    const onClose = jest.fn()
    renderWithProviders(
      <Modal>
        <ModalContent>
          <ModalHeader>
            Header
            <ModalCloseButton onClose={onClose} testId="close-button" />
          </ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter>Footer</ModalFooter>
        </ModalContent>
      </Modal>
    )

    await userEvent.click(screen.getByTestId("close-button"))

    expect(onClose).toHaveBeenCalled()
  })
})

describe("Modal surface and rhythm", () => {
  const renderModal = (props = {}, options) =>
    renderWithProviders(
      <Modal>
        <ModalContent testId="content" {...props.content}>
          <ModalHeader testId="header" {...props.header}>
            Header
            <ModalCloseButton testId="close" onClose={() => {}} />
          </ModalHeader>
          <ModalBody testId="body">Body</ModalBody>
          <ModalFooter testId="footer">Footer</ModalFooter>
        </ModalContent>
      </Modal>,
      options
    )

  it("rounds the content to the 8px modal radius", () => {
    renderModal()
    expect(screen.getByTestId("content")).toHaveStyleRule("border-radius", "8px")
  })

  it("still honours a round override on the content", () => {
    renderModal({ content: { round: 1 } })
    expect(screen.getByTestId("content")).toHaveStyleRule("border-radius", "4px")
  })

  it("outlines the content with a 1px theme border", () => {
    renderModal()
    expect(screen.getByTestId("content")).toHaveStyleRule(
      "border",
      `1px solid ${DefaultTheme.colors.border}`
    )
  })

  it("lifts the content with the shared modal shadow in both themes", () => {
    const { unmount } = renderModal()
    const light = DefaultTheme.colors.dropdownShadow
    expect(screen.getByTestId("content")).toHaveStyleRule(
      "box-shadow",
      `0 16px 40px -8px ${light},0 2px 6px ${light}`
    )
    unmount()

    renderModal({}, { theme: DarkTheme })
    const dark = DarkTheme.colors.dropdownShadow
    expect(screen.getByTestId("content")).toHaveStyleRule(
      "box-shadow",
      `0 16px 40px -8px ${dark},0 2px 6px ${dark}`
    )
  })

  it("rounds only the header top corners so its tint follows the card edge", () => {
    renderModal()
    const header = screen.getByTestId("header")
    expect(header).toHaveStyleRule("border-top-left-radius", "7px")
    expect(header).toHaveStyleRule("border-top-right-radius", "7px")
    expect(header).not.toHaveStyleRule("border-bottom-left-radius")
  })

  it("keeps the header tint and lets consumers override it", () => {
    const { unmount } = renderModal()
    expect(screen.getByTestId("header")).toHaveStyleRule(
      "background-color",
      DefaultTheme.colors.modalHeaderBackground
    )
    unmount()

    renderModal({ header: { background: "modalBackground" } })
    expect(screen.getByTestId("header")).toHaveStyleRule(
      "background-color",
      DefaultTheme.colors.modalBackground
    )
  })

  it("centres header content vertically", () => {
    renderModal()
    expect(screen.getByTestId("header")).toHaveStyleRule("align-items", "center")
  })

  it("uses 12px vertical / 16px horizontal section spacing", () => {
    renderModal()
    expect(screen.getByTestId("header")).toHaveStyleRule("padding", "12px 16px")
    expect(screen.getByTestId("body")).toHaveStyleRule("padding", "12px 16px")
    expect(screen.getByTestId("footer")).toHaveStyleRule("padding", "12px 0")
  })

  it("keeps the footer divider and right alignment", () => {
    renderModal()
    const footer = screen.getByTestId("footer")
    expect(footer).toHaveStyleRule("border-top", `1px solid ${DefaultTheme.colors.borderSecondary}`)
    expect(footer).toHaveStyleRule("justify-content", "end")
  })

  it("places the close button on the header padding grid", () => {
    renderModal()
    const close = screen.getByTestId("close")
    expect(close).toHaveStyleRule("position", "absolute")
    expect(close).toHaveStyleRule("top", "10px")
    expect(close).toHaveStyleRule("right", "12px")
  })

  it("closes from the keyboard", async () => {
    const onClose = jest.fn()
    renderWithProviders(
      <Modal>
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton onClose={onClose} testId="close" />
          </ModalHeader>
        </ModalContent>
      </Modal>
    )
    screen.getByTestId("close").focus()
    await userEvent.keyboard("{Enter}")
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
