import React from "react"
import Pill from "@/components/pill"
import News from "."

export const CloudNews = () => (
  <News app="cloud">
    {({ toggle, upToDate }) => (
      <Pill icon="insights" onClick={toggle} hollow flavour={upToDate ? "neutral" : "success"}>
        Cloud news
      </Pill>
    )}
  </News>
)

export const AgentNews = () => (
  <News app="agent">
    {({ toggle, upToDate }) => (
      <Pill icon="insights" onClick={toggle} hollow flavour={upToDate ? "neutral" : "success"}>
        Agent news
      </Pill>
    )}
  </News>
)

export default {
  component: News,
}
