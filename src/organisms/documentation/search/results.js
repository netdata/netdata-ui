import React from "react"
import styled from "styled-components"
import { Tabs, Tab } from "@/components/tabs"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { getColor } from "@/theme"

const Link = styled.a`
  text-decoration: none;

  &:hover,
  &:visited {
    color: ${getColor("primary")};
  }
`

const Section = ({ title, description, url }) => (
  <Flex gap={2} column>
    <Text
      strong
      dangerouslySetInnerHTML={{
        __html: title?.snippet || title?.raw || "Untitled",
      }}
    />
    {!!description && (
      <Text
        dangerouslySetInnerHTML={{
          __html: `${description?.snippet || description?.raw || "No description"}&hellip;`,
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

const keys = [
  "learn",
  // "github-cloud",
  // "github-agent",
  "community",
]
const tabValuesByKey = {
  learn: "learn.netdata",
  community: "discourse",
  "github-cloud": "netdata-cloud",
  "github-agent": "netdata",
}

const tabNameByKey = {
  learn: "Documentation",
  community: "Community",
  "github-cloud": "Github / Cloud",
  "github-agent": "Github / Agent",
}

const SearchResults = ({ results }) => {
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
          const tabResults = results[tabValuesByKey[key]]
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
