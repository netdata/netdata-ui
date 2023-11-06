import cursor from "./cursor"

describe("cursor", () => {
  it("renders nothing", () => {
    expect(cursor({})).toBe("")
  })

  it("renders cursor: pointer", () => {
    expect(cursor({ cursor: "pointer" })).toBe("cursor: pointer;")
  })

  it("renders cursor invalid", () => {
    expect(cursor({ cursor: "invalid" })).toBe("cursor: invalid;")
  })
})
