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
      <NetdataTable dataColumns={mockDataColumns} data={mockData()} onClickRow={() => {}} />
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
      <NetdataTable enableSorting dataColumns={mockDataColumns} data={mockData()} />
    </Box>
  )
})

StoryTable.add("Actions", () => {
  const handleAction = data => {
    console.log(data)
  }
  const rowActions = {
    delete: { handleAction },
    info: { handleAction },
    replace: {
      handleAction,
    },
  }
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
      <NetdataTable rowActions={rowActions} dataColumns={mockDataColumns} data={mockData()} />
    </Box>
  )
})

StoryTable.add("Bulk Actions", () => {
  const handleDelete = data => {
    console.log("Delete has been clicked", data)
  }

  const handleDownload = data => {
    console.log("Download has been clicked", data)
  }

  const handleToggleAlarms = data => {
    console.log("Toggle alarm has been clicked", data)
  }

  const bulkActions = {
    delete: { handleAction: handleDelete },
    download: { handleAction: handleDownload },
    toggleAlarm: { handleAction: handleToggleAlarms },
  }

  const mockDataColumns = [
    { header: "Nodes", id: "nodes" },
    { id: "alerts", header: () => <Text strong>Alerts</Text> },
    { id: "user", header: () => <Text strong>Users</Text> },
  ]

  const mockData = () => [
    { nodes: "node1", alerts: 15, user: "nic" },
    { nodes: "node2", alerts: 11, user: "alex" },
    { nodes: "node34", alerts: 22, user: "manolis" },
    { nodes: "node5", alerts: 15, user: "achile" },
    { nodes: "node6", alerts: 11, user: "barba" },
    { nodes: "node7", alerts: 22, user: "decker" },
  ]

  return (
    <Box width="800px">
      <NetdataTable
        bulkActions={bulkActions}
        enableSelection
        dataColumns={mockDataColumns}
        data={mockData()}
      />
    </Box>
  )
})

StoryTable.add("Pagination", () => {
  const paginationOptions = { pageIndex: 0, pageSize: 2 }
  const mockDataColumns = [
    { header: "Nodes", id: "nodes" },
    { id: "alerts", header: () => <Text strong>Alerts</Text> },
    { id: "user", header: () => <Text strong>Users</Text> },
  ]

  const mockData = () => [
    { nodes: "node1", alerts: 15, user: "nic" },
    { nodes: "node2", alerts: 11, user: "alex" },
    { nodes: "node34", alerts: 22, user: "manolis" },
    { nodes: "node5", alerts: 15, user: "achile" },
    { nodes: "node6", alerts: 11, user: "barba" },
    { nodes: "node7", alerts: 22, user: "decker" },
  ]

  return (
    <Box width="800px">
      <NetdataTable
        paginationOptions={paginationOptions}
        enablePagination={true}
        dataColumns={mockDataColumns}
        data={mockData()}
      />
    </Box>
  )
})

StoryTable.add("Full Table functionallity", () => {
  const onGlobalSearchChange = value => {
    console.log(value)
  }
  const paginationOptions = { pageIndex: 0, pageSize: 5 }

  const handleDelete = data => {
    console.log("Delete has been clicked", data)
  }

  const handleDownload = data => {
    console.log("Download has been clicked", data)
  }

  const handleToggleAlarms = data => {
    console.log("Toggle alarm has been clicked", data)
  }

  const handleInfo = data => {
    console.log("Info Clicked", data)
  }

  const bulkActions = {
    delete: { handleAction: handleDelete },
    download: { handleAction: handleDownload },
    toggleAlarm: { handleAction: handleToggleAlarms },
    addEntry: {
      handleAction: () => {
        console.log("clicked")
      },
    },
  }

  const rowActions = {
    replace: {
      handleAction: handleDelete,
      isDisabled: row => row.disabled,
    },
    delete: {
      handleAction: handleDelete,
      isDisabled: row => row.disabled,
    },
    info: { handleAction: handleInfo },
  }

  const mockDataColumns = [
    { header: "Nodes", id: "nodes", enableFilter: true },
    {
      id: "alerts",
      header: () => <Text>Alerts</Text>,
      enableFilter: true,
      filterFn: "comparison",
      meta: { filter: { component: "comparison" } },
    },
    {
      header: "user",
      id: "user",
      enableFilter: true,
      enableSorting: false,
      cell: ({ getValue }) => <Text strong>{getValue()}</Text>,
    },
    {
      header: "status",
      id: "status",
      enableFilter: true,
      filterFn: "select",
      size: 80,
      maxSize: 80,
      minSize: 80,
      cell: ({ getValue }) => <Text strong>{getValue()}</Text>,
      meta: {
        tooltip: "Information",
        filter: {
          component: "select",
          isMulti: true,
          options: [
            { value: "offline", label: "Offline" },
            { value: "online", label: "Online" },
            { value: "stale", label: "Stale" },
          ],
        },
      },
    },
    {
      header: "Untouchable",
      id: "untouchable",
      enableFilter: true,
      enableSorting: false,
      filterFn: "select",
      cell: ({ getValue }) => <Text strong>{getValue()}</Text>,
      meta: {
        filter: {
          component: "select",
          options: [
            { value: "true", label: "Yes" },
            { value: "false", label: "No" },
          ],
        },
      },
    },
  ]

  const mockData = () => [
    {
      nodes: "node8",
      alerts: 15,
      user: "mitsos",
      disabled: true,
      status: "stale",
      untouchable: "true",
    },
    { nodes: "node9", alerts: 11, user: "koukouroukou", status: "offline", untouchable: "true" },
    { nodes: "node10", alerts: 22, user: "reena", status: "online", untouchable: "true" },
    { nodes: "node1", alerts: 15, user: "nic", status: "online", untouchable: "true" },
    { nodes: "node2", alerts: 11, user: "alex", status: "offline", untouchable: "true" },
    { nodes: "node34", alerts: 22, user: "manolis", status: "offline", untouchable: "true" },
    { nodes: "node5", alerts: 15, user: "achile", status: "stale", untouchable: "true" },
    { nodes: "node6", alerts: 11, user: "barba", status: "stale", untouchable: "false" },
    { nodes: "node7", alerts: 22, user: "decker", status: "online", untouchable: "false" },
  ]

  return (
    <NetdataTable
      onClickRow={({ data, table, fullRow }) => {
        console.log(data, table, fullRow)
      }}
      sortBy={[{ id: "nodes", desc: false }]}
      onGlobalSearchChange={onGlobalSearchChange}
      enableSorting
      paginationOptions={paginationOptions}
      enablePagination
      rowActions={rowActions}
      bulkActions={bulkActions}
      enableSelection
      dataColumns={mockDataColumns}
      data={mockData()}
      testPrefixCallback={row => row.nodes}
      disableClickRow={({ data }) => data.alerts > 15}
    />
  )
})
