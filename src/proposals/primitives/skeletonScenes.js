import React from "react"
import Flex from "@/components/templates/flex"
import { Section, Stack } from "../refresh/layout"
import { Card, Grid, Note, Sample } from "./frame"
import Divider from "./divider"
import Skeleton from "./skeleton"
import { AnomaliesBone, CfSkeletonBox, ChBone, ConfigShimmer } from "./todaySkeletons"

export const TodaySkeletons = () => (
  <Stack>
    <Section caption="Four implementations, three animations, two colour sources.">
      <Grid>
        <Sample
          name="CF styles/skeleton SkeletonBox"
          values="12px, 4px radius, borderSecondary pulse 50-100%, 1.5s ease-in"
        >
          <Flex column gap={1.5}>
            <CfSkeletonBox />
            <CfSkeletonBox width="70%" />
          </Flex>
        </Sample>
        <Sample
          name="CF anomalies Bone + Shine"
          values="borderSecondary, 4px radius, text 12% sweep 4.8s"
        >
          <Flex column gap={1.5}>
            <AnomaliesBone width="100%" height={3} />
            <AnomaliesBone width="70%" height={3} />
          </Flex>
        </Sample>
        <Sample
          name="CF configuration Shimmer"
          values="100x10px, 5px radius, border/generic gradient 1s linear, ignores reduced motion"
        >
          <Flex column gap={1.5}>
            <ConfigShimmer />
            <ConfigShimmer width="70px" />
          </Flex>
        </Sample>
        <Sample
          name="CH Bone"
          values="#E8ECEC / #1E2424 (chart provider), 4px radius, white 12% sweep 4.8s"
        >
          <Flex column gap={1.5}>
            <ChBone width="100%" height={3} />
            <ChBone width="70%" height={3} />
          </Flex>
        </Sample>
      </Grid>
    </Section>
  </Stack>
)

const rowWidths = ["62%", "48%", "70%", "54%", "40%"]

const TableLayout = () => (
  <Card gap={0} padding={[0, 0]} width={100}>
    <Flex alignItems="center" gap={4} padding={[2, 3]}>
      <Skeleton variant="text" width={30} />
      <Flex flex />
      <Skeleton variant="text" width={12} />
      <Skeleton variant="text" width={12} />
      <Skeleton variant="text" width={12} />
    </Flex>
    {rowWidths.map(width => (
      <React.Fragment key={width}>
        <Divider color="borderSecondary" />
        <Flex alignItems="center" gap={4} height={9} padding={[0, 3]}>
          <Skeleton variant="circle" width={2} />
          <Flex flex>
            <Skeleton variant="text" width={width} />
          </Flex>
          <Skeleton variant="text" width={12} />
          <Skeleton variant="text" width={12} />
          <Skeleton variant="text" width={12} />
        </Flex>
      </React.Fragment>
    ))}
  </Card>
)

const ChartCard = () => (
  <Card width={90}>
    <Flex alignItems="center" gap={2}>
      <Skeleton variant="text" width={36} height={3} />
      <Flex flex />
      <Skeleton width={6} height={6} />
      <Skeleton width={6} height={6} />
    </Flex>
    <Skeleton height={40} />
    <Flex gap={3}>
      <Skeleton variant="text" width={16} />
      <Skeleton variant="text" width={16} />
      <Skeleton variant="text" width={16} />
    </Flex>
  </Card>
)

const AvatarList = () => (
  <Card width={70} gap={4}>
    {["55%", "70%", "45%", "62%"].map(width => (
      <Flex key={width} alignItems="center" gap={3}>
        <Skeleton variant="circle" />
        <Flex column gap={1.5} flex>
          <Skeleton variant="text" width={width} />
          <Skeleton variant="text" width="35%" height={2} />
        </Flex>
      </Flex>
    ))}
  </Card>
)

export const ProposedSkeletons = () => (
  <Stack>
    <Section caption='<Skeleton variant="box|text|circle" width height lines /> - one pulse (borderSecondary 50-100%, 1.5s ease-in-out alternate), off under prefers-reduced-motion, aria-hidden.'>
      <Grid>
        <Sample name='variant="text"' values="10px line, 2px radius, width 100%">
          <Skeleton variant="text" />
        </Sample>
        <Sample name='variant="text" lines={3}' values="6px gap, last line 60%">
          <Skeleton variant="text" lines={3} />
        </Sample>
        <Sample name='variant="box" (default)' values="32px high, 4px radius, width 100%">
          <Skeleton />
        </Sample>
        <Sample name='variant="circle"' values="32px, 50%; width sets the diameter">
          <Flex gap={2} alignItems="center">
            <Skeleton variant="circle" />
            <Skeleton variant="circle" width={6} />
            <Skeleton variant="circle" width={4} />
          </Flex>
        </Sample>
      </Grid>
    </Section>
    <Section caption="Table, 5 rows: status circle, name line, three numeric cells.">
      <TableLayout />
    </Section>
    <Section caption="Chart card: title line, two icon boxes, 160px plot box, legend lines.">
      <ChartCard />
    </Section>
    <Section caption="List with avatars: 32px circle, name and meta lines.">
      <AvatarList />
    </Section>
    <Section caption="Text paragraph: lines={3}, last line shorter.">
      <Flex width={90}>
        <Skeleton variant="text" lines={3} />
      </Flex>
    </Section>
    <Note>
      Width and height take Box units (4px) or CSS strings. Containers should set aria-busy while
      loading. CH keeps its SVG chart-shape skeletons; only Bone would move to this.
    </Note>
  </Stack>
)
