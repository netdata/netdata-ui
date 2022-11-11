import React from "react"

import Table from "../core/base-table"
import makeHeadCell from "../core/headCell"
import makeRows from "../core/rows"

import Box from "src/components/templates/box"

const ColumnPinning = ({
  testPrefix,
  dataGa,
  headers,
  enableSorting,
  testPrefixCallback,
  onClickRow,
  table,
  disableClickRow,
  flexRender,
}) => {
  return (
    <Box
      background="mainBackground"
      sx={{
        position: "sticky",
        left: 0,
        zIndex: 2,
      }}
    >
      <Table data-testid={`netdata-table-pin${testPrefix}`} testPrefix={testPrefix} dataGa={dataGa}>
        <Table.Head data-testid={`netdata-table-head-pin${testPrefix}`}>
          <Table.HeadRow data-testid={`netdata-table-headRow-pin${testPrefix}`}>
            {makeHeadCell({ headers, enableSorting, testPrefix })}
          </Table.HeadRow>
        </Table.Head>
        <Table.Body data-testid={`netdata-table-body-pin${testPrefix}`}>
          {makeRows({
            testPrefixCallback,
            testPrefix,
            onClickRow,
            table,
            disableClickRow,
            flexRender,
            getRowHandler: "getLeftVisibleCells",
          })}
        </Table.Body>
      </Table>
    </Box>
  )
}

export default ColumnPinning
