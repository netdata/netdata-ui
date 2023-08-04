const colorMap = {
  background: {
    neutral: "nodeBadgeBackground",
    success: ["green", "green100"],
    clear: ["green", "green100"],
    warning: ["yellow", "yellow80"],
    error: ["red", "red100"],
  },
  hollow: {
    neutral: "generic",
    success: "successSemi",
    warning: "warningSemi",
    error: "errorSemi",
  },
  border: {
    neutral: "neutralPillBorder",
    success: ["green", "green100"],
    clear: ["green", "green100"],
    warning: ["yellow", "yellow80"],
    error: ["red", "error100"],
  },
  color: {
    neutral: "neutralPillColor",
    success: ["green", "green100"],
    clear: ["green", "green100"],
    warning: ["yellow", "warning80"],
    error: ["red", "red100"],
  },
}

export const masterCardColorMap = {
  alert: "alertIcon",
  disabledClear: "idleClear",
  disabledError: "idleError",
  disabledWarning: "idleWarning",
  clear: "success",
  error: "error",
  warning: "warning",
}

const getMasterCardColor = flavour => masterCardColorMap[flavour]
const getPillColor = (type, flavour) => colorMap[type][flavour]

export { getMasterCardColor, getPillColor }
