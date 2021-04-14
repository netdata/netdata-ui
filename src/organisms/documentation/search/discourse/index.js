import React, { useEffect, useState } from "react"
import fetchTopics from "./api"

const DiscourseSearch = ({ children, ...rest }) => {
  const [topics, setTopics] = useState([])

  const { searchTerm, results } = rest

  useEffect(() => {
    if (!searchTerm) return
    const onSuccess = ({ data }) => setTopics(data)
    fetchTopics(searchTerm, onSuccess)
  }, [searchTerm])

  return children({ ...rest, results: { ...results, discourse: topics } })
}

export default DiscourseSearch
