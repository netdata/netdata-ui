import React, { useState } from "react"
import Table from "./table"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"

export const SimpleTable = () => {
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
}

export const Filters = () => {
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
}

export const RowSelections = () => {
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
}

export const GlobalFilters = () => {
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
}

export const Expanding = () => {
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
        onClickRow={({ fullRow }) => {
          console.log(fullRow.getCanExpand())
          fullRow.toggleExpanded()
        }}
      />
    </Box>
  )
}

export const Sorting = () => {
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
}

export const Actions = () => {
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
}

export const BulkActions = () => {
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
}

export const Pagination = () => {
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
}

export const FullTable = () => {
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
    <Box height="100vh" width="100vw">
      <Table
        onClickRow={({ data, table, fullRow }) => {
          console.log(data, table, fullRow)
        }}
        groupByColumnIds={["alerts"]}
        enableColumnPinning
        columnPinning={{ right: ["actions"], left: ["checkbox", "nodes"] }}
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
      />
    </Box>
  )
}

export const ColumnReordering = () => {
  const [columnOrder, setColumnOrder] = useState([])

  const mockDataColumns = [
    { header: "Nodes", id: "nodes", cell: ({ getValue }) => getValue() },
    { id: "alerts", header: () => <Text>Alerts</Text>, cell: ({ getValue }) => getValue() },
    { id: "user", header: "User", cell: ({ getValue }) => getValue() },
    { id: "status", header: "Status", cell: ({ getValue }) => getValue() },
  ]

  const mockData = () => [
    { nodes: "node1", alerts: 15, user: "nic", status: "online" },
    { nodes: "node2", alerts: 11, user: "alex", status: "offline" },
    { nodes: "node3", alerts: 22, user: "manolis", status: "stale" },
  ]

  return (
    <Box width="800px">
      <Text>
        Drag column headers to reorder columns. Current order: {columnOrder.join(", ") || "default"}
      </Text>
      <Table
        enableColumnReordering
        columnOrder={columnOrder}
        onColumnOrderChange={setColumnOrder}
        dataColumns={mockDataColumns}
        data={mockData()}
      />
    </Box>
  )
}

export const ColumnReorderingWithPinning = () => {
  const [columnOrder, setColumnOrder] = useState([])

  const handleDelete = data => {
    console.log("Delete has been clicked", data)
  }

  const rowActions = {
    delete: {
      handleAction: handleDelete,
    },
  }

  const columnPinning = { left: ["checkbox", "nodes"], right: ["actions"] }

  const mockDataColumns = [
    { header: "Nodes", id: "nodes", cell: ({ getValue }) => getValue() },
    { id: "alerts", header: () => <Text>Alerts</Text>, cell: ({ getValue }) => getValue() },
    { id: "user", header: "User", cell: ({ getValue }) => getValue() },
    { id: "status", header: "Status", cell: ({ getValue }) => getValue() },
    { id: "region", header: "Region", cell: ({ getValue }) => getValue() },
  ]

  const mockData = () => [
    { nodes: "node1", alerts: 15, user: "nic", status: "online", region: "EU" },
    { nodes: "node2", alerts: 11, user: "alex", status: "offline", region: "US" },
    { nodes: "node3", alerts: 22, user: "manolis", status: "stale", region: "APAC" },
  ]

  return (
    <Box width="1000px">
      <Text>
        Columns can only be reordered within their pinned group. Checkbox and Actions columns are
        not draggable.
      </Text>
      <Table
        enableColumnReordering
        enableColumnPinning
        enableSelection
        columnPinning={columnPinning}
        columnOrder={columnOrder}
        onColumnOrderChange={setColumnOrder}
        rowActions={rowActions}
        dataColumns={mockDataColumns}
        data={mockData()}
      />
    </Box>
  )
}

export const Pinning = props => {
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
        {...props}
        rowActions={rowActions}
        columnPinning={columnPinning}
        enableColumnPinning={true}
      />
    </Box>
  )
}

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

const prop = (category, description, type, defaultValue, control = false) => ({
  description,
  control,
  table: {
    category,
    type: { summary: type },
    ...(defaultValue === undefined ? {} : { defaultValue: { summary: defaultValue } }),
  },
})

const argTypes = {
  // Data
  data: prop("Data", "Array of row objects. Rows with a `children` array become expandable sub-rows.", "Array<object>", undefined, "object"),
  dataColumns: prop("Data", "Column definitions (TanStack `ColumnDef`: `id`, `header`, `cell`, `accessorKey`, `size`, `enableColumnFilter`, `filterFn`).", "Array<ColumnDef>", undefined, "object"),
  getRowId: prop("Data", "Returns a stable id for a row. Required in large-data mode; recommended whenever selection or expansion is controlled.", "(row, index) => string"),
  title: prop("Data", "Title rendered in the table header.", "ReactNode", undefined, "text"),
  onSearch: prop("Data", "Shows the search field in the header and is called with the query. The built-in filter matches any string column.", "(value) => void"),
  globalFilter: prop("Data", "Initial search query.", "string", '""', "text"),
  globalFilterFn: prop("Data", "Custom global filter function.", "FilterFnOption", "includesString"),
  enableCustomSearch: prop("Data", "Skips the built-in filtering so the search query can be applied to `data` outside the table.", "boolean", "undefined", "boolean"),
  testPrefix: prop("Data", "Prefix for the `data-testid` attributes of the table parts.", "string", '""', "text"),
  testPrefixCallback: prop("Data", "Per-row test id generator, used when the id depends on row values.", "(rowData) => string"),
  dataGa: prop("Data", "Value for the `data-ga` attributes of header controls.", "string", undefined, "text"),
  tableRef: prop("Data", "Ref that receives the TanStack table instance.", "MutableRefObject<Table>"),

  // Selection
  enableSelection: prop("Selection", "Adds a checkbox column (and a select-all checkbox in the header).", "boolean", "undefined", "boolean"),
  singleRowSelection: prop("Selection", "Renders a radio-style cell so only one row can be selected.", "boolean", "undefined", "boolean"),
  enableSubRowSelection: prop("Selection", "Selecting a parent row also selects its sub-rows.", "boolean", "undefined", "boolean"),
  rowSelection: prop("Selection", "Selected rows keyed by row id, e.g. `{ \"prod-web-02\": true }`.", "Record<string, boolean>", "{}", "object"),
  onRowSelectionChange: prop("Selection", "Called with the new selection map.", "(rowSelection) => void"),
  onRowSelected: prop("Selection", "Called with the selected rows' data when the selection changes.", "(rows) => void"),

  // Sorting
  enableSorting: prop("Sorting", "Makes column headers sortable. Hold Shift, Ctrl or Cmd to sort by several columns.", "boolean", "undefined", "boolean"),
  sortBy: prop("Sorting", "Initial/controlled sorting state.", "Array<{ id: string, desc?: boolean }>", undefined, "object"),
  onSortingChange: prop("Sorting", "Called with the new sorting state.", "(sorting) => void"),
  manualSorting: prop("Sorting", "Skips client-side sorting, for server-side sorted data.", "boolean", "false", "boolean"),
  coloredSortedColumn: prop("Sorting", "Tints the cells of the sorted column.", "boolean", "true", "boolean"),

  // Grouping
  groupByColumns: prop("Grouping", "Group-by options keyed by column id: `{ status: { name: \"Status\", columns: [\"status\"] } }`. Renders the \"Group by\" select.", "Record<string, { name?: string, columns: string[] }>", undefined, "object"),
  grouping: prop("Grouping", "Key of the active `groupByColumns` entry (empty string for none).", "string", '""', "text"),
  onGroupByChange: prop("Grouping", "Called with the chosen `groupByColumns` key.", "(key) => void"),
  enableGroupByControl: prop("Grouping", "Shows the \"Group by\" select when `groupByColumns` is set.", "boolean", "true", "boolean"),
  expanded: prop("Grouping", "Expanded rows keyed by row id, or `true` for all.", "Record<string, boolean> | true", "{}", "object"),
  onExpandedChange: prop("Grouping", "Called with the new expanded state.", "(expanded) => void"),
  getRowCanExpand: prop("Grouping", "Decides whether a row can expand. Pair it with `onClickRow` and `row.toggleExpanded()`.", "(row) => boolean"),
  autoResetExpanded: prop("Grouping", "Collapses rows when data changes.", "boolean", "false", "boolean"),

  // Pinning
  enableColumnPinning: prop("Pinning", "Lets users pin columns from the column menu.", "boolean", "false", "boolean"),
  columnPinning: prop("Pinning", "Pinned column ids per side. Use the `checkbox` and `actions` ids for the built-in columns.", "{ left?: string[], right?: string[] }", undefined, "object"),
  onColumnPinningChange: prop("Pinning", "Called with the new pinning state.", "(pinning) => void"),

  // Pagination
  enablePagination: prop("Pagination", "Shows the pager and paginates rows client-side. Without it every row is rendered in the scroll area.", "boolean", "undefined", "boolean"),
  paginationOptions: prop("Pagination", "Initial page and page size.", "{ pageIndex: number, pageSize: number }", "{ pageIndex: 0, pageSize: 100 }", "object"),
  onPaginationChange: prop("Pagination", "Called with the new pagination state.", "(pagination) => void"),

  // Actions
  bulkActions: prop("Actions", "Header buttons enabled while rows are selected. Built-in keys: delete, download, toggleAlarm, userSettings, addEntry, remove, columnVisibility. Each takes `handleAction(rows, table)` plus optional icon, tooltipText and confirmation texts.", "Record<string, { handleAction, icon?, confirmation?, tooltipText? }>", undefined, "object"),
  rowActions: prop("Actions", "Per-row icon buttons in a trailing `actions` column. Built-in keys: delete, edit, replace, info, toggleAlarm, userSettings, remove, goto. Each takes `handleAction(rowData, table)`, optional `isDisabled` and `isVisible`.", "Record<string, { handleAction, isDisabled?, isVisible? }>", "{}", "object"),
  onClickRow: prop("Actions", "Makes rows clickable. Called with `{ data, table, fullRow }`.", "({ data, table, fullRow }, event) => void"),
  disableClickRow: prop("Actions", "Returns true for rows that should not react to `onClickRow`.", "({ data, table, fullRow }) => boolean"),
  onHoverCell: prop("Actions", "Called with `{ row }` (the row index) on mouse enter.", "({ row }) => void"),
  headerChildren: prop("Actions", "Extra content rendered in the table header.", "ReactNode"),
  headerActionsBeforeChildren: prop("Actions", "Renders the header actions before `headerChildren`.", "boolean", "false", "boolean"),

  // Virtualization / large data
  virtualizeOptions: prop("Virtualization/large data", "Options for the virtualised body: `overscan`, `loading`, `warning`, `loadMore`, `getHasNextPage`, `getHasPrevPage`, `getItemKey`, `initialOffset`, `onScroll`, `onVirtualChange`, `virtualRef`, `deferRowMount`, `RowPlaceholder`, `placeholdersLength`.", "TableVirtualizeOptions", "{}", "object"),
  largeDataOptions: prop("Virtualization/large data", "Switches to large-data mode: sorting, filtering and grouping run through a row source and only a window of rows is rendered. Needs `enabled: true` and `getRowId`, or a `source` from `createLargeDataSource`.", "{ enabled?, source?, filterRow?, sortingFns?, getEstimatedRowHeight?, initialRowCount? }", undefined, "object"),
  RowWrapper: prop("Virtualization/large data", "Component wrapping every rendered row.", "ComponentType<{ children, row, virtualIndex, logicalIndex? }>"),

  // Appearance
  bordered: prop("Appearance", "Draws a border and rounded corners around the table.", "boolean", "true", "boolean"),
  surface: prop("Appearance", "Theme colour token for the table canvas, toolbar, headers, rows and pager.", "string", undefined, "text"),
  width: prop("Appearance", "Width of the table container.", "string", undefined, "text"),
  className: prop("Appearance", "Class name for the table container.", "string", undefined, "text"),
  meta: prop("Appearance", "Style overrides: `cellStyles`, `headStyles`, `searchStyles`, `searchContainerStyles`, `bulkActionsStyles`, `groupByContainerStyles`, `groupBySelectStyles`. May be a function.", "TableMeta | (...args) => TableMeta", "{}", "object"),
  enableColumnVisibility: prop("Appearance", "Adds a column menu to show or hide columns. A column opts out with `enableHiding: false`.", "boolean", "false", "boolean"),
  columnVisibility: prop("Appearance", "Visibility map keyed by column id, e.g. `{ agent: false }`.", "Record<string, boolean>", undefined, "object"),
  columnVisibilityFlavour: prop("Appearance", "Button flavour of the column menu trigger.", '"borderless" | "hollow"', undefined, { type: "inline-radio" }),
  onColumnVisibilityChange: prop("Appearance", "Called with the new visibility map.", "(visibility) => void"),
  enableResizing: prop("Appearance", "Lets users drag column borders to resize. Width comes from each column's `size`.", "boolean", "false", "boolean"),
  columnSizing: prop("Appearance", "Column widths keyed by column id.", "Record<string, number>", undefined, "object"),
  onColumnSizingChange: prop("Appearance", "Called with the new sizing map.", "(sizing) => void"),
  enableColumnReordering: prop("Appearance", "Lets users drag column headers to reorder them.", "boolean", "false", "boolean"),
  columnOrder: prop("Appearance", "Column ids in display order.", "string[]", "[]", "object"),
  onColumnOrderChange: prop("Appearance", "Called with the new column order.", "(order) => void"),
  overflowTooltip: prop("Appearance", "Options for the tooltip that shows truncated cell text: `delay`, `align`, `selector`, `getContent`, `renderContent`, `zIndex`.", "OverflowTooltipOptions", undefined, "object"),
}

export default {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A data table built on TanStack Table with selection, sorting, grouping, column pinning, pagination, row and bulk actions, and a virtualised body. Use it for lists of nodes, alerts or users that need comparison and bulk work.",
      },
    },
  },
  argTypes,
  args: {
    data: mockData(),
    dataColumns: mockDataColumns,
  },
}

const statusColors = { live: "primary", stale: "warning", offline: "textLite" }

const Numeric = ({ children, color }) => (
  <Flex width="100%" justifyContent="end">
    <Text color={color}>{children}</Text>
  </Flex>
)

const nodeColumns = [
  {
    id: "name",
    header: "Name",
    name: "Name",
    size: 180,
    cell: ({ getValue, row }) => (
      <Text color="main" padding={[0, 0, 0, row.depth * 4]}>
        {getValue()}
      </Text>
    ),
  },
  {
    id: "status",
    header: "Status",
    name: "Status",
    size: 100,
    cell: ({ getValue }) =>
      getValue() ? <Text color={statusColors[getValue()]}>{getValue()}</Text> : null,
  },
  {
    id: "cpu",
    header: "CPU %",
    name: "CPU %",
    size: 100,
    cell: ({ getValue }) => <Numeric>{getValue() == null ? "—" : getValue().toFixed(1)}</Numeric>,
  },
  {
    id: "memory",
    header: "Memory GiB",
    name: "Memory GiB",
    size: 120,
    cell: ({ getValue }) => <Numeric>{getValue() == null ? "—" : getValue().toFixed(1)}</Numeric>,
  },
  {
    id: "alerts",
    header: "Alerts",
    name: "Alerts",
    size: 80,
    cell: ({ getValue }) => (
      <Numeric color={getValue() > 1 ? "error" : getValue() === 1 ? "warning" : "textLite"}>
        {getValue()}
      </Numeric>
    ),
  },
  {
    id: "agent",
    header: "Agent",
    name: "Agent",
    size: 100,
    cell: ({ getValue }) => <Text>{getValue()}</Text>,
  },
]

const nodeRows = [
  {
    id: "k8s-prod",
    name: "k8s-prod",
    alerts: 3,
    children: [
      {
        id: "prod-web-01",
        name: "prod-web-01",
        status: "live",
        cpu: 42.1,
        memory: 3.2,
        alerts: 0,
        agent: "v2.1.0",
      },
      {
        id: "prod-web-02",
        name: "prod-web-02",
        status: "live",
        cpu: 87.6,
        memory: 6.9,
        alerts: 2,
        agent: "v2.1.0",
      },
      {
        id: "prod-db-01",
        name: "prod-db-01",
        status: "stale",
        cpu: 12.4,
        memory: 14.1,
        alerts: 1,
        agent: "v2.0.3",
      },
    ],
  },
  { id: "edge-gw-07", name: "edge-gw-07", status: "offline", alerts: 0, agent: "v1.44.3" },
  {
    id: "lab-rpi-3",
    name: "lab-rpi-3",
    status: "live",
    cpu: 5,
    memory: 0.5,
    alerts: 0,
    agent: "v2.1.0",
  },
  ...Array.from({ length: 12 }, (_, index) => ({
    id: `worker-${index}`,
    name: `worker-${index}`,
    status: index % 5 === 0 ? "stale" : "live",
    cpu: (index * 7.3) % 100,
    memory: 1 + index * 0.75,
    alerts: index % 4 === 0 ? 1 : 0,
    agent: "v2.1.0",
  })),
]

const nodeTableProps = {
  data: nodeRows,
  dataColumns: nodeColumns,
  getRowId: row => row.id,
  enableSorting: true,
  sortBy: [{ id: "cpu", desc: true }],
  enableSelection: true,
  enableResizing: true,
  enableColumnPinning: true,
  columnPinning: { left: ["checkbox", "name"] },
  enableColumnVisibility: true,
  onSearch: () => {},
  getRowCanExpand: row => !!row.original.children,
  onClickRow: () => {},
  rowActions: {
    goto: { handleAction: () => {} },
    edit: { handleAction: () => {} },
  },
  bulkActions: { download: { handleAction: () => {} }, delete: { handleAction: () => {} } },
}

// Group, offline, stale and alert rows all sit in the first nine entries; 12 rows fit one screen.
const nodeStatesRows = nodeRows.slice(0, 9)

export const NodeStates = () => {
  const [rowSelection, setRowSelection] = useState({ "prod-web-02": true })
  const [expanded, setExpanded] = useState({ "k8s-prod": true })

  return (
    // No fixed height: the table grows to its rows, so the last row is never cut mid-height.
    <Flex column gap={2} width="920px">
      <Text color="textLite">
        Sorted by CPU, pinned name, a selected row, an expanded group with sub-rows, hover any row.
      </Text>
      <Table
        {...nodeTableProps}
        data={nodeStatesRows}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        expanded={expanded}
        onExpandedChange={setExpanded}
      />
    </Flex>
  )
}

export const NodePagination = () => (
  <Flex width="920px" height="360px">
    <Table {...nodeTableProps} enablePagination paginationOptions={{ pageIndex: 0, pageSize: 5 }} />
  </Flex>
)

export const NodeLoadingAndWarning = () => (
  <Flex column gap={4} width="920px">
    <Flex height="240px">
      <Table {...nodeTableProps} virtualizeOptions={{ loading: true }} />
    </Flex>
    <Flex height="240px">
      <Table
        {...nodeTableProps}
        virtualizeOptions={{
          warning: "Showing the first 15 nodes",
          getHasNextPage: () => false,
        }}
      />
    </Flex>
  </Flex>
)

export const NodeEmpty = () => (
  <Flex width="920px" height="200px">
    <Table {...nodeTableProps} data={[]} />
  </Flex>
)

const groupColumns = [
  { id: "name", accessorKey: "name", header: "Name", name: "Name", size: 200 },
  { id: "status", accessorKey: "status", header: "Status", name: "Status", size: 120 },
  { id: "agent", accessorKey: "agent", header: "Agent", name: "Agent", size: 120 },
  { id: "alerts", accessorKey: "alerts", header: "Alerts", name: "Alerts", size: 100 },
]

const groupRows = nodeRows
  .filter(row => !row.children)
  .map(row => ({ ...row, status: row.status || "live" }))
  .slice(0, 10)

const groupByColumns = {
  status: { name: "Status", columns: ["status"] },
  agent: { name: "Agent version", columns: ["agent"] },
}

export const Grouping = () => {
  const [grouping, setGrouping] = useState("status")

  return (
    <Flex width="720px" height="420px">
      <Table
        data={groupRows}
        dataColumns={groupColumns}
        getRowId={row => row.id}
        groupByColumns={groupByColumns}
        grouping={grouping}
        onGroupByChange={setGrouping}
        enableSorting
      />
    </Flex>
  )
}

export const ColumnVisibility = () => {
  const [columnVisibility, setColumnVisibility] = useState({ agent: false })

  return (
    <Flex width="920px" height="320px">
      <Table
        {...nodeTableProps}
        enableSelection={false}
        bulkActions={undefined}
        rowActions={undefined}
        enableColumnVisibility
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
    </Flex>
  )
}

const largeNodeRows = Array.from({ length: 5000 }, (_, index) => ({
  id: `node-${index}`,
  name: `node-${String(index).padStart(4, "0")}`,
  status: index % 7 === 0 ? "stale" : index % 11 === 0 ? "offline" : "live",
  cpu: (index * 7.3) % 100,
  alerts: index % 13 === 0 ? 2 : 0,
}))

const largeNodeColumns = [
  { id: "name", accessorKey: "name", header: "Name", name: "Name", size: 200 },
  { id: "status", accessorKey: "status", header: "Status", name: "Status", size: 120 },
  {
    id: "cpu",
    accessorKey: "cpu",
    header: "CPU %",
    name: "CPU %",
    size: 100,
    cell: ({ getValue }) => <Numeric>{getValue().toFixed(1)}</Numeric>,
  },
  { id: "alerts", accessorKey: "alerts", header: "Alerts", name: "Alerts", size: 100 },
]

export const LargeData = () => (
  <Flex column gap={2} width="720px">
    <Text color="textLite">5,000 nodes. Only the visible window is rendered; sorting stays fast.</Text>
    <Flex height="360px">
      <Table
        data={largeNodeRows}
        dataColumns={largeNodeColumns}
        getRowId={row => row.id}
        largeDataOptions={{ enabled: true }}
        enableSorting
        sortBy={[{ id: "cpu", desc: true }]}
      />
    </Flex>
  </Flex>
)
