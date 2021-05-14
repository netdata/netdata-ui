import { GridDataAutoCompleteHandler } from "@netdata/react-filter-box"
import { map, uniq, pipe, identity, path, flatten } from "ramda"

export class FilterBoxAutocompleteHandler extends GridDataAutoCompleteHandler {
  constructor(data, options, accessors, fieldValueGetters) {
    super(data, options)
    this.accessorPaths = accessors || {}
    this.fieldValueGetters = fieldValueGetters || {}
  }

  needValues(parsedCategory, parsedOperator) {
    const found = this.options.find(
      f => f.columnField == parsedCategory || f.columnText == parsedCategory
    )

    if (found != null && found.type == "selection" && this.data != null) {
      const category = found.columnField
      const accessorPath = this.accessorPaths[category]
      if (!this.cache[category]) {
        this.cache[category] = pipe(
          map(dataRow => {
            const value = accessorPath ? path(accessorPath, dataRow) : dataRow[category]
            if (Array.isArray(value) && this.fieldValueGetters[category]) {
              return value.map(this.fieldValueGetters[category])
            }
            return value
          }),
          flatten,
          uniq,
          identity
        )(this.data)
      }
      return this.cache[category]
    }

    if (found != null && found.customValuesFunc) {
      return found.customValuesFunc(parsedCategory, parsedOperator)
    }

    return []
  }
}
