import rawColors from "../rawColors"

const appColors = {
  primary: rawColors.green.green100,
  accent: rawColors.green.chateau,
  main: rawColors.neutral.white,
  border: rawColors.neutral.grey45,
  borderSecondary: rawColors.neutral.grey35,
  disabled: rawColors.neutral.tuna,
  disabledBackground: rawColors.neutral.outerSpace,
  dropdown: rawColors.neutral.grey40,
  dropdownShadow: rawColors.shadows.dropdownDark,
  elementBackground: rawColors.neutral.outerSpace,
  elementBackgroundHover: rawColors.neutral.tuna,
  mainBackground: rawColors.neutral.grey15,
  mainBackgroundDisabled: rawColors.neutral.outerSpace,
  modalHeaderBackground: rawColors.neutral.grey10,
  modalTabsBackground: rawColors.neutral.grey20,
  modalBackground: rawColors.neutral.grey30,
  modalInfoBackground: rawColors.neutral.bluebayoux,
  menuItemSelected: rawColors.green.green20,
  menuItemHover: rawColors.green.green10,

  //============Status=============\\
  success: rawColors.green.green100,
  successLite: rawColors.green.green190,
  successSemi: rawColors.green.green20,
  successBackground: rawColors.green.green50,
  successText: rawColors.green.green100,

  warning: rawColors.yellow.yellow80,
  warningLite: rawColors.yellow.yellow190,
  warningSemi: rawColors.yellow.yellow20,
  warningBackground: rawColors.yellow.yellow60,
  warningText: rawColors.yellow.seaBuckthorn,

  error: rawColors.red.red100,
  errorLite: rawColors.red.red190,
  errorSemi: rawColors.red.red20,
  errorBackground: rawColors.red.red50,
  errorText: rawColors.red.pomegranate,

  generic: rawColors.neutral.grey60,

  live: rawColors.green.green100,
  stale: rawColors.green.green900,
  unseen: rawColors.yellow.yellow900,
  offline: rawColors.neutral.grey90,

  //=========================================\\

  attention: rawColors.purple.mauve,
  attentionSecondary: rawColors.purple.daisy,
  separator: rawColors.neutral.borderSecondary,
  controlFocused: rawColors.neutral.white,
  selected: rawColors.neutral.grey55,
  tooltip: rawColors.neutral.outerSpace,
  bright: rawColors.neutral.white,
  text: rawColors.neutral.grey155,
  textLite: rawColors.neutral.grey120,
  textFocus: rawColors.neutral.porcelain,
  textDescription: rawColors.neutral.grey120,
  sectionHeaderBackground: rawColors.neutral.white,
  sectionTitle: rawColors.neutral.grey155,
  sectionDescription: rawColors.neutral.grey150,
  menuItem: rawColors.neutral.grey140,
  placeholder: rawColors.neutral.bluebayoux,
  key: rawColors.neutral.iron,
  panel: rawColors.neutral.limedSpruce,
  panelBg: rawColors.neutral.grey25,
  sideBar: rawColors.neutral.grey25,
  sideBarMini: rawColors.neutral.grey05,
  spaceSelected: rawColors.neutral.grey85,
  spaceIdle: rawColors.neutral.grey50,
  spaceHovered: rawColors.neutral.grey65,
  miniChartsContainer: rawColors.neutral.grey40,

  topBarBg: rawColors.neutral.grey35,
  elevationLevelOne: rawColors.neutral.grey60,
  //Input colors
  inputBg: rawColors.neutral.grey55,
  inputBorder: rawColors.neutral.grey65,
  inputBorderHover: rawColors.neutral.grey85,
  inputBorderFocus: rawColors.neutral.grey85,
  // Badges
  nodeBadgeBackground: rawColors.neutral.limedSpruce,
  nodeBadgeBorder: rawColors.neutral.bluebayoux,
  nodeBadgeColor: rawColors.neutral.white,

  //Default pills
  neutralPillBg: rawColors.neutral.grey90,
  neutralPillBorder: rawColors.neutral.grey90,
  neutralPillColor: rawColors.neutral.grey120,

  //Alert MasterCard
  alertIcon: rawColors.neutral.grey50,
  idleError: rawColors.red.red20,
  idleWarning: rawColors.yellow.yellow20,
  idleClear: rawColors.green.green20,

  //Table
  dropdownTable: rawColors.neutral.eerieBlack,
  tableRowBgHover: rawColors.neutral.grey50,
  tableRowBg: rawColors.neutral.grey40,
  columnHighlight: rawColors.green.green30,

  //Progress Bare
  progressBg: rawColors.neutral.bluebayoux,

  //IconButton
  iconColor: rawColors.neutral.grey160,

  //table-resizer
  resizerLine: rawColors.green.vista,

  anomalyText: rawColors.purple.mauve,
  anomalyTextLite: rawColors.purple.mauveDark,
  anomalyTextFocus: rawColors.purple.mauveFocus,
  terminalGreen: rawColors.green.terminalGreen,
  terminalGreenBorder: rawColors.green.terminalGreenBorder,
  darkBackground: rawColors.neutral["grey-05"],
  integrationMenuItemHover: rawColors.green.terminalGreen,
}

export default {
  ...rawColors,
  ...appColors,
}
