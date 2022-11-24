import { useEffect, useMemo, useState } from "react"

const fakeData = () => [
  {
    nodes: "node51",
    alerts: 15,
    user: "mitsos",
    disabled: true,
    status: "stale",
    untouchable: "true",
  },
  {
    nodes: "node52",
    alerts: 15,
    user: "mitsos",
    disabled: true,
    status: "stale",
    untouchable: "true",
  },
  {
    nodes: "node53",
    alerts: 15,
    user: "mitsos",
    disabled: true,
    status: "stale",
    untouchable: "true",
  },
  {
    nodes: "node54",
    alerts: 15,
    user: "mitsos",
    disabled: true,
    status: "stale",
    untouchable: "true",
  },
  {
    nodes: "node55",
    alerts: 15,
    user: "mitsos",
    disabled: true,
    status: "stale",
    untouchable: "true",
  },
  {
    nodes: "node56",
    alerts: 15,
    user: "mitsos",
    disabled: true,
    status: "stale",
    untouchable: "true",
  },
]

const useIniniteScroll = (
  service,
  { target, onError, onSuccess, onDataend, updateTableData, threshold = 100 }
) => {
  const [lastReceivedData, setLastReceivedData] = useState()
  const [loading, setLoading] = useState(false)

  const hasDataEnded = useMemo(() => {
    if (!onDataend) return false
    return onDataend(lastReceivedData)
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
    const lisener = () => {
      if (loading) return
      scrollMethod()
    }

    target.current.addEventListener("scroll", lisener)

    return () => {
      if (!target.current) return
      target.current.removeEventListener("scroll", lisener)
    }
  }, [target, loading])
}

export default useIniniteScroll
