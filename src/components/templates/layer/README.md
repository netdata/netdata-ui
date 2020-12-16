## Layer

An overlay container that aligns according to the page viewport. Useful for modals, sidebars, notifications, etc.

### Props:

```typescript
export interface LayerProps extends MarginProps, FullProps, PositionProps {
  backdrop?: boolean
  onClickOutside?: Function
  onEsc?: Function
  borderShadow?: boolean
}
```

### Typical usage:

```JSX
export const Container = () => {
  return (
    <Flex background="mainBackgroundDisabled" width="100vw" height="100vh">
      <Layer>
        <Flex background="mainBackground" round border padding={[4]}>
          Layer content
        </Flex>
      </Layer>
    </Flex>
  )
}
```
