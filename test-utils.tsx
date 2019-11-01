import React, { FC } from "react"
import { render } from "@testing-library/react"
import { IntlProvider, createIntl } from "react-intl"
import "@testing-library/jest-dom/extend-expect"
import { ThemeProvider } from "styled-components"
import { ThemeAtom } from "./src/theme/declarations"

type ToBeTestedT<T> = FC<T>
export function testWrapper<T, S = {}>(
  ToBeTested: ToBeTestedT<T>,
  props: T,
  theme: ThemeAtom,
  locale: any
) {
  return render(
    <ThemeProvider theme={theme}>
      <IntlProvider {...createIntl({ locale: "en", defaultLocale: "en", messages: locale })}>
        <ToBeTested {...props} />
      </IntlProvider>
    </ThemeProvider>
  )
}
