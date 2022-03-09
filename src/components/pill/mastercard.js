import React, { forwardRef } from "react"
import MasterCardPill from "./mastercardPill"
import Pill from "./index"
import { getMasterCardBackground } from "./mixins/background"
import { masterCardColorMap } from "./mixins/colors"
import { AlertsContainer, MasterCardContainer } from "./styled"

const MasterCard = forwardRef(
  (
    {
      children,
      "data-testid": dataTestId,
      height,
      isAlert,
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
    const testId = dataTestId || "mastercard"
    const containerProps = {
      height,
      round,
      size,
    }
    const outerContainerProps = {
      onClick,
      ref,
    }
    const pillProps = {
      height,
      isClickable: !onClick,
      normal,
      round,
      size,
      ...rest,
    }

    const MasterCardComponent = (
      <MasterCardContainer
        background={getMasterCardBackground(
          pillRight.background,
          pillRight.flavour || "disabledWarning"
        )}
        data-testid={testId}
        isAlert={isAlert}
        {...containerProps}
        {...(!isAlert && outerContainerProps)}
      >
        {children || (
          <>
            <MasterCardPill side="left" isAlert={isAlert} data-testid={`${testId}-left-pill`} {...pillProps} {...pillLeft} />
            <MasterCardPill side="right" data-testid={`${testId}-right-pill`} {...pillProps} {...pillRight} />
          </>
        )}
      </MasterCardContainer>
    )

    if (!isAlert) return MasterCardComponent

    const alertIconProps = {
      background: masterCardColorMap.alert,
      borderColor: masterCardColorMap.alert,
      color: "neutral",
      "data-testid": `${testId}-alarm-icon`,
      height,
      icon: "alarm_bell",
      isAlert,
      round,
      size,
      zIndex: 1,
    }

    return (
      <AlertsContainer
        background={getMasterCardBackground(
          pillLeft.background,
        pillLeft.flavour || "disabledError"
        )}
        data-testid={`alert-${testId}`}
        {...containerProps}
        {...outerContainerProps}
      >
        <Pill {...alertIconProps} />
        {MasterCardComponent}
      </AlertsContainer>
    )
  }
)

export default MasterCard
