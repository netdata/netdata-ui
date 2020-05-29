import { pipe, sort, concat, map, path } from "ramda"

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

export const unwrapGroupedRows = (groups: any[]) =>
  groups.reduce((acc: any, current: any) => {
    const { subRows, ...restRowProps } = current
    if (subRows.length > 0) {
      acc.push({ subRows: [], isVirtualGroupHeader: true, ...restRowProps })
      return concat(acc, subRows)
    }
    acc.push(current)
    return acc
  }, [])

interface StyleDeps {
  index: number
  style: { [key: string]: number } // not quite true, but for most keys that we want to use
  rows: any[]
  verticalGutter: number
}
export const generateRowStyle = ({ index, style, rows, verticalGutter }: StyleDeps) => {
  const prevRow = index !== 0 ? rows[index - 1] : {}
  const currentRow = rows[index]

  const noGutter = index === 0 || currentRow.isVirtualGroupHeader || prevRow.isVirtualGroupHeader

  return {
    ...style,
    top: noGutter ? style.top : style.top + verticalGutter,
    height: noGutter ? style.height : style.height - verticalGutter,
  }
}
