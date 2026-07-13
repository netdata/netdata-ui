import {
  filterFns as defaultFilterFns,
  sortingFns as defaultSortingFns,
} from "@tanstack/react-table"
import { getColumnValue } from "./helpers/columnValue"

const reSplitAlphaNumeric = /([0-9]+)/gm

const getColumnsById = columns => {
  const byId = new Map()

  const addColumns = items => {
    items.forEach(column => {
      if (column.id) byId.set(column.id, column)
      if (column.columns) addColumns(column.columns)
    })
  }

  addColumns(columns)
  return byId
}

const getAutoSortingFn = (rows, column) => {
  let isString = false

  for (let index = 10; index < rows.length; index += 1) {
    const value = getColumnValue(rows[index], index, column)
    if (Object.prototype.toString.call(value) === "[object Date]") {
      return defaultSortingFns.datetime
    }
    if (typeof value !== "string") continue
    isString = true
    if (value.split(reSplitAlphaNumeric).length > 1) return defaultSortingFns.alphanumeric
  }

  return isString ? defaultSortingFns.text : defaultSortingFns.basic
}

const createRowAdapter = columnsById => ({
  index: 0,
  original: null,
  subRows: [],
  values: null,
  setRow(original, index) {
    this.original = original
    this.index = index
    this.values = null
  },
  getValue(columnId) {
    if (this.values?.has(columnId)) return this.values.get(columnId)
    const value = getColumnValue(this.original, this.index, columnsById.get(columnId))
    if (!this.values) this.values = new Map()
    this.values.set(columnId, value)
    return value
  },
})

const getAutoFilterFn = (rows, column) => {
  const value = getColumnValue(rows[0], 0, column)

  if (typeof value === "string") return defaultFilterFns.includesString
  if (typeof value === "number") return defaultFilterFns.inNumberRange
  if (typeof value === "boolean") return defaultFilterFns.equals
  if (value !== null && typeof value === "object") return defaultFilterFns.equals
  return defaultFilterFns.weakEquals
}

const filterRows = ({ rows, columnFilters, columnsById, filterFns }) => {
  if (!columnFilters?.length) return rows

  const filters = columnFilters
    .map(({ id, value }) => {
      const column = columnsById.get(id)
      if (!column) return null

      const filterFn =
        typeof column.filterFn === "function"
          ? column.filterFn
          : column.filterFn === "auto" || !column.filterFn
            ? getAutoFilterFn(rows, column)
            : filterFns[column.filterFn] || defaultFilterFns[column.filterFn]

      return filterFn
        ? {
            filterFn,
            id,
            value: filterFn.resolveFilterValue?.(value) ?? value,
          }
        : null
    })
    .filter(Boolean)

  if (!filters.length) return rows

  const rowAdapter = createRowAdapter(columnsById)
  return rows.filter((row, index) => {
    rowAdapter.setRow(row, index)
    return filters.every(({ filterFn, id, value }) => filterFn(rowAdapter, id, value))
  })
}

const sortRows = ({ rows, sorting, columnsById, sortingFns }) => {
  if (!sorting?.length || rows.length < 2) return rows

  const availableSorting = sorting
    .map(entry => ({ entry, column: columnsById.get(entry.id) }))
    .filter(({ column }) => column && column.enableSorting !== false)

  if (!availableSorting.length) return rows

  const columnInfo = availableSorting.map(({ entry, column }) => ({
    entry,
    column,
    sortUndefined: column.sortUndefined ?? 1,
    sortingFn:
      typeof column.sortingFn === "function"
        ? column.sortingFn
        : column.sortingFn === "auto" || !column.sortingFn
          ? getAutoSortingFn(rows, column)
          : sortingFns[column.sortingFn] || defaultSortingFns[column.sortingFn],
  }))
  const indexedRows = rows.map((row, index) => {
    const adapter = createRowAdapter(columnsById)
    adapter.setRow(row, index)
    return adapter
  })

  indexedRows.sort((a, b) => {
    for (let index = 0; index < columnInfo.length; index += 1) {
      const { entry, column, sortUndefined, sortingFn } = columnInfo[index]
      const aValue = a.getValue(entry.id)
      const bValue = b.getValue(entry.id)
      let result = 0

      if (sortUndefined && (aValue === undefined || bValue === undefined)) {
        if (sortUndefined === "first") return aValue === undefined ? -1 : 1
        if (sortUndefined === "last") return aValue === undefined ? 1 : -1
        result =
          aValue === undefined && bValue === undefined
            ? 0
            : aValue === undefined
              ? sortUndefined
              : -sortUndefined
      }

      if (result === 0) result = sortingFn(a, b, entry.id)
      if (result === 0) continue
      if (entry.desc) result *= -1
      if (column.invertSorting) result *= -1
      return result
    }

    return a.index - b.index
  })

  return indexedRows.map(({ original }) => original)
}

export default ({
  columns,
  columnFilters,
  data,
  expanded,
  filterRow,
  filterFns = {},
  getEstimatedRowHeight,
  getRowId,
  sorting,
  sortingFns = {},
}) => {
  const columnsById = getColumnsById(columns)
  const displayRows = []
  const displayIds = []
  const exportRows = []
  const exportIds = []
  const lastDisplayIndexById = new Map()
  const nearestDisplayIndexById = new Map()

  const forEachRow = (items, callback) => {
    items.forEach((row, index) => {
      callback(row, getRowId(row, index))
      if (row.children?.length) forEachRow(row.children, callback)
    })
  }

  const appendRows = (rows, visible, visibleAncestorIndex = -1) => {
    sortRows({ rows, sorting, columnsById, sortingFns }).forEach((row, index) => {
      const id = getRowId(row, index)
      exportRows.push(row)
      exportIds.push(id)
      let displayIndex = visibleAncestorIndex
      if (visible) {
        displayRows.push(row)
        displayIds.push(id)
        displayIndex = displayRows.length - 1
      }
      nearestDisplayIndexById.set(id, displayIndex)
      if (row.children?.length) {
        appendRows(
          row.children,
          visible && (expanded === true || Boolean(expanded?.[id])),
          displayIndex
        )
      }
      if (visible) lastDisplayIndexById.set(id, displayRows.length - 1)
    })
  }

  const columnFilteredRows = filterRows({ rows: data, columnFilters, columnsById, filterFns })
  appendRows(filterRow ? columnFilteredRows.filter(filterRow) : columnFilteredRows, true)

  const displayIndexById = new Map(displayIds.map((id, index) => [id, index]))

  return {
    forEachExportRow: callback => {
      for (let index = 0; index < exportRows.length; index += 1) {
        if (callback(exportRows[index], exportIds[index]) === false) return
      }
    },
    forEachRow: callback => forEachRow(data, callback),
    getDisplayIndex: (id, { leaf = false } = {}) =>
      (leaf ? lastDisplayIndexById : displayIndexById).get(id) ??
      nearestDisplayIndexById.get(id) ??
      -1,
    getEstimatedRowHeight: index => getEstimatedRowHeight?.(displayRows[index], index),
    getFlatRowCount: () => exportRows.length,
    getRow: index => displayRows[index],
    getRowCount: () => displayRows.length,
    getRowId: index => displayIds[index],
  }
}
