import { useContext } from "react"

import { SharedTableContext } from "../context/sharedTable"

const useSharedTable = () => useContext(SharedTableContext)

export default useSharedTable
