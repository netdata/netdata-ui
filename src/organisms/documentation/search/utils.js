const domainRegexp =
  /^https:\/\/((learn.netdata).cloud|www.(netdata.cloud)|github.com\/netdata\/(netdata-cloud)|github.com\/netdata\/(netdata))/

export const getResultsByKey = results => {
  return results.reduce((acc, result) => {
    const matched = result.url.raw.match(domainRegexp)
    const key = matched.find((s, i) => i > 1 && s)
    acc[key] = acc[key] || []
    acc[key].push(result)
    return acc
  }, {})
}
