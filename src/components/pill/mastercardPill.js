import React from "react"
import Pill from "./index"

const MasterCardPill = ({ background, icon, text, ref, ...rest }) => (
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
)

export default MasterCardPill
