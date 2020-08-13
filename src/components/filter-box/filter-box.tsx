import React, { useMemo, useState } from "react"
import { useDebounce } from "react-use"
import ReactFilterBox from "react-filter-box"
import "react-filter-box/lib/react-filter-box.css"
import { Option } from "./types"
import { Container, FilterContainer, MetaContainer, ResultsCount, FilterInfo } from "./styled"
import { FilterBoxAutocompleteHandler } from "./filter-box-autocomplete"

// Assumed top-level pegjs error type for convenience, not reliable
export interface ParseError {
  expected: any[]
  found: null | any
  isError: boolean
  location: { start: any; end: any }
  message: string
  name: string
  stack: string
}

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
    expressions: Expression[] | ParseError,
    validationResult: { isValid: boolean; message?: string }
  ) => void
  onParseOk?: (expressions: Expression[]) => void
  onParseError?: (
    error: ParseError,
    validationResult: { isValid: boolean; message?: string }
  ) => void
  AutoCompleteHandler?: any
  accessorPaths?: {
    [fieldName: string]: string[]
  }
  onFocus?: () => void
  onBlur?: () => void
  resultsQty?: number
}

export const FilterBox = ({
  className,
  AutoCompleteHandler,
  options,
  data,
  accessorPaths = {},
  onParseOk,
  onParseError,
  onChange,
  onFocus,
  onBlur,
  resultsQty,
  ...props
}: Props) => {
  const [{ parsedError, displayedError }, setState] = useState({
    parsedError: false,
    displayedError: false,
  })
  const [debouncedError, setDebouncedError] = useState(false)

  const autoCompleteInstance = useMemo(
    () => new AutoCompleteHandler(data, options, accessorPaths),
    [AutoCompleteHandler, accessorPaths, data, options]
  )
  const handleError = (error, validationResult) => {
    if (onParseError) {
      onParseError(error, validationResult)
    }
    setState(state => ({ ...state, parsedError: true }))
  }
  const handleParseOk = (expressions: Expression[]) => {
    if (onParseOk) {
      onParseOk(expressions)
    }
    setState({ parsedError: false, displayedError: false })
  }

  const handleBlur = () => {
    if (onBlur) {
      onBlur()
    }
    if (parsedError) {
      setState(state => ({ ...state, displayedError: true }))
    }
  }

  const handleFocus = () => {
    if (onFocus) {
      onFocus()
    }
    if (displayedError) {
      setState(state => ({ ...state, displayedError: false }))
    }
  }

  const handleOnChange = (
    query: string,
    expOrError: Expression[] | ParseError,
    validationResult: { isValid: boolean; message?: string }
  ) => {
    if (onChange) {
      onChange(query, expOrError, validationResult)
    }

    if (expOrError && !Array.isArray(expOrError) && expOrError.isError) {
      setState(state => ({ ...state, parsedError: true }))
    }
    const expressionsParsed = Array.isArray(expOrError)
    if (expressionsParsed) {
      setState({ parsedError: false, displayedError: false })
    }
  }

  useDebounce(
    () => {
      setDebouncedError(displayedError)
    },
    300,
    [displayedError]
  )
  return (
    <Container className={className}>
      <FilterContainer onBlur={handleBlur} onFocus={handleFocus} error={debouncedError}>
        <ReactFilterBox
          {...props}
          autoCompleteHandler={autoCompleteInstance}
          onParseError={handleError}
          onParseOk={handleParseOk}
          onChange={handleOnChange}
          options={options}
          data={data}
        />
      </FilterContainer>
      <MetaContainer>
        {parsedError && !debouncedError && <FilterInfo>The filter is not complete</FilterInfo>}
        {debouncedError && <FilterInfo error>Invalid filter</FilterInfo>}
        {!debouncedError && resultsQty && (
          <ResultsCount>
            Results:
            {resultsQty}
          </ResultsCount>
        )}
      </MetaContainer>
    </Container>
  )
}

FilterBox.defaultProps = {
  AutoCompleteHandler: FilterBoxAutocompleteHandler,
}
