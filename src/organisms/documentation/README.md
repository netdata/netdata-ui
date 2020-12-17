## Documentation Help Button

An organism that creates a fixed button on the bottom right of the screen, that on click opens a drop that has documentation links.

### Props:

```typescript
export interface DocumentationProps {
  app?: "cloud" | "agent"
  children: (toggle: () => void, isOpen: boolean) => ReactNode
}
```

### Typical usage:

```JSX
export const Container = () => {
  return (
    <Documentation app="cloud">
      {(toggle, isOpen) => (
        <Button onClick={toggle} label={`${isOpen ? "hide" : "show"} documentation modal`} />
      )}
    </Documentation>
  )
}
```
