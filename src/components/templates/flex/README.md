## Flex

A flexbox container with all the frequently used properties.

### Props:

```typescript
export interface FlexProps
  extends DirectionProps,
    FlexProps,
    WrapProps,
    AlignItemsProps,
    AlignContentProps,
    JustifyContentProps,
    AlignSelfProps,
    MarginProps,
    PaddingProps,
    GapProps,
    OpacityProps,
    BorderProps,
    RoundProps,
    WidthProps,
    HeightProps,
    OverflowProps,
    ZIndexProps {
  background?: ColorType
}
```

### Typical usage:

```JSX
export const Container = () => {
    return (
      <Flex gap={2} margin={[4, 0]}>
        <Flex gap={2} alignItems="center" padding={[3]} justifyContent="between" column>
          <Component1>
          <Component2>
          <Component1>
        </Flex>
        <Flex gap={3} flex column>
          <Component1>
          <Component2>
          <Component1>
        </Flex>
      </Flex>
    )
}
```
