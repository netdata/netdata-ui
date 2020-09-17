import { path } from "ramda"
import { SimpleResultProcessing } from "@netdata/react-filter-box"
import { Option, FieldValueGetters } from "./types"

const castValue = (value: any) => String(value).toLowerCase()

/* 
== and != equality checks aren't a mistake, it's just a replication
of original library class logic. We can move towards strict equality
if needed.
*/

export class FilterBoxProcessing extends SimpleResultProcessing {
  accessor?: string[]

  fieldValueGetters: FieldValueGetters

  options: Option[]

  // supports accessor path for nested objects, such as react-table rows
  constructor(options: Option[], accessor?: string[], fieldValueGetters?: FieldValueGetters) {
    super(options)
    this.options = options
    this.accessor = accessor
    this.fieldValueGetters = fieldValueGetters || {}
  }

  tryToGetFieldCategory = (fieldOrLabel: string) => {
    const found = this.options.find(f => f.columnText == fieldOrLabel)
    return found ? found.columnField : fieldOrLabel
  }

  // supports arrays, applying the same filtering logic
  // as original class
  filter(row, fieldOrLabel, operator, filterValue) {
    const { tryToGetFieldCategory, accessor } = this
    const category = tryToGetFieldCategory(fieldOrLabel)
    const rowValues = accessor ? path(accessor, row) : row
    const focusedField = rowValues[category]
    const lowcaseFilterValue = filterValue.toLowerCase()
    const getValue = this.fieldValueGetters[category]
    switch (operator) {
      case "==": {
        if (Array.isArray(focusedField)) {
          return focusedField.some(element =>
            getValue ? getValue(element) == filterValue : String(element) == filterValue
          )
        }
        return getValue ? getValue(focusedField) == filterValue : focusedField == filterValue
      }

      case "!=": {
        if (Array.isArray(focusedField)) {
          return !focusedField.some(element =>
            getValue ? getValue(element) == filterValue : String(element) == filterValue
          )
        }
        return getValue ? getValue(focusedField) != filterValue : focusedField != filterValue
      }

      case "contains": {
        if (Array.isArray(focusedField)) {
          return focusedField.some(element =>
            getValue
              ? getValue(element)
                  .toLowerCase()
                  .includes(lowcaseFilterValue)
              : castValue(element).includes(lowcaseFilterValue)
          )
        }
        return getValue
          ? getValue(focusedField)
              .toLowerCase()
              .includes(lowcaseFilterValue)
          : castValue(focusedField).includes(lowcaseFilterValue)
      }

      case "!contains": {
        if (Array.isArray(focusedField)) {
          return !focusedField.some(element =>
            getValue
              ? getValue(element)
                  .toLowerCase()
                  .includes(lowcaseFilterValue)
              : castValue(element).includes(lowcaseFilterValue)
          )
        }

        return getValue
          ? !getValue(focusedField)
              .toLowerCase()
              .includes(lowcaseFilterValue)
          : !castValue(focusedField).includes(lowcaseFilterValue)
      }
      default:
        return false
    }
  }
}
