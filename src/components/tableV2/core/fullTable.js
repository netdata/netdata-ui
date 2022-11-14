import React from "react"

import Table from "./base-table"
import makeHeadCell from "./headCell"
import Rows from "./rows"

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
  onHoverRow,
  enableResize,
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
          {makeHeadCell({ headers, enableSorting, testPrefix, enableResize })}
        </Table.HeadRow>
      </Table.Head>
      <Table.Body data-testid={`netdata-table-body${testPrefix}`}>
        <Rows
          testPrefix={testPrefix}
          testPrefixCallback={testPrefixCallback}
          onClickRow={onClickRow}
          table={table}
          disableClickRow={disableClickRow}
          flexRender={flexRender}
          getRowHandler={getRowHandler}
          onHoverRow={onHoverRow}
        />
      </Table.Body>
    </Table>
  )
}

export default FullTable
