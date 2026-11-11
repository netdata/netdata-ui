import omit from "lodash/omit"
import MasterCardPill from "./mastercardPill"
import { getMasterCardBackground } from "./mixins/background"
import { getSegmentRound, SEGMENT_GAP } from "./mixins/segment"
import { MasterCardContainer } from "./styled"

const minWidths = {
  default: "22px",
  large: "37px",
}

const MasterCard = ({
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
  ref,
  ...rest
}) => {
  const commonProps = { height, size }
  const pillProps = { normal, ...commonProps, ...omit(rest, "zIndex") }
  const minWidth = { min: minWidths[size] || minWidths.default }
  const count = pillEnd ? 3 : 2

  const pillLeftProps = {
    background: getMasterCardBackground(pillLeft.background, pillLeft.flavour || "disabledError"),
    position: "relative",
    width: minWidth,
    round: getSegmentRound(0, count, round),
    ...pillProps,
    ...pillLeft,
  }
  const pillRightProps = {
    background: getMasterCardBackground(
      pillRight.background,
      pillRight.flavour || "disabledWarning"
    ),
    width: minWidth,
    round: getSegmentRound(1, count, round),
    ...pillProps,
    ...pillRight,
  }
  const pillEndProps = pillEnd && {
    background: getMasterCardBackground(pillEnd.background, pillEnd.flavour || "disabledClear"),
    width: minWidth,
    round: getSegmentRound(2, count, round),
    ...pillProps,
    ...pillEnd,
  }

  return (
    <MasterCardContainer
      data-testid={testId}
      gap={SEGMENT_GAP}
      onClick={onClick}
      ref={ref}
      round={round}
      {...commonProps}
    >
      {children || (
        <>
          <MasterCardPill data-testid={`${testId}-left-pill`} {...pillLeftProps} />
          <MasterCardPill data-testid={`${testId}-right-pill`} {...pillRightProps} />
          {pillEndProps && <MasterCardPill data-testid={`${testId}-end-pill`} {...pillEndProps} />}
        </>
      )}
    </MasterCardContainer>
  )
}

export default MasterCard
