import React, { useEffect } from "react"
import { useTable, useSortBy, useRowSelect, ColumnInstance, Row } from "react-table"
import { StyledTable, StyledThead } from "./styled"

interface TablePropsT<T, RT = any> {
  selectedItemsClb?: (items: T[]) => T[] | void
  columns: RT
  data: T[]
  sortedBy?: string[]
}

function RTable<T extends object>({
  columns,
  data,
  sortedBy = [],
  selectedItemsClb,
}: TablePropsT<T>) {
  // @ts-ignore
  const { getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows, ...rest } = useTable(
    { columns, data },
    useSortBy,
    useRowSelect
  )
  useEffect(() => {
    if (selectedItemsClb) {
      selectedItemsClb(selectedFlatRows.map((r: Row<T>) => r.original))
    }
  }, [selectedFlatRows])

  return (
    <StyledTable>
      <StyledThead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i}>
            {headerGroup.headers.map((column: ColumnInstance<typeof columns>) => (
              <th
                {...column.getHeaderProps(
                  // @ts-ignore
                  sortedBy.includes(column.id) && column.getSortByToggleProps()
                )}
              >
                {column.render("Header", { ...rest })}
              </th>
            ))}
          </tr>
        ))}
      </StyledThead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell", { ...rest })}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </StyledTable>
  )
}

export function Table<T extends object>({
  selectedItemsClb,
  data,
  sortedBy,
  columns,
}: TablePropsT<T>) {
  const cahedColumns = React.useMemo<typeof columns>(() => columns, [])

  return (
    <RTable<T>
      selectedItemsClb={selectedItemsClb}
      columns={cahedColumns}
      sortedBy={sortedBy}
      data={data}
    />
  )
}
