import React, { useEffect } from "react"
import useLocalStorage from "react-use/lib/useLocalStorage"
import Pill from "src/components/pill"
import News from "."

const Wrapper = ({ children }) => {
  const [, setLastSeen] = useLocalStorage("news_last_seen")

  useEffect(() => {
    return () => setLastSeen(null)
  }, [])

  return children
}

export const CloudNews = {
  component: () => (
    <Wrapper>
      <News app="cloud">
        {({ toggle, upToDate }) => (
          <Pill icon="insights" onClick={toggle} hollow flavour={upToDate ? "neutral" : "success"}>
            Cloud news
          </Pill>
        )}
      </News>
    </Wrapper>
  ),
}

export const AgentNews = {
  component: () => (
    <Wrapper>
      <News app="agent">
        {({ toggle, upToDate }) => (
          <Pill icon="insights" onClick={toggle} hollow flavour={upToDate ? "neutral" : "success"}>
            Agent news
          </Pill>
        )}
      </News>
    </Wrapper>
  ),
}

export default {
  component: News,
}
