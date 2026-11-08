## Checkbox component

The implementation requires controlled behaviour, so the component has to be provided with state and handler.

### Props:

```typescript
interface CheckboxProps {
  checked: boolean
  onChange: (boolean) => void
  id?: string
  label?: string
  labelPosition?: "left" | "right"
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
  disabled?: boolean
  indeterminate?: boolean
  variant?: "default" | "filled"
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}
```

### Typical usage:

```JSX
export const ContolledCheckbox = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = (value => {
    setChecked(value)
  }
  return <Checkbox onChange={handleChange} checked={checked} />
}
```

### Checkboxes List and indeterminate attribute

Checkbox can have an `indeterminate` prop, if it represents the list of
checkboxes that could be partially selected.

For this purpose component exposes a hook `useCheckboxesList`:

```JSX
  const [checkedOne, setCheckedOne] = useState(false)
  const [checkedTwo, setCheckedTwo] = useState(false)
  const [checkedThree, setCheckedThree] = useState(false)

  const valuesList = [checkedOne, checkedTwo, checkedThree]
  const handlersList = [setCheckedOne, setCheckedTwo, setCheckedThree]

  const [allChecked, indeterminate, switchAll] = useCheckboxesList(valuesList, handlersList)

  ...

  <PotentiallyIndeterminateCheckbox
    label="All selected"
    hecked={allChecked}
    onChange={switchAll}
    indeterminate={indeterminate}
  />
```

Hook signature:

```typescript
type ChangeHandler = (checked: boolean) => void

type UseCheckboxesList = (
  values: boolean[],
  handlers: Array<ChangeHandler>
) => [boolean, boolean, () => void]
```

### Filled row-selection checkboxes

`variant="filled"` preserves the 16px row-selection control: a 1.5px border, 4px radius,
9px checkmark, and a 9×2px indeterminate dash. Dimensions derive from the theme size unit.
The off state uses `inputBg` and `controlBorder`; checked and mixed states use
`buttonNeutralFill` and `buttonNeutralText`. Hover uses `buttonNeutralFill` and keyboard
focus uses `segmentedFocus`. The default appearance is unchanged.

`inputProps` passes native input attributes and events to the real checkbox, including
`id`, `aria-label`, `aria-invalid`, `aria-describedby`, `title`, `autoFocus`, and test IDs.
The controlled `checked`, `disabled`, `readOnly` and internal ref remain owned by Checkbox.
`onChange(nextChecked, event)` retains the existing boolean-first callback contract.
Indeterminate state remains the native `input.indeterminate` property.

For a control inside an existing label, use `as="span"` on the Checkbox wrapper to avoid
nested labels. The input remains a native checkbox and Space toggles it. Clicking the filled
visual box also focuses its native input.

```jsx
<label>
  <Checkbox
    as="span"
    variant="filled"
    checked={selected}
    indeterminate={partiallySelected}
    onChange={setSelected}
    inputProps={{ "aria-label": "Select jobs", "data-testid": "row-selection" }}
  />
  Select jobs
</label>
```
