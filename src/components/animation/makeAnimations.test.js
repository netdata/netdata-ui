import makeAnimations from "./makeAnimations"

const match = (css, value) =>
  expect(
    css
      .filter(e => typeof e === "string")
      .join("")
      .trim()
  ).toBe(value)

it("Creates animation rules based on the transition", () => {
  const animation = makeAnimations({ toggle: "height: 200px;" })
  const value = "animation: 200ms ;"
  match(animation.entering, value)
  match(animation.exiting, value)
})

it("Creates animation rules based on the transition", () => {
  const animation = makeAnimations({
    toggle: "height: 200px;",
    timing: "easy-in",
    speed: 250,
    transformOrigin: "top",
  })
  const value = "transform-origin: top; animation: 250ms easy-in;"
  match(animation.entering, value)
  match(animation.exiting, value)
})
