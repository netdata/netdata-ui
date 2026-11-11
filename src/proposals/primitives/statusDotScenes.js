import Flex from "@/components/templates/flex"
import { Text, TextSmall } from "@/components/typography"
import { Row, Section, Stack } from "../refresh/layout"
import { Card, Grid, Note, Sample } from "./frame"
import StatusDot from "./statusDot"
import {
  CfAlertStatusDot,
  CfErrorIndicator,
  CfInlineDot,
  CfMcpStatusDot,
  CfReportStatusDot,
  CfUnreachableIndicator,
  CfWarningIndicator,
  ChDot,
} from "./today"

const inlineGap = [0, 1, 0, 0]

const Label = props => <TextSmall color="text" {...props} />

export const TodayDots = () => (
  <Stack>
    <Section caption="Six local definitions, 6 / 8px, two radius tricks (50% vs 4px on an 8px box).">
      <Grid>
        <Sample name="CF mcpConnections statusDot" values="8px, 50%, primary / error / border">
          <Row>
            <CfMcpStatusDot color="primary" />
            <CfMcpStatusDot color="error" />
            <CfMcpStatusDot color="border" />
          </Row>
        </Sample>
        <Sample
          name="CF alertsList / alertNameCell"
          values="8px, 50%, error / warning / success / text"
        >
          <Row>
            <CfAlertStatusDot color="error" />
            <CfAlertStatusDot color="warning" />
            <CfAlertStatusDot color="success" />
            <CfAlertStatusDot color="text" />
          </Row>
        </Sample>
        <Sample name="CF alerts indicators" values="8px, radius 4px, 4px right margin">
          <Row gap={0}>
            <CfErrorIndicator />
            <CfWarningIndicator />
            <CfUnreachableIndicator />
          </Row>
        </Sample>
        <Sample name="CF insights ReportStatusDot" values="6px, 50%, optional 1.6s opacity blink">
          <Row>
            <CfReportStatusDot background="success" />
            <CfReportStatusDot background="primary" isBlinking />
            <Label>blinking</Label>
          </Row>
        </Sample>
        <Sample name="CF inline round boxes (14 copies)" values="6-8px, 50%">
          <Row>
            <CfInlineDot px={6} color="success" />
            <CfInlineDot px={7} color="warning" />
            <CfInlineDot px={8} color="error" />
          </Row>
        </Sample>
        <Sample name="CH modern Dot" values="size 2 = 8px, radius 999px, colour by caller">
          <Row>
            <ChDot background="success" />
            <ChDot background="warning" />
            <ChDot background="error" />
          </Row>
        </Sample>
      </Grid>
    </Section>
  </Stack>
)

const nodes = [
  { name: "ip-10-0-1-12", color: "live", hollow: false, state: "Live" },
  { name: "db-primary-02", color: "stale", hollow: true, state: "Stale" },
  { name: "edge-cache-07", color: "offline", hollow: true, state: "Offline" },
]

const alerts = [
  { name: "disk_space_usage", color: "error", state: "Critical" },
  { name: "10min_cpu_usage", color: "warning", state: "Warning" },
  { name: "ram_in_use", color: "success", state: "Clear" },
]

const ListRow = ({ children }) => (
  <Flex alignItems="center" gap={2} height={7}>
    {children}
  </Flex>
)

const NodeList = () => (
  <Card gap={0} padding={[1, 3]} width={70}>
    {nodes.map(({ name, color, hollow, state }) => (
      <ListRow key={name}>
        <StatusDot color={color} hollow={hollow} />
        <Text>{name}</Text>
        <Flex flex />
        <TextSmall color="textLite">{state}</TextSmall>
      </ListRow>
    ))}
  </Card>
)

const AlertList = () => (
  <Card gap={0} padding={[1, 3]} width={70}>
    {alerts.map(({ name, color, state }) => (
      <ListRow key={name}>
        <StatusDot color={color} size={8} aria-label={state} />
        <Text>{name}</Text>
        <Flex flex />
        <TextSmall color={color}>{state}</TextSmall>
      </ListRow>
    ))}
  </Card>
)

export const ProposedDots = () => (
  <Stack>
    <Section caption='<StatusDot color="success" size={7} hollow={false} pulse={false} /> - span, 50%, theme colour. Same visuals as the Pill dot.'>
      <Grid>
        <Sample name="size 6 / 7 (default) / 8 / 10" values="px diameters; 7 matches the Pill dot">
          <Row>
            {[6, 7, 8, 10].map(size => (
              <StatusDot key={size} color="success" size={size} />
            ))}
          </Row>
        </Sample>
        <Sample name="hollow" values="1.5px ring, transparent centre">
          <Row>
            {[6, 7, 8, 10].map(size => (
              <StatusDot key={size} color="stale" size={size} hollow />
            ))}
          </Row>
        </Sample>
        <Sample
          name="color"
          values="any theme key: live, stale, offline, error, warning, attention"
        >
          <Row>
            {["live", "stale", "offline", "error", "warning", "attention"].map(color => (
              <StatusDot key={color} color={color} />
            ))}
          </Row>
        </Sample>
        <Sample
          name="pulse (optional extra, off by default)"
          values="ripple 1.6s ease-out; none under reduced motion"
        >
          <Row>
            <StatusDot color="live" pulse />
            <Label>Live now</Label>
          </Row>
        </Sample>
      </Grid>
    </Section>
    <Section caption="Node status list: live filled, stale and offline hollow.">
      <NodeList />
    </Section>
    <Section caption="Alert indicators: size 8, aria-label when the dot carries the status alone.">
      <AlertList />
    </Section>
    <Section caption="Inline with text: vertical-align middle; 4px gap via margin={[0, 1, 0, 0]}.">
      <Flex column gap={1}>
        <Text>
          <StatusDot color="live" margin={inlineGap} />
          128 nodes live, <StatusDot color="stale" hollow margin={inlineGap} />4 stale,{" "}
          <StatusDot color="offline" hollow margin={inlineGap} />2 offline
        </Text>
        <TextSmall color="textLite">
          <StatusDot color="error" size={6} margin={inlineGap} />3 critical alerts in this room
        </TextSmall>
      </Flex>
    </Section>
    <Note>
      Colour stays the caller&apos;s mapping (statusPropsByHealthStatus, alertPill colors). The kit only
      takes a theme key. The Pill would render this same component for its dot.
    </Note>
  </Stack>
)
