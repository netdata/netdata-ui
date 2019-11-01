import { RawColorsT, AppColorsT } from "../declarations"

const rawColors: RawColorsT = {
  white: {
    pure: "#FFF",
  },
  gray: {
    limedSpruce: "#35414A",
    silverSand: "#B5B9BC",
    gallery: "#EFEFEF",
    bombay: "#AEB3B7",
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
  success: rawColors.green.greenHaze,
  text: rawColors.gray.limedSpruce,
}

export const colors: RawColorsT & AppColorsT = {
  ...appColors,
  ...rawColors,
}
