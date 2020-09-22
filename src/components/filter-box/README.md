## Filter Box

Component for expression-based filtering made on top of [react-filter-box](https://github.com/nhabuiduc/react-filter-box)

### How to use

Component follows original library spec and implementation (with minor differencies),
some functionality is extended - it accepts array values, and overrides some UX -
such as error state display specifics.

All extended functionality excepts styles resides in exported classes `FilterBoxProcessing` and
`FilterBoxAutocompleteHandler`. Feel free to override them, or use library defaults,
if needed.

`FilterBoxProcessing` constructor accepts accessor path to filter values as second argument,
if your data structure is complex, you can pass a `sting[]` accessor, it will be used
to get data with ramda `path` function

`FilterBoxAutocompleteHandler` constructor accepts a map of accessors, looking like

```typescript
interface AccessorsData {
  [fieldName: string]: string[]
}
```

it is used to get suggested values for autocomplete, if data structure is complex

```typescript
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
  fieldValueGetters?: {
    [fieldName: string]: (any) => string
  }
  onFocus?: () => void
  onBlur?: () => void
  editorConfig?: Object
  inline?: boolean
  metaDisplay?: "normal" | "compact" | "none"
}
```
