import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"
import { Icon, IconComponents } from "src/components/icon"
import { comparison, includesString, select } from "./helpers/filterFns"
import useColumns from "./features/useColumns"
import useBulkActions from "./features/useBulkActions"
import ColumnPinning from "./features/columnPinning"
import GlobalControls from "./features/globalControls"
import TableProvider from "./features/provider"
import Pagination from "./components/pagination"
import FullTable from "./core/fullTable"

const noop = () => {}
const emptyObj = {}

const filterFns = {
  comparison,
  select,
}

const NetdataTable = forwardRef(
  (
    {
      additionalGroupBy,
      bulkActions,
      columnPinning: defaultColumnPinning,
      columnVisibility: defaultColumnVisibility,
      expanded: defaultExpanded,
      rowSelection: defaultRowSelection,
      data,
      dataColumns,
      dataGa,
      enableColumnPinning,
      enableColumnVisibility,
      enablePagination,
      enableResize,
      enableSelection,
      enableSubRowSelection,
      enableSorting,
      globalFilter: initialGlobalFilter,
      globalFilterFn = includesString,
      groupByFilter: initialGroupByFilter = "",
      groupByColumnIds = [],
      onClickRow,
      onColumnVisibilityChange,
      onGlobalSearchChange,
      onGroupByChange,
      onHoverCell,
      onRowSelected,
      onSortingChange,
      onExpandedChange,
      paginationOptions,
      rowActions,
      sortBy,
      testPrefix,
      meta: tableMeta,
      title,
      virtualizeOptions,
      ...rest
    },
    ref
  ) => {
    const [columnVisibility, setColumnVisibility] = useState(defaultColumnVisibility)

    useEffect(() => {
      if (columnVisibility === defaultColumnVisibility) return

      setColumnVisibility(defaultColumnVisibility)
    }, [defaultColumnVisibility])

    const [columnPinning, setColumnPinning] = useState(() => defaultColumnPinning || {})

    useEffect(() => {
      if (!defaultColumnPinning || columnVisibility === defaultColumnPinning) return

      setColumnPinning(defaultColumnPinning)
    }, [defaultColumnPinning])

    const [rowSelection, setRowSelection] = useState(defaultRowSelection)

    useEffect(() => {
      if (rowSelection === defaultRowSelection) return

      setRowSelection(defaultRowSelection)
    }, [defaultRowSelection])

    const [sorting, setSorting] = useState(() => sortBy || [])

    useEffect(() => {
      if (!sortBy || sorting === sortBy) return

      setSorting(sortBy)
    }, [sortBy])

    const onShorting = useCallback(
      getSorting => {
        onSortingChange(getSorting)
        setSorting(getSorting)
      },
      [onSortingChange]
    )

    const [pagination, setPagination] = useState(() => ({
      pageIndex: paginationOptions.pageIndex,
      pageSize: paginationOptions.pageSize,
    }))

    const handleColumnVisibilityChange = useCallback(getVisibility => {
      onColumnVisibilityChange(getVisibility)
      setColumnVisibility(getVisibility)
    }, [])

    const [globalFilter, setGlobalFilter] = useState(initialGlobalFilter)
    const [groupByFilter, setGroupByFilter] = useState(initialGroupByFilter)

    const groupByOptions = groupByColumnIds.length
      ? {
          default: { label: "None", value: "" },
          ...groupByColumnIds.reduce((acc, colId) => {
            const column = dataColumns.find(({ id }) => id === colId)

            return {
              ...acc,
              [colId]: { label: column?.name || column.id, value: colId },
            }
          }, {}),
        }
      : null

    useEffect(() => {
      if (!initialGlobalFilter || globalFilter === initialGlobalFilter) return

      setGlobalFilter(initialGlobalFilter)
    }, [sortBy])

    const onGlobalFilterChange = useCallback(value => {
      onGlobalSearchChange?.(value)
      setGlobalFilter(String(value))
    }, [])

    const onGlobalGroupByChange = useCallback(
      value => {
        onGroupByChange?.(value)
        setGroupByFilter(value)
      },
      [onGroupByChange]
    )

    const columns = useColumns(dataColumns, { testPrefix, enableSelection, rowActions, tableMeta })

    const [expanded, setExpanded] = useState(defaultExpanded)

    const onExpand = useCallback(getExpanding => {
      onExpandedChange(getExpanding)
      setExpanded(getExpanding)
    }, [])

    const groupedData = useMemo(() => {
      if (!groupByFilter) return []

      const additionalGroupData = rows => {
        const groupedData = rows.reduce((result, obj) => {
          const objChild = obj[additionalGroupBy.child]
          const objParent = obj[additionalGroupBy.parent]
          const newObj = { ...obj }

          if (objParent === 0) {
            newObj.children = []
            result[objChild] = newObj
          } else {
            let parentFound = false

            const findParentInChildren = children => {
              for (const child of children) {
                if (child[additionalGroupBy.child] === objParent) {
                  if (!child.children) {
                    child.children = []
                  }
                  child.children.push(newObj)
                  parentFound = true
                  break
                } else if (child.children) {
                  findParentInChildren(child.children)
                }
              }
            }

            findParentInChildren(Object.values(result))

            if (!parentFound) {
              result[objChild] = newObj
            }
          }

          return result
        }, {})
        return Object.values(groupedData)
      }

      if (additionalGroupBy && groupByFilter === additionalGroupBy.parent)
        return additionalGroupData(data)

      const groupObj = data.reduce((acc, row) => {
        if (!acc[row[groupByFilter]])
          return {
            ...acc,
            [row[groupByFilter]]: row,
          }
        if (!acc[row[groupByFilter]].children) {
          return {
            ...acc,
            [row[groupByFilter]]: Object.keys(acc[row[groupByFilter]]).reduce(
              (rowAcc, key) => ({
                ...rowAcc,
                children: [
                  {
                    ...acc[row[groupByFilter]],
                    [groupByFilter]: "",
                  },
                  {
                    ...row,
                    [groupByFilter]: "",
                  },
                ],
                [key]:
                  typeof acc[row[groupByFilter]][key] === "number"
                    ? acc[row[groupByFilter]][key] + row[key]
                    : key === groupByFilter
                    ? acc[row[groupByFilter]][key]
                    : new Set([acc[row[groupByFilter]][key], row[key]]),
              }),
              {}
            ),
          }
        }
        return {
          ...acc,
          [row[groupByFilter]]: Object.keys(acc[row[groupByFilter]]).reduce((rowAcc, key) => {
            if (key === "children")
              return {
                ...rowAcc,
                children: [...acc[row[groupByFilter]].children, { ...row, [groupByFilter]: "" }],
              }
            return {
              ...rowAcc,
              [key]:
                typeof acc[row[groupByFilter]][key] === "number"
                  ? acc[row[groupByFilter]][key] + row[key]
                  : key === groupByFilter
                  ? acc[row[groupByFilter]][key]
                  : acc[row[groupByFilter]][key].add(row[key]),
            }
          }, {}),
        }
      }, {})

      return !additionalGroupBy
        ? Object.values(groupObj)
        : Object.values(groupObj).map(group =>
            group.children
              ? {
                  ...group,
                  children: additionalGroupData(group.children),
                }
              : group
          )
    }, [additionalGroupBy, data, groupByFilter])

    const groupedColumnPinning = useMemo(() => {
      if (!groupByFilter) return columnPinning
      if (!columnPinning || !Object.keys(columnPinning).length) return columnPinning

      const side = columnPinning.left ? "left" : "right"
      return { [side]: Array.from(new Set([groupByFilter, ...columnPinning[side]])) }
    }, [columnPinning, groupByFilter])

    const table = useReactTable({
      columns,
      data: groupByFilter ? groupedData : data,
      manualPagination: !enablePagination,
      columnResizeMode: enableResize ? "onEnd" : "",
      filterFns,
      state: {
        columnVisibility,
        rowSelection,
        globalFilter,
        sorting,
        pagination,
        columnPinning: groupByFilter ? groupedColumnPinning : columnPinning,
        expanded,
      },
      onExpandedChange: onExpand,
      ...(globalFilterFn ? { globalFilterFn } : {}),
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      onGlobalFilterChange,
      onSortingChange: onShorting,
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getSubRows: row => row.children,
      onPaginationChange: setPagination,
      onColumnVisibilityChange: handleColumnVisibilityChange,
      onColumnPinningChange: setColumnPinning,
      enableSubRowSelection,
    })

    const [selectedRows, setActualSelectedRows] = useState([])

    useEffect(() => {
      const { flatRows } = table.getSelectedRowModel()
      if (flatRows) {
        const selectedRows = flatRows.reduce((acc, { original }) => {
          if (original?.disabled) return acc

          acc.push(original)
          return acc
        }, [])
        setActualSelectedRows(selectedRows)
        onRowSelected?.(selectedRows)
      }
    }, [rowSelection, table])

    const hasBulkActions = enableColumnPinning || enableColumnVisibility || !!bulkActions
    const scrollParentRef = useRef()

    const actions = useBulkActions({
      bulkActions,
      columnPinning: groupByFilter ? groupedColumnPinning : columnPinning,
      dataGa,
      enableColumnVisibility,
      enableColumnPinning,
      selectedRows,
      table,
      testPrefix,
    })

    const columnPinningProps = useCallback(
      side => ({
        side,
        enableResize,
        onClickRow,
        enableSorting,
        table,
        headers: side === "left" ? table.getLeftHeaderGroups() : table.getRightHeaderGroups(),
        testPrefix,
        dataGa,
        scrollParentRef,
        virtualizeOptions,
        meta: tableMeta,
      }),
      [
        enableResize,
        onClickRow,
        enableSorting,
        table,
        testPrefix,
        dataGa,
        scrollParentRef,
        virtualizeOptions,
        tableMeta,
      ]
    )

    const { hasNextPage, loading, warning } = virtualizeOptions || {}

    return (
      <TableProvider onHoverCell={onHoverCell}>
        <Flex height="100%" overflow="hidden" column ref={ref}>
          {onGlobalSearchChange || hasBulkActions ? (
            <GlobalControls
              bulkActions={hasBulkActions ? actions : null}
              dataGa={dataGa}
              groupByOptions={groupByOptions}
              groupValue={groupByFilter}
              onGroupBy={onGlobalGroupByChange}
              onSearch={onGlobalSearchChange ? onGlobalFilterChange : null}
              searchValue={globalFilter}
              tableMeta={tableMeta}
              title={title}
            />
          ) : null}
          <Flex row ref={scrollParentRef} overflow="auto">
            {enableColumnPinning && columnPinning.left && (
              <ColumnPinning {...columnPinningProps("left")} />
            )}
            <FullTable
              headers={columnPinning ? table.getCenterHeaderGroups() : table.getHeaderGroups()}
              width="100%"
              getRowHandler={enableColumnPinning ? "getCenterVisibleCells" : "getVisibleCells"}
              scrollParentRef={scrollParentRef}
              enableResize={enableResize}
              onClickRow={onClickRow}
              enableSorting={enableSorting}
              enableColumnPinning={enableColumnPinning}
              table={table}
              dataGa={dataGa}
              testPrefix={testPrefix}
              virtualizeOptions={virtualizeOptions}
              meta={tableMeta}
              side="center"
              {...rest}
            />
            {enableColumnPinning && columnPinning.right && (
              <ColumnPinning {...columnPinningProps("right")} />
            )}
          </Flex>
          {!hasNextPage && !loading && !!warning && (
            <Flex alignItems="center" justifyContent="center" gap={2} padding={[4]} width="100%">
              <Icon name="warning_triangle_hollow" color="warning" />{" "}
              <Text color="warningText">{warning}</Text>
            </Flex>
          )}

          {hasNextPage && loading && (
            <Flex alignItems="center" justifyContent="center" gap={2} padding={[4]} width="100%">
              <IconComponents.LoaderIcon /> <Text>Loading more...</Text>
            </Flex>
          )}
          {enablePagination && <Pagination table={table} />}
        </Flex>
      </TableProvider>
    )
  }
)

NetdataTable.defaultProps = {
  coloredSortedColumn: true,
  enableColumnPinning: false,
  enableColumnVisibility: false,
  enableResize: false,
  onColumnVisibilityChange: noop,
  onSortingChange: noop,
  onExpandedChange: noop,
  paginationOptions: {
    pageIndex: 0,
    pageSize: 100,
  },
  expanded: emptyObj,
  rowSelection: emptyObj,
  rowActions: emptyObj,
  meta: emptyObj,
  globalFilter: "",
  testPrefix: "",
}

export default NetdataTable
