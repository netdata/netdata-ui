import React, { useMemo, useState } from "react"
import { useDebounce } from "react-use"
import { ExtendedFilterBox } from "./extended-filter-box"
import "@netdata/react-filter-box/lib/react-filter-box.css"
import {
  Container,
  FilterContainer,
  MetaContainer,
  ResultsCount,
  FilterInfo,
  PlaceholderText,
  PlaceholderContainer,
} from "./styled"
import { FilterBoxAutocompleteHandler } from "./filter-box-autocomplete"
import { useInputStyles } from "../input"
const codeMirrorConfig = {
  scrollbarStyle: "null",
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
  query,
  size = "large",
  ...props
}) => {
  const [{ parsedError, displayedError }, setState] = useState({
    parsedError: false,
    displayedError: false,
  })
  const [debouncedError, setDebouncedError] = useState(false)
  const [filterQuery, setFilterQuery] = useState(query || "")
  const [parsedQuery, setParsedQuery] = useState("")
  const [focused, setFocused] = useState(false)

  const autoCompleteInstance = useMemo(
    () => new AutoCompleteHandler(data, options, accessorPaths, fieldValueGetters),
    [AutoCompleteHandler, accessorPaths, fieldValueGetters, data, options]
  )

  const { styles } = useInputStyles({
    size,
    error: displayedError,
    success: false,
    disabled: false,
    focused,
  })

  const handleError = (error, validationResult) => {
    if (onParseError) {
      onParseError(error, validationResult)
    }
    setState(state => ({ ...state, parsedError: true }))
  }
  const handleParseOk = expressions => {
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

  const handleOnChange = (q, expOrError, validationResult) => {
    if (onChange) {
      onChange(q, expOrError, validationResult)
    }
    setFilterQuery(q)

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
        {...styles.inputContainer}
        onBlur={handleBlur}
        onFocus={handleFocus}
        error={debouncedError}
        inline={inline}
      >
        {placeholder && !focused && !filterQuery.length && (
          <PlaceholderContainer>
            <PlaceholderText>{placeholder}</PlaceholderText>
          </PlaceholderContainer>
        )}
        <ExtendedFilterBox
          {...props}
          autoCompleteHandler={autoCompleteInstance}
          onParseError={handleError}
          onParseOk={handleParseOk}
          onChange={handleOnChange}
          options={options}
          data={data}
          editorConfig={config}
          query={filterQuery}
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
