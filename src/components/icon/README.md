## Icon

React component used to render SVG icons.
Resources are exported raw, some type of svg loader is needed on application level

"name" prop is an svg filename to use

Icon could be wrapped into styled(), but right now we don't have
control over the "fill" property, as Figma produces svg paths with hard-attached fills

### How to add new icons

Just add an .svg file to ./assets

List of available Icons: TBD

```typescript
interface Props {
  name: string
  size?: "small" | "medium" | "large"
  className?: string
}
```
