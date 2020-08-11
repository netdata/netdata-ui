import { GridDataAutoCompleteHandler } from "react-filter-box"
import { map, uniq, pipe, identity, path } from "ramda"
import { Option } from "./types"

interface AccessorsData {
  [fieldName: string]: string[]
}

export class FilterBoxAutocompleteHandler extends GridDataAutoCompleteHandler {
  accessorPaths: { [fieldName: string]: string[] }

  constructor(protected data: any[], protected options: Option[], accessors?: AccessorsData) {
    super(data, options)
    this.accessorPaths = accessors || {}
  }

  needValues(parsedCategory: string, parsedOperator: string): any[] {
    console.log("need values")
    console.info(parsedCategory, parsedOperator)
    console.info(this.data)
    const accessorPath = this.accessorPaths[parsedCategory]
    const found = this.options.find(
      f => f.columnField == parsedCategory || f.columnText == parsedCategory
    )

    if (found != null && found.type == "selection" && this.data != null) {
      if (!this.cache[parsedCategory]) {
        this.cache[parsedCategory] = pipe(
          map((dataRow: any) =>
            accessorPath ? path(accessorPath, dataRow) : dataRow[parsedCategory]
          ),
          uniq,
          identity
        )(this.data)
        console.log("result:")
        console.info(this.cache[parsedCategory])
      }
      return this.cache[parsedCategory]
    }

    if (found != null && found.customValuesFunc) {
      return found.customValuesFunc(parsedCategory, parsedOperator)
    }

    return []
  }
}
