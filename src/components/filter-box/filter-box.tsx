import React from "react"

import ReactFilterBox from "react-filter-box"
import "react-filter-box/lib/react-filter-box.css"

import { Container } from "./styled"

interface Expression {
  conditionType?: "OR" | "AND"
  category?: string
  operator?: string
  value?: string
  expressions?: Expression[]
}

interface Option {
  columnField: string
  type: "text" | "selection"
  columnText?: string
}

interface Props {
  className?: string
  data?: any
  options: Option[]
  strictMode?: boolean
  onChange?: (
    query: string,
    expressions: Expression[] | Error,
    validationResult: { isValid: boolean; message?: string }
  ) => void
  onParseOk?: (expressions: Expression[]) => void
  onParseError?: (error: Error, validationResult: { isValid: boolean; message?: string }) => void
}

export const FilterBox = ({ className, ...props }: Props) => (
  <Container className={className}>
    <ReactFilterBox {...props} />
  </Container>
)
