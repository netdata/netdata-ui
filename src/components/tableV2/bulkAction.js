import React, { useRef } from "react"
import Action from "./action"

const BulkAction = ({
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
  ...rest
}) => {
  const actionRef = useRef()
  const disabled = typeof isDisabled === "function" ? isDisabled() : isDisabled
  const visible = typeof isVisible === "function" ? isVisible() : isVisible
  return (
    <Action
      actionRef={actionRef}
      testPrefix={`-bulk${testPrefix}`}
      key={id}
      visible={visible}
      id={id}
      icon={icon}
      handleAction={() => handleAction(selectedRows, table)}
      tooltipText={tooltipText}
      disabled={(!alwaysEnabled && selectedRows?.length < 1) || disabled}
      background="elementBackground"
      selectedRows={selectedRows}
      {...rest}
    />
  )
}

export default BulkAction
