import React, { SyntheticEvent } from "react"
import { FormattedMessage, defineMessages } from "react-intl"
import { TextContainer } from "./styled"

const messages = defineMessages({
  mock: {
    id: "mock.message",
    defaultMessage: "Click Me (en - default)",
  },
})

export type MockPropsT = { text?: string; onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void }

export const Mock = ({ text = "default", onClick = () => {} }: MockPropsT) => (
  <>
    <TextContainer>{text}</TextContainer>
    <br />
    <button type="button" onClick={onClick}>
      <FormattedMessage {...messages.mock} />
    </button>
  </>
)
