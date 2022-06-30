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

  return operators[operator](Number(rowValue), Number(numberToCompareWith))
}
