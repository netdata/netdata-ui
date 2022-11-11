import React, { memo, useEffect } from "react"

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
}) => {
  const headers = enableColumnPinning ? table.getCenterFlatHeaders() : table.getFlatHeaders()

  return (
    <FullTable
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
