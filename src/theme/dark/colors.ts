import { RawColorsT, AppColorsT } from "../declarations"
import { rawColors } from "../default/colors"

const appColors: AppColorsT = {
  primary: rawColors.green.greenHaze,
  accent: rawColors.green.malachite,
  main: rawColors.white.pure,
  border: rawColors.gray.aluminium,
  borderSecondary: rawColors.gray.vulcan, // neutral color
  disabled: rawColors.gray.vulcan,
  elementBackground: rawColors.gray.bunker,
  mainBackground: rawColors.gray.cod,
  mainBackgroundDisabled: rawColors.gray.bunker,
  success: rawColors.green.greenHaze,
  warning: rawColors.yellow.amber,
  error: rawColors.red.redOrange,
  attention: rawColors.purple.mauve,
  attentionSecondary: rawColors.purple.daisy,
  separator: rawColors.gray.shuttleGray,
  controlFocused: rawColors.white.pure, // obsolete?
  selected: rawColors.gray.trout,
  tooltip: rawColors.gray.blackRussian,
  bright: rawColors.white.almost,
  text: rawColors.white.pure,
  textFocus: rawColors.gray.solitude,
  sectionHeaderBackground: rawColors.white.pure,
  placeholder: rawColors.gray.shuttleGray,
  key: rawColors.gray.bombayLite,
  panel: rawColors.gray.arsenic,

  // Depreacted
  borderColor: rawColors.gray.aluminium,
  borderSecondaryColor: rawColors.gray.vulcan, // neutral color
  separatorColor: rawColors.gray.shuttleGray,
}

export const colors: RawColorsT & AppColorsT = {
  ...rawColors,
  ...appColors,
}
