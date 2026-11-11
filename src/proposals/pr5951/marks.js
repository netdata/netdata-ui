// Copied from PR 5951: configItem/collectorLogo.js, workspace/addItemButton.js, templates/disclosureButton.js,
// requiredTag.js, validationIcon.js, alertEditor/silentSign.js.
import styled, { css, keyframes } from "styled-components"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon"
import { getColor, getSizeBy } from "@/theme"
import { focusRingAt, hitArea } from "./tokens"

const looks = {
  logo: css`
    background: var(--dyncfg-logo-tile);
    border: 1px solid ${getColor("borderSecondary")};
  `,
  letter: css`
    background: var(--dyncfg-letter-tile);
    border: 1px solid var(--dyncfg-letter-tile-edge);
    color: var(--dyncfg-letter-tile-text);
  `,
  plain: css`
    background: ${getColor("elementBackground")};
    border: 1px solid ${getColor("borderSecondary")};
    color: var(--dyncfg-text-secondary);
  `,
}

export const Tile = styled(Box)`
  flex: 0 0 auto;
  width: ${({ tileSize }) => getSizeBy(tileSize / 8)};
  height: ${({ tileSize }) => getSizeBy(tileSize / 8)};
  border-radius: ${({ tileSize }) => getSizeBy(Math.round(tileSize / 4) / 8)};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${({ look }) => looks[look]}
  opacity: ${({ dimmed }) => (dimmed ? 0.5 : 1)};
  filter: ${({ dimmed }) => (dimmed ? "grayscale(1)" : "none")};
  font-size: ${({ tileSize }) => Math.round(tileSize * 0.42)}px;
  font-weight: 600;
  text-transform: uppercase;
  user-select: none;

  img {
    width: 76%;
    height: 76%;
    object-fit: contain;
  }
`

const glyph = (size, filled, paths) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {paths}
  </svg>
)

export const PlugGlyph = ({ size = 13 }) =>
  glyph(size, false, [
    <path key="a" d="M9 2.5v5M15 2.5v5" />,
    <path key="b" d="M5.5 7.5h13V11a6.5 6.5 0 0 1-13 0z" />,
    <path key="c" d="M12 17.5v4" />,
  ])

export const BellGlyph = ({ size = 13 }) =>
  glyph(size, false, [
    <path key="a" d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" />,
    <path key="b" d="M10 21h4" />,
  ])

const CircleButton = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: ${getSizeBy(2.5)};
  height: ${getSizeBy(2.5)};
  border-radius: 50%;
  cursor: pointer;
  color: var(--dyncfg-text-secondary);
  transition: color 120ms ease;
  ${hitArea}

  &:hover:not([aria-disabled="true"]),
  &:focus-visible {
    color: ${getColor("primary")};
  }

  &[aria-disabled="true"] {
    color: var(--dyncfg-control-border);
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${focusRingAt(0)}
`

export const AddItemButton = ({ noun, disabled }) => (
  <CircleButton type="button" aria-label={`Add ${noun}`} aria-disabled={disabled || undefined}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  </CircleButton>
)

const Disclosure = styled(Box).attrs({ as: "button" })`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${getSizeBy(2.5)};
  height: ${getSizeBy(2.5)};
  border-radius: var(--dyncfg-radius-xs);
  cursor: pointer;

  &:hover {
    background: ${getColor("elementBackground")};
  }

  ${focusRingAt(0)}
`

export const DisclosureButton = ({ expanded, title, onToggle }) => (
  <Disclosure
    type="button"
    onClick={onToggle}
    aria-expanded={!!expanded}
    aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
  >
    <Icon
      name="chevron_down"
      color="var(--dyncfg-text-secondary)"
      size="small"
      rotate={expanded ? 2 : 0}
    />
  </Disclosure>
)

const Tag = styled(Box).attrs({ as: "span", "aria-hidden": "true" })`
  margin-left: ${getSizeBy(0.25)};
  font-size: 11px;
  line-height: 16px;
  font-weight: 400;
  color: var(--dyncfg-text-secondary);
`

export const RequiredTag = ({ ifUsed = false }) => (
  <Tag>{ifUsed ? " required if used" : " required"}</Tag>
)

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`

const IconWrapper = styled(Flex)`
  animation: ${fadeIn} 0.2s ease-in-out;
`

export const ValidationIcon = () => (
  <IconWrapper alignItems="center" justifyContent="center">
    <Icon name="warning_triangle" color="var(--dyncfg-error-text)" size="small" />
  </IconWrapper>
)

const Sign = styled(Box).attrs({ as: "span", "aria-hidden": true })`
  flex: none;
  display: inline-flex;
  color: var(--dyncfg-text-secondary);
`

export const SilentSign = () => (
  <Sign>
    <Icon name="alarm_off" width="12px" height="13px" color="currentColor" />
  </Sign>
)
