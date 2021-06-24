## Documentation Help Button

An organism that exposes the functionality of the News & Announcements feature, which on click opens a drop that has the latest news, as well as an `upToDate` prop which used for differentiating between read and unread states.

### Props:

```typescript
export interface NewsProps {
  app?: "cloud" | "agent"
  children: (toggle: () => void, isOpen: boolean, upToDate: boolean) => ReactNode
}
```

### Typical usage:

```JSX
export const Container = () => {
  return (
    <News app="cloud">
      {({ toggle, upToDate }) => (
        <Pill icon="insights" onClick={toggle} hollow flavour={upToDate ? "neutral" : "success"}>
          Cloud news
        </Pill>
      )}
    </News>
  )
}
```
