import React from "react"

import Table from "./base-table"
import makeHeadCell from "./headCell"
import Rows from "./rows"

const FullTable = ({
  dataGa,
  disableClickRow,
  enableResize,
  enableSorting,
  flexRender,
  getRowHandler,
  headers,
  onClickRow,
  onHoverRow,
  pinnedStyles = {},
  table,
  tableRef,
  testPrefix,
  testPrefixCallback,
  width,
  scrollParentRef,
}) => {
  return (
    <Table
      dataGa={dataGa}
      data-testid={`netdata-table${testPrefix}`}
      ref={tableRef}
      testPrefix={testPrefix}
      width={width}
    >
      <Table.Head data-testid={`netdata-table-head${testPrefix}`}>
        <Table.HeadRow data-testid={`netdata-table-headRow${testPrefix}`}>
          {makeHeadCell({
            enableResize,
            enableSorting,
            headers,
            pinnedStyles,
            table,
            testPrefix,
          })}
        </Table.HeadRow>
      </Table.Head>
      <Table.Body data-testid={`netdata-table-body${testPrefix}`}>
        <Rows
          scrollParentRef={scrollParentRef}
          disableClickRow={disableClickRow}
          flexRender={flexRender}
          getRowHandler={getRowHandler}
          onClickRow={onClickRow}
          onHoverRow={onHoverRow}
          pinnedStyles={pinnedStyles}
          table={table}
          testPrefix={testPrefix}
          testPrefixCallback={testPrefixCallback}
        />
      </Table.Body>
    </Table>
  )
}

export default FullTable
