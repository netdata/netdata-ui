## Radio button component

The implementation requires controlled behaviour, so the component has to be provided with state and handler.

### Props:

```typescript
interface RadioButtonProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  label?: string | React.ComponentType<any>
  children?: React.ComponentType<any>
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
  disabled?: boolean
  margin?: [number, number, number, number] | [number, number, number] | [number, number] | [number]
}
```

### Typical usage:

```JSX
export const RadioButton = () => {
    const [checked, setChecked] = useState("radio1")
    const handleChange = event => setChecked(event.target.value)

    return (
      <div>
        <RadioButton
          label="Label 1"
          name="radio-1"
          onChange={handleChange}
          value="radio1"
          checked={checked === "radio1"}
        />
        <RadioButton
          label="Label 2"
          name="radio-1"
          onChange={handleChange}
          value="radio2"
          checked={checked === "radio2"}
        />
      </div>
    )
}
```
