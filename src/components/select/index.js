import React, { useRef, useMemo } from "react"
import styled from "styled-components"
import ReactSelect, { components as defaultComponents } from "react-select"
import Creatable from "react-select/creatable"
import { Icon } from "@/components/icon"
import { useVirtualizer } from "@tanstack/react-virtual"
import { dropdownRound, floatingShadowValue } from "@/components/drops/dropdownStyles"
import { getRgbColor, getSizeBy } from "@/theme"
import { controlHeight, controlFontSize } from "@/mixins/controlSize"

const useDataAttrs = (props, name) => {
  const { "data-ga": dataGA, "data-testid": dataTestId } = props.selectProps

  const ga = useMemo(() => {
    if (!dataGA) return dataGA

    const gaParts = dataGA.split("::")
    if (!gaParts[1]) return dataGA

    gaParts[1] = `${gaParts[1]}-${name}`
    return gaParts.join("::")
  }, [dataGA])

  const testId = `${dataTestId || ""}${name}`

  return { "data-ga": ga, "data-testid": testId }
}

const withDataAttrs =
  (Component, name) =>
  ({ innerProps, ...props }) => {
    const dataProps = useDataAttrs(props, name)
    const componentProps = innerProps
      ? { ...props, innerProps: { ...innerProps, ...dataProps } }
      : { ...props, ...dataProps }

    return <Component {...componentProps} />
  }

const withDOMDataAttrs = (Component, name) => props => {
  const dataProps = useDataAttrs(props, name)

  return <Component {...props} {...dataProps} />
}

const OriginalOption = defaultComponents.Option

const Option = props => {
  if (props.data.icon) {
    return (
      <OriginalOption {...props}>
        <Icon name={props.data.icon} color="textLite" margin={[0, 1, 0, 0]} />
        <span>{props.data.label}</span>
      </OriginalOption>
    )
  }

  return <OriginalOption {...props} />
}

const customComponents = {
  ...defaultComponents,
  ClearIndicator: withDataAttrs(defaultComponents.ClearIndicator, "ClearIndicator"),
  Control: withDataAttrs(defaultComponents.Control, "Control"),
  DropdownIndicator: withDataAttrs(defaultComponents.DropdownIndicator, "DropdownIndicator"),
  DownChevron: withDataAttrs(defaultComponents.DownChevron, "DownChevron"),
  CrossIcon: withDataAttrs(defaultComponents.CrossIcon, "CrossIcon"),
  Group: withDataAttrs(defaultComponents.Group, "Group"),
  GroupHeading: withDataAttrs(defaultComponents.GroupHeading, "GroupHeading"),
  IndicatorsContainer: withDataAttrs(defaultComponents.IndicatorsContainer, "IndicatorsContainer"),
  IndicatorSeparator: null,
  Input: withDOMDataAttrs(defaultComponents.Input, "Input"),
  LoadingIndicator: withDataAttrs(defaultComponents.LoadingIndicator, "LoadingIndicator"),
  Menu: withDataAttrs(defaultComponents.Menu, "Menu"),
  MenuList: withDataAttrs(defaultComponents.MenuList, "MenuList"),
  MenuPortal: withDataAttrs(defaultComponents.MenuPortal, "MenuPortal"),
  LoadingMessage: withDataAttrs(defaultComponents.LoadingMessage, "LoadingMessage"),
  MultiValue: withDataAttrs(defaultComponents.MultiValue, "MultiValue"),
  MultiValueContainer: withDataAttrs(defaultComponents.MultiValueContainer, "MultiValueContainer"),
  MultiValueLabel: withDataAttrs(defaultComponents.MultiValueLabel, "MultiValueLabel"),
  MultiValueRemove: withDataAttrs(defaultComponents.MultiValueRemove, "MultiValueRemove"),
  NoOptionsMessage: withDataAttrs(defaultComponents.NoOptionsMessage, "NoOptionsMessage"),
  Option: withDataAttrs(Option, "Option"),
  Placeholder: withDataAttrs(defaultComponents.Placeholder, "Placeholder"),
  SelectContainer: withDataAttrs(defaultComponents.SelectContainer, "SelectContainer"),
  SingleValue: withDataAttrs(defaultComponents.SingleValue, "SingleValue"),
  ValueContainer: withDataAttrs(defaultComponents.ValueContainer, "ValueContainer"),
}

const VirtualItem = ({ virtualRow, child, virtualizer }) => (
  <div
    key={virtualRow.key}
    style={{
      transform: `translateY(${virtualRow.start}px)`,
      top: 0,
      left: 0,
      right: 0,
      position: "absolute",
    }}
    ref={virtualizer.measureElement}
    data-index={virtualRow.index}
  >
    {child}
  </div>
)

const VirtualList = ({ children, parentRef }) => {
  const virtualizer = useVirtualizer({
    count: children.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
    overscan: 5,
  })

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div
      style={{
        height: `${virtualizer.getTotalSize()}px`,
        position: "relative",
      }}
    >
      {virtualItems.map(virtualRow => (
        <VirtualItem
          key={virtualRow.key}
          virtualRow={virtualRow}
          child={children[virtualRow.index]}
          virtualizer={virtualizer}
        />
      ))}
    </div>
  )
}

const VirtualizedMenuList = props => {
  const parentRef = useRef()

  return (
    <customComponents.MenuList
      {...props}
      innerRef={parentRef}
      styles={{
        height: "300px",
        overflow: "auto",
        position: "relative",
      }}
    >
      <VirtualList parentRef={parentRef}>{props.children}</VirtualList>
    </customComponents.MenuList>
  )
}

const sizeBy = (theme, multiplier) => getSizeBy(multiplier)({ theme })

const indicatorStyles = theme => ({
  color: theme.colors.textLite,
  padding: `0 ${sizeBy(theme, 0.75)}`,
  ":hover": { color: theme.colors.text },
  "& svg": { width: sizeBy(theme, 2), height: sizeBy(theme, 2) },
})

const makeCustomTheme = theme => selectTheme => {
  return {
    ...selectTheme,
    borderRadius: theme.constants.SIZE_SUB_UNIT,
    colors: {
      ...selectTheme.colors,
      primary: theme.colors.border,
      primary25: theme.colors.selected,
      primary50: theme.colors.border,
      primary75: theme.colors.tooltip,
      danger: theme.colors.text,
      dangerLight: theme.colors.border,
      neutral0: theme.colors.inputBg,
      neutral5: theme.colors.mainBackgroundDisabled,
      neutral30: theme.colors.controlFocused,
      neutral60: theme.colors.placeholder,
      neutral80: theme.colors.text,
      neutral10: theme.colors.border,
      neutral20: theme.colors.placeholder,
      neutral40: theme.colors.textLite,
      neutral50: theme.colors.placeholder,
    },
  }
}

const getOptionColor = (theme, state) => {
  if (state.isDisabled) return theme.colors.placeholder
  if (state.isSelected) return theme.colors.textFocus
  return theme.colors.text
}

// Keyboard navigation sets isFocused without a hover, so the highlight must follow focus, not :hover.
// Selected rows share the DropdownItem tint so every menu marks the selection the same way.
const getOptionBackground = (theme, state) => {
  if (state.isSelected) return getRgbColor("primary", state.isFocused ? 0.18 : 0.12)({ theme })
  return state.isFocused && !state.isDisabled ? theme.colors.menuItemHover : "transparent"
}

// Round 6 D1: the default 28px control step; chips take the compact text size.
const fontSizeOf = theme => controlFontSize("default")({ theme })
const chipFontSizeOf = theme => controlFontSize("compact")({ theme })
// Inner boxes fill the control minus its 1px hairlines.
const innerHeight = theme => sizeBy(theme, 3.25)
const lineHeight = "16px"
const transition =
  "background-color 120ms ease-out, border-color 120ms ease-out, box-shadow 160ms ease-out"
const reducedMotion = "@media (prefers-reduced-motion: reduce)"

const getControlBorder = (theme, state) => {
  if (state.isFocused) return theme.colors.primary
  return theme.colors.controlBorder
}

const makeCustomStyles = (theme, { minWidth, ...providedStyles } = {}) => {
  const fontSize = fontSizeOf(theme)
  return {
    control: (styles, state) => ({
      ...styles,
      borderColor: getControlBorder(theme, state),
      borderRadius: theme.constants.SIZE_SUB_UNIT,
      boxShadow: state.isFocused ? `inset 0 0 0 1px ${theme.colors.primary}` : "none",
      minHeight: controlHeight("default")({ theme }),
      minWidth: minWidth || sizeBy(theme, 20),
      opacity: state.isDisabled ? 0.4 : 1,
      // Ghost field, matching TextInput: no fill at rest, the element surface on hover and focus.
      backgroundColor: state.isFocused ? theme.colors.elementBackground : "transparent",
      transition,
      [reducedMotion]: { transition: "none" },
      ":hover": {
        borderColor: state.isFocused ? theme.colors.primary : theme.colors.inputBorderHover,
        backgroundColor: theme.colors.elementBackground,
      },
    }),
    input: (styles, state) => ({
      ...styles,
      color: state.isDisabled ? theme.colors.placeholder : theme.colors.text,
      fontSize,
      lineHeight,
      margin: 0,
      paddingBottom: 0,
      paddingTop: 0,
      // react-select sets an inline font shorthand; a stylesheet rule keeps Plex even with unstyled or custom inputs.
      "& input": { fontFamily: "inherit" },
    }),
    menu: styles => ({
      ...styles,
      backgroundColor: theme.colors.dropdown,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: dropdownRound * theme.constants.SIZE_SUB_UNIT,
      boxShadow: floatingShadowValue(theme),
      marginTop: sizeBy(theme, 0.5),
      overflow: "hidden",
      zIndex: 100,
    }),
    menuPortal: styles => ({ ...styles, zIndex: 9999 }),
    multiValue: styles => ({
      ...styles,
      backgroundColor: theme.colors.selected,
      borderRadius: theme.constants.SIZE_SUB_UNIT / 2,
      fontSize: chipFontSizeOf(theme),
      flexDirection: "row-reverse",
      margin: sizeBy(theme, 0.25),
      minHeight: sizeBy(theme, 2.5),
      overflow: "hidden",
    }),
    multiValueLabel: (styles, state) => ({
      ...styles,
      borderRadius: 0,
      color: state.isDisabled ? theme.colors.placeholder : theme.colors.text,
      fontSize: chipFontSizeOf(theme),
      lineHeight,
      padding: `${sizeBy(theme, 0.25)} ${sizeBy(theme, 0.75)}`,
      // The remove control sits on the left; locked chips hide it, so only they need left breathing room.
      paddingLeft: sizeBy(theme, state.data.isDisabled ? 0.75 : 0.25),
    }),
    multiValueRemove: (styles, state) => ({
      ...styles,
      borderRadius: 0,
      color: state.isDisabled ? theme.colors.placeholder : theme.colors.textLite,
      paddingLeft: sizeBy(theme, 0.5),
      paddingRight: sizeBy(theme, 0.5),
      backgroundColor: state.isFocused ? theme.colors.inputBorderHover : "transparent",
      ...(state.data.isDisabled
        ? { display: "none" }
        : {
            ":hover": {
              backgroundColor: theme.colors.inputBorderHover,
              color: theme.colors.text,
            },
          }),
    }),
    option: (styles, state) => ({
      ...styles,
      display: "flex",
      alignItems: "center",
      color: getOptionColor(theme, state),
      backgroundColor: getOptionBackground(theme, state),
      boxShadow: state.isSelected
        ? `inset ${sizeBy(theme, 0.25)} 0 0 ${theme.colors.primary}`
        : "none",
      fontWeight: state.isSelected ? 500 : 400,
      // The placeholder colour is close to body text, so disabled options also fade like other disabled controls.
      opacity: state.isDisabled ? 0.4 : 1,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      ":active": {
        backgroundColor: state.isDisabled ? "transparent" : theme.colors.menuItemSelected,
      },
      fontSize,
      lineHeight,
      minHeight: sizeBy(theme, 3.5),
      padding: `${sizeBy(theme, 0.75)} ${sizeBy(theme, 1.25)}`,
    }),
    placeholder: styles => ({
      ...styles,
      color: theme.colors.placeholder,
      fontSize,
      lineHeight,
      margin: 0,
    }),
    singleValue: (styles, state) => ({
      ...styles,
      color: state.isDisabled ? theme.colors.placeholder : theme.colors.text,
      fontSize,
      lineHeight,
      margin: 0,
    }),
    indicatorsContainer: styles => ({ ...styles, minHeight: innerHeight(theme) }),
    dropdownIndicator: (styles, state) => ({
      ...styles,
      ...indicatorStyles(theme),
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
    }),
    clearIndicator: styles => ({ ...styles, ...indicatorStyles(theme) }),
    valueContainer: styles => ({
      ...styles,
      minHeight: innerHeight(theme),
      padding: `0 ${sizeBy(theme, 1.25)}`,
    }),
    ...providedStyles,
  }
}

const components = { ...customComponents, MenuList: VirtualizedMenuList }

const getAttrs = props => ({
  ...props,
  components: props.components ? { ...components, ...props.components } : components,
  theme: makeCustomTheme(props.theme),
  styles: makeCustomStyles(props.theme, props.styles),
})

const SelectComponent = styled(ReactSelect).attrs(getAttrs)``
const CreatableComponent = styled(Creatable).attrs(getAttrs)``

const Select = ({ isCreatable, ...props }) => {
  if (isCreatable) return <CreatableComponent {...props} />
  return <SelectComponent {...props} />
}

export default Select
