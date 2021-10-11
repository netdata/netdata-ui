import backdropBlurMixin from "./backdropBlur"

it("renders", () => {
  expect(backdropBlurMixin({})).toBe("")
})

it("renders boolean backdrop blur", () => {
  expect(backdropBlurMixin({ backdropBlur: true })).toBe("backdrop-filter: blur(10px);")
})

it("renders number backdrop blur", () => {
  expect(backdropBlurMixin({ backdropBlur: 10 })).toBe("backdrop-filter: blur(10px);")
})

it("renders string backdrop blur", () => {
  expect(backdropBlurMixin({ backdropBlur: "10px" })).toBe("backdrop-filter: blur(10px);")
})
