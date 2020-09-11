export interface Option {
  columnField: string
  columnText?: string
  type: string
  customOperatorFunc?: (category: string) => string[]
  customValuesFunc?: (category: string, operator: string) => string[]
}

export interface FieldValueGetters {
  [fieldName: string]: (any) => string
}

export interface AccessorsData {
  [fieldName: string]: string[]
}
