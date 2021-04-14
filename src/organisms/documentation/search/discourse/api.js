import axios from "axios"

const transformResponse = data => {
  try {
    const parsed = JSON.parse(data)
    const { topics = [] } = parsed

    return topics.map(({ id, title, fancy_title: fancyTitle, slug }) => ({
      id: { raw: id },
      title: { raw: title },
      description: { raw: fancyTitle },
      url: { raw: `https://community.netdata.cloud/t/${slug}` },
    }))
  } catch (error) {
    return error
  }
}

const config = {
  headers: { "Content-Type": "application/json" },
  transformResponse,
}

const fetchTopics = async (searchTerm, onSuccess) => {
  try {
    const response = await axios(
      `https://community.netdata.cloud/search.json?q=${searchTerm}`,
      config
    )

    if (!response.data) return
    if (onSuccess) onSuccess(response)
  } catch (e) {
    return
  }
}

export default fetchTopics
