import { RawColorsT, AppColorsT } from "../declarations"
import { rawColors } from "../default/colors"

const appColors: AppColorsT = {
  primary: rawColors.green.greenHaze,
  accent: rawColors.green.malachite,
  main: rawColors.white.pure,
  border: rawColors.blue.polo,
  borderSecondary: rawColors.blue.matisse, // neutral color
  disabled: rawColors.blue.matisse,
  elementBackground: rawColors.gray.midnight,
  mainBackground: rawColors.blue.catalina,
  mainBackgroundDisabled: rawColors.gray.midnight,
  success: rawColors.green.greenHaze,
  warning: rawColors.yellow.amber,
  error: rawColors.red.redOrange,
  attention: rawColors.purple.mauve,
  separator: rawColors.gray.chambray,
  controlFocused: rawColors.white.pure, // obsolete?
  selected: rawColors.gray.wedgewood,
  tooltip: rawColors.gray.tangaroa,
  bright: rawColors.white.almost,
  text: rawColors.white.pure,
  textFocus: rawColors.gray.arsenic,
  sectionHeaderBackground: rawColors.white.pure,
  placeholder: rawColors.gray.chambray,

  // Depreacted
  borderColor: rawColors.blue.polo,
  borderSecondaryColor: rawColors.blue.matisse, // neutral color
  separatorColor: rawColors.gray.chambray,
}

export const colors: RawColorsT & AppColorsT = {
  ...rawColors,
  ...appColors,
}
