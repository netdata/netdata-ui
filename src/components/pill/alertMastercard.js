import React from "react"
import MasterCardPill from "./mastercardPill"
import { getMasterCardBackground } from "./mixins/background"
import { masterCardColorMap } from "./mixins/colors"
import { getSegmentRound, SEGMENT_GAP } from "./mixins/segment"
import { MasterCardContainer } from "./styled"

const AlertMasterCard = ({
  "data-testid": testId = "alert-mastercard",
  height,
  normal,
  onClick,
  labelProps = {},
  pillLeft = {},
  pillRight = {},
  pillEnd,
  containerProps = {},
  round,
  size,
  ref,
  ...rest
}) => {
  const commonProps = { height, size, ...containerProps }
  const hasLabel = !labelProps.hidden
  const offset = hasLabel ? 1 : 0
  const count = offset + (pillEnd ? 3 : 2)
  const segmentRound = index => getSegmentRound(index, count, round)

  const iconProps = {
    background: masterCardColorMap.alert,
    color: "text",
    icon: "alarm_bell",
    round: segmentRound(0),
    ...labelProps,
    ...commonProps,
  }
  const pillProps = {
    normal,
    ...commonProps,
    ...rest,
  }

  const pillLeftProps = {
    background: getMasterCardBackground(pillLeft.background, pillLeft.flavour || "disabledError"),
    position: "relative",
    round: segmentRound(offset),
    ...pillProps,
    ...pillLeft,
  }
  const pillRightProps = {
    background: getMasterCardBackground(
      pillRight.background,
      pillRight.flavour || "disabledWarning"
    ),
    round: segmentRound(offset + 1),
    ...pillProps,
    ...pillRight,
  }
  const pillEndProps = pillEnd && {
    background: getMasterCardBackground(pillEnd.background, pillEnd.flavour || "disabledClear"),
    round: segmentRound(offset + 2),
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
      {hasLabel && <MasterCardPill data-testid={`${testId}-icon-pill`} {...iconProps} />}
      <MasterCardPill data-testid={`${testId}-left-pill`} {...pillLeftProps} />
      <MasterCardPill data-testid={`${testId}-right-pill`} {...pillRightProps} />
      {pillEndProps && <MasterCardPill data-testid={`${testId}-end-pill`} {...pillEndProps} />}
    </MasterCardContainer>
  )
}

export default AlertMasterCard
