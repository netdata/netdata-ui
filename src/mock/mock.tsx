import React from "react"
import { FormattedMessage, defineMessages } from "react-intl"

const messages = defineMessages({
  mock: {
    id: "mock.message",
    defaultMessage: "Click Me (en - default)",
  },
})

export interface StateProps {
  test: string
}

type MockPropsT = { test?: string }

export const Mock = ({ test = "default" }: MockPropsT) => (
  <>
    <span>{test}</span>
    <br />
    <button type="button">
      <FormattedMessage {...messages.mock} />
    </button>
  </>
)
