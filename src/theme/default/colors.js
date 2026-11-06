import rawColors from "../rawColors"

const appColors = {
  primary: rawColors.green.green70,
  accent: rawColors.green.chateau,
  main: "#2D3E33",
  border: "#C5D0C8",
  borderSecondary: "#DEE6E0",
  appSidebarBackground: "#F0F3F0",
  appBackground: "#FFFFFF",
  workspaceSidebarBackground: "#FFFFFF",
  workspaceBackground: "#F6F8F6",
  tableBorder: "#DEE6E0",
  tableHeaderBackground: "#F6F8F6",
  disabled: rawColors.neutral.grey160,
  disabledBackground: "#EEF3EF",
  dropdown: "#FFFFFF",
  dropdownShadow: rawColors.shadows.dropdownLight,
  elementBackground: "#EEF3EF",
  elementBackgroundHover: rawColors.neutral.white,
  mainBackground: "#F6F8F6",
  mainBackgroundDisabled: "#EEF3EF",
  modalHeaderBackground: "#EEF3EF",
  modalTabsBackground: "#EEF3EF",
  modalBackground: "#FFFFFF",
  modalInfoBackground: "#EEF3EF",
  menuItemSelected: "#E0E7E2",
  menuItemHover: "#EEF3EF",
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
  neutralHighlight: "#E0E7E2",
  segmentedBackground: "#F0F3F0",
  segmentedSelectedBackground: rawColors.neutral.white,
  segmentedFocus: rawColors.green.green70,
  segmentedAccentText: "#476453",
  segmentedAccentBackground: "#E0E7E2",
  segmentedBorder: "#D3DBD5",
  controlBackground: "#FFFFFF",
  controlHoverBackground: "#EEF3EF",
  controlPressedBackground: "#E3ECE5",
  buttonNeutralFill: "#476453",
  buttonNeutralFillHover: "#3C5746",
  buttonNeutralFillPressed: "#334C3D",
  buttonNeutralText: "#FFFFFF",
  buttonNeutralBorder: "#718073",
  buttonNeutralBorderHover: "#5C6A61",
  buttonNeutralHollowHover: "#E6EEE8",
  buttonNeutralHollowPressed: "#D9E4DC",
  buttonNeutralBorderlessHover: "#EAF1EB",
  buttonNeutralBorderlessPressed: "#DFE9E1",
  actionContrastText: "#FFFFFF",
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

  statusSuccessText: "#007a31",
  statusErrorText: "#c4122a",
  statusWarningText: "#905d00",
  statusMutedText: "#5C6A61",

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
  separator: "#DEE6E0",
  controlFocused: "#4D5C52",
  selected: "#E0E7E2",
  highlight: "#718073",

  tooltip: "#293A2F",
  tooltipText: "#F0F4F1",
  tooltipBg: "#293A2F",
  bright: rawColors.neutral.white,
  onColorDark: rawColors.neutral.black,
  onColorLight: rawColors.neutral.white,
  text: "#2D3E33",
  textLite: "#5C6A61",
  textNoFocus: "#5C6A61",
  textFocus: "#4D5C52",
  textDescription: "#5C6A61",
  sectionHeaderBackground: "#FFFFFF",
  sectionTitle: "#2D3E33",
  sectionDescription: "#5C6A61",
  placeholder: "#5C6A61",
  key: "#5C6A61",
  panel: "#FFFFFF",
  cardBackground: "#FFFFFF",
  cardNestedBackground: "#F0F3F0",
  popoverBackground: "#FFFFFF",
  panelBg: "#FFFFFF",
  // Flat on purpose: gradients made panels read as a second surface system.
  panelBgGrad: "#FFFFFF",
  mainChartBg: "#FFFFFF",
  mainChartHeaderBg: "#EEF3EF",
  mainChartBorder: "#DEE6E0",
  mainChartTboxHover: "#E0E7E2",
  sideBar: "#F0F3F0",
  sideBarMini: "#F0F3F0",
  spaceSelected: rawColors.neutral.grey175,
  spaceIdle: rawColors.neutral.grey195,
  spaceHovered: rawColors.neutral.grey180,
  hoverHighlight: rawColors.green.green70,
  menuItem: rawColors.neutral.grey120,
  topBarBg: "#F0F3F0",
  elevationLevelOne: "#EEF3EF",

  // Date picker
  datePickerPausedBg: rawColors.neutral.grey185,
  datePickerPlayBg: rawColors.neutral.grey190,
  dateTimePickerChipBg: rawColors.violet.violet190,
  dateTimePickerChipAccent: rawColors.violet.violet130,

  // Input colors
  // Resting edge for fields: 3:1 against the page so the field is findable without hover.
  controlBorder: "#5C6A61",
  textInfo: rawColors.blue.blue100,
  inputBg: "#FFFFFF",
  inputBorder: "#5C6A61",
  inputBorderHover: "#4D5C52",
  inputBorderFocus: "#4D5C52",

  // Badges
  nodeBadgeBackground: "#E0E7E2",
  nodeBadgeBorder: "#E0E7E2",
  nodeBadgeColor: "#476453",

  // Default pills
  neutralPillBg: "#E0E7E2",
  neutralPillBorder: "#E0E7E2",
  neutralPillColor: "#476453",

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
  progressBg: "#D7E1D9",

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
