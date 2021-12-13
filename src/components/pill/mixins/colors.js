const colorMap = {
  background: {
    neutral: ["neutral", "regentgrey"],
    neutralLight: ["neutral", "iron"],
    success: ["green", "netdata"],
    warning: ["yellow", "amber"],
    warningStrong: ["yellow", "seaBuckthorn"],
    error: ["red", "pomegranate"],
  },
  hollow: {
    neutral: ["neutral", "porcelain"],
    neutralLight: ["neutral", "porcelain"],
    success: ["green", "frostee"],
    warning: ["yellow", "ginfizz"],
    warningStrong: ["yellow", "ginfizz"],
    error: ["red", "lavender"],
  },
  border: {
    neutral: ["neutral", "regentgrey"],
    neutralLight: ["neutral", "iron"],
    success: ["green", "deyork"],
    warning: ["yellow", "amber"],
    warningStrong: ["yellow", "seaBuckthorn"],
    error: ["red", "wewak"],
  },
  color: {
    neutral: ["neutral", "bluebayoux"],
    neutralLight: ["neutral", "bluebayoux"],
    success: ["green", "netdata"],
    warning: ["yellow", "seaBuckthorn"],
    warningStrong: ["yellow", "seaBuckthorn"],
    error: ["red", "pomegranate"],
  },
}

const getPillColor = (type, flavour) => colorMap[type][flavour]

export default getPillColor
