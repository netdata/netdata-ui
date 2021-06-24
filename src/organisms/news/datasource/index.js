import Prismic from "@prismicio/client"

const apiEndpoint = "https://netdata-news.cdn.prismic.io/api/v2"
const client = Prismic.client(apiEndpoint)

export const fetchNews = (app, onSuccess, onError) => {
  return client
    .query(Prismic.Predicates.at("document.tags", [app]), {
      pageSize: 100,
      orderings: "[document.last_publication_date desc]",
    })
    .then(onSuccess)
    .catch(onError)
}
