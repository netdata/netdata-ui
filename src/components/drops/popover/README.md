## Popover component

A popover flavored drop that is activating hovering a target element.
The drop remains open while the cursor is hovering either the target or the drop content.

### Props:

```typescript
interface PopoverProps {
  plain: boolean
  open: boolean
  align: "top" | "right" | "bottom" | "left"
  dropProps: DropProps
  content: any
  children: any
  [key: string]: any
}
```

### Typical usage:

```JSX
export const SimplePopover = props => {
  const ref = useRef()

  return (
    <Popover content="Popover content">
      Target
    </Popover>
  )
}
```
