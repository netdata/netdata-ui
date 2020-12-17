import React from "react"
import styled from "styled-components"
import { useToggle } from "react-use"
import { getColor } from "src/theme"
import { Text, H5 } from "src/components/typography"
import { Icon } from "src/components/icon"
import { Button } from "src/components/button"
import Flex from "src/components/templates/flex"
import Layer from "src/components/templates/layer"

const Container = styled(Flex).attrs({
  padding: [6],
  width: { max: "325px" },
  background: "mainBackground",
  gap: 8,
  column: true,
  round: true,
  overflow: { vertical: "auto" },
})`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Anchor = styled(Text).attrs({ as: "a", color: "primary", target: "_blank" })`
  text-decoration: none;
  &:hover {
    ${getColor("accent")}
    text-decoration: none;
  }
`

const Section = ({ icon, title, content, url, children, testid, label }) => (
  <Flex width="100%" column gap={2}>
    <Flex gap={2} alignItems="center">
      <Icon color="text" name={icon} width="18px" height="18px" />
      <H5 margin={[0]}>{title}</H5>
    </Flex>
    <Flex column gap={4} padding={[0, 2]}>
      <Text>{content}</Text>
      <Button width="100%" label={label} as="a" target="_blank" href={url} data-testid={testid} />
      {children}
    </Flex>
  </Flex>
)

const propsByApp = {
  cloud: {
    documentationUrl: "https://learn.netdata.cloud/",
    issuesUrl: "https://github.com/netdata/netdata-cloud/issues/new",
    otherIssuesUrl: "https://github.com/netdata/netdata/issues/new",
    otherIssuesLabel: "an Agent",
    communityUrl: "https://community.netdata.cloud/c/support/13",
    communitySupportUrl: "https://community.netdata.cloud/",
  },
  agent: {
    documentationUrl: "https://learn.netdata.cloud/",
    issuesUrl: "https://github.com/netdata/netdata/issues/new",
    otherIssuesUrl: "https://github.com/netdata/netdata-cloud/issues/new",
    otherIssuesLabel: "a Cloud",
    communityUrl: "https://community.netdata.cloud/c/support/13",
    communitySupportUrl: "https://community.netdata.cloud/",
  },
}

const Documentation = ({ app = "cloud", children }) => {
  const {
    documentationUrl,
    issuesUrl,
    communityUrl,
    communitySupportUrl,
    otherIssuesUrl,
    otherIssuesLabel,
  } = propsByApp[app] || propsByApp.cloud
  const [isOpen, toggle] = useToggle()

  return (
    <>
      {children(toggle, isOpen)}
      {isOpen && (
        <Layer
          position="bottom-right"
          backdrop
          margin={[5, 1]}
          onClickOutside={toggle}
          onEsc={toggle}
        >
          <Container data-testid="documentation-layer">
            <Flex
              width="100%"
              alignItems="center"
              justifyContent="between"
              padding={[0, 0, 4]}
              border={{ side: "bottom", color: "disabled" }}
            >
              <Flex gap={2} alignItems="center">
                <Icon color="text" name="questionFilled" width="18px" height="18px" />
                <H5 margin={[0]}>Need help</H5>
              </Flex>
              <Button
                icon="x"
                neutral
                small
                onClick={toggle}
                flavour="borderless"
                data-testid="documentation-help-close"
              />
            </Flex>
            <Section
              icon="documentation"
              title="Documentation"
              content="View documentation, guides, and videos for single-node and infrastructure
                  monitoring with Netdata."
              url={documentationUrl}
              testid="documentation-link"
              label="Visit Documentation"
            />
            <Section
              icon="unknownError"
              title="Report a Bug"
              content="Raise a bug about Netdata Cloud or inform us for any issue you face."
              url={issuesUrl}
              testid="documentation-report-bug-link"
              label="Open a new Issue in Github"
            >
              <Text>
                Or{" "}
                <Anchor href={otherIssuesUrl}>
                  click here
                </Anchor>{" "}
                to raise {otherIssuesLabel} bug.
              </Text>
            </Section>
            <Section
              icon="community"
              title="Community"
              content="Join the Netdata Community, ask questions, discuss with users and the Netdata
                  team, make feature requests."
              url={communityUrl}
              testid="documentation-community-link"
              label="Contribute to the Community"
            >
              <Button
                width="100%"
                label="Community support"
                flavour="hollow"
                as="a"
                target="_blank"
                href={communitySupportUrl}
                data-testid="documentation-community-support-link"
              />
            </Section>
          </Container>
        </Layer>
      )}
    </>
  )
}

export default Documentation
