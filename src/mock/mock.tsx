import React from "react"

export interface StateProps {
  test: string
}

type MockPropsT = { test?: string }

export const Mock = ({ test = "default" }: MockPropsT): JSX.Element => <span>{test}</span>
