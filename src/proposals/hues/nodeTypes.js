// Story-only replica of the CF Overview "Total Nodes" distributions row, with node-type hue options.
import Flex from "@/components/templates/flex"
import { Text } from "@/components/typography"
import { Distribution, useIsDark } from "./distribution"

const counts = { live: 171, offline: 6, stale: 2, parents: 1, children: 176, standalone: 2 }
const alerts = { critical: 3, warning: 11 }

const statusData = [
  { label: "Live", value: counts.live, color: "success" },
  { label: "Offline", value: counts.offline, color: "offline" },
  { label: "Stale", value: counts.stale, color: "stale" },
]

const alertData = [
  { label: "Critical", value: alerts.critical, color: "error" },
  { label: "Warning", value: alerts.warning, color: "warning" },
]

const grey = step => ["neutral", `grey${step}`]
const blue = step => ["blue", `blue${step}`]

// Light themes read darkest = heaviest; on a dark surface the brightest step carries the weight.
const ramps = {
  neutral: { light: [100, 140, 170].map(grey), dark: [170, 130, 90].map(grey) },
  blue: { light: [90, 130, 170].map(blue), dark: [170, 130, 90].map(blue) },
}

const todayColors = [
  ["blue", "indigo"],
  ["purple", "lilac"],
  ["yellow", "yellow120"],
]

const nodeTypeData = ([parents, children, standalone]) => [
  { label: "Parents", value: counts.parents, color: parents },
  { label: "Children", value: counts.children, color: children },
  { label: "Standalone", value: counts.standalone, color: standalone },
]

const Column = ({ title, children }) => (
  <Flex width={{ min: "250px" }} column gap={1}>
    <Flex height="16px" alignItems="center">
      {title}
    </Flex>
    {children}
  </Flex>
)

const Count = ({ label, value }) => (
  <Text>
    {label} <Text strong>{value}</Text>
  </Text>
)

// The row as CF lays it out: Total Nodes + node types side by side, then Active Alerts.
const DistributionsRow = ({ nodeTypes }) => (
  <Flex
    alignItems="center"
    gap={4}
    padding={[3, 4]}
    round="8px"
    border={{ side: "all", color: "border" }}
  >
    <Flex alignItems="center" gap={2}>
      <Column
        title={<Count label="Total Nodes" value={counts.live + counts.offline + counts.stale} />}
      >
        <Distribution data={statusData} />
      </Column>
      <Column>{nodeTypes}</Column>
    </Flex>
    <Column title={<Count label="Active Alerts" value={alerts.critical + alerts.warning} />}>
      <Distribution data={alertData} />
    </Column>
  </Flex>
)

export const TodayNodeTypes = () => (
  <DistributionsRow nodeTypes={<Distribution data={nodeTypeData(todayColors)} />} />
)

export const RampNodeTypes = ({ ramp, swatch }) => {
  const colors = ramps[ramp][useIsDark() ? "dark" : "light"]
  return (
    <DistributionsRow
      nodeTypes={<Distribution data={nodeTypeData(colors)} textColor="text" swatch={swatch} />}
    />
  )
}
