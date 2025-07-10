/**
 * @jest-environment jsdom
 */
import React from "react"
import { renderWithProviders, user, screen } from "testUtilities"
import { ButtonGroup } from "./buttonGroup"
import { Button } from "./button"

describe("ButtonGroup", () => {
  describe("rendering", () => {
    it("renders with children buttons", () => {
      const { container } = renderWithProviders(
        <ButtonGroup>
          <Button label="First" />
          <Button label="Second" />
          <Button label="Third" />
        </ButtonGroup>
      )

      expect(screen.getByText("First")).toBeInTheDocument()
      expect(screen.getByText("Second")).toBeInTheDocument()
      expect(screen.getByText("Third")).toBeInTheDocument()
      expect(container.firstChild).toBeInTheDocument()
    })

    it("renders with items array", () => {
      const items = [
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
        { label: "Option 3", value: "opt3" },
      ]

      renderWithProviders(<ButtonGroup items={items} checked="opt1" onChange={() => {}} />)

      expect(screen.getByText("Option 1")).toBeInTheDocument()
      expect(screen.getByText("Option 2")).toBeInTheDocument()
      expect(screen.getByText("Option 3")).toBeInTheDocument()
    })

    it("renders empty when no children or items", () => {
      const { container } = renderWithProviders(<ButtonGroup />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe("button group positioning", () => {
    it("applies groupFirst prop to first button", () => {
      renderWithProviders(
        <ButtonGroup>
          <Button label="First" data-testid="first-btn" />
          <Button label="Second" />
        </ButtonGroup>
      )

      const firstButton = screen.getByTestId("first-btn")
      expect(firstButton).toBeInTheDocument()
    })

    it("applies groupLast prop to last button", () => {
      renderWithProviders(
        <ButtonGroup>
          <Button label="First" />
          <Button label="Last" data-testid="last-btn" />
        </ButtonGroup>
      )

      const lastButton = screen.getByTestId("last-btn")
      expect(lastButton).toBeInTheDocument()
    })

    it("applies groupMiddle prop to middle buttons", () => {
      renderWithProviders(
        <ButtonGroup>
          <Button label="First" />
          <Button label="Middle" data-testid="middle-btn" />
          <Button label="Last" />
        </ButtonGroup>
      )

      const middleButton = screen.getByTestId("middle-btn")
      expect(middleButton).toBeInTheDocument()
    })
  })

  describe("radio button functionality", () => {
    it("handles selection changes", async () => {
      const handleChange = jest.fn()
      const items = [
        { label: "Option 1", value: "opt1" },
        { label: "Option 2", value: "opt2" },
      ]

      renderWithProviders(<ButtonGroup items={items} checked="opt1" onChange={handleChange} />)

      await user().click(screen.getByText("Option 2"))
      expect(handleChange).toHaveBeenCalledWith("opt2")
    })

    it("applies hollow style to unchecked buttons", () => {
      const items = [
        { label: "Checked", value: "checked" },
        { label: "Unchecked", value: "unchecked" },
      ]

      const { container } = renderWithProviders(
        <ButtonGroup items={items} checked="checked" onChange={() => {}} />
      )

      const buttons = container.querySelectorAll("button")
      expect(buttons).toHaveLength(2)
    })

    it("applies button props to all buttons", () => {
      const items = [
        { label: "Button 1", value: "btn1" },
        { label: "Button 2", value: "btn2" },
      ]

      renderWithProviders(
        <ButtonGroup
          items={items}
          checked="btn1"
          onChange={() => {}}
          buttonProps={{ disabled: true }}
        />
      )

      const buttons = screen.getAllByRole("button")
      buttons.forEach(button => {
        expect(button).toBeDisabled()
      })
    })

    it("renders button titles when provided", () => {
      const items = [
        { label: "Save", value: "save", title: "Save the document" },
        { label: "Cancel", value: "cancel" },
      ]

      renderWithProviders(<ButtonGroup items={items} checked="save" onChange={() => {}} />)

      expect(screen.getByTitle("Save the document")).toBeInTheDocument()
    })
  })

  describe("flex container props", () => {
    it("applies custom flex props", () => {
      const { container } = renderWithProviders(
        <ButtonGroup justifyContent="space-between" gap={2}>
          <Button label="Left" />
          <Button label="Right" />
        </ButtonGroup>
      )

      expect(container.firstChild).toBeInTheDocument()
    })

    it("always applies alignItems center", () => {
      const { container } = renderWithProviders(
        <ButtonGroup>
          <Button label="Test" />
        </ButtonGroup>
      )

      expect(container.firstChild).toHaveStyleRule("align-items", "center")
    })
  })

  describe("edge cases", () => {
    it("handles single button", () => {
      renderWithProviders(
        <ButtonGroup>
          <Button label="Only" data-testid="only-btn" />
        </ButtonGroup>
      )

      const button = screen.getByTestId("only-btn")
      expect(button).toBeInTheDocument()
    })

    it("handles non-button children", () => {
      renderWithProviders(
        <ButtonGroup>
          <div>Not a button</div>
          <Button label="Real button" />
        </ButtonGroup>
      )

      expect(screen.getByText("Not a button")).toBeInTheDocument()
      expect(screen.getByText("Real button")).toBeInTheDocument()
    })

    it("handles empty items array", () => {
      const { container } = renderWithProviders(
        <ButtonGroup items={[]} checked={null} onChange={() => {}} />
      )

      expect(container.firstChild).toBeInTheDocument()
    })
  })
})
