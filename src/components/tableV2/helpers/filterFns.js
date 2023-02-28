const operators = {
  gt: (a, b) => a > b,
  eq: (a, b) => a === b,
  lt: (a, b) => a < b,
  all: () => true,
}

export const comparison = (row, columnId, value) => {
  const [filterValue, numberToCompareWith] = value
  const { value: operator } = filterValue

  const rowValue = row.getValue(columnId)

  if (isNaN(numberToCompareWith) || numberToCompareWith === "") return true

  const found = operators[operator](Number(rowValue), Number(numberToCompareWith))

  if (!found && row.subRows.length)
    return row.subRows.some(subRow => comparison(subRow, columnId, value))

  return found
}

const multiSelect = (row, columnId, value) => {
  const rowValue = row.getValue(columnId)
  if (value.length < 1) return true

  return value.some(({ value: filterValue }) => {
    if (filterValue === ("all" || "")) return true
    return filterValue?.toLowerCase?.() === rowValue?.toLowerCase?.()
  })
}

const singleSelect = (row, columnId, value) => {
  const rowValue = row.getValue(columnId)
  const { value: filterValue } = value
  if (filterValue === "all") return true

  return filterValue?.toLowerCase?.() === rowValue?.toLowerCase?.()
}

export const select = (row, columnId, value) => {
  const isMulti = Array.isArray(value)
  const found = isMulti ? multiSelect(row, columnId, value) : singleSelect(row, columnId, value)

  if (!found && row.subRows.length)
    return row.subRows.some(subRow =>
      isMulti ? multiSelect(subRow, columnId, value) : singleSelect(subRow, columnId, value)
    )

  return found
}

export const includesString = (row, columnId, value) => {
  const rowValue = row.getValue(columnId)?.toString?.()

  if (typeof rowValue !== "string") return false

  const search = value ? value.toLowerCase() : ""

  const found = rowValue.toLowerCase().includes(search)

  if (!found && row.subRows.length)
    return row.subRows.some(subRow => includesString(subRow, columnId, value))

  return found
}
