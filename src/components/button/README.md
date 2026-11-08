# Button

## Props

```typescript
interface Props {
  id?: string
  ref?: React.MutableRefObject<HTMLInputElement>
  className?: string
  label?: string
  onClick?: (e: SyntheticEvent<HTMLButtonElement>) => void
  icon?: Icon
  isLoading?: boolean
  type?: ButtonType
  disabled?: boolean
}
```

## Button types

```typescript
  type ButtonType = "default" | "hollow" | "borderless",

```

## Typical usage

### Default button

```typescript
const myButton: Button = <Button icon={"github"} onClick={this.myHandler} label="Press me" />
```

### Hollow button

```typescript
const myButton: Button = (
  <Button type={ButtonTypes.hollow} onClick={this.myHandler} label="Press me" />
)
```

### Icon button

Please note `"default"` is optional (can be omitted):

```typescript
const myButton: Button = (
  <Button disabled={true} type="default" icon={"plus"} onClick={this.myHandler} label="Press me" />
)
```

### Composed controls and exact geometry (local branch additions)

`Button` accepts `height`, `width`, `fontSize`, `fontWeight`, `gap`, and `justifyContent` in addition to its existing padding/radius props. Numeric geometry, text size and gap values use the theme's 4px subunit, including fractions. String height/width/gap values pass through. An explicit height also sets the minimum height; an icon-only button's explicit width sets its minimum width. `underline` keeps link-style text underlined at rest and on hover. `fontWeight` overrides the default medium (500) weight; existing `strong` behavior is unchanged. The standard compact/default/large ladder remains the default.

`wrapChildren={false}` renders custom child composition directly, preserving sibling icons, labels and descriptions. Its default is `true`, preserving the existing label span. `aria-pressed="true"` uses the same selected state grammar as `active` and `aria-expanded="true"`.

`IconButton` accepts `buttonSize` and `buttonHeight` in 4px subunits for square or rectangular controls. Its historical `width`/`height` props still size glyphs. `TooltipComponent` and `tooltipProps` optionally supply a tooltip adapter; the tooltip must support a child render function. Button refs and pre-existing `aria-describedby` IDs are merged with the tooltip's refs and IDs.

```jsx
<Button neutral flavour="hollow" height={6.5} fontSize={3} padding={[0, 2.5]} wrapChildren={false}>
  <span>Filter</span>
  <span>3</span>
</Button>
<IconButton type="button" icon="chevron_down" aria-label="Move up" buttonSize={7} buttonHeight={3.5} />
```

### Surface appearance

`<Button neutral flavour="hollow" appearance="surface" />` uses `controlBackground` and the softer `border` at rest. Hover uses `controlHoverBackground`, `controlBorder`, and `controlHoverText`; active, expanded, and pressed controls use `controlPressedBackground`, `controlBorder`, and `controlPressedText`. Resting label ink uses `controlText`. All three text roles default to the existing `textFocus` value in each theme. Resting icons follow the label unless `iconColor` is set; hover follows the existing label-ink behavior. `colorPalette` can remap these theme roles, including token arrays such as `colorPalette={{ controlBackground: ["transparent", "full"] }}` to preserve an originally transparent control.

Use `colorPalette={{ controlText: "statusMutedText", controlHoverText: "textFocus", controlPressedText: "textFocus" }}` for a muted trigger that gains emphasis on interaction.

The appearance applies to neutral hollow controls without `danger`, `warning`, or an explicit `color`. Other flavours and existing defaults are unchanged. Radius stays independent: `round={1}` gives 4px. Native `disabled`, `aria-disabled`, and `aria-pressed` retain their existing behavior; an aria-disabled surface uses its resting colors on hover.

### Inline links

`<Button flavour="link" appearance="inline" />` participates in text flow with inline-flex display, baseline alignment, inherited line height, zero default padding, no border width, and no minimum control height. Existing geometry props still apply; other flavours ignore this appearance.

Use `monospace` for the theme's `FONT_MONOSPACE` face. `underlineColor` accepts a theme token or token path; hover restores `currentColor`. `underlineOffset` uses 4px units for numbers (`0.75` gives 3px) or passes strings through. Existing `underline` still controls the resting underline. Inline keyboard focus uses the existing 2px ring with `segmentedFocus` ink and a -2px inset. Other appearances retain their focus styling.

Button also supports the existing Flex `flex`/`basis` contract, CSS `lineHeight` (numbers are unitless, strings pass through), and `disabledOpacity` (default0.4) for native and aria-disabled controls. Defaults remain unchanged; use these props instead of inline styles when preserving compact controls.

With `wrapChildren={false}`, direct child spans retain their own margins; only the default wrapped label receives the existing icon-to-label margin. Text transformation retains its existing behavior.

## Keyboard focus

Use `useRovingFocus({ count })` for a single tab stop in an action group. Spread `getItemProps(index)` on each item. Pass existing handlers and refs as the second argument to keep them composed.

For a controlled tab or radio group, pass `activeIndex` and `onNavigate`. Set `orientation` to `"horizontal"`, `"vertical"`, or `"both"` to match the group. For a list that moves focus without selection or wrapping, call `focusInList(event, elements)` from the list’s key handler.
