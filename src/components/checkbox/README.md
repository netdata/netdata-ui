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
