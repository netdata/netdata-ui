import {
  makeH0,
  makeH1,
  makeH2,
  makeH3,
  makeH4,
  makeH5,
  makeH6,
  makeTypography,
  makeFemto,
  makeNano,
  makeMicro,
  makeSmall,
  makeText,
  makeBig,
  makeBigger,
  makeHuge,
} from "./typography"

export {
  makeTypography,
  makeH0,
  makeH1,
  makeH2,
  makeH3,
  makeH4,
  makeH5,
  makeH6,
  makeFemto,
  makeNano,
  makeMicro,
  makeSmall,
  makeText,
  makeBig,
  makeBigger,
  makeHuge,
}

export const H0 = makeH0("h1")
export const H1 = makeH1("h1")
export const H2 = makeH2("h2")
export const H3 = makeH3("h3")
export const H4 = makeH4("h4")
export const H5 = makeH5("h5")
export const H6 = makeH6("h6")

export const TextFemto = makeFemto("span")
export const TextNano = makeNano("span")
export const TextMicro = makeMicro("span")
export const TextSmall = makeSmall("span")
export const Text = makeText("span")
export const TextBig = makeBig("span")
export const TextBigger = makeBigger("span")
export const TextHuge = makeHuge("span")

export { List, ListItem } from "./list"
