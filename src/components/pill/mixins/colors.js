const colorMap = {
  background: {
    neutral: "neutralHighlight",
    success: "success",
    clear: "success",
    warning: "warning",
    error: "error",
    critical: "error",
    stale: "stale",
    muted: "textLite",

    idleClear: "idleClear",
    idleError: "idleError",
    idleWarning: "idleWarning",
  },
  border: {
    neutral: "neutralHighlight",
    success: "success",
    clear: "success",
    warning: "warning",
    error: "error",
    critical: "error",
    stale: "stale",
    muted: "textLite",

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
    muted: "neutralHighlight",
  },
  // Text on filled pills: bright on saturated status fills, text on neutral and pale idle fills.
  filledText: {
    neutral: "text",
    success: "bright",
    clear: "bright",
    warning: "bright",
    error: "bright",
    critical: "bright",
    stale: "bright",
    muted: "bright",

    idleClear: "text",
    idleError: "text",
    idleWarning: "text",
  },
  color: {
    neutral: "neutralPillColor",
    success: "success",
    clear: "success",
    warning: "warning",
    error: "error",
    critical: "error",
    stale: "stale",
    muted: "textLite",

    // Idle tones are background tints; as hollow text they vanish, so idle reads as quiet grey.
    idleClear: "textLite",
    idleError: "textLite",
    idleWarning: "textLite",
  },
  // Soft (default) look: tone-coloured text on the tint from mixins/soft.
  softText: {
    neutral: "text",
    success: "successSoftText",
    clear: "successSoftText",
    warning: "warningSoftText",
    error: "errorSoftText",
    critical: "errorSoftText",
    stale: "staleSoftText",
    muted: "textLite",

    idleClear: "text",
    idleError: "text",
    idleWarning: "text",
  },
}

// Stale text on staleSemi is the same green; bright (bold) is the most readable token on it.
colorMap.semiText = { ...colorMap.color, stale: "bright" }

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
