import React from "react"
import { FormattedMessage, defineMessages } from "react-intl"
import { TextContainer } from "./styled"

const messages = defineMessages({
  mock: {
    id: "mock.message",
    defaultMessage: "Click Me (en - default)",
  },
})

export const Mock = ({ text = "default", onClick = () => {} }: MockPropsT) => (
  <>
    <TextContainer>{text}</TextContainer>
    <br />
    <button type="button" onClick={onClick}>
      <FormattedMessage {...messages.mock} />
    </button>
  </>
)
