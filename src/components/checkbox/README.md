## Checkbox component

The implementation requires controlled behaviour, so the component requires to be wrapped
and provided with state and handler.

### Props:

```typescript
interface CheckboxProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  label?: string
  labelPosition?: "left" | "right"
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
}
```
