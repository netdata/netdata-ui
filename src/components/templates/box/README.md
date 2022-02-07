## Box

A Box container with all the frequently used properties.

### Props:

```typescript
export type BoxProps<T extends React.ElementType = any> = CombinedStyledProps<T> & {
  as?: React.ElementType
  sx?: CombinedStyledProps<T>
}
```

### Typical usage:

```JSX
export const Container = () => {
    return (
      <Box>
        <Box>
          <Component1>
          <Component2>
          <Component1>
        </Box>
        <Box >
          <Component1>
          <Component2>
          <Component1>
        </Box>
      </Box>
    )
}
```
