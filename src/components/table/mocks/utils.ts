import { defaultGroupByFn } from "../utils"

export function groupByService(rows, columnId) {
  const result = rows.reduce((prev, row) => {
    const servicesList = row.values[columnId]

    servicesList.forEach(s => {
      prev[s] = Array.isArray(prev[s]) ? prev[s] : []
      prev[s].push(row)
    })

    return prev
  }, {})
  return result
}

export const customGroupBy = (rows, columnId) =>
  columnId === "services" ? groupByService(rows, columnId) : defaultGroupByFn(rows, columnId)
