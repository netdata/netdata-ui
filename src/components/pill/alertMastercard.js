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
      labelProps = {},
      pillLeft = {},
      pillRight = {},
      pillEnd,
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
      zIndex: 4,
      ...labelProps,
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
    const pillEndBackground =
      pillEnd && getMasterCardBackground(pillEnd.background, pillEnd.flavour || "disabledClear")

    const pillLeftProps = {
      background: pillLeftBackground,
      position: "relative",
      margin: [0, 0, 0, -3],
      padding: [1, 2, 1, 4],
      zIndex: 3,
      ...pillProps,
      ...pillLeft,
      round: labelProps.hidden ? round : "0 12px 12px 0",
    }
    const pillRightProps = {
      background: pillRightBackground,
      margin: [0, 0, 0, -3],
      padding: [1, 2, 1, 4],
      zIndex: 2,
      ...pillProps,
      ...pillRight,
    }
    const pillEndProps = pillEnd && {
      background: pillEndBackground,
      margin: [0, 0, 0, -3],
      padding: [1, 2, 1, 4],
      zIndex: 1,
      ...pillProps,
      ...pillEnd,
    }

    return (
      <MasterCardContainer data-testid={testId} onClick={onClick} ref={ref} {...commonProps}>
        {!labelProps.hidden && (
          <MasterCardPill data-testid={`${testId}-icon-pill`} {...iconProps} />
        )}
        <MasterCardPill data-testid={`${testId}-left-pill`} {...pillLeftProps} />
        <MasterCardPill data-testid={`${testId}-right-pill`} {...pillRightProps} />
        {pillEndProps && <MasterCardPill data-testid={`${testId}-end-pill`} {...pillEndProps} />}
      </MasterCardContainer>
    )
  }
)

export default AlertMasterCard
