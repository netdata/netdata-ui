import React, { useRef, forwardRef } from "react"
import Action from "./action"

import { mergeRefs } from "src/utils"

const BulkAction = forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const actionRef = useRef()
    const disabled = typeof isDisabled === "function" ? isDisabled() : isDisabled
    const visible = typeof isVisible === "function" ? isVisible() : isVisible

    return (
      <Action
        ref={mergeRefs(actionRef, ref)}
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
)

export default BulkAction
