import { useMemo } from "react"
import uuid from "src/mixins/uuid"

export default describedby => useMemo(() => describedby || uuid(), [])
