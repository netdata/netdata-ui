import React, { useMemo } from "react"
import styled from "styled-components"
import ReactSelect, { components as defaultComponents } from "react-select"
import Creatable from "react-select/creatable"
import { Icon } from "@/components/icon"

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
  IndicatorSeparator: withDataAttrs(defaultComponents.IndicatorSeparator, "IndicatorSeparator"),
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
      neutral0: theme.colors.inputBg,
      neutral5: theme.colors.mainBackgroundDisabled,
      neutral30: theme.colors.controlFocused,
      neutral60: theme.colors.placeholder,
      neutral80: theme.colors.text,
      neutral10: theme.colors.border,
      neutral20: theme.colors.placeholder,
    },
  }
}

const getOptionColor = (theme, state) => {
  if (state.isDisabled) return theme.colors.placeholder
  return theme.colors.text
}

const getOptionBackground = (theme, state) => {
  if (state.isSelected) return theme.colors.menuItemSelected
  return null
}

const makeCustomStyles = (theme, { minWidth, size, ...providedStyles } = {}) => ({
  control: (styles, state) => ({
    ...styles,
    borderColor: state.isFocused ? theme.colors.inputBorderFocus : theme.colors.inputBorder,
    boxShadow: "none",
    minHeight: 18,
    minWidth: minWidth || 160,
    ":hover": {
      borderColor: theme.colors.inputBorderHover,
    },
  }),
  input: (styles, state) => ({
    ...styles,
    color: state.isDisabled ? theme.colors.placeholder : theme.colors.grey140,
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
    backgroundColor: theme.colors.grey40,
    borderRadius: "0 2px 2px 0",
    color: state.isDisabled ? theme.colors.placeholder : theme.colors.grey140,
    ...(size === "tiny" ? { padding: "1px" } : {}),
    paddingRight: state.data.isDisabled ? "8px" : "",
  }),
  multiValueRemove: (styles, state) => ({
    color: state.isDisabled ? theme.colors.placeholder : theme.colors.grey140,
    ...(state.data.isDisabled
      ? { ...styles, display: "none" }
      : {
          ...styles,
          borderRadius: "2px 0 0 2px",
          background: theme.colors.grey40,
          ":hover": {
            background: theme.colors.tabsBorder,
          },
        }),
  }),
  option: (styles, state) => ({
    ...styles,
    display: "flex",
    alignItems: "center",
    color: getOptionColor(theme, state),
    backgroundColor: getOptionBackground(theme, state),
    ":hover": {
      backgroundColor: theme.colors.secondaryHighlight,
      color: theme.colors.text,
    },
    ...(size === "tiny" ? { fontSize: "12px", minHeight: 28, padding: "4px 8px" } : {}),
  }),
  placeholder: styles => ({
    ...styles,
    color: theme.colors.placeholder,
    ...(size === "tiny" ? { fontSize: "12px", lineHeight: "18px" } : {}),
  }),
  singleValue: (styles, state) => ({
    ...styles,
    color: state.isDisabled ? theme.colors.placeholder : theme.colors.grey140,
    fontSize: size === "tiny" ? "12px" : "14px",
  }),
  ...(size === "tiny"
    ? {
        dropdownIndicator: styles => ({ ...styles, padding: "3px" }),
        clearIndicator: styles => ({ ...styles, padding: "3px" }),
        indicatorsContainer: styles => ({ ...styles, minHeight: 18 }),
        valueContainer: styles => ({
          ...styles,
          minHeight: 18,
          padding: "1px 6px",
        }),
      }
    : {
        dropdownIndicator: styles => ({ ...styles, padding: "3px" }),
        clearIndicator: styles => ({ ...styles, padding: "3px" }),
        indicatorsContainer: styles => ({ ...styles, minHeight: 28 }),
        valueContainer: styles => ({
          ...styles,
          minHeight: 28,
          padding: "1px 6px",
        }),
      }),
  ...providedStyles,
})

const getAttrs = props => ({
  ...props,
  components: { ...customComponents, ...props.components },
  theme: makeCustomTheme(props.theme),
  styles: makeCustomStyles(props.theme, props.styles),
})

const SelectComponent = styled(ReactSelect).attrs(getAttrs)``
const CreatableComponent = styled(Creatable).attrs(getAttrs)``

const Select = ({ isCreatable, ...props }) => {
  const Component = isCreatable ? CreatableComponent : SelectComponent
  return <Component {...props} />
}

export default Select
