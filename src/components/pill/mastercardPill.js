import React, { forwardRef } from "react"
import Pill from "./index"

const MasterCardPill = forwardRef(({ background, icon, text, ...rest }, ref) => (
  <Pill
    background={background}
    borderColor={background}
    data-testid="mastercard-pill"
    icon={icon}
    ref={ref}
    {...rest}
  >
    {!icon && (text || "-")}
  </Pill>
))

export default MasterCardPill
