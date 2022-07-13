import React, { useEffect } from "react"
import useLocalStorage from "react-use/lib/useLocalStorage"
import { storiesOf } from "@storybook/react"
import { readmeCleanup } from "utils/readme"
import Pill from "src/components/pill"
import readme from "./README.md"
import News from "./index"

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["index.test.js"],
}

const story = storiesOf("ORGANISMS|News/News", module)

const Wrapper = ({ children }) => {
  const [, setLastSeen] = useLocalStorage("news_last_seen")

  useEffect(() => {
    return () => setLastSeen(null)
  }, [])

  return children
}

const CloudNews = () => (
  <Wrapper>
    <News app="cloud">
      {({ toggle, upToDate }) => (
        <Pill icon="insights" onClick={toggle} hollow flavour={upToDate ? "neutral" : "success"}>
          Cloud news
        </Pill>
      )}
    </News>
  </Wrapper>
)

const AgentNews = () => (
  <Wrapper>
    <News app="agent">
      {({ toggle, upToDate }) => (
        <Pill icon="insights" onClick={toggle} hollow flavour={upToDate ? "neutral" : "success"}>
          Agent news
        </Pill>
      )}
    </News>
  </Wrapper>
)

story.add("Cloud News", CloudNews, subData)
story.add("Agent News", AgentNews, subData)
