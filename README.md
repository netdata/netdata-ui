# Netdata UI kit

## Development process

- `squash-merge` is a default PR merge strategy
- after any merge, NPM version should be published (in future to be moved to CI)
- versions are `major` (breaking changes, large refactors), `minor` (new component added), and `patch` (small changes)
- please add declaration of exported components to provide nice typings for users.

```typescript
// BAD
export const MyComponent = (props: PropsT) => <>...</>

// GOOD
export const MyComponent: FC<PropsT> = (props: PropsT) => <>...</>
```

## Playground

You can find latest **master** storybook playground [here](https://netdata.github.io/netdata-ui/)

## Components

- [Theme and theme utils](https://github.com/netdata/netdata-ui/blob/master/src/theme)
- [Icon](https://github.com/netdata/netdata-ui/blob/master/src/components/icon)
- [Sidebar PortalSidebar](https://github.com/netdata/netdata-ui/blob/master/src/components/sidebar)
- [Checkbox](https://github.com/netdata/netdata-ui/tree/master/src/components/checkbox)
- [Button](https://github.com/netdata/netdata-ui/tree/master/src/components/button)
- [Input](https://github.com/netdata/netdata-ui/tree/master/src/components/input)
- [Typography](https://github.com/netdata/netdata-ui/tree/master/src/components/typography)
- [Table](https://github.com/netdata/netdata-ui/tree/master/src/components/table)
- [Virtualized Table](https://github.com/netdata/netdata-ui/tree/master/src/components/virtualized-table)
