import { react } from "react"

import Table from "./base-table"

import { createTable, useTableInstance } from "@tanstack/react-table"

const table = createTable()

const NetdataTable = () => {
  const instance = useTableInstance(table, options)
}

export default NetdataTable
