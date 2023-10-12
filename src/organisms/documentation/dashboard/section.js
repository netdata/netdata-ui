import React from "react"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { Icon } from "@/components/icon"

const borderProps = {
  border: { side: "top", color: "disabled" },
  padding: [6, 0, 0],
}

const Section = ({ title, children, topBorder = true, ...rest }) => (
  <Flex column {...(topBorder && borderProps)} {...rest}>
    <Flex margin={[0, 0, 2]} gap={2}>
      <Icon name="insights" color="text" width="18px" height="18px" />
      <Text strong>{title}</Text>
    </Flex>
    {typeof children === "string" ? <Text>{children}</Text> : children}
  </Flex>
)

export const Container = props => (
  <Flex overflow={{ vertical: "auto" }} padding={[6, 4]} gap={6} column {...props} />
)

export default Section
