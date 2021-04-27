import React, { Fragment } from "react"
import styled from "styled-components"
import { getColor } from "src/theme"
import { Text, H5 } from "src/components/typography"
import { Icon } from "src/components/icon"
import { Button } from "src/components/button"
import Flex from "src/components/templates/flex"

const Anchor = styled(Text).attrs({ as: "a", target: "_blank" })`
  &&& {
    text-decoration: none;
    color: ${getColor("primary")};

    &:hover {
      color: ${getColor("accent")};
      text-decoration: none;
    }
  }
`

const Section = ({ icon, title, content, url, children, testid, label, onClick }) => (
  <Flex width="100%" column gap={2}>
    <Flex gap={2} alignItems="center">
      <Icon color="text" name={icon} width="18px" height="18px" />
      <H5 margin={[0]}>{title}</H5>
    </Flex>
    <Flex column gap={4} padding={[0, 2]}>
      <Text>{content}</Text>
      <Button
        width="100%"
        onClick={onClick}
        label={label}
        data-testid={testid}
        {...(url && { as: "a", target: "_blank", href: url })}
      />
      {children}
    </Flex>
  </Flex>
)

const propsByApp = {
  cloud: {
    documentationUrl: "https://learn.netdata.cloud/",
    issuesUrl:
      "https://github.com/netdata/netdata-cloud/issues/new?assignees=manos-saratsis&labels=bug&template=submig-a-bug-for-netdata-cloud.md&title=%5BBUG%5D",
    issuesLabel: "Let us know about any bugs you’ve encountered in Netdata Cloud.",
    otherIssuesUrl:
      "https://github.com/netdata/netdata/issues/new?assignees=&labels=bug%2C+needs+triage&template=bug_report.md",
    otherIssuesLabel: "Agent",
    communityUrl: "https://community.netdata.cloud/c/support/cloud-support/15",
    communitySupportUrl: "https://www.netdata.cloud/community/",
  },
  agent: {
    documentationUrl: "https://learn.netdata.cloud/",
    issuesUrl:
      "https://github.com/netdata/netdata/issues/new?assignees=&labels=bug%2C+needs+triage&template=bug_report.md",
    issuesLabel: "Let us know about any bugs you’ve encountered in Netdata Agent.",
    otherIssuesUrl:
      "https://github.com/netdata/netdata-cloud/issues/new?assignees=manos-saratsis&labels=bug&template=submig-a-bug-for-netdata-cloud.md&title=%5BBUG%5D",
    otherIssuesLabel: "Cloud",
    communityUrl: "https://community.netdata.cloud/c/support/agent-support/14",
    communitySupportUrl: "https://www.netdata.cloud/community/",
  },
}

const General = ({
  app,
  onDashboardClick,
  onVisitDocumentClick,
  onOpenIssueClick,
  onOpenBugClick,
  onContributeClick,
  onSupportClick,
}) => {
  const {
    documentationUrl,
    issuesUrl,
    issuesLabel,
    communityUrl,
    communitySupportUrl,
    otherIssuesUrl,
    otherIssuesLabel,
  } = propsByApp[app] || propsByApp.cloud

  return (
    <Fragment>
      {app === "agent" && (
        <Fragment>
          <Section
            icon="dashboard"
            title="Dashboard"
            content="Learn how to interact with graphs using your mouse or touch interface."
            testid="dashboard-info"
            label="Learn to use the Dashboard"
            onClick={onDashboardClick}
          />
          <Flex width="100%" height={{ min: "1px" }} background="disabled"></Flex>
        </Fragment>
      )}
      <Section
        icon="documentation"
        title="Documentation"
        content="View how-tos, reference docs, and tutorials to help you get the most out of Netdata Cloud.
        "
        url={documentationUrl}
        testid="documentation-link"
        label="Visit the docs"
        onClick={onVisitDocumentClick}
      />
      <Section
        icon="unknownError"
        title="Report a Bug"
        content={issuesLabel}
        url={issuesUrl}
        testid="documentation-report-bug-link"
        label="Open a new Issue in Github"
        onClick={onOpenIssueClick}
      >
        <Text>
          Found a bug with the Netdata {otherIssuesLabel}?
          <Anchor href={otherIssuesUrl} onClick={onOpenBugClick}>
            Open an issue
          </Anchor>{" "}
          on Github
        </Text>
      </Section>
      <Section
        icon="community"
        title="Community"
        content="If you still need help, join Netdata’s community forums to ask questions, discuss features, or make feature requests."
        url={communityUrl}
        testid="documentation-community-link"
        label="Ask the community"
        onClick={onContributeClick}
      >
        <Button
          width="100%"
          label="Read more about Netdata’s community"
          flavour="hollow"
          as="a"
          target="_blank"
          href={communitySupportUrl}
          data-testid="documentation-community-support-link"
          onClick={onSupportClick}
        />
      </Section>
    </Fragment>
  )
}

export default General
