## Toggle component

The implementation requires controlled behaviour, so the component has to be provided with state and handler.

### Props:

```typescript
interface ToggleProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  labelLeft?: string
  labelRight?: string
  Label?: React.ComponentType<any>
  colored?: boolean
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
  disabled?: boolean
}
```

### Typical usage:

```JSX
export const ContolledToggle = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }
  return <Toggle onChange={handleChange} checked={checked} />
}
```
