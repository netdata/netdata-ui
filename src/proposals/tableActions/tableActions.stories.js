import { Compare } from "../refresh/layout"
import {
  ProposedBulkActions,
  ProposedOverflowRowActions,
  ProposedRevealRowActions,
  ProposedRowActions,
  TodayBulkActions,
  TodayRowActions,
} from "./scenes"

export default {
  title: "Proposals/Table actions",
  parameters: { layout: "padded" },
}

export const RowActions = () => (
  <Compare
    todayNote="Real Table rowActions: borderless IconButton, 14px glyph, padding [0.5], per-action iconColor (primaryAI for AI). No resting shape; hover is a borderSecondary blob."
    proposedNote="<Action flavour='chip' shape='circle|square' tone='neutral|ai' /> via <Table actionsLook='chips' />. 28px (row height unchanged), border token, textLite glyph; hover primary 0.1 fill, primary 0.5 border, primary glyph; tone='ai' is a primaryAI-tinted chip; disabled 40%, no hover; focusRing."
    today={<TodayRowActions />}
    proposed={<ProposedRowActions />}
  />
)

export const RowActionsOnHover = () => (
  <Compare
    todayNote="Every action is always visible on every row."
    proposedNote="<Table actionsLook='chips' revealOnHover /> (primary = first action, or <Action primary />). Calmer rows and less scanning noise, but secondary actions are invisible until hover, undiscoverable on touch, and need focus-within for keyboard users."
    today={<TodayRowActions />}
    proposed={<ProposedRevealRowActions />}
  />
)

export const HeaderAndBulkActions = () => (
  <Compare
    todayNote="Real Table bulkActions + column visibility: loose borderless icons, no selection count, disabled state is the only selection cue."
    proposedNote="<Table actionsLook='chips' bulkActionsLook='track' />: 28px pill track (textLite 0.06 fill, borderSecondary), 24px quiet chips inside; with a selection the track tints primary and leads with 'N selected'. Columns chip is a placeholder here."
    today={<TodayBulkActions />}
    proposed={<ProposedBulkActions />}
  />
)

export const GroupedLikeAddNew = () => (
  <Compare
    todayNote="Six actions on one row: a 210px strip of equal-weight icons."
    proposedNote="<Table actionsLook='chips' rowActionsOverflow={{ after: 3, look: 'fan' }} /> when a row has more than 4 actions. The topbar Add new stack (20px chips, 4px overlap, 200ms fan, static under reduced motion) as a pill trigger opening a Menu. Order rowActions by priority."
    today={<TodayRowActions />}
    proposed={<ProposedOverflowRowActions />}
  />
)
