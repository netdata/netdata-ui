import React, { useMemo } from "react"
import styled from "styled-components"
import ReactSelect, { components as defaultComponents } from "react-select"

const withDataAttrs =
  (Component, name, hasInnerProps = true) =>
  props => {
    const { "data-ga": dataGA, "data-testid": dataTestId } = props.selectProps

    const ga = useMemo(() => {
      if (!dataGA) return dataGA

      const gaParts = dataGA.split("::")
      if (!gaParts[1]) return dataGA

      gaParts[1] = `${gaParts[1]}-${name}`
      return gaParts.join("::")
    }, [dataGA])

    const testId = `${dataTestId || ""}${name}`

    const dataProps = { "data-ga": ga, "data-testid": testId }
    const componentProps = {
      ...props,
      ...(hasInnerProps ? { innerProps: { ...props.innerProps, ...dataProps } } : { ...dataProps }),
    }

    return <Component {...componentProps} />
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
  IndicatorSeparator: withDataAttrs(defaultComponents.IndicatorSeparator, "IndicatorSeparator"),
  Input: withDataAttrs(defaultComponents.Input, "Input", false),
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
  Option: withDataAttrs(defaultComponents.Option, "Option"),
  Placeholder: withDataAttrs(defaultComponents.Placeholder, "Placeholder"),
  SelectContainer: withDataAttrs(defaultComponents.SelectContainer, "SelectContainer"),
  SingleValue: withDataAttrs(defaultComponents.SingleValue, "SingleValue"),
  ValueContainer: withDataAttrs(defaultComponents.ValueContainer, "ValueContainer"),
}

const makeCustomTheme = theme => selectTheme => {
  return {
    ...selectTheme,
    borderRadius: 4,
    colors: {
      ...selectTheme.colors,
      primary: theme.colors.border,
      primary25: theme.colors.selected,
      primary50: theme.colors.border,
      primary75: theme.colors.tooltip,
      danger: theme.colors.text,
      dangerLight: theme.colors.border,
      neutral0: theme.colors.mainBackground,
      neutral5: theme.colors.mainBackgroundDisabled,
      neutral30: theme.colors.controlFocused,
      neutral60: theme.colors.border,
      neutral80: theme.colors.text,
      neutral10: theme.colors.border,
      neutral20: theme.colors.border,
    },
  }
}

const getOptionColor = (theme, state) => {
  if (state.isDisabled) return theme.colors.placeholder
  if (state.isSelected) return theme.colors.bright
  return theme.colors.textDescription
}

const makeCustomStyles = (theme, { size, ...providedStyles } = {}) => ({
  control: (styles, state) => ({
    ...styles,
    borderColor: state.isFocused ? theme.colors.inputBorderFocus : theme.colors.inputBorder,
    boxShadow: "none",
    minWidth: 160,
    ...(size === "tiny" ? { minHeight: 28 } : {}),
    ":hover": {
      borderColor: theme.colors.inputBorderHover,
    },
  }),
  input: (styles, state) => ({
    ...styles,
    color: state.isDisabled ? theme.colors.placeholder : theme.colors.textDescription,
    ...(size === "tiny"
      ? {
          lineHeight: "18px",
          paddingBottom: 0,
          paddingTop: 0,
        }
      : {}),
  }),
  menu: styles => ({ ...styles, zIndex: 100 }),
  menuPortal: styles => ({ ...styles, zIndex: 9999 }),
  multiValue: styles => ({
    ...styles,
    fontSize: size === "tiny" ? "12px" : "14px",
    flexDirection: "row-reverse",
    ...(size === "tiny" ? { minHeight: 18 } : {}),
  }),
  multiValueLabel: (styles, state) => ({
    ...styles,
    backgroundColor: theme.colors.disabled,
    borderRadius: "0 2px 2px 0",
    color: state.isDisabled ? theme.colors.placeholder : theme.colors.textDescription,
    ...(size === "tiny" ? { padding: "1px" } : {}),
    paddingRight: state.data.isDisabled ? "8px" : "",
  }),
  multiValueRemove: (styles, state) => ({
    color: state.isDisabled ? theme.colors.placeholder : theme.colors.textDescription,
    ...(state.data.isDisabled
      ? { ...styles, display: "none" }
      : {
          ...styles,
          borderRadius: "2px 0 0 2px",
          background: theme.colors.disabled,
          ":hover": {
            background: theme.colors.tabsBorder,
          },
        }),
  }),
  option: (styles, state) => ({
    ...styles,
    color: getOptionColor(theme, state),
    ...(size === "tiny" ? { fontSize: "12px", minHeight: 28, padding: "4px 8px" } : {}),
  }),
  placeholder: styles => ({
    ...styles,
    color: theme.colors.placeholder,
    ...(size === "tiny" ? { fontSize: "12px", lineHeight: "18px" } : {}),
  }),
  singleValue: (styles, state) => ({
    ...styles,
    color: state.isDisabled ? theme.colors.placeholder : theme.colors.textDescription,
    fontSize: size === "tiny" ? "12px" : "14px",
  }),
  ...(size === "tiny"
    ? {
        dropdownIndicator: styles => ({ ...styles, padding: "3px" }),
        clearIndicator: styles => ({ ...styles, padding: "3px" }),
        indicatorsContainer: styles => ({ ...styles, minHeight: 28 }),
        valueContainer: styles => ({
          ...styles,
          minHeight: 28,
          padding: "1px 6px",
        }),
      }
    : {}),
  ...providedStyles,
})

const Select = styled(ReactSelect).attrs(props => ({
  ...props,
  components: { ...customComponents, ...props.components },
  theme: makeCustomTheme(props.theme),
  styles: makeCustomStyles(props.theme, props.styles),
}))``

export default Select
