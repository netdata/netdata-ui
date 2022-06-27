import React, { useState } from "react"
import { storiesOf } from "@storybook/react"

import Table from "./base-table"
import NetdataTable from "./netdataTable"

import Box from "src/components/templates/box"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"

const colorFilter = {
  id: "colorFilter",
  options: [
    { value: "slate", label: "Slate", color: "#253858" },
    { value: "silver", label: "Silver", color: "#666666" },
  ],
  onChange: selected => {
    console.log(selected)
  },
  value: "",
}

const StoryTable = storiesOf("COMPONENTS|NetdaTable")

StoryTable.add("Base Table", () => {
  const [value, setValue] = useState()
  const filteringOptions = [{ ...colorFilter, onChange: value => setValue(value), value }]

  return (
    <Box width="800px">
      <Table filteringOptions={filteringOptions} handleSearch>
        <Table.Head>
          <Table.HeadRow>
            <Table.HeadCell>Column 1</Table.HeadCell>
            <Table.HeadCell>Column 2</Table.HeadCell>
            <Table.HeadCell>Column 3</Table.HeadCell>
            <Table.HeadCell>Column 4</Table.HeadCell>
            <Table.HeadCell>Column 5</Table.HeadCell>
          </Table.HeadRow>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>value 1</Table.Cell>
            <Table.Cell>value 2</Table.Cell>
            <Table.Cell>value 3</Table.Cell>
            <Table.Cell>value 4</Table.Cell>
            <Table.Cell>value 5</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Box>
  )
})

StoryTable.add("Simple Netdata Table", () => {
  const mockDataColumns = [
    { header: "Nodes", id: "nodes" },
    { id: "alerts", header: () => <Text>Alerts</Text> },
  ]

  const mockData = () => [
    { nodes: 10, alerts: 15 },
    { nodes: 11, alerts: 11 },
    { nodes: 23, alerts: 22 },
  ]
  return (
    <Box width="800px">
      <NetdataTable dataColumns={mockDataColumns} data={mockData()} />
    </Box>
  )
})

StoryTable.add("Filters at header cell", () => {
  const mockDataColumns = [
    { header: "Nodes", id: "nodes", enableFilter: true },
    {
      id: "alerts",
      header: () => <Text>Alerts</Text>,
      enableFilter: true,
      filterFn: (row, columnId, value) => {
        const { original } = row
        const rowValue = original[columnId]

        return rowValue.toString().includes(value.toString())
      },
    },
  ]

  const mockData = () => [
    { nodes: "node1", alerts: 15 },
    { nodes: "node2", alerts: 11 },
    { nodes: "node3", alerts: 22 },
  ]
  return (
    <Box width="800px">
      <NetdataTable dataColumns={mockDataColumns} data={mockData()} />
    </Box>
  )
})

StoryTable.add("Row selections", () => {
  const [selectedRows, onRowSelected] = useState([])
  const mockDataColumns = [
    { header: "Nodes", id: "nodes" },
    { id: "alerts", header: () => <Text>Alerts</Text> },
  ]

  const mockData = () => [
    { nodes: 10, alerts: 15 },
    { nodes: 11, alerts: 11 },
    { nodes: 23, alerts: 22 },
  ]
  return (
    <Box width="800px">
      <NetdataTable
        enableSelection
        dataColumns={mockDataColumns}
        data={mockData()}
        onRowSelected={onRowSelected}
      />
      <Flex column gap={2}>
        Selected Rows:
        {selectedRows.map(row => {
          return (
            <Flex gap={2} key={row}>
              {Object.keys(row).map(key => (
                <Box key={`${key}:${row[key]}`}>
                  {key}:{row[key]}
                </Box>
              ))}
            </Flex>
          )
        })}
      </Flex>
    </Box>
  )
})

StoryTable.add("Global Filters", () => {
  const mockDataColumns = [
    { header: "Nodes", id: "nodes" },
    { id: "alerts", header: () => <Text strong>Alerts</Text> },
    { id: "user", header: () => <Text strong>Users</Text> },
  ]

  const mockData = () => [
    { nodes: "node1", alerts: 15, user: "nic" },
    { nodes: "node2", alerts: 11, user: "alex" },
    { nodes: "node3", alerts: 22, user: "manolis" },
  ]

  const onGlobalSearchChange = value => {
    console.log(value)
  }

  return (
    <Box width="800px">
      <NetdataTable
        onGlobalSearchChange={onGlobalSearchChange}
        dataColumns={mockDataColumns}
        data={mockData()}
      />
    </Box>
  )
})

StoryTable.add("Sorting", () => {
  const mockDataColumns = [
    { header: "Nodes", id: "nodes" },
    { id: "alerts", header: () => <Text strong>Alerts</Text> },
    { id: "user", header: () => <Text strong>Users</Text> },
  ]

  const mockData = () => [
    { nodes: "node1", alerts: 15, user: "nic" },
    { nodes: "node2", alerts: 11, user: "alex" },
    { nodes: "node3", alerts: 22, user: "manolis" },
  ]

  return (
    <Box width="800px">
      <NetdataTable isSortingEnabled={true} dataColumns={mockDataColumns} data={mockData()} />
    </Box>
  )
})

StoryTable.add("Actions", () => {
  const handleAction = data => {
    console.log(data)
  }
  const actions = { delete: { handleAction }, info: { handleAction } }
  const mockDataColumns = [
    { header: "Nodes", id: "nodes" },
    { id: "alerts", header: () => <Text strong>Alerts</Text> },
    { id: "user", header: () => <Text strong>Users</Text> },
  ]

  const mockData = () => [
    { nodes: "node1", alerts: 15, user: "nic" },
    { nodes: "node2", alerts: 11, user: "alex" },
    { nodes: "node3", alerts: 22, user: "manolis" },
  ]

  return (
    <Box width="800px">
      <NetdataTable actions={actions} dataColumns={mockDataColumns} data={mockData()} />
    </Box>
  )
})
