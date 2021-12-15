const colorMap = {
  background: {
    neutral: ["neutral", "regentgrey"],
    success: ["green", "netdata"],
    warning: ["yellow", "amber"],
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
    warning: ["yellow", "amber"],
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
  neutralGrey: ["neutral", "regentgrey"],
  neutralIron: ["neutral", "iron"],
  red: ["red", "pomegranate"],
  yellow: ["yellow", "seaBuckthorn"],
}

const getPillColor = (type, flavour) => colorMap[type][flavour]
const getMasterCardColor = flavour => masterCardColorMap[flavour]

export { getPillColor, getMasterCardColor }
