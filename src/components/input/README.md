## Input

Currently only of type "text", as other types may need some special tweaks and implementations.

### How to use

The `<TextInput>` implementation intended to be minimalistic, and mostly concentrated on applying
props and props-dependent variablis to layout and styling. The `InputProps` type indicated props
applied to the underlying `input` element, `ComponentProps` - those needed for layouting, state calculations and other means.

Keep in mind, that the component is **uncontrolled** and requires hooks/wrappers to function.

Additional event handlers and any other valid `HTMLInputElement` props could be applied to the underlying input
by just passing them explicitly to the <TextInput />.

```typescript
type CallBackRef = (input: any) => void

export interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: FocusEvent) => void
  onBlur?: (e: FocusEvent) => void
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
  value: string
  inputRef?: MutableRefObject<HTMLInputElement | null> | CallBackRef
  disabled?: boolean
  iconLeft?: ReactNode
  iconRight?: ReactNode
  name?: string
  placeholder?: string
  autoFocus?: boolean
}

export interface MetaOptions {
  error?: boolean | string
  success?: boolean | string
  touched?: boolean
  isDirty?: boolean
  instantFeedback?: InstantFeedback
  prevValue: string | undefined
  value: string
  focused?: boolean
}

export interface ComponentProps {
  fieldMessage?: string
  error?: boolean | string
  success?: boolean | string
  touched?: boolean
  isDirty?: boolean
  instantFeedback?: "all" | "positiveFirst"
  className?: string
  fieldIndicator?: string | ReactNode
  metaShrinked?: boolean
  label?: string
  handleMetaDisplay?: (metaOptions: MetaOptions) => boolean
}

export type TextInputProps = InputProps & ComponentProps
```

Notable props:

- `fieldMessage` - default message under the input field
- `success` and `error` - status indicators, could be boolean or strings (in this case they render instead of `fieldMessage`)
- `instantFeedback` - set this to true, if you want to provide validation status as user types, not onBlur/other.
  With `all` updates validation status on any value change, with `positiveFirst` - only when string is successfully
  validated (`success` prop), or user started to erase entered data and current string has errors according to `error` prop.
- `isDirty` - boolean flag showing if something was ever entered into the input. Use together with instantFeedback.
- `metaShrinked` - set this to true to not render any meta information and reserved space under the input field
- `fieldIndicator` - additional information field, which could be used for displaying `maxChars` string or other meta info.
- `handleMetaDisplay` - if instantFeedback / touched and default built-in logic is not suitable for some sophisticated usecases, this function could be used for full control over error/success display.

### Meta Display

This API is provided to control the display of error/success (meta) feedback for the input.

```typescript
export interface MetaOptions {
  error?: boolean | string
  success?: boolean | string
  touched?: boolean
  isDirty?: boolean
  instantFeedback?: InstantFeedback
  prevValue: string | undefined
  value: string
  focused?: boolean
}
```

`handleMetaDisplay` function accepts the above arguments passed by the input internally. They include
both props, and implementation-level values known only to the TextInput. Here is provided the default behaviour,
which could be overriden using the same pattern:

```typescript
const defaultHandleMetaDisplay = ({
  isDirty,
  instantFeedback,
  value,
  prevValue,
  error,
  success,
  touched,
}: MetaOptions) =>
  touched ||
  Boolean(instantFeedback === "all" && isDirty) ||
  Boolean(instantFeedback === "positiveFirst" && isDirty && success) ||
  Boolean(
    instantFeedback === "positiveFirst" &&
      isDirty &&
      error &&
      prevValue &&
      value.length < prevValue.length
  )
```

### Exposed hooks and application-level wrapping

```typescript
type FocusHandler = FocusEventHandler
type BlurHandler = FocusEventHandler
type FocusedState = boolean

type UseFocusedState = ({
  onBlur,
  onFocus,
  defaultState,
}: {
  onBlur?: FocusEventHandler
  onFocus?: FocusEventHandler
  defaultState?: boolean
}) => [FocusedState, FocusHandler, BlurHandler]
```

`useFocusedState` hook is being used internally by the `<TextInput/>`, so normally you can just pass
the custom blur/focus handlers to the component, and work with side effects as with default `<input />` tag.

```typescript
type BlurHandler = FocusEventHandler
type TouchedState = boolean
type SetTouchedState = React.Dispatch<React.SetStateAction<boolean>>

type UseTouchedState = ({
  onBlur,
  defaultState,
}: {
  onBlur?: BlurHandler
  defaultState?: boolean
}) => [TouchedState, BlurHandler, SetTouchedState]
```

`useTouchedState` hook could be useful working with touched/untouched functionality in validated forms.
It allows to manage the success and error feedback shown to the user.
Apart from value and handler, it also exposes the programmatic method to set `touched` state for the input.
TBD if we will use it, or procees with custom event-oriented form touch.

```typescript
type InputValue = string
type MaxCharsIndicator = string
type IsDirty = boolean
type UseInputValue = ({
  value,
  onChange,
  maxChars,
}: {
  value?: string
  onChange?: ChangeEventHandler
  maxChars?: number
}) => [InputValue, ChangeEventHandler, MaxCharsIndicator, IsDirty]
```

`useInputValue` hook is a short way to add basic functionaluty to the `<TextInput />` - a controlled state for
input value, and custom side-effects handling for onChange. If `maxChars` option is passed, it will also return
a quantity of entered symbols in relation to maximum allowed `as string`. `isDirty` flag indicates if value was changed at least once, required for `instantFeedback` inputs to work properly.

### Further improvements TBD

We may include existing convenience hooks/wrappers and write additional ones (for setting value directly to Redux, for instance). However, for now we need some data on how the control will be used in applications.

For validation handling, there could be a hook, but we need to be very specific about the API. Right now it's possible
to use the `<TextInput/>` together with any library, so when we will decide on our forms library or custom approach, we may start adding wrappers to the `netdata-ui`. For now it's better to leave convenience wrapping to the application-level code.
