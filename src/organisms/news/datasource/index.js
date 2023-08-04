import * as prismic from "@prismicio/client"

const apiEndpoint = "https://netdata-news.cdn.prismic.io/api/v2"
const client = prismic.createClient(apiEndpoint)

export const fetchNews = (app, onSuccess, onError) => {
  return client
    .get({
      filters: [prismic.filter.any("document.tags", Array.isArray(app) ? app : [app])],
      pageSize: 100,
      orderings: [{ field: "document.last_publication_date", direction: "desc" }],
    })
    .then(onSuccess)
    .catch(onError)
}
