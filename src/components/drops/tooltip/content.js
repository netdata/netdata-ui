import React from "react"
import Flex from "src/components/templates/flex"
import { Icon } from "src/components/icon"
import { H6, TextSmall } from "src/components/typography"

const Content = ({ content, icon, iconColor, title, ...rest }) => (
  <Flex column data-testid="tooltip-content" gap={1} round {...rest}>
    {title && (
      <Flex data-testid="tooltip-header" gap={2}>
        {icon && (
          <Icon
            {...(iconColor !== "default" ? { color: iconColor || "bright" } : {})}
            data-testid="tooltip-icon"
            title={icon}
            name={icon}
            width="14px"
            height="14px"
          />
        )}
        <H6 color="bright" data-testid="tooltip-title" margin={[0]}>
          {title}
        </H6>
      </Flex>
    )}
    {content && (
      <TextSmall color="bright" data-testid="tooltip-description">
        {content}
      </TextSmall>
    )}
  </Flex>
)

export default Content
