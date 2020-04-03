import { defaultGroupByFn } from "../utils"

const groupByService = (rows: any, columnId: string) => {
  const result = rows.reduce((prev: { [service: string]: any[] }, row: any) => {
    const servicesList = row.values[columnId]

    const displayedServices = servicesList.length ? servicesList : ["No Services"]

    displayedServices.forEach((s: string) => {
      prev[s] = Array.isArray(prev[s]) ? prev[s] : []
      prev[s].push(row)
    })

    return prev
  }, {})
  return result
}

export const customGroupBy = (rows, columnId) =>
  columnId === "services" ? groupByService(rows, columnId) : defaultGroupByFn(rows, columnId)
