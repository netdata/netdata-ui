## ProgressBar component

The progress bar component is used to visualise the progress of one ore more than one elements as bar style.

### Props:

```typescript
interface ProgressBarProps {
  background?: string
  className?: string
  color?: string
  "data-testid"?: string
  containerWidth?: string
  height?: number
  value?: Value[]
  width?: string
  [s: string]: any
}
```

### Typical usage:

```JSX
export const ProgressBars = () => (
    <div>
        <ProgressBar width="40%" />
        <ProgressBar
        value={[
          { color: ["blue", "indigo"], width: "30%" },
          { color: ["green", "limeGreen"], width: "60%" },
        ]}
      />
    </div>
  )
```
