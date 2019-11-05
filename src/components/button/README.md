# Button

## Props

```typescript
interface Props {
  id?: string
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: Icon
  isLoading?: boolean
  type?: ButtonType
  disabled?: boolean
}
```

## Button types

```typescript
export enum ButtonType {
  default = "default",
  noFill = "noFill",
  borderless = "borderless",
}
```

## Typical usage

### Default button

```typescript
const myButton: Button = <Button icon={"github"} onClick={this.myHandler} label="Press me" />
```

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
    icon={"plus"}
    onClick={this.myHandler}
    label="Press me"
  />
)
```
