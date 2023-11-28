import clamp from "lodash/clamp"

const decimalRound = decimal => Math.round(decimal * 10) / 10.0

export const calcColWidth = positionParams => {
  const { gutter, containerWidth, gridTracks } = positionParams
  return (containerWidth - gutter * (gridTracks - 1)) / gridTracks
}

// This can either be called:
// calcItemWHPx(w, colWidth, gutter)
// or
// calcItemWHPx(h, rowHeight, gutter)
export function calcItemWHPx(gridUnits, colOrRowSize, gutterPx) {
  // 0 * Infinity === NaN, which causes problems with resize contraints
  if (!Number.isFinite(gridUnits)) return gridUnits
  return decimalRound(colOrRowSize * gridUnits + Math.max(0, gridUnits - 1) * gutterPx)
}

export function calcItemPosition(positionParams, left, top, width, height, transformed) {
  const { gutter, rowHeight } = positionParams
  const colWidth = calcColWidth(positionParams)
  const out = {}

  if (transformed) {
    out.width = calcItemWHPx(transformed.width, colWidth, gutter)
    out.height = calcItemWHPx(transformed.height, rowHeight, gutter)
    out.top = decimalRound((rowHeight + gutter) * transformed.top)
    out.left = decimalRound((colWidth + gutter) * transformed.left)
  } else {
    out.width = calcItemWHPx(width, colWidth, gutter)
    out.height = calcItemWHPx(height, rowHeight, gutter)
    out.top = decimalRound((rowHeight + gutter) * top)
    out.left = decimalRound((colWidth + gutter) * left)
  }

  return out
}

export function calcXY(positionParams, top, left, item) {
  const { gutter, gridTracks, rowHeight, maxRows } = positionParams
  const colWidth = calcColWidth(positionParams)

  let x = decimalRound((left - gutter) / (colWidth + gutter))
  let y = decimalRound((top - gutter) / (rowHeight + gutter))

  x = clamp(x, 0, gridTracks - item.width)
  y = clamp(y, 0, maxRows - item.height)

  return { left: x, top: y }
}

export const calcWH = (positionParams, width, height, item) => {
  const { gutter, maxRows, gridTracks, rowHeight } = positionParams
  const colWidth = calcColWidth(positionParams)

  let w = decimalRound((width + gutter) / (colWidth + gutter))
  let h = decimalRound((height + gutter) / (rowHeight + gutter))

  w = clamp(w, item.minWidth || 3, gridTracks - item.left)
  h = clamp(h, item.minHeight || 2, maxRows - item.top)

  return { width: w, height: h }
}
