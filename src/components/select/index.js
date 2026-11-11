import { useMemo } from "react"
import styled from "styled-components"
import ReactSelect, { components as defaultComponents } from "react-select"
import Creatable from "react-select/creatable"
import { Icon } from "@/components/icon"
import { CheckboxIndicator } from "@/components/checkbox"
import DropdownSelectionCheck from "@/components/drops/dropdownSelectionCheck"
import VirtualizedMenuList from "./virtualizedMenuList"
import {
  floatingShadowValue,
  getDropdownOptionColors,
  insetMenuPadding,
  insetMenuRound,
  insetMenuRowRound,
  menuSelectionMarker,
} from "@/components/drops/dropdownStyles"
import { getSizeBy } from "@/theme"
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

const OptionLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Option = props => {
  const { children, data, innerProps, isMulti, isSelected, selectProps } = props
  const title = typeof children === "string" ? children : undefined
  const quiet = selectProps.selectionStyle === "quiet"

  return (
    <OriginalOption {...props} innerProps={title ? { ...innerProps, title } : innerProps}>
      {quiet && isMulti && (
        <CheckboxIndicator checked={isSelected} margin={[0, 2, 0, 0]} flex="none" />
      )}
      {data.icon && <Icon name={data.icon} color="textLite" margin={[0, 1, 0, 0]} flex="none" />}
      {title ? <OptionLabel>{children}</OptionLabel> : children}
      {quiet && !isMulti && isSelected && <DropdownSelectionCheck />}
    </OriginalOption>
  )
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
      neutral0: theme.colors.controlBackground,
      neutral5: theme.colors.controlPressedBackground,
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

const getOptionColor = (theme, optionColors, state) => {
  if (state.isDisabled) return theme.colors.placeholder
  if (state.isSelected) return optionColors.selectedText
  return theme.colors.text
}

// Keyboard navigation sets isFocused without a hover, so the highlight must follow focus, not :hover.
const getOptionBackground = (optionColors, state) => {
  if (state.isSelected) return state.isFocused ? optionColors.selectedHover : optionColors.selected
  return state.isFocused && !state.isDisabled ? optionColors.hover : "transparent"
}

const fontSizeOf = theme => controlFontSize("default")({ theme })
const chipFontSizeOf = theme => controlFontSize("compact")({ theme })
const lineHeight = "16px"
const transition =
  "background-color 120ms ease-out, border-color 120ms ease-out, box-shadow 160ms ease-out"
const reducedMotion = "@media (prefers-reduced-motion: reduce)"

const getControlBorder = (theme, state) => {
  if (state.isFocused) return theme.colors.primary
  return theme.colors.controlBorder
}

const makeCustomStyles = (theme, selectionStyle, { minWidth, ...providedStyles } = {}) => {
  const optionColors = getDropdownOptionColors(theme, selectionStyle)
  const fontSize = fontSizeOf(theme)
  const minHeight = Number.parseFloat(controlHeight("default")({ theme }))
  const innerMinHeight = minHeight - 2
  return {
    control: (styles, state) => ({
      ...styles,
      borderColor: getControlBorder(theme, state),
      borderRadius: theme.constants.SIZE_SUB_UNIT,
      boxShadow: state.isFocused ? `inset 0 0 0 1px ${theme.colors.primary}` : "none",
      minHeight,
      minWidth: minWidth || sizeBy(theme, 20),
      opacity: state.isDisabled ? 0.4 : 1,
      // Ghost field, matching TextInput: no fill at rest, the element surface on hover and focus.
      backgroundColor: state.isFocused
        ? theme.colors.controlHoverBackground
        : theme.colors.controlBackground,
      transition,
      [reducedMotion]: { transition: "none" },
      ":hover": {
        borderColor: state.isFocused ? theme.colors.primary : theme.colors.inputBorderHover,
        backgroundColor: theme.colors.controlHoverBackground,
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
      borderRadius: insetMenuRound * theme.constants.SIZE_SUB_UNIT,
      boxShadow: floatingShadowValue(theme),
      marginTop: sizeBy(theme, 0.5),
      overflow: "hidden",
      zIndex: 100,
    }),
    menuList: (styles, { selectProps }) => ({
      ...styles,
      padding: selectProps.insetMenuContent
        ? 0
        : `${insetMenuPadding * theme.constants.SIZE_SUB_UNIT}px`,
      overflowX: "hidden",
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
      color: getOptionColor(theme, optionColors, state),
      backgroundColor: getOptionBackground(optionColors, state),
      borderRadius: insetMenuRowRound * theme.constants.SIZE_SUB_UNIT,
      boxShadow:
        state.isSelected && selectionStyle !== "quiet" ? menuSelectionMarker({ theme }) : "none",
      fontWeight: state.isSelected ? 500 : 400,
      // The placeholder colour is close to body text, so disabled options also fade like other disabled controls.
      opacity: state.isDisabled ? 0.4 : 1,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      ":active": {
        backgroundColor: state.isDisabled ? "transparent" : optionColors.selected,
      },
      fontSize,
      lineHeight,
      minHeight: sizeBy(theme, 4.25),
      padding: `${sizeBy(theme, 1)} ${sizeBy(theme, 1.25)}`,
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
    indicatorsContainer: styles => ({ ...styles, minHeight: innerMinHeight }),
    dropdownIndicator: (styles, state) => ({
      ...styles,
      ...indicatorStyles(theme),
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "none",
    }),
    clearIndicator: styles => ({ ...styles, ...indicatorStyles(theme) }),
    valueContainer: styles => ({
      ...styles,
      minHeight: innerMinHeight,
      padding: `0 ${sizeBy(theme, 1.5)}`,
    }),
    ...providedStyles,
  }
}

const MenuList = props => <VirtualizedMenuList {...props} MenuList={customComponents.MenuList} />

const components = { ...customComponents, MenuList }

const getAttrs = props => ({
  ...props,
  insetMenuContent: !props.styles?.menuList && !props.components?.MenuList,
  components: props.components ? { ...components, ...props.components } : components,
  theme: makeCustomTheme(props.theme),
  styles: makeCustomStyles(props.theme, props.selectionStyle, props.styles),
})

const SelectComponent = styled(ReactSelect).attrs(getAttrs)``
const CreatableComponent = styled(Creatable).attrs(getAttrs)``

const Select = ({ isCreatable, ...props }) => {
  if (isCreatable) return <CreatableComponent {...props} />
  return <SelectComponent {...props} />
}

export default Select
