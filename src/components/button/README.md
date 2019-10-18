# Button

## Props

```typescript
interface ButtonProps {
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
  type?: ButtonType
}
```

## Typical usage

### Default button

```typescript
const myButton: Button = <Button icon="add" onClick={this.myHandler} label="Press me" />
```

### No fill button

```typescript
const myButton: Button = (
  <Button type={ButtonTypes.noFill} onClick={this.myHandler} label="Press me" />
)
```

### Icon button

Please note `type={ButtonTypes.default}` is optional here (can be omitted):

```typescript
const myButton: Button = (
  <Button type={ButtonTypes.default} icon="add" onClick={this.myHandler} label="Press me" />
)
```
