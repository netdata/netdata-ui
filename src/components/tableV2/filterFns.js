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

  console.log(filterValue)

  return operators[operator](Number(rowValue), Number(numberToCompareWith))
}

export const select = (row, columnId, value) => {
  const isMulti = Array.isArray(value)
  if (isMulti) return multiSelect(row, columnId, value)
  return singleSelect(row, columnId, value)
}

const multiSelect = (row, columnId, value) => {
  const rowValue = row.getValue(columnId)
  if (value.length < 1) return true

  return value.some(({ value: filterValue }) => {
    if (filterValue === "all" || "") return true
    return filterValue?.toLowerCase() === rowValue?.toLowerCase()
  })
}

const singleSelect = (row, columnId, value) => {
  const rowValue = row.getValue(columnId)
  const { value: filterValue } = value
  if (filterValue === "all") return true

  return filterValue === rowValue
}
