import React, { useRef } from "react"

import BulkAction from "./bulkAction"
import ColumnsMenu from "./columnsMenu" //todo refactor this as right now is used only for the dropdown for column visibillity

const ActionWithDropdown = ({
  id,
  icon,
  handleAction,
  tooltipText,
  alwaysEnabled,
  isDisabled,
  isVisible,
  testPrefix,
  selectedRows,
  table,
  isOpen,
  onClose,
  ...rest
}) => {
  const actionRef = useRef()
  const disabled = typeof isDisabled === "function" ? isDisabled() : isDisabled
  const visible = typeof isVisible === "function" ? isVisible() : isVisible

  return (
    <React.Fragment key={id}>
      <BulkAction
        ref={actionRef}
        testPrefix={`-bulk${testPrefix}`}
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
      <ColumnsMenu
        parentRef={actionRef}
        isOpen={isOpen}
        columns={table.getAllLeafColumns()}
        onClose={onClose}
      />
    </React.Fragment>
  )
}

export default ActionWithDropdown
