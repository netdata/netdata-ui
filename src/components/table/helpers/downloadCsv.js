const formatValue = value => {
  if (value === null || value === undefined) return "-"
  if (typeof value === "object") return JSON.stringify(value)
  return value
}

const convertToCSV = data => data.reduce((h, row) => h + row.map(formatValue).join(",") + "\n", "")

export default (name = "netdata") =>
  (_, table) => {
    let data = [table.getFlatHeaders().map(header => header.id)]
    table.getRowModel().rows.forEach(row => {
      data.push(table.getFlatHeaders().map(header => row.renderValue(header.id)))
    })

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
