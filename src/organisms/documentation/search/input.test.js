import { renderWithProviders, screen, fireEvent, act } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import SearchInput from "./input"

const { colors } = DefaultTheme

const renderInput = (props = {}) =>
  renderWithProviders(
    <SearchInput value="" setSearchTerm={jest.fn()} setSearchView={jest.fn()} {...props} />
  )

const getIcon = container => container.querySelector("svg")

describe("SearchInput", () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it("keeps the placeholder copy", () => {
    renderInput()
    expect(screen.getByPlaceholderText("Search Netdata’s docs & community")).toBeInTheDocument()
  })

  it("shows a legible search icon while empty", () => {
    const { container } = renderInput()
    expect(getIcon(container)).toHaveStyleRule("fill", colors.textLite)
  })

  it("darkens the icon once there is a query", () => {
    const { container } = renderInput()
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "alerts" } })
    expect(getIcon(container)).toHaveStyleRule("fill", colors.text)
  })

  it("switches to the search view after 3+ characters, debounced", () => {
    const setSearchTerm = jest.fn()
    const setSearchView = jest.fn()
    renderInput({ setSearchTerm, setSearchView })
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "al" } })
    act(() => jest.advanceTimersByTime(300))
    expect(setSearchView).not.toHaveBeenCalled()
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "alerts" } })
    act(() => jest.advanceTimersByTime(300))
    expect(setSearchTerm).toHaveBeenLastCalledWith("alerts")
    expect(setSearchView).toHaveBeenCalled()
  })
})
