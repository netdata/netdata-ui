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
  side,
  ...rest
}) => {
  const getThemeColor = useColor()
  const isLeft = side == "left"
  const getRowHandler = isLeft ? "getLeftVisibleCells" : "getRightVisibleCells"
  const borderSide = isLeft ? "borderRight" : "borderLeft"
  const getTotalSizeFunc = isLeft ? "getLeftTotalSize" : "getRightTotalSize"

  return (
    <Box
      background="mainBackground"
      sx={{
        position: "sticky",
        [side]: 0,
        zIndex: 11,
      }}
    >
      <FullTable
        scrollParentRef={scrollParentRef}
        dataGa={`pin-${dataGa}`}
        disableClickRow={disableClickRow}
        enableResize={enableResize}
        enableSorting={enableSorting}
        getRowHandler={getRowHandler}
        onClickRow={onClickRow}
        onHoverCell={onHoverCell}
        pinnedStyles={{ [borderSide]: `1px solid ${getThemeColor("borderSecondary")}` }}
        table={table}
        testPrefix={`pin${testPrefix}`}
        testPrefixCallback={testPrefixCallback}
        width={enableResize ? `${table[getTotalSizeFunc]()}px` : "100%"}
        side={side}
        {...rest}
      />
    </Box>
  )
}

export default ColumnPinning
