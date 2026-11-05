const FULL_ROUND = 7.5

// Segments form one track: only the outer ends are rounded so the joins read as seams, not overlaps.
export const getSegmentRound = (index, count, round) => {
  if (round !== undefined) return round
  if (count === 1) return true
  if (index === 0) return { side: "left", size: FULL_ROUND }
  if (index === count - 1) return { side: "right", size: FULL_ROUND }
  return 0
}

// 0.25 of the 4px sub-unit: a 1px seam on the spacing scale.
export const SEGMENT_GAP = 0.25
