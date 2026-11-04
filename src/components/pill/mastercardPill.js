import React from "react"
import Pill from "./index"
import { masterCardColorMap } from "./mixins/colors"

// Segments keep the filled look (D2a). Pale idle fills need dark text; saturated fills (including consumer backgrounds) keep bright text.
const paleBackgrounds = new Set([
  masterCardColorMap.disabledClear,
  masterCardColorMap.disabledError,
  masterCardColorMap.disabledWarning,
  "idleError",
])

const MasterCardPill = ({ background, color, hollow, icon, text, ref, ...rest }) => (
  <Pill
    background={background}
    borderColor={background}
    color={color || (hollow ? undefined : paleBackgrounds.has(background) ? "text" : "bright")}
    data-testid="mastercard-pill"
    filled
    hollow={hollow}
    icon={icon}
    ref={ref}
    {...rest}
  >
    {!icon && (text || "-")}
  </Pill>
)

export default MasterCardPill
