import React, { useMemo, useState, ReactNode } from "react"
import { useDebounce } from "react-use"
import { ExtendedFilterBox } from "./extended-filter-box"
import "@netdata/react-filter-box/lib/react-filter-box.css"
import { Option, FieldValueGetters, AccessorsData } from "./types"
import {
  Container,
  FilterContainer,
  MetaContainer,
  ResultsCount,
  FilterInfo,
  PlaceholderText,
} from "./styled"
import { FilterBoxAutocompleteHandler } from "./filter-box-autocomplete"

const codeMirrorConfig = {
  scrollbarStyle: "null",
}

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
  accessorPaths?: AccessorsData
  fieldValueGetters?: FieldValueGetters
  onFocus?: () => void
  onBlur?: () => void
  resultsQty?: number | ReactNode
  editorConfig?: Object
  inline?: boolean
  metaDisplay?: "normal" | "compact" | "none"
  placeholder?: string
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
  fieldValueGetters,
  editorConfig = {},
  inline = false,
  metaDisplay = "normal",
  placeholder,
  ...props
}: Props) => {
  const [{ parsedError, displayedError }, setState] = useState({
    parsedError: false,
    displayedError: false,
  })
  const [debouncedError, setDebouncedError] = useState(false)
  const [filterQuery, setFilterQuery] = useState("")
  const [parsedQuery, setParsedQuery] = useState("")
  const [focused, setFocused] = useState(false)

  const autoCompleteInstance = useMemo(
    () => new AutoCompleteHandler(data, options, accessorPaths, fieldValueGetters),
    [AutoCompleteHandler, accessorPaths, fieldValueGetters, data, options]
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
    setFocused(false)
    if (parsedError) {
      setState(state => ({ ...state, displayedError: true }))
    } else {
      setParsedQuery(filterQuery)
    }
  }

  const handleFocus = () => {
    if (onFocus) {
      onFocus()
    }
    setFocused(true)
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
    setFilterQuery(query)

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

  const config = useMemo(() => ({ ...codeMirrorConfig, ...editorConfig }), [editorConfig])

  return (
    <Container className={className} inline={inline}>
      <FilterContainer
        onBlur={handleBlur}
        onFocus={handleFocus}
        error={debouncedError}
        inline={inline}
      >
        {placeholder && !focused && <PlaceholderText>{placeholder}</PlaceholderText>}
        <ExtendedFilterBox
          {...props}
          autoCompleteHandler={autoCompleteInstance}
          onParseError={handleError}
          onParseOk={handleParseOk}
          onChange={handleOnChange}
          options={options}
          data={data}
          editorConfig={config}
        />
      </FilterContainer>
      <MetaContainer inline={inline} metaDisplay={metaDisplay}>
        {parsedError && !debouncedError && <FilterInfo>The filter is not complete</FilterInfo>}
        {debouncedError && <FilterInfo error>Invalid filter</FilterInfo>}
        {!debouncedError && resultsQty !== undefined && (
          <ResultsCount>
            Results:&nbsp;
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
