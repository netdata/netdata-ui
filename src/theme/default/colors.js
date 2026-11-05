import rawColors from "../rawColors"

const appColors = {
  primary: rawColors.green.green70,
  accent: rawColors.green.chateau,
  main: rawColors.neutral.limedSpruce,
  border: rawColors.neutral.grey180,
  borderSecondary: rawColors.neutral.grey175,
  disabled: rawColors.neutral.grey160,
  disabledBackground: rawColors.neutral.grey160,
  dropdown: rawColors.neutral.white,
  dropdownShadow: rawColors.shadows.dropdownLight,
  elementBackground: rawColors.neutral.grey195,
  elementBackgroundHover: rawColors.neutral.white,
  mainBackground: rawColors.neutral.white,
  mainBackgroundDisabled: rawColors.neutral.grey195,
  modalHeaderBackground: rawColors.neutral.grey185,
  modalTabsBackground: rawColors.neutral.grey190,
  modalBackground: rawColors.neutral.grey195,
  modalInfoBackground: rawColors.neutral.grey195,
  menuItemSelected: rawColors.neutral.grey180,
  menuItemHover: rawColors.neutral.grey185,
  tabActiveBackground: rawColors.transparent.full,
  tabItem: rawColors.neutral.grey100,
  scrollBarTrack: rawColors.neutral.grey190,
  scrollBarThumb: rawColors.neutral.grey170,
  scrollBarThumbHover: rawColors.neutral.grey150,
  scrollBarBorder: rawColors.neutral.grey180,
  // Links
  link: rawColors.green.green70,
  linkHover: rawColors.green.green60,
  // Buttons
  primaryHighlight: rawColors.green.green110,
  primaryHover: rawColors.green.green60,
  primaryPressed: rawColors.green.green50,
  secondaryColor: rawColors.green.green70,
  secondaryHighlight: rawColors.green.green190,
  neutralHighlight: rawColors.neutral.grey180,
  // Buttons - AI
  primaryAI: rawColors.blue.blue130,
  accentAI: rawColors.blue.blue140,
  primaryHighlightAI: rawColors.blue.blue130,
  secondaryColorAI: rawColors.blue.blue120,
  secondaryHighlightAI: rawColors.blue.blue190,
  // AI Graphics
  strokeMain: rawColors.blue.blue100,
  strokeHighlight: rawColors.blue.blue120,
  aiParticleMain: rawColors.blue.blue180,
  //============Status=============\\
  success: rawColors.green.green100,
  successLite: rawColors.green.green190,
  successSemi: rawColors.green.green190,
  successBackground: rawColors.green.green50,
  successText: rawColors.green.green70,
  // Text on soft (tinted) status pills: one step past the tone so it reaches 4.5:1 on its own fill.
  successSoftText: rawColors.green.green70,
  warningSoftText: rawColors.yellow.yellow50,
  errorSoftText: rawColors.red.red90,
  staleSoftText: rawColors.neutral.grey100,

  warning: rawColors.yellow.yellow50,
  warningLite: rawColors.yellow.yellow190,
  warningSemi: rawColors.yellow.yellow190,
  warningBackground: rawColors.yellow.yellow160,
  warningBannerBg: rawColors.yellow.yellow160,
  warningText: rawColors.yellow.yellow40,

  error: rawColors.red.red100,
  errorLite: rawColors.red.red190,
  errorSemi: rawColors.red.red190,
  errorBackground: rawColors.red.red150,
  errorBannerBg: rawColors.red.red170,
  errorText: rawColors.red.red100,

  generic: rawColors.neutral.grey165,

  live: rawColors.green.green100,
  stale: rawColors.neutral.grey130,
  staleSemi: rawColors.neutral.grey120,
  unseen: rawColors.yellow.yellow900,
  offline: rawColors.neutral.grey145,
  metricGap: rawColors.neutral.metricGapLight,
  mapSearchHighlight: rawColors.blue.blue100,

  //=========================================\\

  attention: rawColors.purple.mauve,
  attentionSecondary: rawColors.purple.daisy,
  separator: rawColors.neutral.grey185,
  controlFocused: rawColors.neutral.limedSpruce,
  selected: rawColors.neutral.grey180,
  highlight: rawColors.neutral.grey180,

  tooltip: rawColors.neutral.limedSpruce,
  tooltipText: rawColors.neutral.grey195,
  tooltipBg: rawColors.neutral.limedSpruce,
  bright: rawColors.neutral.white,
  text: rawColors.neutral.grey100,
  textLite: rawColors.neutral.grey120,
  textNoFocus: rawColors.neutral.grey140,
  textFocus: rawColors.neutral.grey90,
  textDescription: rawColors.neutral.grey120,
  sectionHeaderBackground: rawColors.neutral.limedSpruce,
  sectionTitle: rawColors.neutral.grey100,
  sectionDescription: rawColors.neutral.grey120,
  placeholder: rawColors.neutral.grey110,
  key: rawColors.neutral.regentgrey,
  panel: rawColors.neutral.limedSpruce,
  panelBg: rawColors.neutral.grey195,
  // Flat on purpose: gradients made panels read as a second surface system.
  panelBgGrad: rawColors.neutral.grey195,
  mainChartBg: rawColors.neutral.grey195,
  mainChartHeaderBg: rawColors.neutral.grey190,
  mainChartBorder: rawColors.neutral.grey185,
  mainChartTboxHover: rawColors.neutral.grey180,
  sideBar: rawColors.neutral.grey190,
  sideBarMini: rawColors.neutral.grey190,
  spaceSelected: rawColors.neutral.grey175,
  spaceIdle: rawColors.neutral.grey195,
  spaceHovered: rawColors.neutral.grey180,
  hoverHighlight: rawColors.green.green70,
  menuItem: rawColors.neutral.grey120,
  topBarBg: rawColors.neutral.grey195,
  elevationLevelOne: rawColors.neutral.grey185,

  // Date picker
  datePickerPausedBg: rawColors.neutral.grey185,
  datePickerPlayBg: rawColors.neutral.grey190,
  dateTimePickerChipBg: rawColors.violet.violet190,
  dateTimePickerChipAccent: rawColors.violet.violet130,

  // Input colors
  // Resting edge for fields: 3:1 against the page so the field is findable without hover.
  controlBorder: rawColors.neutral.grey130,
  textInfo: rawColors.blue.blue100,
  inputBg: rawColors.neutral.white,
  inputBorder: rawColors.neutral.grey130,
  inputBorderHover: rawColors.neutral.grey110,
  inputBorderFocus: rawColors.neutral.grey110,

  // Badges
  nodeBadgeBackground: rawColors.neutral.grey155,
  nodeBadgeBorder: rawColors.neutral.iron,
  nodeBadgeColor: rawColors.neutral.bluebayoux,

  // Default pills
  neutralPillBg: rawColors.neutral.grey155,
  neutralPillBorder: rawColors.neutral.grey155,
  neutralPillColor: rawColors.neutral.grey100,

  // Alert MasterCard
  alertIcon: rawColors.neutral.grey180,
  idleError: rawColors.red.red170,
  idleWarning: rawColors.yellow.yellow170,
  idleClear: rawColors.green.green190,

  // Table
  dropdownTable: rawColors.neutral.white,
  tableRowBg: rawColors.neutral.grey195,
  tableRowBgHover: rawColors.neutral.grey190,
  tableRowBg2: rawColors.neutral.grey195,
  tableRowBg2Hover: rawColors.neutral.grey180,
  columnHighlight: rawColors.neutral.grey190,

  // IconButton
  iconColor: rawColors.neutral.limedSpruce,

  // Progress Bare
  progressBg: rawColors.neutral.chineseWhite,

  // table-resizer
  resizerLine: rawColors.green.green100,

  anomalyText: rawColors.purple.lilac,
  anomalyTextLite: rawColors.purple.lilacLite,
  anomalyTextFocus: rawColors.purple.lilacFocus,
  terminalGreen: rawColors.green.green197,
  terminalGreenBorder: rawColors.green.green,
  darkBackground: rawColors.neutral.grey195,
  integrationMenuItemHover: rawColors.neutral.grey180,

  // Dynamic rooms
  clauseBg: rawColors.neutral.grey180,
  clauseText: rawColors.neutral.grey100,

  // Onboarding
  nodeButtonsText: rawColors.neutral.grey100,
  nodeButtonsTextHover: rawColors.neutral.black,
  pnlBorder: rawColors.neutral.grey185,
  pnlBackground: rawColors.neutral.white,
  pnlText: rawColors.neutral.black,

  // Insights
  insightsYellow: rawColors.yellow.yellow300,
  insightsYellowSemi: rawColors.yellow.yellow190,
  insightsViolet: rawColors.violet.violet150,
  insightsVioletSemi: rawColors.violet.violet190,
  insightsPurple: rawColors.purple.purple100,
  insightsPurpleSemi: rawColors.purple.purple180,
  insightsGreen: rawColors.green.netdata,
  insightsGreenSemi: rawColors.green.green195,
  insightsRed: rawColors.red.red140,
  insightsRedSemi: rawColors.red.red190,
  insightsBlue: rawColors.blue.blue130,
  insightsBlueSemi: rawColors.blue.blue190,
}

export default {
  ...appColors,
  ...rawColors,
}
