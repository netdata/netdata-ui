import React, { useMemo, useState } from "react"
import { useDebounce } from "react-use"
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
  onChange,
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
    if (parsedError) {
      setState(state => ({ ...state, displayedError: true }))
    }
  }

  const handleFocus = () => {
    if (displayedError) {
      setState(state => ({ ...state, displayedError: false }))
    }
  }

  const handleOnChange = (
    query: string,
    expOrError: Expression[] | Error,
    validationResult: { isValid: boolean; message?: string }
  ) => {
    if (onChange) {
      onChange(query, expOrError, validationResult)
    }
    // @ts-ignore
    if (expOrError && expOrError.isError) {
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
        {parsedError && !debouncedError && <FieldInfo>The filter is not complete</FieldInfo>}
        {debouncedError && <FieldInfo error>Invalid filter</FieldInfo>}
      </MetaContainer>
    </Container>
  )
}

FilterBox.defaultProps = {
  AutoCompleteHandler: FilterBoxAutocompleteHandler,
}
