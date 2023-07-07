import rawColors from "../rawColors"

const appColors = {
  primary: rawColors.green.green100,
  accent: rawColors.green.chateau,
  main: rawColors.neutral.limedSpruce,
  border: rawColors.neutral.regentgrey,
  borderSecondary: rawColors.neutral.porcelain,
  tabsBorder: rawColors.neutral.iron,
  disabled: rawColors.neutral.porcelain,
  disabledBackground: rawColors.neutral.porcelain,
  dropdown: rawColors.neutral.white,
  dropdownShadow: rawColors.shadows.dropdownLight,
  elementBackground: rawColors.neutral.blackhaze,
  elementBackgroundHover: rawColors.neutral.white,
  mainBackground: rawColors.neutral.white,
  mainBackgroundDisabled: rawColors.neutral.blackhaze,
  modalHeaderBackground: rawColors.neutral.porcelain,
  modalTabsBackground: rawColors.neutral.blackhaze,
  modalBackground: rawColors.neutral.white,
  modalInfoBackground: rawColors.neutral.blackhaze,

  success: rawColors.green.netdata,
  successLite: rawColors.green.deyork,
  successBackground: rawColors.green.frostee,
  successText: rawColors.green.netdata,

  warning: rawColors.yellow.seaBuckthorn,
  warningLite: rawColors.yellow.mustard,
  warningBackground: rawColors.yellow.buttermilk,
  warningText: rawColors.yellow.seaBuckthorn,

  error: rawColors.red.pomegranate,
  errorLite: rawColors.red.apricot,
  errorBackground: rawColors.red.lavender,
  errorText: rawColors.red.pomegranate,

  attention: rawColors.purple.mauve,
  attentionSecondary: rawColors.purple.daisy,
  separator: rawColors.neutral.porcelain,
  controlFocused: rawColors.neutral.limedSpruce,
  selected: rawColors.neutral.iron,
  tooltip: rawColors.neutral.shark,
  bright: rawColors.neutral.white,
  text: rawColors.neutral.bluebayoux,
  textLite: rawColors.neutral.regentgrey,
  textFocus: rawColors.neutral.regentgrey,
  textDescription: rawColors.neutral.bluebayoux,
  sectionHeaderBackground: rawColors.neutral.limedSpruce,
  sectionTitle: rawColors.neutral.bluebayoux,
  sectionDescription: rawColors.neutral.regentgrey,
  placeholder: rawColors.neutral.regentgrey,
  key: rawColors.neutral.regentgrey,
  panel: rawColors.neutral.limedSpruce,
  panelBg: rawColors.neutral.blackhaze,
  sideBar: rawColors.neutral.brightGrey,
  sideBarMini: rawColors.neutral.chineseWhite,
  menuItem: rawColors.neutral.bluebayoux,
  nodesViewMiniCharts: rawColors.neutral.iron,
  topBarBg: rawColors.neutral.blackhaze,
  elevationLevelOne: rawColors.neutral.porcelain,
  //Input colors
  inputBg: rawColors.neutral.blackhaze,
  inputBorder: rawColors.neutral.iron,
  inputBorderHover: rawColors.neutral.regentgrey,
  inputBorderFocus: rawColors.neutral.bluebayoux,
  //Badges
  nodeBadgeBackground: rawColors.neutral.porcelain,
  nodeBadgeBorder: rawColors.neutral.iron,
  nodeBadgeColor: rawColors.neutral.bluebayoux,

  //Default pills
  neutralPillBg: rawColors.neutral.iron,
  neutralPillBorder: rawColors.neutral.iron,
  neutralPillColor: rawColors.neutral.bluebayoux,

  //Alert MasterCard
  alertBorder: rawColors.neutral.porcelain,
  alertIcon: rawColors.neutral.porcelain,
  idleError: rawColors.neutral.regentgrey,
  idleWarning: rawColors.neutral.iron,
  idleClear: rawColors.neutral.chineseWhite,

  //Table
  dropdownTable: rawColors.neutral.white,
  tableRowBg: rawColors.neutral.blackhaze,
  tableRowBgHover: rawColors.neutral.porcelain,
  columnHighlight: rawColors.green.frostee,
  //IconButton
  iconColor: rawColors.neutral.limedSpruce,

  //Progress Bare
  progressBg: rawColors.neutral.chineseWhite,

  //table-resizer
  resizerLine: rawColors.green.vista,

  anomalyText: rawColors.purple.lilac,
  anomalyTextLite: rawColors.purple.lilacLite,
  anomalyTextFocus: rawColors.purple.lilacFocus,
  terminalGreen: rawColors.green["grey-197"],
  terminalGreenBorder: rawColors.green.terminalGreenBorderLight,
  darkBackground: rawColors.neutral["grey-195"],
  integrationMenuItemHover: rawColors.neutral["grey-180"],
}

export default {
  ...appColors,
  ...rawColors,
}
