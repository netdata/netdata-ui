export interface Option {
  columnField: string
  columnText?: string
  type: string
  customOperatorFunc?: (category: string) => string[]
  customValuesFunc?: (category: string, operator: string) => string[]
}
