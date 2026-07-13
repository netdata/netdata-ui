import { useCallback, useMemo, useRef, useState } from "react"
import { containsWindowRange, getBufferedWindowRange, getWindowPublication } from "./largeData"
import createLargeDataSource from "./createLargeDataSource"
import {
  getIsAllRowsSelected,
  getIsSomeRowsSelected,
  getNextRowSelection,
  getSelectedOriginalRows,
} from "./largeDataSelection"

export const augmentTableWithLargeData = (
  table,
  { source, rowSelection, onRowSelectionChange }
) => {
  table.largeDataSource = source
  table.forEachExportRow = source?.forEachExportRow

  if (!source?.forEachRow || !source?.forEachExportRow || !source?.getFlatRowCount) return

  table.getSelectedOriginalRows = () => getSelectedOriginalRows(source, rowSelection)
  table.getIsAllRowsSelected = () => getIsAllRowsSelected(source, rowSelection)
  table.getIsSomeRowsSelected = () => getIsSomeRowsSelected(source, rowSelection)
  table.toggleAllRowsSelected = value =>
    onRowSelectionChange(current => getNextRowSelection(source, current, value))
}

export default ({
  data,
  dataColumns,
  expanded,
  filterFns,
  getRowId,
  globalFilter,
  largeDataOptions,
  sorting,
}) => {
  const {
    enabled,
    filterRow,
    getEstimatedRowHeight,
    initialRowCount,
    sortingFns,
    source: providedSource,
  } = largeDataOptions || {}

  const [largeDataRange, setLargeDataRange] = useState(() => ({
    startIndex: 0,
    endIndex: initialRowCount || 50,
  }))
  const largeDataRangeRef = useRef(largeDataRange)
  largeDataRangeRef.current = largeDataRange

  const [largeDataColumnFilters, setLargeDataColumnFilters] = useState([])

  const largeDataSource = useMemo(() => {
    if (providedSource) return providedSource
    if (!enabled) return null
    if (!getRowId) throw new Error("Large-data Table requires getRowId")

    return createLargeDataSource({
      columns: dataColumns,
      columnFilters: largeDataColumnFilters,
      data,
      expanded,
      filterRow: globalFilter && filterRow ? row => filterRow(row, globalFilter) : undefined,
      filterFns,
      getEstimatedRowHeight,
      getRowId,
      sorting,
      sortingFns,
    })
  }, [
    data,
    dataColumns,
    enabled,
    expanded,
    filterFns,
    filterRow,
    getEstimatedRowHeight,
    getRowId,
    globalFilter,
    largeDataColumnFilters,
    providedSource,
    sorting,
    sortingFns,
  ])

  const largeDataPublication = useMemo(
    () => (largeDataSource ? getWindowPublication(largeDataSource, largeDataRange) : null),
    [largeDataSource, largeDataRange]
  )

  const onLargeDataRangeChange = useCallback(
    nextRange => {
      if (containsWindowRange(largeDataRangeRef.current, nextRange)) return

      const bufferedRange = getBufferedWindowRange(nextRange, largeDataSource.getRowCount())
      largeDataRangeRef.current = bufferedRange
      setLargeDataRange(bufferedRange)
    },
    [largeDataSource]
  )

  return {
    largeDataColumnFilters,
    largeDataPublication,
    largeDataSource,
    onLargeDataColumnFiltersChange: setLargeDataColumnFilters,
    onLargeDataRangeChange,
  }
}
