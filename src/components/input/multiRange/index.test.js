import MultiRangeInput from "."
import { renderWithProviders, screen, fireEvent } from "testUtilities"
import { DefaultTheme } from "@/theme/default"
import { DarkTheme } from "@/theme/dark"

const setup = (props, options) => renderWithProviders(<MultiRangeInput {...props} />, options)

describe("MultiRangeInput component", () => {
  test("should render component", () => {
    setup()
    expect(screen.getByTestId("multiRangeInput")).toBeInTheDocument()
    expect(screen.getByTestId("minRangeInput")).toBeInTheDocument()
    expect(screen.getByTestId("maxRangeInput")).toBeInTheDocument()
    expect(screen.getByTestId("multiRange-slider")).toBeInTheDocument()
    expect(screen.getByTestId("multiRange-sliderTrack")).toBeInTheDocument()
    expect(screen.getByTestId("multiRange-values")).toBeInTheDocument()
    expect(screen.getByTestId("multiRange-minValue")).toBeInTheDocument()
    expect(screen.getByTestId("multiRange-maxValue")).toBeInTheDocument()
  })

  test("shows initial values", () => {
    setup({ initMin: 20, initMax: 70 })
    expect(screen.getByTestId("multiRange-minValue")).toHaveTextContent("20")
    expect(screen.getByTestId("multiRange-maxValue")).toHaveTextContent("70")
  })

  test("keeps min below max while dragging", () => {
    const onInput = jest.fn()
    setup({ initMin: 20, initMax: 70, onInput })
    fireEvent.input(screen.getByTestId("minRangeInput"), { target: { value: "90" } })
    expect(screen.getByTestId("multiRange-minValue")).toHaveTextContent("69")
    expect(onInput).toHaveBeenCalledWith({ max: 70, min: "69" })
  })

  test("track is 4px with a neutral unfilled color", () => {
    setup()
    const track = screen.getByTestId("multiRange-sliderTrack")
    expect(track).toHaveStyleRule("height", "4px")
    expect(track).toHaveStyleRule("border-radius", "2px")
    expect(track).toHaveStyleRule("background-color", DefaultTheme.colors.neutralHighlight)
  })

  test("lifts the dark unfilled track one surface step above the border", () => {
    setup({}, { theme: DarkTheme })
    expect(screen.getByTestId("multiRange-sliderTrack")).toHaveStyleRule(
      "background-color",
      DarkTheme.colors.neutralHighlight
    )
  })

  test("values use tabular numerals", () => {
    setup()
    expect(screen.getByTestId("multiRange-values")).toHaveStyleRule(
      "font-variant-numeric",
      "tabular-nums"
    )
  })
})
