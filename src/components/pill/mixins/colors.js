const colorMap = {
  background: {
    neutral: "neutralPillBg",
    success: ["green", "netdata"],
    warning: ["yellow", "seaBuckthorn"],
    error: ["red", "pomegranate"],
  },
  hollow: {
    neutral: "neutralPillBg",
    success: ["green", "frostee"],
    warning: ["yellow", "ginfizz"],
    error: ["red", "lavender"],
  },
  border: {
    neutral: "neutralPillBorder",
    success: ["green", "deyork"],
    warning: ["yellow", "seaBuckthorn"],
    error: ["red", "wewak"],
  },
  color: {
    neutral: "neutralPillColor",
    success: ["green", "netdata"],
    warning: ["yellow", "seaBuckthorn"],
    error: ["red", "pomegranate"],
  },
}

export const masterCardColorMap = {
  alert: "alertIcon",
  disabledError: "idleError",
  disabledWarning: "idleWarning",
  error: "errorLite",
  warning: "warningLite",
}

const getMasterCardColor = flavour => masterCardColorMap[flavour]
const getPillColor = (type, flavour) => colorMap[type][flavour]

export { getMasterCardColor, getPillColor }
