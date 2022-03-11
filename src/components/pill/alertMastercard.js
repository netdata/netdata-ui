import React, { forwardRef } from "react"
import MasterCardPill from "./mastercardPill"
import { getMasterCardBackground } from "./mixins/background"
import { masterCardColorMap } from "./mixins/colors"
import { MasterCardContainer } from "./styled"

const AlertMasterCard = forwardRef(
  (
    {
      children,
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
      color: "neutral",
      icon: "alarm_bell",
      zIndex: 1,
      ...commonProps,
    }
    const pillProps = {
      normal,
      padding: [1, 2],
      margin: [0, 0, 0, -1],
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
      ...pillProps,
      ...pillLeft,
    }
    const pillRightProps = {
      background: pillRightBackground,
      ...pillProps,
      ...pillRight,
    }

    return (
      <MasterCardContainer
        background={pillLeftBackground}
        data-testid={`${testId}-container`}
        onClick={onClick}
        ref={ref}
        {...commonProps}
      >
        <MasterCardPill data-testid={`${testId}-icon-pill`} {...iconProps} />
        <MasterCardContainer
          background={pillRightBackground}
          data-testid={testId}
          {...commonProps}
        >
          {children || (
            <>
              <MasterCardPill
                data-testid={`${testId}-left-pill`}
                {...pillLeftProps}
              />
              <MasterCardPill
                data-testid={`${testId}-right-pill`}
                {...pillRightProps}
              />
            </>
          )}
        </MasterCardContainer>
      </MasterCardContainer>
    )
  }
)

export default AlertMasterCard
