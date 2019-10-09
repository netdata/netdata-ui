import React, { SyntheticEvent } from "react"
import { FormattedMessage, defineMessages } from "react-intl"

const messages = defineMessages({
  mock: {
    id: "mock.message",
    defaultMessage: "Click Me (en - default)",
  },
})

type MockPropsT = { test?: string; onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void }

export const Mock = ({ test = "default", onClick = () => {} }: MockPropsT) => (
  <>
    <span>{test}</span>
    <br />
    <button type="button" onClick={onClick}>
      <FormattedMessage {...messages.mock} />
    </button>
  </>
)
