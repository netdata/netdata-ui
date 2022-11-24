import { useEffect, useMemo, useState } from "react"

const useIniniteScroll = ({
  service,
  target,
  onError,
  onSuccess,
  onDataEnd,
  updateTableData,
  threshold = 100,
}) => {
  const [lastReceivedData, setLastReceivedData] = useState()
  const [loading, setLoading] = useState(false)

  const hasDataEnded = useMemo(() => {
    if (!onDataEnd) return false
    return onDataEnd(lastReceivedData)
  }, [lastReceivedData])

  const runService = async () => {
    try {
      const currentData = await service(lastReceivedData)

      updateTableData(currentData.data)
      setLastReceivedData(currentData)
      onSuccess?.(currentData)
      setLoading(false)
    } catch (err) {
      onError?.(err)
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (hasDataEnded) return
    setLoading(true)
    runService()
  }
  const scrollMethod = () => {
    const el = target.current
    if (!el) {
      return
    }
    const scrollTop = el.scrollTop
    const scrollHeight = el.scrollHeight
    const clientHeight = el.clientHeight
    if (scrollHeight - scrollTop <= clientHeight + threshold) {
      loadMore()
    }
  }
  useEffect(() => {
    if (!target?.current || loading || !service) return
    const listener = () => {
      if (loading) return
      scrollMethod()
    }

    target.current.addEventListener("scroll", listener)

    return () => {
      if (!target.current) return
      target.current.removeEventListener("scroll", listener)
    }
  }, [target, loading])
}

export default useIniniteScroll
