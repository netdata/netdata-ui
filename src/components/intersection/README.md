## Popover component

A component that displays the fallback until it is visible to the viewport.
It uses the IntersectionObserver.

### Props:

```typescript
interface IntersectionProps {
  root: object
  rootMargin: string
  threshold: number
  fallback: ReactNode | (() => ReactNode)
  children: ReactNode | (() => ReactNode)
  [key: string]: any
}
```

### Typical usage:

```JSX
export const Component = () => {
  return (
    <Intersection fallback="This is visible outside the viewport">
      This is visible inside the viewport
    </Intersection>
  )
}
```
