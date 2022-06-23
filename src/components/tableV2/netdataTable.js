import React, { useMemo } from "react"

import Table from "./base-table"

import {
  createTable,
  useTableInstance,
  getCoreRowModel,
  getFilteredRowModel,
} from "./react-table.js"

import { Icon } from "src/components/icon"
import Box from "src/components/templates/box"

import SearchInput from "src/components/search"

const table = createTable()

/**
 *
 * @param {object} dataColumns - Display column options
 * @param {object} columnOptions.header -
 * @param {object} columnOptions.cell
 *
 *
 */

const NetdataTable = ({ dataColumns, data }) => {
  const makeDataColumns = useMemo(() => {
    if (!dataColumns || dataColumns.length < 1) return []
    return dataColumns.map(({ header, id, cell, enableFilter = false }, index) => {
      if (!id) throw new Error(`Please provide id  at ${index}`)

      return table.createDataColumn(id, {
        ...(cell && { cell: typeof cell === "function" ? props => cell(props) : cell }),
        ...(header && { header: typeof header === "function" ? () => header() : header }),
        footer: props => props.column.id,
        enableColumnFilter: enableFilter,
      })
    })
  }, [dataColumns])

  const instance = useTableInstance(table, {
    columns: makeDataColumns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  const headers = instance.getFlatHeaders()

  return (
    <Table>
      <Table.Head>
        <Table.HeadRow>
          {headers.map(({ id, colSpan, renderHeader, isPlaceholder, column }) => (
            <Table.HeadCell colSpan={colSpan} key={id}>
              {isPlaceholder ? null : renderHeader()}
              {column.getCanFilter() ? (
                <div>
                  <Filter column={column} />
                </div>
              ) : null}
            </Table.HeadCell>
          ))}
        </Table.HeadRow>
      </Table.Head>
      <Table.Body>
        {instance.getRowModel().rows.map(row => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map(cell => (
              <Table.Cell key={cell.id}>{cell.renderCell()}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

const Filter = ({ column }) => {
  const columnFilterValue = column.getFilterValue()

  return (
    <Box
      as={SearchInput}
      width={{ max: 50 }}
      value={columnFilterValue ?? ""}
      placeholder={"...Search"}
      iconRight={<Icon name="magnify" />}
      onChange={e => column.setFilterValue(e.target.value)}
    ></Box>
  )
}

export default NetdataTable
