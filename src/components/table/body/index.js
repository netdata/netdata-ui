import React, { forwardRef } from "react"
import Flex from "src/components/templates/flex"
import { mergeRefs } from "src/utils"
// import HeadCells from "./headCells"
// import Rows from "./rows"

import Header from "./header"

const Body = forwardRef(
  (
    {
      dataGa,
      disableClickRow,
      enableResizing,
      enableSorting,
      getRowHandler,
      headers,
      onClickRow,
      onHoverCell,
      table,
      tableRef,
      testPrefix,
      testPrefixCallback,
      scrollParentRef,
      virtualizeOptions = {},
      coloredSortedColumn,
      meta,
      side,
      width,
      ...rest
    },
    ref
  ) => {
    return (
      <Flex
        dataGa={dataGa}
        data-testid={`netdata-table${testPrefix}`}
        ref={mergeRefs(tableRef, ref)}
        testPrefix={testPrefix}
        {...(typeof width !== "undefined" ? { width } : { flex: true })}
      >
        <Header
          dataGa={dataGa}
          table={table}
          testPrefix={testPrefix}
          coloredSortedColumn={coloredSortedColumn}
        />

        {/*<Table.Body data-testid={`netdata-table-body${testPrefix}`}>
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
            coloredSortedColumn={coloredSortedColumn}
            meta={meta}
            enableColumnPinning={rest.enableColumnPinning}
            side={side}
            {...virtualizeOptions}
          />
        </Table.Body>*/}
      </Flex>
    )
  }
)

export default Body
