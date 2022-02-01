import React, { forwardRef } from "react"
import MasterCardPill from "./mastercardPill"
import { getMasterCardBackground } from "./mixins/background"
import { MasterCardContainer } from "./styled"

const MasterCard = forwardRef(
  ({
    children,
    height,
    normal,
    onClick,
    pillLeft = {},
    pillRight = {},
    round,
    size,
    ...rest
  }, ref) => {
    const pillProps = {
      height,
      isClickable: !onClick,
      normal,
      round,
      size,
      ...rest
    }

    return (
      <MasterCardContainer
        background={getMasterCardBackground(pillRight.background, pillRight.flavour || "disabledWarning")}
        height={height}
        onClick={onClick}
        round={round}
        size={size}
        ref={ref}
      >
        {children || (
          <>
            <MasterCardPill side="left" {...pillProps} {...pillLeft} />
            <MasterCardPill side="right" {...pillProps} {...pillRight} />
          </>
        )}
      </MasterCardContainer>
    )
  }
)

export default MasterCard
