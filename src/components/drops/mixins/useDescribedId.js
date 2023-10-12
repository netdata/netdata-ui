import { useMemo } from "react"
import uuid from "@/mixins/uuid"

export default describedby => useMemo(() => describedby || uuid(), [])
