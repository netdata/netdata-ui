# Button

## Props

```typescript
interface ButtonProps {
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: any
  isLoading?: boolean
  type?: ButtonType
  disabled?: boolean
}
```

## Button types

````typescript

export enum ButtonType {
  default = "default",
  noFill = "noFill",
}
```

## Typical usage

### Default button

```typescript
const myButton: Button = <Button icon="add" onClick={this.myHandler} label="Press me" />
````

### No fill button

```typescript
const myButton: Button = (
  <Button type={ButtonTypes.noFill} onClick={this.myHandler} label="Press me" />
)
```

### Icon button

Please note `type={ButtonTypes.default}` is optional (can be omitted):

```typescript
const myButton: Button = (
  <Button
    disabled={true}
    type={ButtonTypes.default}
    icon="add"
    onClick={this.myHandler}
    label="Press me"
  />
)
```
