import { createGlobalStyle } from "styled-components"
import { stylesReset } from "./styles-reset"

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'IBM Plex Sans', sans-serif;
  }
  ${stylesReset}
`
