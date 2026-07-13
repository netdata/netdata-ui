import { getColumnValue } from "./columnValue"

const formatValue = value => {
  if (value === null || value === undefined) return "-"
  if (typeof value === "object") return JSON.stringify(value)
  return value
}

const escapeForCSV = value => {
  const str = String(value)

  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`

  return str
}

const convertToCSV = data =>
  data.reduce((h, row) => h + row.map(v => escapeForCSV(formatValue(v))).join(",") + "\n", "")

const createExportRow = (original, index, headers, columnsById) => {
  const row = {
    index,
    original,
    getValue: columnId => {
      const column = columnsById.get(columnId)
      return getColumnValue(original, index, { ...(column?.columnDef || {}), id: columnId })
    },
  }

  row.getAllCells = () =>
    headers.map(header => ({ column: header.column, row, getValue: () => row.getValue(header.id) }))

  return row
}

export default (name = "netdata") =>
  (_, table) => {
    const headers = table
      .getFlatHeaders()
      .filter(
        header => !header.subHeaders?.length && header.id !== "checkbox" && header.id !== "actions"
      )
    const columnsById = new Map(headers.map(header => [header.id, header.column]))

    let data = [
      headers.map(header => {
        const parentLabel = header.column.parent
          ? typeof header.column.parent.columnDef.headerString === "function"
            ? header.column.parent.columnDef.headerString()
            : header.column.parent.id
          : null

        const label =
          typeof header.column.columnDef.headerString === "function"
            ? header.column.columnDef.headerString()
            : header.id

        return parentLabel ? `${parentLabel} ${label}` : label
      }),
    ]
    const appendRow = row =>
      data.push(
        headers.map(header => {
          const value = row.getValue(header.id)

          if (value) return value

          if (typeof header.column.columnDef.renderString !== "function") return value

          const cell = row.getAllCells().find(cell => cell.column.id === header.id)

          return header.column.columnDef.renderString(cell.row)
        })
      )

    if (table.forEachExportRow) {
      let index = 0
      table.forEachExportRow(original => {
        appendRow(createExportRow(original, index, headers, columnsById))
        index += 1
      })
    } else {
      table.getRowModel().rows.forEach(appendRow)
    }

    const url = window.URL.createObjectURL(
      new Blob([convertToCSV(data)], { type: "text/csv;charset=utf-8;" })
    )
    const link = document.createElement("a")
    link.href = url
    const fileName = `${name}.csv`
    link.setAttribute("download", fileName)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
