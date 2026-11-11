import { renderWithProviders, screen, fireEvent, act } from "testUtilities"
import { DefaultTheme } from "@/theme"
import CopyToClipboard from "./index"

const writeText = jest.fn()

beforeAll(() => {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true })
})

beforeEach(() => {
  jest.useFakeTimers()
  writeText.mockReset()
  writeText.mockResolvedValue(undefined)
})

afterEach(() => jest.useRealTimers())

const renderCopy = props =>
  renderWithProviders(
    <CopyToClipboard text="system.cpu" {...props}>
      <span>copy me</span>
    </CopyToClipboard>
  )

const click = async () => {
  await act(async () => {
    fireEvent.click(screen.getByText("copy me"), { clientX: 100, clientY: 100 })
  })
}

// The visual pill is decorative (aria-hidden); the announcement lives in a persistent status region.
const getPill = () => document.querySelector('[aria-hidden="true"]:has([data-label])')

describe("CopyToClipboard behaviour", () => {
  it("renders the result text once, so consumers can query it unambiguously", async () => {
    renderCopy()
    await click()

    expect(screen.getAllByText("Copied!")).toHaveLength(1)
    expect(getPill().querySelector("[data-label]")).toHaveAttribute("data-label", "Copied!")
  })

  it("renders an empty polite live region before any copy", () => {
    renderCopy()

    const status = screen.getByRole("status")
    expect(status).toHaveAttribute("aria-live", "polite")
    expect(status).toBeEmptyDOMElement()
  })

  it("copies the text and announces it in the existing live region", async () => {
    const onCopy = jest.fn()
    renderCopy({ onCopy })
    const status = screen.getByRole("status")

    await click()

    expect(writeText).toHaveBeenCalledWith("system.cpu")
    expect(onCopy).toHaveBeenCalledWith("system.cpu")
    expect(screen.getByRole("status")).toBe(status)
    expect(status).toHaveTextContent("Copied!")
  })

  it("keeps the visual pill out of the accessibility tree", async () => {
    renderCopy()
    await click()

    expect(getPill()).toBeInTheDocument()
    expect(getPill()).not.toHaveAttribute("role")
    expect(screen.getAllByRole("status")).toHaveLength(1)
  })

  it("reports failures", async () => {
    const onError = jest.fn()
    writeText.mockRejectedValue(new Error("denied"))
    renderCopy({ onError })

    await click()

    expect(screen.getByRole("status")).toHaveTextContent("Failed to copy!")
    expect(onError).toHaveBeenCalledWith(expect.any(Error))
  })

  it("keeps the message up long enough to read, then clears it", async () => {
    renderCopy()

    await click()
    act(() => jest.advanceTimersByTime(1100))
    expect(getPill()).toBeInTheDocument()

    act(() => jest.advanceTimersByTime(100))
    expect(screen.queryByText("Copied!")).not.toBeInTheDocument()
    expect(screen.getByRole("status")).toBeEmptyDOMElement()
  })

  it("ignores clicks while feedback is showing", async () => {
    renderCopy()

    await click()
    await click()

    expect(writeText).toHaveBeenCalledTimes(1)
  })

  it("does nothing when disabled", async () => {
    renderCopy({ disabled: true })

    await click()

    expect(writeText).not.toHaveBeenCalled()
    expect(screen.getByRole("status")).toBeEmptyDOMElement()
  })
})

describe("CopyToClipboard feedback styles", () => {
  it("hides the live region visually without removing it", () => {
    renderCopy()
    const status = screen.getByRole("status")

    expect(status).toHaveStyleRule("position", "absolute")
    expect(status).toHaveStyleRule("clip", "rect(0 0 0 0)")
  })

  it("shows the message on a floating pill", async () => {
    renderCopy()
    await click()
    const pill = getPill()

    expect(pill).toHaveStyleRule("background-color", DefaultTheme.colors.dropdown)
    expect(pill).toHaveStyleRule("border", `1px solid ${DefaultTheme.colors.border}`)
    expect(pill).toHaveStyleRule("border-radius", "6px")
    expect(pill.querySelector("span")).toHaveStyleRule("color", DefaultTheme.colors.main)
  })

  it("marks success and failure with an icon, not colour alone", async () => {
    renderCopy()
    await click()

    expect(getPill().querySelector("svg")).toHaveStyleRule("fill", DefaultTheme.colors.success)
  })

  it("marks failure with the error colour", async () => {
    writeText.mockRejectedValue(new Error("denied"))
    renderCopy()
    await click()

    expect(getPill().querySelector("svg")).toHaveStyleRule("fill", DefaultTheme.colors.error)
  })

  it("fades in, holds and fades out over the visible time", async () => {
    renderCopy()
    await click()
    const pill = getPill()

    expect(pill).toHaveStyleRule("animation", expect.stringMatching(/1200ms ease-out forwards/))
    expect(pill).toHaveStyleRule("animation-name", expect.any(String), {
      media: "(prefers-reduced-motion: reduce)",
    })
  })
})

it("eases the hover dim on the wrapper and honours reduced motion", () => {
  renderCopy()
  const wrapper = screen.getByText("copy me").parentNode

  expect(wrapper).toHaveStyleRule("transition", "opacity 120ms ease-out")
  expect(wrapper).toHaveStyleRule("transition", "none", {
    media: "(prefers-reduced-motion: reduce)",
  })
})

it("lifts the pill by half a size unit on the way in and out", async () => {
  renderCopy()
  await click()
  const css = Array.from(document.querySelectorAll("style"))
    .map(node => node.textContent)
    .join("")

  expect(css).toMatch(/translateY\(4px\)/)
  expect(css).toMatch(/translateY\(-4px\)/)
})
