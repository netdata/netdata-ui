## Tooltip component

A tooltip flavored drop that is activating hovering a target element.

### Props:

```typescript
interface TooltipProps {
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
export const SimpleTooltip = props => {
  const ref = useRef()

  return (
    <Tooltip content="Tooltip content">
      Target
    </Tooltip>
  )
}
```
