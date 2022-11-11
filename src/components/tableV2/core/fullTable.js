import React from "react"

import Table from "./base-table"
import makeHeadCell from "./headCell"
import makeRows from "./rows"

const FullTable = ({
  tableRef,
  getRowHandler,
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
    <Table
      ref={tableRef}
      data-testid={`netdata-table${testPrefix}`}
      testPrefix={testPrefix}
      dataGa={dataGa}
    >
      <Table.Head data-testid={`netdata-table-head${testPrefix}`}>
        <Table.HeadRow data-testid={`netdata-table-headRow${testPrefix}`}>
          {makeHeadCell({ headers, enableSorting, testPrefix })}
        </Table.HeadRow>
      </Table.Head>
      <Table.Body data-testid={`netdata-table-body${testPrefix}`}>
        {makeRows({
          testPrefixCallback,
          testPrefix,
          onClickRow,
          table,
          disableClickRow,
          flexRender,
          getRowHandler,
        })}
      </Table.Body>
    </Table>
  )
}

export default FullTable
