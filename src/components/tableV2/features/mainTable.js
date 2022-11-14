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
  flexRender,
  onHoverRow,
}) => {
  const headers = enableColumnPinning ? table.getCenterFlatHeaders() : table.getFlatHeaders()

  return (
    <FullTable
      onHoverRow={onHoverRow}
      table={table}
      headers={headers}
      enableSorting={enableSorting}
      getRowHandler={enableColumnPinning ? "getCenterVisibleCells" : "getVisibleCells"}
      testPrefix={testPrefix}
      dataGa={dataGa}
      testPrefixCallback={testPrefixCallback}
      onClickRow={onClickRow}
      disableClickRow={disableClickRow}
      flexRender={flexRender}
      tableRef={tableRef}
    />
  )
}

export default MainTable
