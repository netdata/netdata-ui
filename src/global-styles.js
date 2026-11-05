import "@fontsource/ibm-plex-sans/latin-400.css"
import "@fontsource/ibm-plex-sans/latin-500.css"
import "@fontsource/ibm-plex-sans/latin-600.css"
import "@fontsource/ibm-plex-sans/latin-700.css"
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
