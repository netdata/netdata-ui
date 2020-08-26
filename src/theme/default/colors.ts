import { RawColorsT, AppColorsT } from "../declarations"

export const rawColors: RawColorsT = {
  transparent: {
    full: "rgba(255, 255, 255, 0.0)",
    semi: "rgba(255, 255, 255, 0.5)",
  },
  white: {
    pure: "#FFF",
    almost: "#FDFDFD",
  },
  gray: {
    limedSpruce: "#35414A",
    bombay: "#AEB3B7",
    silverSand: "#B5B9BC",
    gallery: "#EFEFEF",
    guyabano: "#F7F8F8",
    gainsboro: "#D8D8D8",
    midnight: "#203247",
    nepal: "#93A3B0",
    solitude: "#ECEFF2",
    shuttle: "#556471",
    tangaroa: "#172937",
    chambray: "#445C79",
    wedgewood: "#44658E",
    arsenic: "#35414A",
    slate: "#677F9D",
  },
  green: {
    malachite: "#00CB51",
    greenHaze: "#00AB44",
    algaeGreen: "#99DDB4",
    clearDay: "#F7FFFC",
  },
  red: {
    outrageousOrange: "#FF6037",
    redOrange: "#FF4136",
    roseWhite: "#FFF8F7",
  },
  yellow: {
    amber: "#FFC300",
    safron: "#F1BB28",
    orangeYellow: "#F8D36D",
    safronMango: "#FDF1CE",
  },
  blue: {
    blueBerry: "#56B2FF",
    anakiwa: "#8CCCFF",
    anakiwaLight: "#B0DBFF",
    patternsBlue: "#D4EBFF",
    catalina: "#263F5C",
    pattens: "#DCE2E8",
    nile: "#2D404F",
    polo: "#96B5DD",
    matisse: "#415F84",
    teal: "#175260",
  },
  purple: {
    mauve: "#DB94F4",
  },
}

const appColors: AppColorsT = {
  primary: rawColors.green.greenHaze,
  accent: rawColors.green.malachite,
  main: rawColors.gray.arsenic,
  border: rawColors.gray.nepal,
  borderSecondary: rawColors.gray.solitude, // neutral color
  disabled: rawColors.gray.solitude,
  elementBackground: rawColors.gray.guyabano,
  mainBackground: rawColors.white.pure,
  mainBackgroundDisabled: rawColors.gray.guyabano,
  success: rawColors.green.greenHaze,
  warning: rawColors.yellow.amber,
  error: rawColors.red.redOrange,
  attention: rawColors.purple.mauve,
  separator: rawColors.gray.shuttle,
  controlFocused: rawColors.gray.arsenic, // obsolete?
  selected: rawColors.blue.pattens,
  tooltip: rawColors.blue.nile,
  bright: rawColors.white.almost,
  text: rawColors.gray.arsenic,
  sectionHeaderBackground: rawColors.gray.arsenic,
  placeholder: rawColors.gray.gallery,

  // Depreacted - use the names above
  borderColor: rawColors.gray.nepal,
  borderSecondaryColor: rawColors.gray.solitude,
  separatorColor: rawColors.gray.shuttle,
}

export const colors: RawColorsT & AppColorsT = {
  ...appColors,
  ...rawColors,
}
