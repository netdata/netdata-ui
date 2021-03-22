import React, { useMemo } from "react"
import styled from "styled-components"
import { Tabs, Tab } from "src/components/tabs"
import Flex from "src/components/templates/flex"
import { Text } from "src/components/typography"

const Link = styled.a`
  text-decoration: none;
`

const Section = ({ title, description, url }) => (
  <Flex gap={2} column>
    <Text
      strong
      dangerouslySetInnerHTML={{
        __html: title?.snippet || "Untitled",
      }}
    />
    {!!description && (
      <Text
        dangerouslySetInnerHTML={{
          __html: `${description.snippet || "No description"}&hellip;`,
        }}
      />
    )}
    <Flex alignSelf="end">
      <Text as={Link} color="primary" href={url} target="_blank">
        Read &rarr;
      </Text>
    </Flex>
  </Flex>
)

const Container = props => (
  <Flex overflow={{ vertical: "auto" }} padding={[6, 4]} gap={6} column {...props} />
)

const StyledTabs = styled(Tabs)`
  width: 100%;

  .tabs > * {
    min-width: 160px;
    max-width: 100%;
  }
`

const domainRegexp = /^https:\/\/((learn.netdata).cloud|www.(netdata.cloud)|github.com\/netdata\/(netdata-cloud)|github.com\/netdata\/(netdata))/

const keys = ["learn", "github-cloud", "github-agent", "community"]
const tabValuesByKey = {
  learn: "learn.netdata",
  community: "netdata.cloud",
  "github-cloud": "netdata-cloud",
  "github-agent": "netdata",
}
const tabNameByKey = {
  learn: "Documentation",
  community: "Community",
  "github-cloud": "Github / Cloud",
  "github-agent": "Github / Agent",
}

const useTabbedResults = results => {
  return useMemo(() => {
    return results.reduce((acc, result) => {
      const matched = result.url.raw.match(domainRegexp)
      const key = matched.find((s, i) => i > 1 && !!s)
      acc[key] = acc[key] || []
      acc[key].push(result)
      return acc
    }, {})
  }, [results])
}

const SearchResults = ({ results }) => {
  const tabbedResults = useTabbedResults(results)

  return (
    <Flex
      overflow={{ vertical: "auto" }}
      data-testid="searchResults"
      flex
      width="1000px"
      height="60vh"
    >
      <StyledTabs>
        {keys.map(key => {
          const tabResults = tabbedResults[tabValuesByKey[key]]
          const tabResultsCount = tabResults?.length

          return (
            <Tab
              key={key}
              label={`${tabNameByKey[key]}${tabResultsCount ? `  (${tabResultsCount})` : ""}`}
            >
              <Container>
                {!tabResultsCount ? (
                  <Flex padding={[4]}>
                    <Text strong>No results</Text>
                  </Flex>
                ) : (
                  tabResults.map(result => {
                    const { id, url, title, description } = result

                    return (
                      <Section key={id.raw} url={url.raw} title={title} description={description} />
                    )
                  })
                )}
              </Container>
            </Tab>
          )
        })}
      </StyledTabs>
    </Flex>
  )
}

export default SearchResults
