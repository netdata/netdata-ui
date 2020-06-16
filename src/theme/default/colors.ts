import { RawColorsT, AppColorsT } from "../declarations"

const rawColors: RawColorsT = {
  transparent: {
    full: "rgba(255, 255, 255, 0.0)",
    semi: "rgba(255, 255, 255, 0.5)",
  },
  white: {
    pure: "#FFF",
  },
  gray: {
    limedSpruce: "#35414A",
    bombay: "#AEB3B7",
    silverSand: "#B5B9BC",
    gallery: "#EFEFEF",
    guyabano: "#F7F8F8",
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
  },
}

const appColors: AppColorsT = {
  borderColor: rawColors.gray.bombay,
  controlFocused: rawColors.gray.limedSpruce,
  error: rawColors.red.redOrange,
  warning: rawColors.yellow.amber,
  success: rawColors.green.greenHaze,
  text: rawColors.gray.limedSpruce,
}

export const colors: RawColorsT & AppColorsT = {
  ...appColors,
  ...rawColors,
}
