import React from "react"
import { useTable, useSortBy, useRowSelect } from "react-table"
import { UHeader } from "./components/UserHeader"

import { StyledTable, StyledThead, StyledRow } from "./styled"

function RTable({ columns, data, sortedBy = [], ...rest }: any) {
  const { getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy,
    useRowSelect
  )
  return (
    <StyledTable>
      <StyledThead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={i}>
            {headerGroup.headers.map(column => (
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
            <StyledRow {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              })}
            </StyledRow>
          )
        })}
      </tbody>
    </StyledTable>
  )
}

export function Table() {
  const columns = React.useMemo(() => UHeader, [])

  return (
    <RTable
      columns={columns}
      sortedBy={["options"]}
      data={[{ options: "andy", adding: "123" }, { options: "amy", adding: "123" }]}
    />
  )
}
