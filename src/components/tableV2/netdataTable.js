import React, { useMemo } from "react"
import { Text } from "src/components/typography"

import Table from "./base-table"

import { createTable, useTableInstance, getCoreRowModel } from "./react-table.js"

const table = createTable()

/**
 *
 * @param {object} dataColumns - Display column options
 * @param {object} columnOptions.header -
 * @param {object} columnOptions.cell
 *
 *
 */

const mockDataColumns = [
  { header: "Nodes", id: "nodes" },
  { id: "alerts", header: () => <Text>Alerts</Text> },
]

const mockData = () => [
  { nodes: 10, alerts: 15 },
  { nodes: 11, alerts: 11 },
  { nodes: 23, alerts: 22 },
]

const NetdataTable = ({ dataColumns = mockDataColumns }) => {
  const makeDataColumns = useMemo(() => {
    if (!dataColumns || dataColumns.length < 1) return []
    return dataColumns.map(({ header, id, cell }, index) => {
      if (!id) throw new Error(`Please provide id  at ${index}`)

      return table.createDataColumn(id, {
        ...(cell && { cell: typeof cell === "function" ? props => cell(props) : cell }),
        ...(header && { header: typeof header === "function" ? () => header() : header }),
        footer: props => props.column.id,
      })
    })
  }, [dataColumns])

  const instance = useTableInstance(table, {
    columns: makeDataColumns,
    data: mockData(),
    getCoreRowModel: getCoreRowModel(),
  })

  debugger

  const headers = instance.getFlatHeaders()

  return (
    <Table>
      <Table.Head>
        <Table.HeadRow>
          {headers.map(({ id, colSpan, renderHeader, isPlaceholder }) => (
            <Table.HeadCell colSpan={colSpan} key={id}>
              {isPlaceholder ? null : renderHeader()}
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

export default NetdataTable
