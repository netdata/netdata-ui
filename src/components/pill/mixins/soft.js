import { getRgbColor } from "@/theme"

const RING_OPACITY = 0.35

const status = tone => ({ fill: `${tone}Semi`, ring: tone, ringOpacity: RING_OPACITY })
const idle = tone => ({ fill: tone, ring: tone })

const tones = {
  neutral: { fill: "neutralHighlight", ring: "border" },
  success: status("success"),
  clear: status("success"),
  warning: status("warning"),
  error: status("error"),
  critical: status("error"),
  // There is no light enough stale semi token, so the tint is stale itself at low opacity.
  stale: { fill: "stale", fillOpacity: 0.14, ring: "stale", ringOpacity: RING_OPACITY },
  muted: { fill: ["transparent", "full"], ring: "border" },

  idleClear: idle("idleClear"),
  idleError: idle("idleError"),
  idleWarning: idle("idleWarning"),
}

export const getSoftTone = flavour => tones[flavour] || tones.neutral

export const getSoftRing = (flavour, theme) => {
  const { ring, ringOpacity } = getSoftTone(flavour)
  return ringOpacity ? getRgbColor(ring, ringOpacity)({ theme }) : ring
}
