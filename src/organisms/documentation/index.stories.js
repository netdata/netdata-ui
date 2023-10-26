import React from "react"
import Flex from "@/components/templates/flex"
import { Button } from "@/components/button"
import Documentation from "."

export const CloudDocumentation = () => {
  return (
    <Flex background="mainBackgroundDisabled" gap={4} width="100vw" height="100vh">
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

export default {
  component: Documentation,
}
