const colorMap = {
  background: {
    neutral: "nodeBadgeBackground",
    success: ["green", "netdata"],
    warning: ["yellow", "seaBuckthorn"],
    error: ["red", "pomegranate"],
  },
  hollow: {
    neutral: "nodeBadgeBackground",
    success: "nodeBadgeBackground",
    warning: "nodeBadgeBackground",
    error: "nodeBadgeBackground",
  },
  border: {
    neutral: "neutralPillBorder",
    success: ["green", "deyork"],
    warning: ["yellow", "seaBuckthorn"],
    error: ["red", "apricot"],
  },
  color: {
    neutral: "neutralPillColor",
    success: ["green", "netdata"],
    warning: ["yellow", "seaBuckthorn"],
    error: ["red", "apricot"],
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
