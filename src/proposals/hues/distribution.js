// Story-only replica of cloud-frontend `components/distribution` (ProgressBar + dot legend).
import React from "react"
import { useTheme } from "styled-components"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import ProgressBar from "@/components/progressBar"

export const useIsDark = () => useTheme().name === "Dark"

// Same rounding as CF `distribution/utils.js`, so tiny segments vanish exactly as they do in the app.
const toSegments = data => {
  const total = data.reduce((sum, { value }) => sum + value, 0)
  if (total === 0) return data.map(item => ({ ...item, width: "0%" }))
  let used = 0
  return data.map((item, index) => {
    const width = index === data.length - 1 ? 100 - used : Math.floor((item.value / total) * 100)
    used += width
    return { ...item, width: `${width}%` }
  })
}

const swatchRound = { dot: "50%", square: "2px" }

const LegendItem = ({ label, value, color, textColor, swatch }) => (
  <Flex alignItems="center" gap={1} padding={[1, 2]}>
    <Box width="8px" height="8px" round={swatchRound[swatch]} background={color} />
    <Text color={textColor || color} whiteSpace="nowrap">
      {label} {value}
    </Text>
  </Flex>
)

export const Distribution = ({ data, textColor, swatch = "dot" }) => (
  <Flex width="100%" column gap={1}>
    <ProgressBar
      background="borderSecondary"
      border="none"
      containerWidth="100%"
      height={2}
      value={toSegments(data)}
    />
    <Flex alignItems="center" flexWrap>
      {data.map(item => (
        <LegendItem key={item.label} textColor={textColor} swatch={swatch} {...item} />
      ))}
    </Flex>
  </Flex>
)
