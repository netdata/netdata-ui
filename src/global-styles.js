import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: "IBM Plex Sans", sans-serif;
    background-color: ${props => props.theme.colors.mainBackground};
  }
  * {
      box-sizing: border-box;
  }
`
