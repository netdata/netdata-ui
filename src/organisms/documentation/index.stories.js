import React from "react"
import Flex from "@/components/templates/flex"
import { Button } from "@/components/button"
import Documentation from "."
import { SearchResults } from "./search"

const result = (id, title, description) => ({
  id: { raw: id },
  url: { raw: `https://learn.netdata.cloud/docs/${id}` },
  title: { snippet: title },
  description: { snippet: description },
})

export const CloudDocumentation = () => {
  return (
    // Start-aligned: a full-height flex row would stretch the trigger buttons into slabs.
    <Flex
      background="mainBackground"
      gap={4}
      padding={[4]}
      alignItems="start"
      width="100vw"
      height="100vh"
    >
      <Documentation app="cloud">
        {(toggle, isOpen) => (
          <Button
            width="auto"
            onClick={toggle}
            label={`${isOpen ? "hide" : "show"} cloud documentation modal`}
          />
        )}
      </Documentation>
      <Documentation app="agent">
        {(toggle, isOpen) => (
          <Button
            width="auto"
            onClick={toggle}
            label={`${isOpen ? "hide" : "show"} agent documentation modal`}
          />
        )}
      </Documentation>
    </Flex>
  )
}

// Static data so the results styling is reviewable without the search backend.
export const SearchResultsView = () => (
  <Flex background="dropdown" padding={[4]} round={2} border={{ side: "all", color: "border" }}>
    <SearchResults
      results={{
        "learn.netdata": [
          result(
            "alerts",
            "<em>Alert</em> notifications",
            "Configure <em>alert</em> notification methods for Slack, PagerDuty and email"
          ),
          result("silence", "Silencing <em>alert</em>s", "Mute <em>alert</em>s during maintenance"),
          result("health", "Health configuration", "Reference for health.d configuration files"),
        ],
        discourse: [],
      }}
    />
  </Flex>
)

export default {
  title: "Organisms/Documentation",
  component: Documentation,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A help panel with links to the docs, bug reporting, community and the demo space, plus docs search. You supply the trigger through a render-prop child, and the panel opens as a layer.",
      },
    },
  },
  argTypes: {
    app: {
      description: "Product the help is for. The agent variant adds a dashboard guide.",
      control: { type: "radio" },
      options: ["cloud", "agent"],
      table: { type: { summary: '"cloud" | "agent"' }, defaultValue: { summary: '"cloud"' } },
    },
    children: {
      description: "Render prop (toggle, isOpen) that returns the trigger element.",
      control: false,
      table: {
        type: { summary: "(toggle, isOpen) => ReactNode" },
        defaultValue: { summary: "undefined" },
      },
    },
    demoUrl: {
      description: "Link of the public demo space button.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "https://app.netdata.cloud/spaces/netdata-demor" },
      },
    },
    modalProps: {
      description: "Extra props spread on the panel container.",
      control: false,
      table: { type: { summary: "object" }, defaultValue: { summary: "{}" } },
    },
    onCloseClick: {
      description: "Called when the panel close button is clicked.",
      action: "onCloseClick",
      table: { type: { summary: "() => void" }, defaultValue: { summary: "undefined" } },
    },
    onVisitDocumentClick: {
      description: "Called when the docs button is clicked.",
      action: "onVisitDocumentClick",
      table: { type: { summary: "() => void" }, defaultValue: { summary: "undefined" } },
    },
    onOpenIssueClick: {
      description: "Called when the report a bug button is clicked.",
      action: "onOpenIssueClick",
      table: { type: { summary: "() => void" }, defaultValue: { summary: "undefined" } },
    },
    onOpenBugClick: {
      description: "Called when the other product issue link is clicked.",
      action: "onOpenBugClick",
      table: { type: { summary: "() => void" }, defaultValue: { summary: "undefined" } },
    },
    onContributeClick: {
      description: "Declared in the types, but the panel does not use it.",
      action: "onContributeClick",
      table: { type: { summary: "() => void" }, defaultValue: { summary: "undefined" } },
    },
    onSupportClick: {
      description: "Called when the community button is clicked.",
      action: "onSupportClick",
      table: { type: { summary: "() => void" }, defaultValue: { summary: "undefined" } },
    },
    onGoToDemoClick: {
      description: "Called when the demo button is clicked.",
      action: "onGoToDemoClick",
      table: { type: { summary: "() => void" }, defaultValue: { summary: "undefined" } },
    },
  },
}
