import React, { useMemo } from "react"
import ReactFilterBox from "react-filter-box"
import "react-filter-box/lib/react-filter-box.css"
import { Option } from "./types"
import { Container } from "./styled"
import { FilterBoxAutocompleteHandler } from "./filter-box-autocomplete"

export interface Expression {
  conditionType?: "OR" | "AND"
  category?: string
  operator?: string
  value?: string
  expressions?: Expression[]
}

interface Props {
  className?: string
  data: any
  options: Option[]
  strictMode?: boolean
  query?: string
  onChange?: (
    query: string,
    expressions: Expression[] | Error,
    validationResult: { isValid: boolean; message?: string }
  ) => void
  onParseOk?: (expressions: Expression[]) => void
  onParseError?: (error: Error, validationResult: { isValid: boolean; message?: string }) => void
  AutoCompleteHandler?: any
  accessorPaths?: {
    [fieldName: string]: string[]
  }
}

export const FilterBox = ({
  className,
  AutoCompleteHandler,
  options,
  data,
  accessorPaths = {},
  ...props
}: Props) => {
  const autoCompleteInstance = useMemo(
    () => new AutoCompleteHandler(data, options, accessorPaths),
    [AutoCompleteHandler, accessorPaths, data, options]
  )
  return (
    <Container className={className}>
      <ReactFilterBox
        {...props}
        autoCompleteHandler={autoCompleteInstance}
        options={options}
        data={data}
      />
    </Container>
  )
}

FilterBox.defaultProps = {
  AutoCompleteHandler: FilterBoxAutocompleteHandler,
}
