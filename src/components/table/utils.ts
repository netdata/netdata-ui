import { pipe, sortBy, prop, map, path } from "ramda"
// default  grouping function from the react-table utils

type DefaultGroupByFn = (rows: any[], columnId: string) => { [groupName: string]: any[] }
export const defaultGroupByFn: DefaultGroupByFn = (rows, columnId) => {
  const result = rows.reduce((prev, row) => {
    const resKey = `${row.values[columnId]}`
    prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : []
    prev[resKey].push(row)
    return prev
  }, {})
  return result
}

export type GroupsOrderValues = {
  [groupID: string]: {
    [groupValue: string]: number
  }
}

export const sortGroupsByPriority = (groups: any[], groupOrderValues: GroupsOrderValues) =>
  pipe(
    map((group: any) => ({
      ...group,
      priority: path([group.groupByID, group.groupByVal], groupOrderValues),
    })),
    sortBy(prop("priority"))
  )(groups)
