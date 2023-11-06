import { useState } from "react"
import * as prismic from "@prismicio/client"

const getClient = () => prismic.createClient("https://netdata-news.cdn.prismic.io/api/v2")

export default () => {
  const [client] = useState(getClient)

  return (app, onSuccess, onError) =>
    client
      .get({
        filters: [prismic.filter.any("document.tags", Array.isArray(app) ? app : [app])],
        pageSize: 100,
        orderings: [{ field: "document.last_publication_date", direction: "desc" }],
      })
      .then(onSuccess)
      .catch(onError)
}
