import React from "react"
import useColor from "src/hooks/use-color"
import Box from "src/components/templates/box"
import FullTable from "../core/fullTable"

const ColumnPinning = ({
  dataGa,
  disableClickRow,
  enableResize,
  enableSorting,
  onClickRow,
  onHoverCell,
  table,
  testPrefix,
  testPrefixCallback,
  scrollParentRef,
  ...rest
}) => {
  const getThemeColor = useColor()

  return (
    <Box
      background="mainBackground"
      sx={{
        position: "sticky",
        left: 0,
        zIndex: 11,
        height: "fit-content",
      }}
    >
      <FullTable
        scrollParentRef={scrollParentRef}
        dataGa={`pin-${dataGa}`}
        disableClickRow={disableClickRow}
        enableResize={enableResize}
        enableSorting={enableSorting}
        getRowHandler="getLeftVisibleCells"
        onClickRow={onClickRow}
        onHoverCell={onHoverCell}
        pinnedStyles={{ borderRight: `1px solid ${getThemeColor("borderSecondary")}` }}
        table={table}
        testPrefix={`pin${testPrefix}`}
        testPrefixCallback={testPrefixCallback}
        width={enableResize ? `${table.getLeftTotalSize()}px` : "100%"}
        {...rest}
      />
    </Box>
  )
}

export default ColumnPinning
