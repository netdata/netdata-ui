import rawColors from "../rawColors"

const appColors = {
  primary: rawColors.green.green100,
  accent: rawColors.green.chateau,
  main: rawColors.neutral.limedSpruce,
  border: rawColors.neutral.grey185,
  borderSecondary: rawColors.neutral.grey180,
  disabled: rawColors.neutral.grey160,
  disabledBackground: rawColors.neutral.grey160,
  dropdown: rawColors.neutral.white,
  dropdownShadow: rawColors.shadows.dropdownLight,
  elementBackground: rawColors.neutral.blackhaze,
  elementBackgroundHover: rawColors.neutral.white,
  mainBackground: rawColors.neutral.grey195,
  mainBackgroundDisabled: rawColors.neutral.blackhaze,
  modalHeaderBackground: rawColors.neutral.grey185,
  modalTabsBackground: rawColors.neutral.grey190,
  modalBackground: rawColors.neutral.grey195,
  modalInfoBackground: rawColors.neutral.blackhaze,
  menuItemSelected: rawColors.green.green196,
  menuItemHover: rawColors.green.green190,
  //links
  link: rawColors.green.green100,
  linkHover: rawColors.green.green110,
  //Buttons
  secondaryColor: rawColors.green.green100,
  primaryHighlight: rawColors.green.green110,
  secondaryHighlight: rawColors.green.green190,
  neutralHighlight: rawColors.neutral.grey180,
  //============Status=============\\
  success: rawColors.green.green100,
  successLite: rawColors.green.green190,
  successSemi: rawColors.green.green190,
  successBackground: rawColors.green.green50,
  successText: rawColors.green.green100,

  warning: rawColors.yellow.yellow80,
  warningLite: rawColors.yellow.yellow190,
  warningSemi: rawColors.yellow.yellow190,
  warningBackground: rawColors.yellow.yellow160,
  warningBannerBg: rawColors.yellow.yellow160,
  warningText: rawColors.yellow.seaBuckthorn,

  error: rawColors.red.red100,
  errorLite: rawColors.red.red190,
  errorSemi: rawColors.red.red190,
  errorBackground: rawColors.red.red150,
  errorBannerBg: rawColors.red.red170,
  errorText: rawColors.red.pomegranate,

  generic: rawColors.neutral.grey165,

  live: rawColors.green.green100,
  stale: rawColors.green.green1000,
  staleSemi: rawColors.green.green900,
  unseen: rawColors.yellow.yellow900,
  offline: rawColors.neutral.grey145,

  //=========================================\\

  attention: rawColors.purple.mauve,
  attentionSecondary: rawColors.purple.daisy,
  separator: rawColors.neutral.grey185,
  controlFocused: rawColors.neutral.limedSpruce,
  selected: rawColors.neutral.grey180,
  highlight: rawColors.neutral.grey180,

  tooltip: rawColors.neutral.grey180,
  tooltipText: rawColors.neutral.grey100,
  bright: rawColors.neutral.white,
  text: rawColors.neutral.grey100,
  textLite: rawColors.neutral.grey120,
  textNoFocus: rawColors.neutral.grey140,
  textFocus: rawColors.neutral.grey90,
  textDescription: rawColors.neutral.grey120,
  sectionHeaderBackground: rawColors.neutral.limedSpruce,
  sectionTitle: rawColors.neutral.grey100,
  sectionDescription: rawColors.neutral.grey120,
  placeholder: rawColors.neutral.grey140,
  key: rawColors.neutral.regentgrey,
  panel: rawColors.neutral.limedSpruce,
  panelBg: rawColors.neutral.grey190,
  mainChartBg: rawColors.neutral.blackhaze,
  mainChartHeaderBg: rawColors.neutral.grey190,
  mainChartBorder: rawColors.neutral.grey185,
  mainChartTboxHover: rawColors.neutral.grey180,
  sideBar: rawColors.neutral.grey190,
  sideBarMini: rawColors.neutral.grey185,
  spaceSelected: rawColors.neutral.grey175,
  spaceIdle: rawColors.neutral.grey195,
  spaceHovered: rawColors.neutral.grey180,
  hoverHighlight: rawColors.green.green70,
  menuItem: rawColors.neutral.grey120,
  topBarBg: rawColors.neutral.grey190,
  elevationLevelOne: rawColors.neutral.grey185,
  //Input colors
  inputBg: rawColors.neutral.grey190,
  inputBorder: rawColors.neutral.grey185,
  inputBorderHover: rawColors.neutral.grey165,
  inputBorderFocus: rawColors.neutral.grey165,
  //Badges
  nodeBadgeBackground: rawColors.neutral.grey155,
  nodeBadgeBorder: rawColors.neutral.iron,
  nodeBadgeColor: rawColors.neutral.bluebayoux,

  //Default pills
  neutralPillBg: rawColors.neutral.grey155,
  neutralPillBorder: rawColors.neutral.grey155,
  neutralPillColor: rawColors.neutral.grey100,

  //Alert MasterCard
  alertIcon: rawColors.neutral.grey180,
  idleError: rawColors.red.red170,
  idleWarning: rawColors.yellow.yellow170,
  idleClear: rawColors.green.green190,

  //Table
  dropdownTable: rawColors.neutral.white,
  tableRowBg: rawColors.neutral.grey195,
  tableRowBgHover: rawColors.neutral.grey180,
  tableRowBg2: rawColors.neutral.grey190,
  tableRowBg2Hover: rawColors.neutral.grey180,
  columnHighlight: rawColors.green.green190,
  //IconButton
  iconColor: rawColors.neutral.limedSpruce,

  //Progress Bare
  progressBg: rawColors.neutral.chineseWhite,

  //table-resizer
  resizerLine: rawColors.green.vista,

  anomalyText: rawColors.purple.lilac,
  anomalyTextLite: rawColors.purple.lilacLite,
  anomalyTextFocus: rawColors.purple.lilacFocus,
  terminalGreen: rawColors.green.green197,
  terminalGreenBorder: rawColors.green.green,
  darkBackground: rawColors.neutral.grey195,
  integrationMenuItemHover: rawColors.neutral.grey180,

  //Dynamic rooms
  clauseBg: rawColors.neutral.grey180,
  clauseText: rawColors.neutral.grey100,

  //Onboarding
  nodeButtonsText: rawColors.neutral.grey100,
  nodeButtonsTextHover: rawColors.neutral.black,
  pnlBorder: rawColors.neutral.grey185,
  pnlBackground: rawColors.neutral.white,
  pnlText: rawColors.neutral.black,
}

export default {
  ...appColors,
  ...rawColors,
}
