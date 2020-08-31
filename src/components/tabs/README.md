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
