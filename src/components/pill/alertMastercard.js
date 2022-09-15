import React, { forwardRef } from "react"
import MasterCardPill from "./mastercardPill"
import { getMasterCardBackground } from "./mixins/background"
import { masterCardColorMap } from "./mixins/colors"
import { MasterCardContainer } from "./styled"

const AlertMasterCard = forwardRef(
  (
    {
      "data-testid": testId = "alert-mastercard",
      height,
      normal,
      onClick,
      pillLeft = {},
      pillRight = {},
      round,
      size,
      ...rest
    },
    ref
  ) => {
    const commonProps = { height, round, size }
    const iconProps = {
      background: masterCardColorMap.alert,
      color: "text",
      icon: "alarm_bell",
      zIndex: 1,
      ...commonProps,
    }
    const pillProps = {
      normal,
      ...commonProps,
      ...rest,
    }
    const pillLeftBackground = getMasterCardBackground(
      pillLeft.background,
      pillLeft.flavour || "disabledError"
    )
    const pillRightBackground = getMasterCardBackground(
      pillRight.background,
      pillRight.flavour || "disabledWarning"
    )
    const pillLeftProps = {
      background: pillLeftBackground,
      position: "relative",
      margin: [0, 0, 0, -3],
      padding: [1, 2, 1, 4],
      ...pillProps,
      ...pillLeft,
      round: "0 12px 12px 0",
    }
    const pillRightProps = {
      background: pillRightBackground,
      margin: [0, 0, 0, -3],
      padding: [1, 2, 1, 4],
      ...pillProps,
      ...pillRight,
    }

    return (
      <MasterCardContainer data-testid={testId} onClick={onClick} ref={ref} {...commonProps}>
        <MasterCardPill data-testid={`${testId}-icon-pill`} {...iconProps} />
        <>
          <MasterCardPill data-testid={`${testId}-left-pill`} {...pillLeftProps} />
          <MasterCardPill data-testid={`${testId}-right-pill`} {...pillRightProps} />
        </>
      </MasterCardContainer>
    )
  }
)

export default AlertMasterCard
