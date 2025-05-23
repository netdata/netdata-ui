const rawColors = {
  transparent: {
    full: "rgba(255,255,255,0.0)",
    semi: "rgba(255, 255, 255, 0.5)",
    popover: "rgba(18, 36, 50, 0.9)",
  },
  green: {
    poker: "#2f5446",
    chateau: "#42B861",
    netdata: "#00AB44",
    deyork: "#68C47D",
    vista: "#96D4A2",
    fringyFlower: "#BFE5C6",
    frostee: "#E5F5E8",
    limeGreen: "#48E499",
    // Green shades
    green10: "#001107",
    green20: "#00220E",
    green30: "#003314",
    green40: "#00441B",
    green50: "#005622",
    green60: "#006729",
    green70: "#007830",
    green80: "#008936",
    green90: "#009A3D",
    // Base green 100
    green100: "#00AB44",
    // Green tints
    green110: "#00CD51",
    green120: "#00EF5F",
    green130: "#12FF70",
    green140: "#34FF84",
    green150: "#56FF99",
    green160: "#77FFAD",
    green170: "#99FFC2",
    green180: "#BBFFD6",
    green190: "#DDFFEB",
    green195: "#EEFFF5",
    green196: "#F1FFF7",
    green197: "#F5FFF9",
    green198: "#F8FFFB",
    green199: "#FCFFFD",
    // Green tones
    green200: "#09AB49",
    green300: "#13A94F",
    green400: "#1DA754",
    green500: "#29A45A",
    green600: "#35A060",
    green700: "#439B66",
    green800: "#51966C",
    green900: "#608F73",
    green1000: "#6F8879",
  },
  red: {
    pomegranate: "#FF4136",
    carnation: "#F95251",
    apricot: "#ED7374",
    wewak: "#F59B9B",
    pastelpink: "#FFCED3",
    lavender: "#FFEBEF",
    // Red shades
    red10: "#160205",
    red20: "#2C0409",
    red30: "#42070E",
    red40: "#580913",
    red50: "#6E0B18",
    red60: "#830D1C",
    red70: "#990F21",
    red80: "#AF1226",
    red90: "#C5142A",
    // Base red 100
    red100: "#DB162F",
    // Red tints
    red110: "#E9233C",
    red120: "#EB3B52",
    red130: "#EE5467",
    red140: "#F06C7D",
    red150: "#F38593",
    red160: "#F59DA8",
    red170: "#F8B6BE",
    red180: "#FACED4",
    red190: "#FDE7E9",
    // red tones
    red200: "#D22037",
    red300: "#CA2A3E",
    red400: "#C13546",
    red500: "#B83F4E",
    red600: "#AF4956",
    red700: "#A6545F",
    red800: "#9D5F67",
    red900: "#936A6F",
    red1000: "#8A7577",
  },
  yellow: {
    amber: "#FFC300",
    sunglow: "#FFCC26",
    seaBuckthorn: "#F9A825",
    mustard: "#FFD74F",
    salomie: "#FFE182",
    buttermilk: "#FFEDB3",
    ginfizz: "#FFF8E1",
    // Yellow shades
    yellow10: "#201300",
    yellow20: "#402600",
    yellow30: "#603900",
    yellow40: "#804B00",
    yellow50: "#A05E00",
    yellow60: "#BF7100",
    yellow70: "#DF8400",
    yellow80: "#FF9700",
    yellow90: "#FFA420",
    // Base yellow 100
    yellow100: "#FFB140",
    // Yellow tints
    yellow110: "#FFB953",
    yellow120: "#FFC166",
    yellow130: "#FFC879",
    yellow140: "#FFD08C",
    yellow150: "#FFD8A0",
    yellow160: "#FFE0B3",
    yellow170: "#FFE8C6",
    yellow180: "#FFEFD9",
    yellow190: "#FFF7EC",
    // Yellow tones
    yellow200: "#F5AD44",
    yellow300: "#EBA848",
    yellow400: "#E0A44D",
    yellow500: "#D49F52",
    yellow600: "#C79A58",
    yellow700: "#BA955F",
    yellow800: "#AD9066",
    yellow900: "#9E8B6E",
    yellow1000: "#908577",
  },
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    limedSpruce: "#35414A",
    regentgrey: "#8F9EAA",
    blackhaze: "#F7F8F8",
    brightGrey: "#E9ECEC",
    chineseWhite: "#DEE3E3",
    iron: "#CFD5DA",
    porcelain: "#ECEEEF",
    bluebayoux: "#536775",
    shark: "#1C1E22",
    tuna: "#383B40",
    outerSpace: "#2B3136",
    ratsbane: "#3E4551",
    arsenic: "#353B45",
    gunmetal: "#282C34",
    darkGunmetal: "#21252B",
    eerieBlack: "#181c20",
    // Grey shades
    grey05: "#040505",
    grey10: "#080A0A",
    grey15: "#0C0F0F",
    grey20: "#101313",
    grey25: "#151818",
    grey30: "#191D1D",
    grey35: "#1D2222",
    grey40: "#212727",
    grey45: "#252C2C",
    grey50: "#293030",
    grey55: "#2D3535",
    grey60: "#313A3A",
    grey65: "#353F3F",
    grey70: "#394444",
    grey75: "#3D4949",
    grey80: "#424E4E",
    grey85: "#465252",
    grey90: "#4A5757",
    grey95: "#4E5C5C",
    // Grey base
    grey100: "#526161",
    // Grey Tints
    grey105: "#5A6A6A",
    grey110: "#617373",
    grey115: "#697C7C",
    grey120: "#708585",
    grey125: "#788D8D",
    grey130: "#819595",
    grey135: "#8A9C9C",
    grey140: "#93A4A4",
    grey145: "#9CACAC",
    grey150: "#A5B3B3",
    grey155: "#AEBBBB",
    grey160: "#B7C2C2",
    grey165: "#C0CACA",
    grey170: "#C9D2D2",
    grey175: "#D2D9D9",
    grey180: "#DBE1E1",
    grey185: "#E4E8E8",
    grey190: "#EDF0F0",
    grey195: "#F6F7F7",
  },
  purple: {
    mauve: "#DB94F4",
    mauveDark: "#CB66EF",
    mauveFocus: "#EBC2F9",
    daisy: "#563D7C",
    lilac: "#B596F8",
    lilacLite: "#C6AEFA",
    lilacFocus: "#824EF3",
    purple10: "#0D0D15",
    purple20: "#1B1A2A",
    purple30: "#29273F",
    purple40: "#363454",
    purple50: "#444269",
    purple60: "#514F7D",
    purple70: "#5F5C92",
    purple80: "#6C69A7",
    purple90: "#7A76BC",
    purple100: "#8783D1",
    purple110: "#938FD6",
    purple120: "#9F9CDA",
    purple130: "#ABA8DF",
    purple140: "#B7B5E3",
    purple150: "#C3C1E8",
    purple160: "#CFCDED",
    purple170: "#DBDAF1",
    purple180: "#E7E6F6",
    purple190: "#F3F3FA",
    purple200: "#8581CB",
    purple300: "#837FC4",
    purple400: "#817EBD",
    purple500: "#807DB5",
    purple600: "#7F7DAD",
    purple700: "#7F7DA5",
    purple800: "#7E7D9C",
    purple900: "#7F7E93",
    purple1000: "#7F7F8A ",
  },
  blue: {
    aquamarine: "#19C89E",
    indigo: "#5790FF",
    cyan: "#00BAE2",
    blue10: "#010A0E",
    blue20: "#02151B",
    blue30: "#021F29",
    blue40: "#032936",
    blue50: "#043344",
    blue60: "#053E52",
    blue70: "#06485F",
    blue80: "#06526D",
    blue90: "#075D7A",
    blue100: "#086788",
    blue110: "#0A81AB",
    blue120: "#0C9BCD",
    blue130: "#0EB6F0",
    blue140: "#30C0F3",
    blue150: "#52CBF5",
    blue160: "#75D5F7",
    blue170: "#97E0F9",
    blue180: "#BAEAFB",
    blue190: "#DCF5FD",
    blue200: "#106C8C",
    blue300: "#18708E",
    blue400: "#227490",
    blue500: "#2C7791",
    blue600: "#387A90",
    blue700: "#447C8F",
    blue800: "#527E8D",
    blue900: "#607F8A",
    blue1000: "#708085",
  },
  violet: {
    violet10: "#080407",
    violet20: "#10090E",
    violet30: "#190D15",
    violet40: "#21111C",
    violet50: "#291623",
    violet60: "#311A2B",
    violet70: "#391E32",
    violet80: "#422239",
    violet90: "#4A2740",
    violet100: "#522B47",
    violet110: "#6B385D",
    violet120: "#854573",
    violet130: "#9E5389",
    violet140: "#B0679B",
    violet150: "#BD81AC",
    violet160: "#CA9ABC",
    violet170: "#D7B3CD",
    violet180: "#E5CCDE",
    violet190: "#F2E6EE",
    violet200: "#58324E",
    violet300: "#5E3954",
    violet400: "#64405A",
    violet500: "#694860",
    violet600: "#6E5066",
    violet700: "#73596B",
    violet800: "#766271",
    violet900: "#7A6C76",
    violet1000: "#7D767B",
  },
  shadows: {
    dropdownLight: "rgba(9, 30, 66, 0.15)",
    dropdownDark: "rgba(0, 0, 0, 0.4)",
  },
}

export default rawColors
