## Icon

React component used to render SVG icons.
Resources are exported raw, some type of svg loader is needed on application level

### Naming convention

The "name" prop form <Icon /> is an svg filename. Icon with filenames ending with `_s` and `_l` will be
automatically assigned "small" (16px) and "large) (40px) sizes. Those without such ending strings
will be "medium" (24px) by default.

### Styling and dynamic colors

Icon could be wrapped into styled(), but right now we don't have
control over the "fill" property, as Figma produces svg paths with hard-attached fills

However, for dynamic color we can remove the "fill" attribute from svg code, and wrap
the icon with default styled component. Probably, even on ui kit level, but it could also
be easily done on app level.

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
