import React from "react"

import FullTable from "../core/fullTable"

const MainTable = ({
  tableRef,
  table,
  enableColumnPinning,
  enableSorting,
  testPrefix,
  dataGa,
  testPrefixCallback,
  onClickRow,
  disableClickRow,
  onHoverCell,
  enableResize,
  scrollParentRef,
  ...rest
}) => {
  const headers = enableColumnPinning ? table.getCenterFlatHeaders() : table.getFlatHeaders()

  return (
    <FullTable
      scrollParentRef={scrollParentRef}
      width={enableResize ? `${table.getTotalSize()}px` : "100%"}
      enableResize={enableResize}
      onHoverCell={onHoverCell}
      table={table}
      headers={headers}
      enableSorting={enableSorting}
      getRowHandler={enableColumnPinning ? "getCenterVisibleCells" : "getVisibleCells"}
      testPrefix={testPrefix}
      dataGa={dataGa}
      testPrefixCallback={testPrefixCallback}
      onClickRow={onClickRow}
      disableClickRow={disableClickRow}
      tableRef={tableRef}
      {...rest}
    />
  )
}

export default MainTable
