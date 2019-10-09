import React, { SyntheticEvent } from "react"
import { FormattedMessage, defineMessages } from "react-intl"
import styled from "styled-components"
import { getOrElse, gapWith } from "../../utils"

const messages = defineMessages({
  mock: {
    id: "mock.message",
    defaultMessage: "Click Me (en - default)",
  },
})

export type MockPropsT = { test?: string; onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void }

const MockSpan = styled.span`
  color: ${getOrElse("fontColor", "#fff")};
  padding: ${gapWith("20 + _")}px;
`

export const Mock = ({ test = "default", onClick = () => {} }: MockPropsT) => (
  <>
    <MockSpan>{test}</MockSpan>
    <br />
    <button type="button" onClick={onClick}>
      <FormattedMessage {...messages.mock} />
    </button>
  </>
)
