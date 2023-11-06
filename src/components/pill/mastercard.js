import React, { forwardRef } from "react"
import MasterCardPill from "./mastercardPill"
import { getMasterCardBackground } from "./mixins/background"
import { MasterCardContainer } from "./styled"

const minWidths = {
  default: "22px",
  large: "37px",
}

const MasterCard = forwardRef(
  (
    {
      children,
      "data-testid": testId = "mastercard",
      height,
      normal,
      onClick,
      pillLeft = {},
      pillRight = {},
      pillEnd,
      round,
      size,
      zIndex,
      ...rest
    },
    ref
  ) => {
    const commonProps = { height, round, size }
    const pillProps = { normal, ...commonProps, ...rest }

    const pillRightBackground = getMasterCardBackground(
      pillRight.background,
      pillRight.flavour || "disabledWarning"
    )
    const pillEndBackground =
      pillEnd && getMasterCardBackground(pillEnd.background, pillEnd.flavour || "disabledClear")

    const pillLeftProps = {
      background: getMasterCardBackground(pillLeft.background, pillLeft.flavour || "disabledError"),
      position: "relative",
      width: { min: minWidths[rest.size] || minWidths.default },
      ...pillProps,
      ...pillLeft,
      zIndex: 3,
    }
    const pillRightProps = {
      background: pillRightBackground,
      margin: [0, 0, 0, size === "large" ? -4.5 : -3.5],
      padding: [0, 2, 0, size === "large" ? 5 : 4],
      width: { min: minWidths[rest.size] || minWidths.default },
      ...pillProps,
      ...pillRight,
      zIndex: 2,
    }
    const pillEndProps = pillEnd && {
      background: pillEndBackground,
      margin: [0, 0, 0, size === "large" ? -4.5 : -3.5],
      padding: [0, 2, 0, size === "large" ? 5 : 4],
      width: { min: minWidths[rest.size] || minWidths.default },
      ...pillProps,
      ...pillEnd,
      zIndex: 1,
    }

    return (
      <MasterCardContainer data-testid={testId} onClick={onClick} ref={ref} {...commonProps}>
        {children || (
          <>
            <MasterCardPill data-testid={`${testId}-left-pill`} {...pillLeftProps} />
            <MasterCardPill data-testid={`${testId}-right-pill`} {...pillRightProps} />
            {pillEndProps && (
              <MasterCardPill data-testid={`${testId}-end-pill`} {...pillEndProps} />
            )}
          </>
        )}
      </MasterCardContainer>
    )
  }
)

export default MasterCard
