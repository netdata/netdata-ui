import styled from "styled-components"
import { Tabs, Tab } from "@/components/tabs"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { getColor, getSizeBy } from "@/theme"

const Link = styled.a`
  text-decoration: none;

  &:hover {
    color: ${getColor("primary")};
    text-decoration: underline;
    text-underline-offset: ${getSizeBy(0.25)};
  }

  &:visited {
    color: ${getColor("primary")};
  }
`

const TitleLink = styled(Text).attrs({ as: "a", target: "_blank", strong: true })`
  text-decoration: none;

  &:hover {
    color: ${getColor("primary")};
  }
`

const Row = styled(Flex).attrs({ gap: 1, column: true, padding: [3, 0] })`
  &:not(:last-child) {
    border-bottom: 1px solid ${getColor("border")};
  }

  /* Elastic wraps matches in <em>; italics are hard to scan, bold ink is not. */
  em {
    font-style: normal;
    font-weight: 600;
    color: ${getColor("main")};
  }
`

const Section = ({ title, description, url }) => (
  <Row>
    <TitleLink
      href={url}
      dangerouslySetInnerHTML={{
        __html: title?.snippet || title?.raw || "Untitled",
      }}
    />
    {!!description && (
      <Text
        color="textLite"
        dangerouslySetInnerHTML={{
          __html: `${description?.snippet || description?.raw || "No description"}&hellip;`,
        }}
      />
    )}
    <Flex alignSelf="end">
      <Text as={Link} color="primary" href={url} target="_blank">
        Read
      </Text>
    </Flex>
  </Row>
)

const Container = props => (
  <Flex overflow={{ vertical: "auto" }} padding={[2, 4]} column {...props} />
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
      // The layer is shrink-wrapped, so a % width would collapse; 136px = the layer's 68px side margins.
      width={{ base: "1000px", max: "calc(100vw - 136px)" }}
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
