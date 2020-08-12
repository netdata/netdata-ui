import { path } from "ramda"
import { SimpleResultProcessing } from "react-filter-box"
import { Option } from "./types"

const castValue = (value: any) => String(value).toLowerCase()

/* 
== and != equality checks aren't a mistake, it's just a replication
of original library class logic. We can move towards strict equality
if needed.
*/

export class FilterBoxProcessing extends SimpleResultProcessing {
  accessor?: string[]

  options: Option[]

  // supports accessor path for nested objects, such as react-table rows
  constructor(options: Option[], accessor?: string[]) {
    super(options)
    this.options = options
    this.accessor = accessor
  }

  tryToGetFieldCategory = (fieldOrLabel: string) => {
    const found = this.options.find(f => f.columnText == fieldOrLabel)
    return found ? found.columnField : fieldOrLabel
  }

  // supports arrays, applying the same filtering logic
  // as original class
  filter(row, fieldOrLabel, operator, value) {
    const { tryToGetFieldCategory, accessor } = this
    const field = tryToGetFieldCategory(fieldOrLabel)
    const rowValues = accessor ? path(accessor, row) : row
    const focusedValue = rowValues[field]
    const lowcaseFilterValue = value.toLowerCase()
    switch (operator) {
      case "==": {
        if (Array.isArray(focusedValue)) {
          return focusedValue.some(element => castValue(element) == value)
        }
        return focusedValue == value
      }

      case "!=": {
        if (Array.isArray(focusedValue)) {
          return !focusedValue.some(element => castValue(element) == value)
        }
        return focusedValue != value
      }

      case "contains": {
        if (Array.isArray(focusedValue)) {
          return focusedValue.some(element => castValue(element).includes(lowcaseFilterValue))
        }
        return castValue(focusedValue).includes(lowcaseFilterValue)
      }

      case "!contains":
        if (Array.isArray(focusedValue)) {
          return !focusedValue.some(element => castValue(element).includes(lowcaseFilterValue))
        }
        return !castValue(focusedValue).includes(lowcaseFilterValue)
      default:
        return false
    }
  }
}
