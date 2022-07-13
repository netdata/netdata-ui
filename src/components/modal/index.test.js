import React from "react"
import { renderWithProviders, screen } from "testUtilities"
import userEvent from "@testing-library/user-event"

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
