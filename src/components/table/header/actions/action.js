import React, { useRef } from "react"
import Action from "@/components/table/components/action"

import { mergeRefs } from "@/utils"

const HeaderAction = ({
  isDisabled,
  testPrefix,
  id,
  icon,
  handleAction,
  selectedRows,
  table,
  tooltipText,
  alwaysEnabled,
  disabledTooltipText,
  ref,
  ...rest
}) => {
  const actionRef = useRef()
  const disabled = typeof isDisabled === "function" ? isDisabled() : isDisabled

  return (
    <Action
      ref={mergeRefs(actionRef, ref)}
      testPrefix={`${testPrefix}-bulk`}
      key={id}
      id={id}
      icon={icon}
      handleAction={() => handleAction(selectedRows, table)}
      tooltipText={tooltipText}
      {...(!rest.label && typeof tooltipText === "string" ? { "aria-label": tooltipText } : {})}
      disabled={(!alwaysEnabled && selectedRows?.length < 1) || disabled}
      selectedRows={selectedRows}
      disabledTooltipText={
        typeof disabledTooltipText === "function"
          ? disabledTooltipText(selectedRows)
          : disabledTooltipText
      }
      {...rest}
    />
  )
}

export default HeaderAction
