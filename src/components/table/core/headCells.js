import React from "react"

import ComparisonFilter from "../components/comparisonFilter"
import SelectFilter from "../components/selectFilter"

import SearchInput from "src/components/search"
import Box from "src/components/templates/box"
import { Icon } from "src/components/icon"

import Table from "./base-table"

import { flexRender } from "@tanstack/react-table"
import { debounce } from "throttle-debounce"

const SearchFilter = ({ column, testPrefix }) => {
  const { id = "" } = column

  const handleSearch = debounce(300, e => {
    column.setFilterValue(e.target.value)
  })
  return (
    <Box
      data-testid={`netdata-table-filter-${id}${testPrefix}`}
      as={SearchInput}
      defaultValue={column.getFilterValue()}
      width={{ max: 50 }}
      placeholder={"Search..."}
      iconRight={<Icon color="textLite" name="magnify" height="18px" width="18px" />}
      onChange={handleSearch}
    />
  )
}

const availableFilters = {
  comparison: ComparisonFilter,
  select: SelectFilter,
  default: SearchFilter,
}

const HeadCells = ({
  enableResize,
  enableSorting,
  headers,
  pinnedStyles = {},
  table,
  testPrefix,
  ...rest
}) =>
  headers.map(
    ({ id, colSpan, getContext, isPlaceholder, column, getResizeHandler, getSize }, index) => {
      const { getCanSort, columnDef, getCanResize, getIsResizing } = column

      const tableMeta =
        typeof columnDef.tableMeta === "function"
          ? columnDef.tableMeta({}, column, index)
          : columnDef.tableMeta

      const meta =
        typeof columnDef.meta === "function" ? columnDef.meta({}, column, index) : columnDef.meta

      const headStyles = {
        verticalAlign: "baseline",
        ...(tableMeta?.headStyles || {}),
        ...(meta?.headStyles || {}),
        ...pinnedStyles,
      }
      const styles = meta?.styles || {}

      const selectedFilter = meta && meta?.filter?.component ? meta?.filter?.component : "default"
      const filterOptions = meta && meta?.filter ? meta?.filter : {}
      const tooltipText = meta && meta?.tooltip ? meta?.tooltip : ""
      const Filter = availableFilters[selectedFilter]

      const resizeFuntions =
        enableResize && getCanResize()
          ? {
              onMouseDown: getResizeHandler(),
              onTouchStart: getResizeHandler(),
              getIsResizing,
              deltaOffset: table.getState().columnSizingInfo.deltaOffset,
            }
          : {}

      const headWidth = getSize()

      if (getCanSort() && enableSorting) {
        return (
          <Table.SortingHeadCell
            colSpan={colSpan}
            data-testid={`netdata-table-head-cell${testPrefix}`}
            filter={
              column.getCanFilter() && (
                <Filter column={column} testPrefix={testPrefix} {...filterOptions} />
              )
            }
            headStyles={headStyles}
            key={id}
            id={id}
            onSortClicked={column.getToggleSortingHandler()}
            sortby-testid={`netdata-table-head-cell-sortyBy-${id}${testPrefix}`}
            sortDirection={column.getIsSorted()}
            styles={styles}
            tooltipText={tooltipText}
            width={headWidth}
            flex={columnDef.fullWidth ? 1 : undefined}
            {...resizeFuntions}
            {...rest}
          >
            {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}{" "}
          </Table.SortingHeadCell>
        )
      }

      return (
        <Table.HeadCell
          colSpan={colSpan}
          data-testid={`netdata-table-head-cell${testPrefix}`}
          filter={
            column.getCanFilter() && (
              <Filter column={column} testPrefix={testPrefix} {...filterOptions} />
            )
          }
          headStyles={headStyles}
          key={id}
          id={id}
          styles={styles}
          tooltipText={tooltipText}
          width={headWidth}
          flex={columnDef.fullWidth ? 1 : undefined}
          {...resizeFuntions}
          {...rest}
        >
          {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
        </Table.HeadCell>
      )
    }
  )

export default HeadCells
