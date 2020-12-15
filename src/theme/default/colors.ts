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
  black: {
    pure: "#000",
  },
  gray: {
    limedSpruce: "#35414A",
    bombay: "#AEB3B7",
    bombayLite: "#B4B8BD", // https://chir.ag/projects/name-that-color/ shows "bombay", too
    silverSand: "#B5B9BC",
    gallery: "#EFEFEF",
    guyabano: "#F7F8F8",
    gainsboro: "#D8D8D8",
    midnight: "#192A3E",
    nepal: "#93A3B0",
    solitude: "#ECEFF2",
    shuttle: "#556471",
    shuttleGray: "#5F666B",
    tangaroa: "#172937",
    chambray: "#445C79",
    wedgewood: "#486385",
    arsenic: "#35414A",
    pigeonPost: "#B8C9DF",
    slateGray: "#76838E",
    slate: "#677F9D",
    blackPearl: "#122432",
    aluminium: "#878B90",
    vulcan: "#383B40",
    bunker: "#24292F",
    cod: "#2B3136",
    trout: "#4B5358",
    blackRussian: "#1C1E22",
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
    catalina: "#1B2F47",
    pattens: "#DCE2E8",
    nile: "#2D404F",
    polo: "#92ACCD",
    matisse: "#415F84",
    teal: "#175260",
    madison: "#293C53",
  },
  purple: {
    mauve: "#DB94F4",
    daisy: "#563D7C",
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
  attentionSecondary: rawColors.purple.daisy,
  separator: rawColors.gray.shuttle,
  controlFocused: rawColors.gray.arsenic, // obsolete?
  selected: rawColors.blue.pattens,
  tooltip: rawColors.gray.blackPearl,
  bright: rawColors.white.almost,
  text: rawColors.gray.arsenic,
  textFocus: rawColors.gray.silverSand,
  sectionHeaderBackground: rawColors.gray.arsenic,
  placeholder: rawColors.gray.gainsboro,
  key: rawColors.gray.slateGray,

  // Depreacted - use the names above
  borderColor: rawColors.gray.nepal,
  borderSecondaryColor: rawColors.gray.solitude,
  separatorColor: rawColors.gray.shuttle,
}

export const colors: RawColorsT & AppColorsT = {
  ...appColors,
  ...rawColors,
}
