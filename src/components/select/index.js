import ReactSelect from "react-select"
import styled from "styled-components"

export const selectMenusZIndex = 100

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
  if (state.isDisabled) return theme.colors.border
  if (state.isSelected) return theme.colors.bright
  return theme.colors.text
}

const makeCustomStyles = (theme, providedStyles) => ({
  option: (styles, state) => ({
    ...styles,
    color: getOptionColor(theme, state),
    fontWeight: "normal",
  }),
  control: styles => ({
    ...styles,
    minWidth: 160,
    fontWeight: "normal",
  }),
  menu: styles => ({
    ...styles,
    zIndex: selectMenusZIndex,
  }),
  multiValueLabel: (styles, control) => ({
    ...styles,
    paddingRight: control.data.isDisabled ? "8px" : "",
    borderRadius: "2px 0 0 2px",
    backgroundColor: theme.colors.disabled,
  }),
  multiValueRemove: (styles, control) =>
    control.data.isDisabled
      ? { ...styles, display: "none" }
      : {
          ...styles,
          color: theme.colors.text,
          borderRadius: "0 2px 2px 0",
          background: theme.colors.disabled,
          ":hover": {
            background: theme.colors.borderSecondary,
          },
        },
  ...providedStyles,
})

export const Select = styled(ReactSelect).attrs(props => ({
  ...props,
  theme: makeCustomTheme(props.theme),
  styles: makeCustomStyles(props.theme, props.styles),
}))``
