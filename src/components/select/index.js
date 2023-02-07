import React from "react"
import styled from "styled-components"
import ReactSelect, { components as defaultComponents } from "react-select"
import { capitalizeFirstLetter } from "src/utils"

const withDataAttrs =
  (Component, { ga, testId }, hasInnerProps = true) =>
  ({ innerProps, ...rest }) => {
    const dataProps = {
      ...(ga ? { "data-ga": ga } : {}),
      ...(testId ? { "data-testid": testId } : {}),
    }
    const props = {
      ...rest,
      ...(hasInnerProps ? { innerProps: { ...innerProps, ...dataProps } } : { ...dataProps }),
    }
    return <Component {...props} />
  }

const makeDataAttrs = (ga, testId) => type => {
  const dataAttrs = {}

  if (ga) {
    const gaParts = ga.split("::")
    gaParts[1] = `${gaParts[1]}-${type}`
    dataAttrs.ga = gaParts.join("::")
  }

  if (testId) {
    dataAttrs.testId = `${testId}${capitalizeFirstLetter(type)}`
  }

  return dataAttrs
}

const makeCustomComponents = (components, makeComponentDataAttrs) => ({
  ...defaultComponents,
  ClearIndicator: withDataAttrs(
    defaultComponents.ClearIndicator,
    makeComponentDataAttrs("clearIndicator")
  ),
  Control: withDataAttrs(defaultComponents.Control, makeComponentDataAttrs("clearIndicator")),
  DropdownIndicator: withDataAttrs(
    defaultComponents.DropdownIndicator,
    makeComponentDataAttrs("dropdownIndicator")
  ),
  DownChevron: withDataAttrs(defaultComponents.DownChevron, makeComponentDataAttrs("downChevron")),
  CrossIcon: withDataAttrs(defaultComponents.CrossIcon, makeComponentDataAttrs("crossIcon")),
  Group: withDataAttrs(defaultComponents.Group, makeComponentDataAttrs("group")),
  GroupHeading: withDataAttrs(
    defaultComponents.GroupHeading,
    makeComponentDataAttrs("groupHeading")
  ),
  IndicatorsContainer: withDataAttrs(
    defaultComponents.IndicatorsContainer,
    makeComponentDataAttrs("indicatorsContainer")
  ),
  IndicatorSeparator: withDataAttrs(
    defaultComponents.IndicatorSeparator,
    makeComponentDataAttrs("indicatorSeparator")
  ),
  Input: withDataAttrs(defaultComponents.Input, makeComponentDataAttrs("input"), false),
  LoadingIndicator: withDataAttrs(
    defaultComponents.LoadingIndicator,
    makeComponentDataAttrs("loadingIndicator")
  ),
  Menu: withDataAttrs(defaultComponents.Menu, makeComponentDataAttrs("menu")),
  MenuList: withDataAttrs(defaultComponents.MenuList, makeComponentDataAttrs("menuList")),
  MenuPortal: withDataAttrs(defaultComponents.MenuPortal, makeComponentDataAttrs("menuPortal")),
  LoadingMessage: withDataAttrs(
    defaultComponents.LoadingMessage,
    makeComponentDataAttrs("loadingMessage")
  ),
  NoOptionsMessage: withDataAttrs(
    defaultComponents.NoOptionsMessage,
    makeComponentDataAttrs("noOptionsMessage")
  ),
  MultiValue: withDataAttrs(defaultComponents.MultiValue, makeComponentDataAttrs("multiValue")),
  MultiValueContainer: withDataAttrs(
    defaultComponents.MultiValueContainer,
    makeComponentDataAttrs("multiValueContainer")
  ),
  MultiValueLabel: withDataAttrs(
    defaultComponents.MultiValueLabel,
    makeComponentDataAttrs("multiValueLabel")
  ),
  MultiValueRemove: withDataAttrs(
    defaultComponents.MultiValueRemove,
    makeComponentDataAttrs("multiValueRemove")
  ),
  Option: withDataAttrs(defaultComponents.Option, makeComponentDataAttrs("option")),
  Placeholder: withDataAttrs(defaultComponents.Placeholder, makeComponentDataAttrs("placeholder")),
  SelectContainer: withDataAttrs(
    defaultComponents.SelectContainer,
    makeComponentDataAttrs("selectContainer")
  ),
  SingleValue: withDataAttrs(defaultComponents.SingleValue, makeComponentDataAttrs("singleValue")),
  ValueContainer: withDataAttrs(
    defaultComponents.ValueContainer,
    makeComponentDataAttrs("valueContainer")
  ),
  ...components,
})

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

const Select = styled(ReactSelect).attrs(
  ({ "data-ga": ga, "data-testid": testId, components, ...props }) => ({
    ...props,
    components: makeCustomComponents(components, makeDataAttrs(ga, testId)),
    theme: makeCustomTheme(props.theme),
    styles: makeCustomStyles(props.theme, props.styles),
  })
)``

export default Select
