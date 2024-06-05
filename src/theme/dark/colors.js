import rawColors from "../rawColors"

const appColors = {
  primary: rawColors.green.green100,
  accent: rawColors.green.chateau,
  main: rawColors.neutral.white,
  border: rawColors.neutral.grey45,
  borderSecondary: rawColors.neutral.grey35,
  disabled: rawColors.neutral.grey100,
  disabledBackground: rawColors.neutral.grey100,
  dropdown: rawColors.neutral.grey40,
  dropdownShadow: rawColors.shadows.dropdownDark,
  elementBackground: rawColors.neutral.grey35,
  elementBackgroundHover: rawColors.neutral.tuna,
  mainBackground: rawColors.neutral.grey15,
  mainBackgroundDisabled: rawColors.neutral.outerSpace,
  modalHeaderBackground: rawColors.neutral.grey10,
  modalTabsBackground: rawColors.neutral.grey20,
  modalBackground: rawColors.neutral.grey30,
  modalInfoBackground: rawColors.neutral.grey50,
  menuItemSelected: rawColors.green.green30,
  menuItemHover: rawColors.green.green10,
  //links
  link: rawColors.green.green110,
  linkHover: rawColors.green.green120,
  //Buttons
  primaryHighlight: rawColors.green.green100,
  secondaryColor: rawColors.green.green110,
  secondaryHighlight: rawColors.green.green40,
  neutralHighlight: rawColors.neutral.grey50,
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
  warningBannerBg: rawColors.yellow.yellow60,
  warningText: rawColors.yellow.seaBuckthorn,

  error: rawColors.red.red100,
  errorLite: rawColors.red.red190,
  errorSemi: rawColors.red.red20,
  errorBackground: rawColors.red.red50,
  errorBannerBg: rawColors.red.red50,
  errorText: rawColors.red.pomegranate,

  generic: rawColors.neutral.grey60,

  live: rawColors.green.green100,
  stale: rawColors.green.green1000,
  staleSemi: rawColors.green.green900,
  unseen: rawColors.yellow.yellow900,
  offline: rawColors.neutral.grey90,

  //=========================================\\

  attention: rawColors.purple.mauve,
  attentionSecondary: rawColors.purple.daisy,
  separator: rawColors.neutral.grey35,
  controlFocused: rawColors.neutral.white,
  selected: rawColors.neutral.grey55,
  highlight: rawColors.neutral.grey55,
  tooltip: rawColors.neutral.outerSpace,
  tooltipText: rawColors.neutral.white,
  bright: rawColors.neutral.white,
  text: rawColors.neutral.grey155,
  textLite: rawColors.neutral.grey120,
  textNoFocus: rawColors.neutral.grey105,
  textFocus: rawColors.neutral.grey160,
  textDescription: rawColors.neutral.grey120,
  sectionHeaderBackground: rawColors.neutral.white,
  sectionTitle: rawColors.neutral.grey155,
  sectionDescription: rawColors.neutral.grey150,
  menuItem: rawColors.neutral.grey140,
  placeholder: rawColors.neutral.grey110,
  key: rawColors.neutral.iron,
  panel: rawColors.neutral.limedSpruce,
  panelBg: rawColors.neutral.grey25,
  mainChartBg: rawColors.neutral.grey25,
  mainChartHeaderBg: rawColors.neutral.grey35,
  mainChartBorder: rawColors.neutral.grey25,
  mainChartTboxHover: rawColors.neutral.grey50,
  sideBar: rawColors.neutral.grey25,
  sideBarMini: rawColors.neutral.grey05,
  spaceSelected: rawColors.neutral.grey85,
  spaceIdle: rawColors.neutral.grey50,
  spaceHovered: rawColors.neutral.grey65,
  hoverHighlight: rawColors.green.green195,

  topBarBg: rawColors.neutral.grey35,
  elevationLevelOne: rawColors.neutral.grey60,
  //Input colors
  inputBg: rawColors.neutral.grey55,
  inputBorder: rawColors.neutral.grey65,
  inputBorderHover: rawColors.neutral.grey85,
  inputBorderFocus: rawColors.neutral.grey85,
  // Badges
  nodeBadgeBackground: rawColors.neutral.grey90,
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
  tableRowBgHover: rawColors.neutral.grey35,
  tableRowBg: rawColors.neutral.grey10,
  tableRowBg2: rawColors.neutral.grey20,
  tableRowBg2Hover: rawColors.neutral.grey35,
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
  terminalGreen: rawColors.green.green20,
  terminalGreenBorder: rawColors.green.green60,
  darkBackground: rawColors.neutral.grey05,
  integrationMenuItemHover: rawColors.green.green20,
}

export default {
  ...rawColors,
  ...appColors,
}
