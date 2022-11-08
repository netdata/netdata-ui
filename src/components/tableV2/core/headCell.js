import React from "react"

import ComparisonFilter from "../components/comparisonFilter"
import SelectFilter from "../components/selectFilter"

import SearchInput from "src/components/search"
import Box from "src/components/templates/box"
import Tooltip from "src/components/drops/tooltip"
import { Icon } from "src/components/icon"

import Table from "./base-table"

import { flexRender } from "@tanstack/react-table"

const SearchFilter = ({ column, testPrefix }) => {
  const columnFilterValue = column.getFilterValue()
  const { id = "" } = column
  return (
    <Box
      data-testid={`netdata-table-filter-${id}${testPrefix}`}
      as={SearchInput}
      width={{ max: 50 }}
      value={columnFilterValue ?? ""}
      placeholder={"...Search"}
      iconRight={<Icon name="magnify" />}
      onChange={e => column.setFilterValue(e.target.value)}
    />
  )
}

const availableFilters = {
  comparison: ComparisonFilter,
  select: SelectFilter,
  default: SearchFilter,
}

const makeHeadCell = ({ headers, enableSorting, testPrefix }) => {
  const HeadCell = headers.map(({ id, colSpan, getContext, isPlaceholder, column }) => {
    const { getCanSort, columnDef } = column
    const { meta } = columnDef
    const styles = meta?.styles || {}

    const selectedFilter = meta && meta?.filter?.component ? meta?.filter?.component : "default"
    const filterOptions = meta && meta?.filter ? meta?.filter : {}
    const tooltipText = meta && meta?.tooltip ? meta?.tooltip : ""
    const Filter = availableFilters[selectedFilter]

    if (getCanSort() && enableSorting) {
      return (
        <Table.SortingHeadCell
          width={column.getSize()}
          minWidth={column.columnDef.minSize}
          maxWidth={column.columnDef.maxSize}
          data-testid={`netdata-table-head-cell${testPrefix}`}
          sortby-testid={`netdata-table-head-cell-sortyBy-${id}${testPrefix}`}
          sortDirection={column.getIsSorted()}
          onSortClicked={column.getToggleSortingHandler()}
          colSpan={colSpan}
          key={id}
          filter={
            column.getCanFilter() && (
              <Filter column={column} testPrefix={testPrefix} {...filterOptions} />
            )
          }
          styles={styles}
        >
          <Box position="absolute" right={0}>
            {tooltipText && (
              <Tooltip align="bottom" content={tooltipText}>
                <Icon color="nodeBadgeColor" size="small" name="information" />
              </Tooltip>
            )}
          </Box>
          {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}{" "}
        </Table.SortingHeadCell>
      )
    }

    return (
      <Table.HeadCell
        width={column.getSize()}
        minWidth={column.columnDef.minSize}
        maxWidth={column.columnDef.maxSize}
        data-testid={`netdata-table-head-cell${testPrefix}`}
        colSpan={colSpan}
        key={id}
        styles={styles}
      >
        {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
        {column.getCanFilter() ? (
          <div>
            <Filter column={column} testPrefix={testPrefix} {...filterOptions} />
          </div>
        ) : null}
      </Table.HeadCell>
    )
  })

  return HeadCell
}

export default makeHeadCell
