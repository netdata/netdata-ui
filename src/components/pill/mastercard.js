import React, { forwardRef } from "react"
import MasterCardPill from "./mastercardPill"
import { getMasterCardBackground } from "./mixins/background"
import { MasterCardContainer } from "./styled"

const minWidths = {
  default: "29px",
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
      padding: [1, 3],
      position: "relative",
      width: { min: minWidths[rest.size] || minWidths.default },
      ...pillProps,
      ...pillLeft,
    }
    const pillRightProps = {
      background: pillRightBackground,
      margin: [0, 0, 0, -1],
      padding: [1, 2],
      ...pillProps,
      ...pillRight,
    }
    const pillEndProps = pillEnd && {
      background: pillEndBackground,
      margin: [0, 0, 0, -1],
      padding: [1, 2],
      ...pillProps,
      ...pillEnd,
    }

    return (
      <MasterCardContainer
        background={pillEndBackground || pillRightBackground}
        data-testid={testId}
        onClick={onClick}
        ref={ref}
        {...commonProps}
      >
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
