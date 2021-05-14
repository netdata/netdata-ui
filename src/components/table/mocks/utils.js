import { defaultGroupByFn } from "../utils"
import { FilterBoxProcessing } from "src/components/filter-box"

const groupByService = (rows, columnId) => {
  const result = rows.reduce((prev, row) => {
    const servicesList = row.values[columnId]

    const displayedServices = servicesList.length ? servicesList : ["No Services"]

    displayedServices.forEach(s => {
      prev[s] = Array.isArray(prev[s]) ? prev[s] : []
      prev[s].push(row)
    })

    return prev
  }, {})
  return result
}

export const customGroupBy = (rows, columnId) =>
  columnId === "services" ? groupByService(rows, columnId) : defaultGroupByFn(rows, columnId)

export const filterOptions = [
  { columnField: "node", columnText: "node_name", type: "selection" },
  { columnField: "status", type: "selection" },
  { columnField: "services", type: "selection" },
]

const FilterInstance = new FilterBoxProcessing(filterOptions, ["values"])

export const filterByExpressions = (rows, columnsIDs, { expressions }) =>
  FilterInstance.process(rows, expressions)
