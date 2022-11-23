import React from "react"
import useColor from "src/hooks/use-color"
import Box from "src/components/templates/box"
import FullTable from "../core/fullTable"

const ColumnPinning = ({
  dataGa,
  disableClickRow,
  enableResize,
  enableSorting,
  flexRender,
  onClickRow,
  onHoverRow,
  table,
  testPrefix,
  testPrefixCallback,
  scrollParentRef,
}) => {
  const getThemeColor = useColor()
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
        scrollParentRef={scrollParentRef}
        dataGa={`pin-${dataGa}`}
        disableClickRow={disableClickRow}
        enableResize={enableResize}
        enableSorting={enableSorting}
        flexRender={flexRender}
        getRowHandler="getLeftVisibleCells"
        headers={headers}
        onClickRow={onClickRow}
        onHoverRow={onHoverRow}
        pinnedStyles={{ borderRight: `1px solid ${getThemeColor("borderSecondary")}` }}
        table={table}
        testPrefix={`pin${testPrefix}`}
        testPrefixCallback={testPrefixCallback}
        width={enableResize ? `${table.getLeftTotalSize()}px` : "100%"}
      />
    </Box>
  )
}

export default ColumnPinning
