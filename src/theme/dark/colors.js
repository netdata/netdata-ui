import rawColors from "../rawColors"

const appColors = {
  primary: rawColors.green.netdata,
  accent: rawColors.green.chateau,
  main: rawColors.neutral.white,
  border: rawColors.neutral.bluebayoux,
  borderSecondary: rawColors.neutral.ratsbane,
  tabsBorder: rawColors.neutral.ratsbane,
  disabled: rawColors.neutral.tuna,
  disabledBackground: rawColors.neutral.outerSpace,
  dropdown: rawColors.neutral.ratsbane,
  elementBackground: rawColors.neutral.outerSpace,
  elementBackgroundHover: rawColors.neutral.tuna,
  mainBackground: rawColors.neutral.gunmetal,
  mainBackgroundDisabled: rawColors.neutral.outerSpace,
  modalHeaderBackground: rawColors.neutral.shark,
  modalTabsBackground: rawColors.neutral.darkGunmetal,
  modalBackground: rawColors.neutral.outerSpace,
  modalInfoBackground: rawColors.neutral.bluebayoux,

  success: rawColors.green.netdata,
  successLite: rawColors.green.deyork,
  successBackground: rawColors.green.deyork,
  successText: rawColors.green.netdata,

  warning: rawColors.yellow.seaBuckthorn,
  warningLite: rawColors.yellow.sunglow,
  warningBackground: rawColors.yellow.salomie,
  warningText: rawColors.yellow.seaBuckthorn,

  error: rawColors.red.pomegranate,
  errorLite: rawColors.red.apricot,
  errorBackground: rawColors.red.wewak,
  errorText: rawColors.red.pomegranate,

  attention: rawColors.purple.mauve,
  attentionSecondary: rawColors.purple.daisy,
  separator: rawColors.neutral.bluebayoux,
  controlFocused: rawColors.neutral.white,
  selected: rawColors.neutral.bluebayoux,
  tooltip: rawColors.neutral.outerSpace,
  bright: rawColors.neutral.white,
  text: rawColors.neutral.iron,
  textLite: rawColors.neutral.regentgrey,
  textFocus: rawColors.neutral.porcelain,
  textDescription: rawColors.neutral.regentgrey,
  sectionHeaderBackground: rawColors.neutral.white,
  sectionTitle: rawColors.neutral.iron,
  sectionDescription: rawColors.neutral.regentgrey,
  menuItem: rawColors.neutral.regentgrey,
  placeholder: rawColors.neutral.bluebayoux,
  key: rawColors.neutral.iron,
  panel: rawColors.neutral.limedSpruce,
  panelBg: rawColors.neutral.arsenic,
  sideBar: rawColors.neutral.darkGunmetal,
  sideBarMini: rawColors.neutral.eerieBlack,
  nodesViewMiniCharts: rawColors.neutral.limedSpruce,
  topBarBg: rawColors.neutral.arsenic,
  elevationLevelOne: rawColors.neutral.ratsbane,
  //Input colors
  inputBg: rawColors.neutral.arsenic,
  inputBorder: rawColors.neutral.bluebayoux,
  inputBorderHover: rawColors.neutral.bluebayoux,
  inputBorderFocus: rawColors.neutral.limedSpruce,
  // Badges
  nodeBadgeBackground: rawColors.neutral.limedSpruce,
  nodeBadgeBorder: rawColors.neutral.bluebayoux,
  nodeBadgeColor: rawColors.neutral.white,

  //Default pills
  neutralPillBg: rawColors.neutral.limedSpruce,
  neutralPillBorder: rawColors.neutral.limedSpruce,
  neutralPillColor: rawColors.neutral.regentgrey,

  //Alert MasterCard
  alertBorder: rawColors.neutral.bluebayoux,
  alertIcon: rawColors.neutral.gunmetal,
  idleError: rawColors.neutral.tuna,
  idleWarning: rawColors.neutral.ratsbane,

  //Table
  tableRowBg: rawColors.neutral.arsenic,
}

export default {
  ...rawColors,
  ...appColors,
}
