## Toggle component

The implementation requires controlled behaviour, so the component has to be provided with state and handler.

### Props:

```typescript
interface ToggleProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  labelLeft?: string
  labelRight?: string
  Label?: React.ComponentType<any>
  colored?: boolean
  size?: "default" | "small" | "compact"
  variant?: "default" | "outline"
  activateOnEnter?: boolean
  labelGap?: number
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
  disabled?: boolean
}
```

### Typical usage:

```JSX
export const ContolledToggle = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }
  return <Toggle onChange={handleChange} checked={checked} />
}
```

### Compact outline switches

`size` defaults to `"default"` (40×20 track, 14px knob). `"small"` is 34×20 with a 13px knob;
`"compact"` is 26×16 with a 9px knob. All dimensions use the theme size unit.

`variant="outline"` draws a transparent off track with a 1.5px border. It uses
`controlBorder` for the off border and knob, `segmentedAccentText` for the checked track,
`buttonNeutralText` for its checked knob, `textFocus` for off hover, and `segmentedFocus`
for keyboard focus. Disabled outline switches dim the track while their labels stay legible.
The default variant retains its existing palette.

`activateOnEnter` defaults to false, preserving native checkbox keyboard behavior. Set it to
true when replacing a button switch that activated with Enter as well as Space. Enter is
handled once per press and does not submit the surrounding form; a caller's `onKeyDown`
can prevent the activation. The real checkbox retains the switch role and native
`onChange`, focus, blur, disabled and ARIA props.

`labelGap` uses the 4px spacing scale, including fractions; omit it for the existing theme
size-unit gap. `Label="span"` lets the label inherit surrounding typography.

```jsx
<Toggle
  size="compact"
  variant="outline"
  activateOnEnter
  checked={enabled}
  onChange={event => setEnabled(event.currentTarget.checked)}
  aria-label="Collector"
  labelRight={enabled ? "On" : "Off"}
  Label="span"
  labelGap={1.75}
/>
```
