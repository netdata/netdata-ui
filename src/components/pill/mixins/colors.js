const colorMap = {
  background: {
    neutral: ["neutral", "regentgrey"],
    success: ["green", "netdata"],
    warning: ["yellow", "seaBuckthorn"],
    error: ["red", "pomegranate"],
  },
  hollow: {
    neutral: ["neutral", "porcelain"],
    success: ["green", "frostee"],
    warning: ["yellow", "ginfizz"],
    error: ["red", "lavender"],
  },
  border: {
    neutral: ["neutral", "regentgrey"],
    success: ["green", "deyork"],
    warning: ["yellow", "seaBuckthorn"],
    error: ["red", "wewak"],
  },
  color: {
    neutral: ["neutral", "bluebayoux"],
    success: ["green", "netdata"],
    warning: ["yellow", "seaBuckthorn"],
    error: ["red", "pomegranate"],
  },
}

const masterCardColorMap = {
  disabledError: ["neutral", "regentgrey"],
  disabledWarning: ["neutral", "iron"],
  error: ["red", "pomegranate"],
  warning: ["yellow", "seaBuckthorn"],
}

const getPillColor = (type, flavour) => colorMap[type][flavour]
const getMasterCardColor = flavour => masterCardColorMap[flavour]

export { getPillColor, getMasterCardColor }
