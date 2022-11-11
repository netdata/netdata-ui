import React from "react"

import Box from "src/components/templates/box"

import FullTable from "../core/fullTable"

const ColumnPinning = ({
  testPrefix,
  dataGa,
  enableSorting,
  testPrefixCallback,
  onClickRow,
  table,
  disableClickRow,
  flexRender,
}) => {
  const headers = table.getLeftFlatHeaders()
  return (
    <Box
      background="mainBackground"
      sx={{
        position: "sticky",
        left: 0,
        zIndex: 2,
      }}
    >
      <FullTable
        table={table}
        headers={headers}
        enableSorting={enableSorting}
        getRowHandler="getLeftVisibleCells"
        testPrefix={`pin${testPrefix}`}
        dataGa={`pin-${dataGa}`}
        testPrefixCallback={testPrefixCallback}
        onClickRow={onClickRow}
        disableClickRow={disableClickRow}
        flexRender={flexRender}
      />
    </Box>
  )
}

export default ColumnPinning
