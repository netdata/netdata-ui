import React, { useMemo, useState } from "react"
import ReactFilterBox from "react-filter-box"
import "react-filter-box/lib/react-filter-box.css"
import { Option } from "./types"
import { Container, FilterContainer, MetaContainer } from "./styled"
import { FilterBoxAutocompleteHandler } from "./filter-box-autocomplete"
import { FieldInfo } from "../input"

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
  onParseOk,
  onParseError,
  ...props
}: Props) => {
  const [parseError, setParseError] = useState(false)
  const [displayError, setDisplayError] = useState(false)

  const autoCompleteInstance = useMemo(
    () => new AutoCompleteHandler(data, options, accessorPaths),
    [AutoCompleteHandler, accessorPaths, data, options]
  )
  const handleError = (error, validationResult) => {
    if (onParseError) {
      onParseError(error, validationResult)
    }
    setParseError(true)
  }
  const handleParseOk = expressions => {
    if (onParseOk) {
      onParseOk(expressions)
    }
    setParseError(false)
  }

  const handleBlur = () => {
    console.log("blur")
  }
  return (
    <Container className={className}>
      <FilterContainer onBlur={handleBlur}>
        <ReactFilterBox
          {...props}
          autoCompleteHandler={autoCompleteInstance}
          onParseError={handleError}
          onParseOk={handleParseOk}
          options={options}
          data={data}
        />
      </FilterContainer>
      <MetaContainer> {parseError && <FieldInfo error>Invalid input</FieldInfo>}</MetaContainer>
    </Container>
  )
}

FilterBox.defaultProps = {
  AutoCompleteHandler: FilterBoxAutocompleteHandler,
}
