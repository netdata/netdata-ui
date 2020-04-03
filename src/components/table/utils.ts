import { pipe, sort, prop, map, path } from "ramda"

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

export type GroupsOrderSettings = {
  groupsOrder: {
    [groupID: string]: {
      [groupValue: string]: number
    }
  }
  prioritySettings?: {
    unprioritizedGroupsPlacement?: number
  }
}

const lowestPriority = 999999

type Prioritized = {
  priority: number
}
const sortByPriority = (a: Prioritized, b: Prioritized) => a.priority - b.priority

const getPriority = (
  groupsOrderSettings: GroupsOrderSettings,
  groupByID: string,
  groupValue: string
) =>
  path(["groupsOrder", groupByID, groupValue], groupsOrderSettings) ||
  path(["prioritySettings", "unprioritizedGroupsPlacement"], groupsOrderSettings) ||
  lowestPriority

export const sortGroupsByPriority = (groups: any[], groupsOrderSettings: GroupsOrderSettings) =>
  pipe(
    map((group: any) => ({
      ...group,
      priority:
        group.priority || getPriority(groupsOrderSettings, group.groupByID, group.groupByVal),
    })),
    sort(sortByPriority)
  )(groups)
