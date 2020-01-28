import { RowInstance } from "react-table"
// default  grouping function from the react-table utils

type DefaultGroupByFn = (rows: any[], columnId: string) => { [groupName: string]: any[] }
export function defaultGroupByFn(rows, columnId) {
  const result = rows.reduce((prev, row) => {
    const resKey = `${row.values[columnId]}`
    prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : []
    prev[resKey].push(row)
    return prev
  }, {})
  return result
}
