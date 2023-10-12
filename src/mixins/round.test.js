import { DefaultTheme as theme } from "@/theme/default"
import styledRound from "./round"

it("renders", () => {
  expect(styledRound({ theme })).toBe("")
})

it("renders default round", () => {
  expect(styledRound({ theme, round: true })).toBe(
    `border-radius: ${theme.constants.SIZE_SUB_UNIT}px;`
  )
})

it("renders fixed round", () => {
  expect(styledRound({ theme, round: 2 })).toBe(
    `border-radius: ${theme.constants.SIZE_SUB_UNIT * 2}px;`
  )
})

it("renders string", () => {
  expect(styledRound({ theme, round: "10rem" })).toBe(`border-radius: 10rem;`)
})

it("renders top round", () => {
  expect(styledRound({ theme, round: { side: "top", size: 3 } })).toBe(`
    border-top-left-radius: ${theme.constants.SIZE_SUB_UNIT * 3}px;
    border-top-right-radius: ${theme.constants.SIZE_SUB_UNIT * 3}px;
  `)
})

it("renders left round", () => {
  expect(styledRound({ theme, round: { side: "left", size: 3 } })).toBe(`
    border-top-left-radius: ${theme.constants.SIZE_SUB_UNIT * 3}px;
    border-bottom-left-radius: ${theme.constants.SIZE_SUB_UNIT * 3}px;
  `)
})

it("renders bottom round", () => {
  expect(styledRound({ theme, round: { side: "bottom", size: 3 } })).toBe(`
    border-bottom-left-radius: ${theme.constants.SIZE_SUB_UNIT * 3}px;
    border-bottom-right-radius: ${theme.constants.SIZE_SUB_UNIT * 3}px;
  `)
})

it("renders right round", () => {
  expect(styledRound({ theme, round: { side: "right", size: 3 } })).toBe(`
    border-top-right-radius: ${theme.constants.SIZE_SUB_UNIT * 3}px;
    border-bottom-right-radius: ${theme.constants.SIZE_SUB_UNIT * 3}px;
  `)
})

it("renders invalid", () => {
  expect(styledRound({ theme, round: null })).toBe("")
})
