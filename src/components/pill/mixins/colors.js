const colorMap = {
  background: {
    neutral: "nodeBadgeBackground",
    success: "success",
    clear: "success",
    warning: "warning",
    error: "error",
    critical: "error",
    stale: "stale",
  },
  border: {
    neutral: "nodeBadgeBackground",
    success: "success",
    clear: "success",
    warning: "warning",
    error: "error",
    critical: "error",
    stale: "stale",
  },
  hollow: {
    neutral: "neutralPillBorder",
    success: "successSemi",
    clear: "successSemi",
    warning: "warningSemi",
    error: "errorSemi",
    critical: "errorSemi",
    stale: "staleSemi",
  },
  color: {
    neutral: "neutralPillColor",
    success: "success",
    clear: "success",
    warning: "warning",
    error: "error",
    critical: "error",
    stale: "stale",
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
