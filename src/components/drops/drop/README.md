## Drop component

A container that follows a target element. Useful for implementing dropdowns, tooltips, popovers etc.

### Props:

```typescript
interface DropProps extends FlexProps, AlignProps, StretchProps {
  target: object
  onClickOutside: Function
  onEsc: Function
  children: any
  [key: string]: any
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
