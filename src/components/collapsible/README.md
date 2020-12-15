## Drop component

A container that collapses the expands/collapses with animation.

### Props:

```typescript
interface CollapsibleProps {
  open?: boolean
  duration?: number
  children: () => ReactNode
  [rest: string]: any
}
```

### Typical usage:

```JSX
export const SimpleMenu = props => {
  const ref = useRef()

  return (
    <Flex {...props}>
      <Flex ref={ref} background="disabled" padding={[4]}>
        Target
      </Flex>
      {ref.current && (
        <Drop
          target={ref.current}
          align={{ top: "bottom", left: "left" }}
        >
          <Flex background="border" padding={[6]}>
            Drop Contents
          </Flex>
        </Drop>
      )}
    </Flex>
  )
}
```
