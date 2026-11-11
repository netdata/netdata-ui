import { Compare } from "../refresh/layout"
import { ProposedDividers, TodayDividers } from "./dividerScenes"
import { ProposedDots, TodayDots } from "./statusDotScenes"
import { ProposedSkeletons, TodaySkeletons } from "./skeletonScenes"

export default {
  title: "Proposals/Primitives",
  parameters: { layout: "padded" },
}

export const Divider = () => (
  <Compare
    todayNote="11 copies across CF and CH: hr borders and div fills in border, borderSecondary, disabled and separator."
    proposedNote="<Divider vertical? color='border' margin? />, 1px, theme colour only."
    today={<TodayDividers />}
    proposed={<ProposedDividers />}
  />
)

export const StatusDot = () => (
  <Compare
    todayNote="6 CF definitions, 14 inline round boxes and the CH modern Dot."
    proposedNote="<StatusDot color size={6|7|8|10} hollow pulse? />, default 7px filled, no pulse."
    today={<TodayDots />}
    proposed={<ProposedDots />}
  />
)

export const Skeleton = () => (
  <Compare
    todayNote="CF SkeletonBox (pulse), anomalies Bone + Shine, configuration Shimmer, CH Bone."
    proposedNote="<Skeleton variant='box|text|circle' width height lines />, one calm pulse."
    today={<TodaySkeletons />}
    proposed={<ProposedSkeletons />}
  />
)
