import copy from "./copyToClipboard"

describe("copy", () => {
  beforeEach(() => {
    // mock navigator clipboard with jest
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(true),
      },
    })
  })

  it("should copy the text to clipboard", async () => {
    const text = "Hello, world!"
    expect(await copy(text)).toBe(true)
  })

  it("should return false if the input is not a string", async () => {
    const text = 123
    expect(await copy(text)).toBe(false)
  })

  it("should return false if navigator.clipboard is not available", async () => {
    const text = "Hello, world!"
    navigator.clipboard = undefined
    expect(await copy(text)).toBe(false)
  })

  it("should return false if document.execCommand('copy') fails", async () => {
    const text = "Hello, world!"
    navigator.clipboard = undefined
    document.execCommand = jest.fn().mockReturnValue(false)
    expect(await copy(text)).toBe(false)
  })
})
