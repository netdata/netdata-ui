// default  grouping function from the react-table utils
export function defaultGroupByFn(rows, columnId) {
  console.info(rows)
  const result = rows.reduce((prev, row) => {
    const resKey = `${row.values[columnId]}`
    prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : []
    prev[resKey].push(row)
    return prev
  }, {})
  console.info(result)
  return result
}
