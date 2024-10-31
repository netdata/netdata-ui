const colorMap = {
  background: {
    neutral: "nodeBadgeBackground",
    success: "success",
    clear: "success",
    warning: "warning",
    error: "error",
    critical: "error",
    stale: "stale",

    idleClear: "idleClear",
    idleError: "idleError",
    idleWarning: "idleWarning",
  },
  border: {
    neutral: "nodeBadgeBackground",
    success: "success",
    clear: "success",
    warning: "warning",
    error: "error",
    critical: "error",
    stale: "stale",

    idleClear: "idleClear",
    idleError: "idleError",
    idleWarning: "idleWarning",
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

    idleClear: "idleClear",
    idleError: "idleError",
    idleWarning: "idleWarning",
  },
}

// TODO deprecated them by taking care all the mastcards in app
export const masterCardColorMap = {
  alert: "alertIcon",
  disabledClear: "idleClear",
  disabledError: "errorSemi",
  disabledWarning: "idleWarning",
  clear: "success",
  error: "error",
  warning: "warning",
}

const getMasterCardColor = flavour => masterCardColorMap[flavour]
const getPillColor = (type, flavour) => colorMap[type][flavour] || colorMap[type].neutral

export { getMasterCardColor, getPillColor }
