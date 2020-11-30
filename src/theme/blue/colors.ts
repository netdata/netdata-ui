import { RawColorsT, AppColorsT } from "../declarations"
import { rawColors } from "../default/colors"

const appColors: AppColorsT = {
  primary: rawColors.green.greenHaze,
  accent: rawColors.green.malachite,
  main: rawColors.white.pure,
  border: rawColors.blue.polo,
  borderSecondary: rawColors.blue.matisse, // neutral color
  disabled: rawColors.blue.madison,
  elementBackground: rawColors.gray.midnight,
  mainBackground: rawColors.blue.catalina,
  mainBackgroundDisabled: rawColors.gray.midnight,
  success: rawColors.green.greenHaze,
  warning: rawColors.yellow.amber,
  error: rawColors.red.redOrange,
  attention: rawColors.purple.mauve,
  attentionSecondary: rawColors.purple.daisy,
  separator: rawColors.gray.chambray,
  controlFocused: rawColors.white.pure, // obsolete?
  selected: rawColors.gray.wedgewood,
  tooltip: rawColors.gray.blackPearl,
  bright: rawColors.white.almost,
  text: rawColors.white.pure,
  textFocus: rawColors.gray.solitude,
  sectionHeaderBackground: rawColors.white.pure,
  placeholder: rawColors.gray.chambray,
  key: rawColors.gray.pigeonPost,

  // Depreacted
  borderColor: rawColors.blue.polo,
  borderSecondaryColor: rawColors.blue.matisse, // neutral color
  separatorColor: rawColors.gray.chambray,
}

export const colors: RawColorsT & AppColorsT = {
  ...rawColors,
  ...appColors,
}
