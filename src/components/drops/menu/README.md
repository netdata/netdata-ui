## Menu component

A dropdown flavored drop that displays a list of items or a custom view.

### Props:

```typescript
interface MenuProps {
  value?: string | number
  onChange?: (value: string | number) => void
  onOpen?: () => void
  onClose?: () => void
  closeOnClick?: boolean
  open?: boolean
  icon?: JSX.Element
  label?: JSX.Element
  caret?: boolean | JSX.Element
  children?: any
  dropProps?: DropProps
  items?: Item[]
  Item?: RenderItemType
  Dropdown?: (props: {
    items: Item[]
    value: string | number
    onItemClick: Function
    Item: RenderItemType
  }) => JSX.Element

  [key: string]: any
}
```

### Typical usage:

```JSX
export const SimpleMenu = props => {
  return (
    <Menu
      label="Character"
      items={[
        { value: "narrator", label: "The Narrator" },
        { value: "durgen", label: "Tyler Durden" },
        { value: "singer", label: "Marla Singer" },
      ]}
      {...props}
    />
  )
}
```
