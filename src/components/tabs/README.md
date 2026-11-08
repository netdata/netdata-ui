# Tabs

## Props

```typescript
export interface TabsProps {
  className?: string
  onChange?: OnChange
  selected?: number
  children?: ReactNode
  TabContent?: string | React.ComponentType<any>
}
```

## Typical usage

### Uncontrolled

```typescript
<Tabs>
  <Tab label="hi">Hello</Tab>
  <Tab label="Hi again">Hello again</Tab>
  <Tab label="Bye">Goodbye</Tab>
  <Tab label="Goodbye">Fairwell</Tab>
</Tabs>
```

### Controlled

#### Local state

```typescript
const [selected, setSelected] = useState(0)

<Tabs onChange={setSelected} selected={selected}>
  <Tab label="hi">Hello</Tab>
  <Tab label="Hi again">Hello again</Tab>
  <Tab label="Bye">Goodbye</Tab>
  <Tab label="Goodbye">Fairwell</Tab>
</Tabs>
```

#### Router

```typescript
import {useParams, navigate} from "some-react-router"
const paths = ['/a', '/b']
const {pathParam} = useParams()
const selected = paths.findIndex(p => p === pathParam)

<Tabs onChange={index => navigate(paths[index])} selected={selected}>
  <Tab label="hi">Hello</Tab>
  <Tab label="Hi again">Hello again</Tab>
  <Tab label="Bye">Goodbye</Tab>
  <Tab label="Goodbye">Fairwell</Tab>
</Tabs>
```

### Neutral line tabs

`variant="line" appearance="neutral"` renders native buttons with neutral ink and a selected-only underline. The profile uses 34px height, 12px side padding, 7px gap, inherited font family, 13px/20px text, 500 idle and 600 selected weight, square corners and no maximum width. Hover and expanded triggers use `controlHoverBackground`; keyboard focus uses `segmentedFocus` inset by 4px. Rich labels keep their own icon and status colors.

Use `label` for React content, including multiple counts or domain status indicators. IDs, refs, ARIA and handlers pass through. A popup trigger can override `role="button"`, `aria-selected={undefined}` and `tabIndex={0}`.

Within `<Tabs appearance="neutral">`, Left and Right Arrow move focus and selection between enabled tabs and wrap at the ends. Home and End focus and select the first and last enabled tabs. Use the `selected` and `onChange` props to control the active tab from an external panel.

Neutral tabs honor `height`, `width`, `maxWidth`, `padding`, `gap`, `round`, `fontSize`, `lineHeight` and `fontWeight`. Numeric dimensions, spacing and font sizes use local 4px units; font sizes also accept CSS strings. `lineHeight` follows CSS: numbers are unitless and strings pass through. Other line, contained and raised appearances keep their defaults.

```jsx
<Tab
  appearance="neutral"
  active
  label={
    <>
      <span>Collectors</span>
      <StatusWord dot={false}>2</StatusWord>
    </>
  }
/>
```
