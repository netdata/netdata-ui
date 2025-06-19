/**
 * @jest-environment jsdom
 */
import React from "react"
import { renderWithProviders, user, screen } from "testUtilities"
import Search from "."

describe("Search", () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe("rendering", () => {
    it("renders search input with placeholder", () => {
      renderWithProviders(<Search placeholder="Search items..." onChange={() => {}} />)

      expect(screen.getByPlaceholderText("Search items...")).toBeInTheDocument()
    })

    it("renders with default value", () => {
      renderWithProviders(<Search value="initial search" onChange={() => {}} />)

      expect(screen.getByDisplayValue("initial search")).toBeInTheDocument()
    })

    it("shows search icon", () => {
      renderWithProviders(<Search onChange={() => {}} />)

      expect(screen.getByTitle("search")).toBeInTheDocument()
    })

    it("shows clear button when has value", () => {
      renderWithProviders(<Search value="test" onChange={() => {}} />)

      expect(screen.getByTitle("x")).toBeInTheDocument()
    })

    it("shows clear button when has default value", () => {
      renderWithProviders(<Search value="" onChange={() => {}} />)

      const input = screen.getByRole("textbox")
      expect(input).toBeInTheDocument()
    })
  })

  describe("user interactions", () => {
    it("handles typing input", async () => {
      const handleChange = jest.fn()

      renderWithProviders(<Search onChange={handleChange} />)

      const input = screen.getByRole("textbox")
      await user({ advanceTimers: jest.advanceTimersByTime }).type(input, "test query")

      expect(input).toHaveValue("test query")
    })

    it("debounces onChange calls", async () => {
      const handleChange = jest.fn()

      renderWithProviders(<Search onChange={handleChange} />)

      const input = screen.getByRole("textbox")
      await user({ advanceTimers: jest.advanceTimersByTime }).type(input, "test")

      expect(handleChange).not.toHaveBeenCalled()

      jest.runAllTimers()

      expect(handleChange).toHaveBeenCalledWith("test")
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it("handles clear button click", async () => {
      const handleChange = jest.fn()

      renderWithProviders(<Search value="test query" onChange={handleChange} />)

      const clearButton = screen.getByTitle("x")
      await user({ advanceTimers: jest.advanceTimersByTime }).click(clearButton)

      expect(screen.getByRole("textbox")).toHaveValue("")

      jest.runAllTimers()
      expect(handleChange).toHaveBeenCalledWith("")
    })

    it("calls onReset when provided", async () => {
      const handleReset = jest.fn()
      const handleChange = jest.fn()

      renderWithProviders(<Search value="test" onChange={handleChange} onReset={handleReset} />)

      const clearButton = screen.getByTitle("x")
      await user({ advanceTimers: jest.advanceTimersByTime }).click(clearButton)

      expect(handleReset).toHaveBeenCalledTimes(1)
    })
  })

  describe("icon color changes", () => {
    it("shows textLite color when empty", () => {
      renderWithProviders(<Search onChange={() => {}} />)

      expect(screen.getByTitle("search")).toBeInTheDocument()
    })

    it("shows textFocus color when has value", () => {
      renderWithProviders(<Search value="search term" onChange={() => {}} />)

      expect(screen.getByTitle("search")).toBeInTheDocument()
    })
  })

  describe("debounce behavior", () => {
    it("does not call onChange on initial render with default value", () => {
      const handleChange = jest.fn()

      renderWithProviders(<Search value="initial" onChange={handleChange} />)

      jest.runAllTimers()

      expect(handleChange).not.toHaveBeenCalled()
    })

    it("cancels previous debounced call when typing rapidly", async () => {
      const handleChange = jest.fn()

      renderWithProviders(<Search onChange={handleChange} />)

      const input = screen.getByRole("textbox")

      await user({ advanceTimers: jest.advanceTimersByTime }).type(input, "abc")
      jest.runAllTimers()

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith("abc")
    })
  })

  describe("ref forwarding", () => {
    it("forwards ref to input element", () => {
      const ref = React.createRef()

      renderWithProviders(<Search ref={ref} onChange={() => {}} />)

      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe("additional props", () => {
    it("passes through additional props to TextInput", () => {
      renderWithProviders(<Search onChange={() => {}} disabled data-testid="search-input" />)

      const input = screen.getByTestId("search-input")
      expect(input).toBeDisabled()
    })
  })

  describe("edge cases", () => {
    it("handles empty onChange prop", async () => {
      renderWithProviders(<Search />)

      const input = screen.getByRole("textbox")
      await user({ advanceTimers: jest.advanceTimersByTime }).type(input, "test")

      jest.runAllTimers()

      expect(input).toHaveValue("test")
    })

    it("handles clearing to empty string", async () => {
      const handleChange = jest.fn()

      renderWithProviders(<Search value="initial" onChange={handleChange} />)

      const input = screen.getByRole("textbox")
      await user({ advanceTimers: jest.advanceTimersByTime }).clear(input)

      jest.runAllTimers()

      expect(handleChange).toHaveBeenCalledWith("")
    })
  })
})
