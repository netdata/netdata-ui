import React, { Fragment } from "react"
import styled from "styled-components"
import { getColor } from "@/theme"
import { H5, Text } from "@/components/typography"
import { Icon } from "@/components/icon"
import { Button } from "@/components/button"
import Flex from "@/components/templates/flex"

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

const Section = ({
  icon,
  title,
  content,
  url,
  children,
  testid,
  label,
  labelTransform,
  onClick,
}) => (
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
        {...(labelTransform && { textTransform: labelTransform })}
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
      "https://github.com/netdata/netdata-cloud/issues/new?labels=bug&template=submig-a-bug-for-netdata-cloud.md&title=%5BBUG%5D",
    issuesLabel: "Let us know about any bugs you’ve encountered in Netdata Cloud.",
    otherIssuesUrl:
      "https://github.com/netdata/netdata/issues/new?assignees=&labels=bug%2Cneeds+triage&template=BUG_REPORT.yml&title=%5BBug%5D%3A+",
    otherIssuesLabel: "Agent",
    communitySupportUrl: "https://www.netdata.cloud/community/",
  },
  agent: {
    documentationUrl: "https://learn.netdata.cloud/",
    issuesUrl:
      "https://github.com/netdata/netdata/issues/new?assignees=&labels=bug%2Cneeds+triage&template=BUG_REPORT.yml&title=%5BBug%5D%3A+",
    issuesLabel: "Let us know about any bugs you’ve encountered in Netdata Agent.",
    otherIssuesUrl:
      "https://github.com/netdata/netdata-cloud/issues/new?labels=bug&template=submig-a-bug-for-netdata-cloud.md&title=%5BBUG%5D",
    otherIssuesLabel: "Cloud",
    communitySupportUrl: "https://www.netdata.cloud/community/",
  },
}

const General = ({
  app,
  onDashboardClick,
  onVisitDocumentClick,
  onOpenIssueClick,
  onOpenBugClick,
  onSupportClick,
  onGoToDemoClick,
  demoUrl = "https://app.netdata.cloud/spaces/netdata-demor", // for dashboard, todo
}) => {
  const {
    documentationUrl,
    issuesUrl,
    issuesLabel,
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
          <Flex width="100%" height={{ min: "1px" }} background="disabled" />
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
        label="Open a new Issue in GitHub"
        labelTransform="none"
        onClick={onOpenIssueClick}
      >
        <Text>
          Found a bug with the Netdata {otherIssuesLabel}?
          <Anchor href={otherIssuesUrl} onClick={onOpenBugClick}>
            Open an issue
          </Anchor>{" "}
          on GitHub
        </Text>
      </Section>
      <Section
        icon="community"
        title="Community"
        content="If you need help or would like to contribute to Netdata, join our Community and ask questions, discuss topics, or propose feature requests."
        url={communitySupportUrl}
        testid="documentation-community-support-link"
        label="Join the Community"
        onClick={onSupportClick}
      />
      <Section
        icon="spaces_v2"
        title="Public demo space"
        content="Netdata has a public demo space where you can explore different monitoring use-cases. Jump into any that might interest you and put your hands-on our monitoring solution!"
        url={demoUrl}
        testid="demo-link"
        label="Go to demo"
        onClick={onGoToDemoClick}
      />
    </Fragment>
  )
}

export default General
