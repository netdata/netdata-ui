import React, { useState } from "react"
import Table from "./table"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"

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

export const Basic = () => {
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
}

export const SimpleTable = {
  component: () => {
    const mockDataColumns = [
      { header: "Nodes", id: "nodes", cell: ({ getValue }) => getValue() },
      { id: "alerts", header: () => <Text>Alerts</Text>, cell: ({ getValue }) => getValue() },
    ]

    const mockData = () => [
      { nodes: 10, alerts: 15 },
      { nodes: 11, alerts: 11 },
      { nodes: 23, alerts: 22 },
    ]
    return (
      <Box width="800px">
        <Table dataColumns={mockDataColumns} data={mockData()} onClickRow={() => {}} />
      </Box>
    )
  },
}

export const Filters = {
  component: () => {
    const mockDataColumns = [
      {
        header: "Nodes",
        id: "nodes",
        enableColumnFilter: true,
        cell: ({ getValue }) => getValue(),
      },
      {
        id: "alerts",
        header: () => <Text>Alerts</Text>,
        enableColumnFilter: true,
        cell: ({ getValue }) => getValue(),
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
        <Table dataColumns={mockDataColumns} data={mockData()} />
      </Box>
    )
  },
}

export const RowSelections = {
  component: () => {
    const [selectedRows, onRowSelected] = useState([])
    const mockDataColumns = [
      { header: "Nodes", id: "nodes", cell: ({ getValue }) => getValue() },
      { id: "alerts", header: () => <Text>Alerts</Text>, cell: ({ getValue }) => getValue() },
    ]

    const mockData = () => [
      { nodes: 10, alerts: 15 },
      { nodes: 11, alerts: 11 },
      { nodes: 23, alerts: 22 },
    ]
    return (
      <Box width="800px">
        <Table
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
  },
}

export const GlobalFilters = {
  component: () => {
    const mockDataColumns = [
      { header: "Nodes", id: "nodes", cell: ({ getValue }) => getValue() },
      {
        id: "alerts",
        header: () => <Text strong>Alerts</Text>,
        cell: ({ getValue }) => getValue(),
      },
      { id: "user", header: () => <Text strong>Users</Text>, cell: ({ getValue }) => getValue() },
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
        <Table
          title="Table Title"
          onGlobalSearchChange={onGlobalSearchChange}
          dataColumns={mockDataColumns}
          data={mockData()}
        />
      </Box>
    )
  },
}

export const Expanding = {
  component: () => {
    const mockDataColumns = [
      { header: "Nodes", id: "nodes", cell: ({ getValue }) => getValue() },
      {
        id: "alerts",
        header: () => <Text strong>Alerts</Text>,
        cell: ({ getValue }) => getValue(),
      },
      { id: "user", header: () => <Text strong>Users</Text>, cell: ({ getValue }) => getValue() },
    ]

    const mockData = () => [
      {
        nodes: "node1",
        alerts: 15,
        user: "nic",
        children: [
          { nodes: "node4", alerts: 5, user: "nic" },
          { nodes: "node5", alerts: 6, user: "nic" },
          { nodes: "node6", alerts: 4, user: "nic" },
        ],
      },
      {
        nodes: "node2",
        alerts: 11,
        user: "alex",
        children: [
          { nodes: "node7", alerts: 1, user: "alex" },
          { nodes: "node8", alerts: 2, user: "alex" },
          { nodes: "node9", alerts: 6, user: "alex" },
          { nodes: "node10", alerts: 2, user: "alex" },
        ],
      },
      { nodes: "node3", alerts: 22, user: "manolis" },
    ]

    return (
      <Box width="800px">
        <Table
          enableExpanding
          dataColumns={mockDataColumns}
          data={mockData()}
          onClickRow={({ data, table, fullRow }) => {
            // console.log(data, table, fullRow)
            console.log(fullRow.getCanExpand())
            fullRow.toggleExpanded()
          }}
        />
      </Box>
    )
  },
}

export const Sorting = {
  component: () => {
    const mockDataColumns = [
      { header: "Nodes", id: "nodes", cell: ({ getValue }) => getValue() },
      {
        id: "alerts",
        header: () => <Text strong>Alerts</Text>,
        cell: ({ getValue }) => getValue(),
      },
      { id: "user", header: () => <Text strong>Users</Text>, cell: ({ getValue }) => getValue() },
    ]

    const mockData = () => [
      { nodes: "node1", alerts: 15, user: "nic" },
      { nodes: "node2", alerts: 11, user: "alex" },
      { nodes: "node3", alerts: 22, user: "manolis" },
    ]

    return (
      <Box width="800px">
        <Table enableSorting dataColumns={mockDataColumns} data={mockData()} />
      </Box>
    )
  },
}

export const Actions = {
  component: () => {
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
      { header: "Nodes", id: "nodes", cell: ({ getValue }) => getValue() },
      {
        id: "alerts",
        header: () => <Text strong>Alerts</Text>,
        cell: ({ getValue }) => getValue(),
      },
      { id: "user", header: () => <Text strong>Users</Text>, cell: ({ getValue }) => getValue() },
    ]

    const mockData = () => [
      { nodes: "node1", alerts: 15, user: "nic" },
      { nodes: "node2", alerts: 11, user: "alex" },
      { nodes: "node3", alerts: 22, user: "manolis" },
    ]

    return (
      <Box width="800px">
        <Table rowActions={rowActions} dataColumns={mockDataColumns} data={mockData()} />
      </Box>
    )
  },
}

export const BulkActions = {
  component: () => {
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
      { header: "Nodes", id: "nodes", cell: ({ getValue }) => getValue() },
      {
        id: "alerts",
        header: () => <Text strong>Alerts</Text>,
        cell: ({ getValue }) => getValue(),
      },
      { id: "user", header: () => <Text strong>Users</Text>, cell: ({ getValue }) => getValue() },
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
        <Table
          bulkActions={bulkActions}
          enableSelection
          dataColumns={mockDataColumns}
          data={mockData()}
        />
      </Box>
    )
  },
}

export const Pagination = {
  component: () => {
    const paginationOptions = { pageIndex: 0, pageSize: 2 }
    const mockDataColumns = [
      { header: "Nodes", id: "nodes", cell: ({ getValue }) => getValue() },
      {
        id: "alerts",
        header: () => <Text strong>Alerts</Text>,
        cell: ({ getValue }) => getValue(),
      },
      { id: "user", header: () => <Text strong>Users</Text>, cell: ({ getValue }) => getValue() },
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
        <Table
          paginationOptions={paginationOptions}
          enablePagination={true}
          dataColumns={mockDataColumns}
          data={mockData()}
        />
      </Box>
    )
  },
}

export const FullTable = {
  component: () => {
    const onGlobalSearchChange = value => {
      console.log(value)
    }

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
      addEntry: {
        handleAction: () => {
          console.log("clicked")
        },
      },
      delete: { handleAction: handleDelete },
      download: { handleAction: handleDownload },
      toggleAlarm: { handleAction: handleToggleAlarms },
    }

    const rowActions = {
      replace: {
        handleAction: () => {
          console.log("replaced!")
        },
        isDisabled: row => row.disabled,
      },
      delete: {
        handleAction: handleDelete,
        isDisabled: row => row.disabled,
      },
      info: { handleAction: handleInfo },
    }

    const mockDataColumns = [
      {
        accessorKey: "nodes",

        header: "Nodes",
        id: "nodes",
        enableColumnFilter: false,
        cell: ({ getValue }) => getValue(),
        enableHiding: false,
        meta: {
          tooltip: "Information",
        },
      },
      {
        accessorKey: "alerts",
        id: "alerts",
        name: "Alerts",
        header: () => <Text strong>Alerts</Text>,
        enableColumnFilter: true,
        filterFn: "comparison",
        meta: { filter: { component: "comparison" } },
        cell: ({ getValue }) => getValue(),
        size: 340,
      },
      {
        accessorKey: "user",

        header: "User",
        id: "user",
        name: "User",
        enableColumnFilter: true,
        enableSorting: false,
        cell: ({ getValue }) => getValue(),
        size: 200,
      },
      {
        accessorKey: "status",
        header: "Status",
        id: "status",
        name: "Status",
        enableColumnFilter: true,
        filterFn: "select",
        size: 200,

        cell: ({ getValue }) => getValue(),
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
        accessorKey: "untouchable",
        header: "Untouchable",
        id: "untouchable",
        enableColumnFilter: true,
        enableSorting: false,
        filterFn: "select",
        size: 200,

        cell: ({ getValue }) => getValue(),
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
        nodes: "node31",
        alerts: 15,
        user: "mitsos",
        disabled: true,
        status: "stale",
        untouchable: "true",
      },
      { nodes: "node0", alerts: 11, user: "koukouroukou", status: "offline", untouchable: "true" },
      { nodes: "node1", alerts: 22, user: "reena", status: "online", untouchable: "true" },
      { nodes: "node1", alerts: 15, user: "nic", status: "online", untouchable: "true" },
      { nodes: "node2", alerts: 11, user: "alex", status: "offline", untouchable: "true" },
      { nodes: "node3", alerts: 22, user: "manolis", status: "offline", untouchable: "true" },
      { nodes: "node4", alerts: 15, user: "achile", status: "stale", untouchable: "true" },
      { nodes: "node5", alerts: 11, user: "barba", status: "stale", untouchable: "false" },
      { nodes: "node6", alerts: 22, user: "decker", status: "online", untouchable: "false" },
      { nodes: "node7", alerts: 11, user: "koukouroukou", status: "offline", untouchable: "true" },
      { nodes: "node8", alerts: 22, user: "reena", status: "online", untouchable: "true" },
      { nodes: "node9", alerts: 15, user: "nic", status: "online", untouchable: "true" },
      { nodes: "node10", alerts: 11, user: "alex", status: "offline", untouchable: "true" },
      { nodes: "node11", alerts: 22, user: "manolis", status: "offline", untouchable: "true" },
      { nodes: "node12", alerts: 15, user: "achile", status: "stale", untouchable: "true" },
      { nodes: "node13", alerts: 11, user: "barba", status: "stale", untouchable: "false" },
      { nodes: "node14", alerts: 22, user: "decker", status: "online", untouchable: "false" },
      { nodes: "node15", alerts: 11, user: "koukouroukou", status: "offline", untouchable: "true" },
      { nodes: "node16", alerts: 22, user: "reena", status: "online", untouchable: "true" },
      { nodes: "node17", alerts: 15, user: "nic", status: "online", untouchable: "true" },
      { nodes: "node18", alerts: 11, user: "alex", status: "offline", untouchable: "true" },
      { nodes: "node19", alerts: 22, user: "manolis", status: "offline", untouchable: "true" },
      { nodes: "node20", alerts: 15, user: "achile", status: "stale", untouchable: "true" },
      { nodes: "node21", alerts: 11, user: "barba", status: "stale", untouchable: "false" },
      { nodes: "node22", alerts: 22, user: "decker", status: "online", untouchable: "false" },
      { nodes: "node23", alerts: 11, user: "koukouroukou", status: "offline", untouchable: "true" },
      { nodes: "node24", alerts: 22, user: "reena", status: "online", untouchable: "true" },
      { nodes: "node25", alerts: 15, user: "nic", status: "online", untouchable: "true" },
      { nodes: "node26", alerts: 11, user: "alex", status: "offline", untouchable: "true" },
      { nodes: "node27", alerts: 22, user: "manolis", status: "offline", untouchable: "true" },
      { nodes: "node28", alerts: 15, user: "achile", status: "stale", untouchable: "true" },
      { nodes: "node29", alerts: 11, user: "barba", status: "stale", untouchable: "false" },
      { nodes: "node30", alerts: 22, user: "decker", status: "online", untouchable: "false" },
    ]

    return (
      <Box height="800px" width="1200px">
        <Table
          onClickRow={({ data, table, fullRow }) => {
            console.log(data, table, fullRow)
          }}
          groupByColumnIds={["alerts"]}
          enableColumnPinning
          enableResizing
          sortBy={[{ id: "nodes", desc: false }]}
          onGlobalSearchChange={onGlobalSearchChange}
          enableSorting
          rowActions={rowActions}
          bulkActions={bulkActions}
          enableSelection
          dataColumns={mockDataColumns}
          data={mockData()}
          testPrefixCallback={row => row.nodes}
          disableClickRow={({ data }) => data.alerts > 15}
          enableColumnVisibility
          columnPinningOptions={{ left: ["checkbox", "nodes"] }}
        />
      </Box>
    )
  },
}

export const Pinning = {
  component: () => {
    const mockDataColumns = [
      {
        accessorKey: "nodes",
        header: "Nodes",
        id: "nodes",
        cell: ({ getValue }) => getValue(),
        enableHiding: false,
      },
      {
        accessorKey: "alerts",
        id: "alerts",
        header: () => <Text>Alerts</Text>,
        cell: ({ getValue }) => getValue(),
        size: 340,
      },
      {
        accessorKey: "user",
        header: "user",
        id: "user",
        cell: ({ getValue }) => getValue(),
        size: 200,
      },
      {
        accessorKey: "status",
        header: "status",
        id: "status",
        size: 200,
        cell: ({ getValue }) => getValue(),
      },
      {
        accessorKey: "untouchable",
        header: "Untouchable",
        id: "untouchable",
        size: 200,
        cell: ({ getValue }) => getValue(),
      },
    ]

    const mockData = () => [
      {
        nodes: "node31",
        alerts: 15,
        user: "mitsos",
        disabled: true,
        status: "stale",
        untouchable: "true",
      },
      {
        nodes:
          "node0, node0, node0, node0, node0, node0, node0, node0, node0, node0, node0, node0, node0, node0, node0, node0",
        alerts: 11,
        user: "koukouroukou, koukouroukou, koukouroukou, koukouroukou",
        status: "offline",
        untouchable: "true",
      },
      { nodes: "node1", alerts: 22, user: "reena", status: "online", untouchable: "true" },
      { nodes: "node1", alerts: 15, user: "nic", status: "online", untouchable: "true" },
      { nodes: "node2", alerts: 11, user: "alex", status: "offline", untouchable: "true" },
      { nodes: "node3", alerts: 22, user: "manolis", status: "offline", untouchable: "true" },
      { nodes: "node4", alerts: 15, user: "achile", status: "stale", untouchable: "true" },
      { nodes: "node5", alerts: 11, user: "barba", status: "stale", untouchable: "false" },
      { nodes: "node6", alerts: 22, user: "decker", status: "online", untouchable: "false" },
      { nodes: "node7", alerts: 11, user: "koukouroukou", status: "offline", untouchable: "true" },
      { nodes: "node8", alerts: 22, user: "reena", status: "online", untouchable: "true" },
      { nodes: "node9", alerts: 15, user: "nic", status: "online", untouchable: "true" },
      { nodes: "node10", alerts: 11, user: "alex", status: "offline", untouchable: "true" },
      { nodes: "node11", alerts: 22, user: "manolis", status: "offline", untouchable: "true" },
      { nodes: "node12", alerts: 15, user: "achile", status: "stale", untouchable: "true" },
      { nodes: "node13", alerts: 11, user: "barba", status: "stale", untouchable: "false" },
      { nodes: "node14", alerts: 22, user: "decker", status: "online", untouchable: "false" },
      { nodes: "node15", alerts: 11, user: "koukouroukou", status: "offline", untouchable: "true" },
      { nodes: "node16", alerts: 22, user: "reena", status: "online", untouchable: "true" },
      { nodes: "node17", alerts: 15, user: "nic", status: "online", untouchable: "true" },
      { nodes: "node18", alerts: 11, user: "alex", status: "offline", untouchable: "true" },
      { nodes: "node19", alerts: 22, user: "manolis", status: "offline", untouchable: "true" },
      { nodes: "node20", alerts: 15, user: "achile", status: "stale", untouchable: "true" },
      { nodes: "node21", alerts: 11, user: "barba", status: "stale", untouchable: "false" },
      { nodes: "node22", alerts: 22, user: "decker", status: "online", untouchable: "false" },
      { nodes: "node23", alerts: 11, user: "koukouroukou", status: "offline", untouchable: "true" },
      { nodes: "node24", alerts: 22, user: "reena", status: "online", untouchable: "true" },
      { nodes: "node25", alerts: 15, user: "nic", status: "online", untouchable: "true" },
      { nodes: "node26", alerts: 11, user: "alex", status: "offline", untouchable: "true" },
      { nodes: "node27", alerts: 22, user: "manolis", status: "offline", untouchable: "true" },
      { nodes: "node28", alerts: 15, user: "achile", status: "stale", untouchable: "true" },
      { nodes: "node29", alerts: 11, user: "barba", status: "stale", untouchable: "false" },
      { nodes: "node30", alerts: 22, user: "decker", status: "online", untouchable: "false" },
    ]

    const handleDelete = data => {
      console.log("Delete has been clicked", data)
    }

    const rowActions = {
      delete: {
        handleAction: handleDelete,
        isDisabled: row => row.disabled,
      },
    }

    const columnPinning = { left: ["nodes"], right: ["actions"] }

    return (
      <Box height="500px" width="1000px">
        <Table
          dataColumns={mockDataColumns}
          data={mockData()}
          rowActions={rowActions}
          columnPinning={columnPinning}
          enableColumnPinning={true}
        />
      </Box>
    )
  },
}

export default {
  component: Table,
}
