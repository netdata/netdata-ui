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
  type ButtonType = "default" | "hollow" | "borderless",

```

## Typical usage

### Default button

```typescript
const myButton: Button = <Button icon={"github"} onClick={this.myHandler} label="Press me" />
```

### Hollow button

```typescript
const myButton: Button = (
  <Button type={ButtonTypes.hollow} onClick={this.myHandler} label="Press me" />
)
```

### Icon button

Please note `"default"` is optional (can be omitted):

```typescript
const myButton: Button = (
  <Button disabled={true} type="default" icon={"plus"} onClick={this.myHandler} label="Press me" />
)
```
