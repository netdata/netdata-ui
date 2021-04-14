import React, { useEffect, useState } from "react"
import fetchTopics from "./api"

const DiscourseSearch = ({ children, ...rest }) => {
  const [topics, setTopics] = useState([])

  const { searchTerm, results } = rest

  useEffect(() => {
    if (!searchTerm) return

    let isSubscribed = true
    const onSuccess = ({ data }) => isSubscribed && setTopics(data)

    fetchTopics(searchTerm, onSuccess)
    return () => (isSubscribed = false)
  }, [searchTerm])

  return children({ ...rest, results: { ...results, discourse: topics } })
}

export default DiscourseSearch
