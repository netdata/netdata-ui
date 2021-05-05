import { RawColorsT, AppColorsT } from "../declarations"

export const rawColors = {
  transparent: {
    full: "rgba(255, 255, 255, 0.0)",
    semi: "rgba(255, 255, 255, 0.5)",
    popover: "rgba(18, 36, 50, 0.9)",
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
    porcelain: "#ECEEEF",
    regentGray: "#8F9EAA",
    iron: "#CFD5DA",
  },
  green: {
    malachite: "#00CB51",
    greenHaze: "#00AB44", // Aka. Netdata
    deYork: "#68C47D",
    algaeGreen: "#99DDB4",
    clearDay: "#F7FFFC",
    frostee: "#E5F5E8",
    deYork: "#68C47D",
  },
  red: {
    apricot: "#ED7374",
    outrageousOrange: "#FF6037",
    redOrange: "#FF4136", // Aka. Pomegranate
    roseWhite: "#FFF8F7",
    lavender: "#FFEBEF",
    wewak: "#F59B9B",
  },
  yellow: {
    sunglow: "#FFCC26",
    amber: "#FFC300",
    safron: "#F1BB28",
    orangeYellow: "#F8D36D",
    ginFizz: "#FFF8E1",
    seaBuckthorn: "#F9A825",
    safronMango: "#FDF1CE",
    ginFizz: "#FFF8E1",
    seaBuckthorn: "#F9A825",
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
    teal: "#000",
    madison: "#293C53",
    blueBayoux: "#536775",
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
  successLite: rawColors.green.deYork,

  warning: rawColors.yellow.amber,
  warningLite: rawColors.yellow.sunglow,
  warningBackground: rawColors.yellow.ginFizz,
  warningText: rawColors.yellow.seaBuckthorn,

  error: rawColors.red.redOrange,
  errorLite: rawColors.red.apricot,
  errorBackground: rawColors.red.lavender,
  errorText: rawColors.red.redOrange,

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
  panel: rawColors.gray.arsenic,
  pill: {
    background: {
      neutral: rawColors.gray.regentGray,
      success: rawColors.green.greenHaze,
      warning: rawColors.yellow.amber,
      error: rawColors.red.redOrange,
    },
    hollow: {
      neutral: rawColors.gray.porcelain,
      success: rawColors.green.frostee,
      warning: rawColors.yellow.ginFizz,
      error: rawColors.red.lavender,
    },
    border: {
      neutral: rawColors.gray.iron,
      success: rawColors.green.deYork,
      warning: rawColors.yellow.amber,
      error: rawColors.red.wewak,
    },
    color: {
      neutral: rawColors.blue.blueBayoux,
      success: rawColors.green.greenHaze,
      warning: rawColors.yellow.seaBuckthorn,
      error: rawColors.red.redOrange,
    },
  },

  // Depreacted - use the names above
  borderColor: rawColors.gray.nepal,
  borderSecondaryColor: rawColors.gray.solitude,
  separatorColor: rawColors.gray.shuttle,
}

export const colors: RawColorsT & AppColorsT = {
  ...appColors,
  ...rawColors,
}
