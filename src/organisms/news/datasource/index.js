import * as prismic from "@prismicio/client"

const client = prismic.createClient("https://netdata-news.cdn.prismic.io/api/v2")

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
