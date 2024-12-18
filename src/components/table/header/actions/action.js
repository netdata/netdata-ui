import React, { useRef } from "react"
import Action from "@/components/table/components/action"

import { mergeRefs } from "@/utils"

const HeaderAction = ({
  isDisabled,
  isVisible,
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
  const visible = typeof isVisible === "function" ? isVisible() : isVisible

  return (
    <Action
      ref={mergeRefs(actionRef, ref)}
      testPrefix={`${testPrefix}-bulk`}
      key={id}
      visible={visible}
      id={id}
      icon={icon}
      handleAction={() => handleAction(selectedRows, table)}
      tooltipText={tooltipText}
      disabled={(!alwaysEnabled && selectedRows?.length < 1) || disabled}
      background="elementBackground"
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
