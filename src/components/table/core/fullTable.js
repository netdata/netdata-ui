import React from "react"
import Table from "./base-table"
import HeadCells from "./headCells"
import Rows from "./rows"

const FullTable = ({
  dataGa,
  disableClickRow,
  enableResize,
  enableSorting,
  getRowHandler,
  headers,
  onClickRow,
  onHoverCell,
  pinnedStyles = {},
  table,
  tableRef,
  testPrefix,
  testPrefixCallback,
  width,
  scrollParentRef,
  virtualizeOptions = {},
  coloredSortedColumn,
  meta,
  side,
  ...rest
}) => {
  return (
    <Table
      dataGa={dataGa}
      data-testid={`netdata-table${testPrefix}`}
      ref={tableRef}
      testPrefix={testPrefix}
      width={width}
      {...rest}
    >
      <Table.Head data-testid={`netdata-table-head${testPrefix}`}>
        {headers.map((headerGroup, index) => (
          <Table.HeadRow
            key={index}
            id={headerGroup.id}
            data-testid={`netdata-table-headRow${testPrefix}`}
          >
            <HeadCells
              dataGa={dataGa}
              enableResize={enableResize}
              enableSorting={enableSorting}
              headers={headerGroup.headers}
              pinnedStyles={pinnedStyles}
              table={table}
              testPrefix={testPrefix}
              coloredSortedColumn={enableSorting && coloredSortedColumn}
            />
          </Table.HeadRow>
        ))}
      </Table.Head>
      <Table.Body data-testid={`netdata-table-body${testPrefix}`}>
        <Rows
          scrollParentRef={scrollParentRef}
          disableClickRow={disableClickRow}
          getRowHandler={getRowHandler}
          onClickRow={onClickRow}
          onHoverCell={onHoverCell}
          pinnedStyles={pinnedStyles}
          table={table}
          testPrefix={testPrefix}
          testPrefixCallback={testPrefixCallback}
          coloredSortedColumn={enableSorting && coloredSortedColumn}
          meta={meta}
          enableColumnPinning={rest.enableColumnPinning}
          side={side}
          {...virtualizeOptions}
        />
      </Table.Body>
    </Table>
  )
}

export default FullTable
