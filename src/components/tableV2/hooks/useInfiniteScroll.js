import { useEffect, useMemo, useState, useRef } from "react"

//COMMENTS HERE ARE ONLY FOR TESTING REASONS THE ARE GOING TO BE REMOVED AFTER WE SEE THAT THE INFINITY WORKS AS EXPECTED

// const fakeData = () => [
//   {
//     nodes: "node51",
//     alerts: 15,
//     user: "mitsos",
//     disabled: true,
//     status: "stale",
//     untouchable: "true",
//   },
//   {
//     nodes: "node52",
//     alerts: 15,
//     user: "mitsos",
//     disabled: true,
//     status: "stale",
//     untouchable: "true",
//   },
//   {
//     nodes: "node53",
//     alerts: 15,
//     user: "mitsos",
//     disabled: true,
//     status: "stale",
//     untouchable: "true",
//   },
//   {
//     nodes: "node54",
//     alerts: 15,
//     user: "mitsos",
//     disabled: true,
//     status: "stale",
//     untouchable: "true",
//   },
//   {
//     nodes: "node55",
//     alerts: 15,
//     user: "mitsos",
//     disabled: true,
//     status: "stale",
//     untouchable: "true",
//   },
//   {
//     nodes: "node56",
//     alerts: 15,
//     user: "mitsos",
//     disabled: true,
//     status: "stale",
//     untouchable: "true",
//   },
// ]

// function loadMoreItems(lastData) {
//   console.log(lastData)
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve({
//         data: fakeData(),
//       })
//     }, 4000)
//   })
// }

const useScrollListener = (target, handler) => {
  const listenerRef = useRef(handler)
  listenerRef.current = handler

  useEffect(() => {
    const listener = () => listenerRef.current()

    if (!target?.current) return
    target.current.addEventListener("scroll", listener)

    return () => {
      if (!target.current) return
      target.current.removeEventListener("scroll", listener)
    }
  }, [target])
}

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

  useScrollListener(target, () => {
    if (loading || !service) return
    scrollMethod()
  })
}

export default useIniniteScroll
