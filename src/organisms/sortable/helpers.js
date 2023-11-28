const log = false

export const findBottom = items =>
  items.reduce((max, item) => (item.top + item.height > max ? item.top + item.height : max), 0)

export const getLayoutItem = (layout, id) => {
  if (!Array.isArray(layout)) return

  return layout.find(item => item.id === id)
}

export const collides = (l1, l2) => {
  if (l1.id === l2.id) return false // same element
  if (l1.left + l1.width <= l2.left) return false // l1 is left of l2
  if (l1.left >= l2.left + l2.width) return false // l1 is right of l2
  if (l1.top + l1.height <= l2.top) return false // l1 is above l2
  if (l1.top >= l2.top + l2.height) return false // l1 is below l2
  return true // boxes overlap
}

export const getAllCollisions = (layout, layoutItem) => {
  return layout.filter(item => collides(item, layoutItem))
}

export const getFirstCollision = (layout, layoutItem) => {
  return layout.find(item => collides(item, layoutItem))
}

export const sortLayoutItemsByColRow = layout => {
  return layout.slice(0).sort(function (a, b) {
    if (a.left > b.left || (a.left === b.left && a.top > b.top)) {
      return 1
    }
    return -1
  })
}

export const sortLayoutItemsByRowCol = layout => {
  return layout.slice(0).sort(function (a, b) {
    if (a.top > b.top || (a.top === b.top && a.left > b.left)) {
      return 1
    }
    return -1
  })
}

export const sortLayoutItems = (layout, compactType) => {
  if (compactType === "horizontal") return sortLayoutItemsByColRow(layout)
  if (compactType === "vertical") return sortLayoutItemsByRowCol(layout)
  else return layout
}

export const cloneLayout = layout => layout.reduce((l, item) => [...l, { ...item }], [])

export const moveItemAwayFromCollision = (
  layout,
  collidesWith,
  itemToMove,
  isUserAction,
  compactType,
  gridTracks
) => {
  const compactH = compactType === "horizontal"
  // Compact vertically if not set to horizontal
  const compactV = compactType === "vertical"
  const preventCollision = collidesWith.static // we're already colliding (not for static items)

  // If there is enough space above the collision to put this element, move it there.
  // We only do this on the main collision as this can get funky in cascades and cause
  // unwanted swapping behavior.
  if (isUserAction) {
    // Reset isUserAction flag because we're not in the main collision anymore.
    isUserAction = false

    // Make a mock item so we don't modify the item here, only modify in moveItem.
    const fakeItem = {
      left: compactH ? Math.max(collidesWith.left - itemToMove.width, 0) : itemToMove.left,
      top: compactV ? Math.max(collidesWith.top - itemToMove.height, 0) : itemToMove.top,
      width: itemToMove.width,
      height: itemToMove.height,
      id: "-1",
    }

    const firstCollision = getFirstCollision(layout, fakeItem)
    const collisionNorth =
      firstCollision && firstCollision.top + firstCollision.height > collidesWith.top
    const collisionWest =
      firstCollision && collidesWith.left + collidesWith.width > firstCollision.left

    // No collision? If so, we can go up there; otherwise, we'll end up moving down as normal
    if (!firstCollision) {
      if (log)
        console.log(
          `Doing reverse collision on ${itemToMove.id} up to [${fakeItem.left},${fakeItem.top}].`
        )
      return moveItem(
        layout,
        itemToMove,
        compactH ? fakeItem.left : undefined,
        compactV ? fakeItem.top : undefined,
        isUserAction,
        preventCollision,
        compactType,
        gridTracks
      )
    } else if (collisionNorth && compactV) {
      return moveItem(
        layout,
        itemToMove,
        undefined,
        collidesWith.top + 1,
        isUserAction,
        preventCollision,
        compactType,
        gridTracks
      )
    } else if (collisionNorth && compactType == null) {
      collidesWith.top = itemToMove.top
      itemToMove.top = itemToMove.top + itemToMove.height

      return layout
    } else if (collisionWest && compactH) {
      return moveItem(
        layout,
        collidesWith,
        itemToMove.left,
        undefined,
        isUserAction,
        preventCollision,
        compactType,
        gridTracks
      )
    }
  }

  const newX = compactH ? itemToMove.left + 1 : undefined
  const newY = compactV ? itemToMove.top + 1 : undefined

  if (newX == null && newY == null) {
    return layout
  }
  return moveItem(
    layout,
    itemToMove,
    compactH ? itemToMove.left + 1 : undefined,
    compactV ? itemToMove.top + 1 : undefined,
    isUserAction,
    preventCollision,
    compactType,
    gridTracks
  )
}

export const moveItem = (
  layout,
  l,
  left,
  top,
  isUserAction,
  preventCollision,
  compactType,
  gridTracks,
  allowOverlap
) => {
  // If this is static and not explicitly enabled as draggable,
  // no move is possible, so we can short-circuit this immediately.
  if (l.static) return layout

  // Short-circuit if nothing to do.
  if (l.top === top && l.left === left) return layout

  if (log)
    console.log(
      `Moving element ${l.id} to [${String(left)},${String(top)}] from [${l.left},${l.top}]`
    )
  const oldLeft = l.left
  const oldTop = l.top

  // This is quite a bit faster than extending the object
  if (typeof left === "number") l.left = left
  if (typeof top === "number") l.top = top

  l.moved = true

  // If this collides with anything, move it.
  // When doing this comparison, we have to sort the items we compare with
  // to ensure, in the case of multiple collisions, that we're getting the
  // nearest collision.
  let sorted = sortLayoutItems(layout, compactType)
  const movingUp =
    compactType === "vertical" && typeof top === "number"
      ? oldTop >= top
      : compactType === "horizontal" && typeof left === "number"
      ? oldLeft >= left
      : false
  // $FlowIgnore acceptable modification of read-only array as it was recently cloned
  if (movingUp) sorted = sorted.reverse()
  const collisions = getAllCollisions(sorted, l)
  const hasCollisions = collisions.length > 0

  // We may have collisions. We can short-circuit if we've turned off collisions or
  // allowed overlap.
  if (hasCollisions && allowOverlap) {
    // Easy, we don't need to resolve collisions. But we *did* change the layout,
    // so clone it on the way out.
    return cloneLayout(layout)
  } else if (hasCollisions && preventCollision) {
    // If we are preventing collision but not allowing overlap, we need to
    // revert the position of this element so it goes to where it came from, rather
    // than the user's desired location.
    if (log) console.log(`Collision prevented on ${l.id}, reverting.`)
    l.left = oldLeft
    l.top = oldTop
    l.moved = false
    return layout // did not change so don't clone
  }

  // Move each item that collides away from this element.
  for (let i = 0, len = collisions.length; i < len; i++) {
    const collision = collisions[i]
    if (log)
      console.log(
        `Resolving collision between ${l.id} at [${l.left},${l.top}] and ${collision.id} at [${collision.left},${collision.top}]`
      )

    // Short circuit so we can't infinite loop
    if (collision.moved) continue

    // Don't move static items - we have to move *this* element away
    if (collision.static) {
      layout = moveItemAwayFromCollision(
        layout,
        collision,
        l,
        isUserAction,
        compactType,
        gridTracks
      )
    } else {
      layout = moveItemAwayFromCollision(
        layout,
        l,
        collision,
        isUserAction,
        compactType,
        gridTracks
      )
    }
  }

  return layout
}

export const compact = (layout, compactType, gridTracks, allowOverlap) => {
  // Statics go in the compareWith array right away so items flow around them.
  const compareWith = layout.filter(l => l.static)
  // We go through the items by row and column.
  const sorted = sortLayoutItems(layout, compactType)
  // Holding for new items.
  const out = Array(layout.length)

  for (let i = 0, len = sorted.length; i < len; i++) {
    let l = { ...sorted[i] }

    // Don't move static elements
    if (!l.static) {
      l = compactItem(compareWith, l, compactType, gridTracks, sorted, allowOverlap)

      // Add to comparison array. We only collide with items before this one.
      // Statics are already in this array.
      compareWith.push(l)
    }

    // Add to output array to make sure they still come out in the right order.
    out[layout.indexOf(sorted[i])] = l

    // Clear moved flag, if it exists.
    l.moved = false
  }

  return out
}

const heightWidth = { left: "width", top: "height" }
/**
 * Before moving item down, it will check if the movement will cause collisions and move those items down before.
 */
const resolveCompactionCollision = (layout, item, moveToCoord, dimension) => {
  const sizeProp = heightWidth[dimension]
  item[dimension] += 1
  const itemIndex = layout.findIndex(layoutItem => layoutItem.id === item.id)

  // Go through each item we collide with.
  for (let i = itemIndex + 1; i < layout.length; i++) {
    const otherItem = layout[i]
    // Ignore static items
    if (otherItem.static) continue

    // Optimization: we can break early if we know we're past this el
    // We can do this b/c it's a sorted layout
    if (otherItem.top > item.top + item.height) break

    if (collides(item, otherItem)) {
      resolveCompactionCollision(layout, otherItem, moveToCoord + item[sizeProp], dimension)
    }
  }

  item[dimension] = moveToCoord
}

/**
 * Compact an item in the layout.
 *
 * Modifies item.
 *
 */
export const compactItem = (compareWith, l, compactType, gridTracks, fullLayout, allowOverlap) => {
  const compactV = compactType === "vertical"
  const compactH = compactType === "horizontal"
  if (compactV) {
    // Bottom 'top' possible is the bottom of the layout.
    // This allows you to do nice stuff like specify {top: Infinity}
    // This is here because the layout must be sorted in order to get the correct bottom `top`.
    l.top = Math.min(findBottom(compareWith), l.top)
    // Move the element up as far as it can go without colliding.
    while (l.top > 0 && !getFirstCollision(compareWith, l)) {
      l.top--
    }
  } else if (compactH) {
    // Move the element left as far as it can go without colliding.
    while (l.left > 0 && !getFirstCollision(compareWith, l)) {
      l.left--
    }
  }

  // Move it down, and keep moving it down if it's colliding.
  let collides
  // Checking the compactType null value to avoid breaking the layout when overlapping is allowed.
  while (
    (collides = getFirstCollision(compareWith, l)) &&
    !(compactType === null && allowOverlap)
  ) {
    if (compactH) {
      resolveCompactionCollision(fullLayout, l, collides.left + collides.width, "left")
    } else {
      resolveCompactionCollision(fullLayout, l, collides.top + collides.height, "top")
    }
    // Since we can't grow without bounds horizontally, if we've overflown, let's move it down and try again.
    if (compactH && l.left + l.width > gridTracks) {
      l.left = gridTracks - l.width
      l.top++
      // ALso move element as left as we can
      while (l.left > 0 && !getFirstCollision(compareWith, l)) {
        l.left--
      }
    }
  }

  if (isNaN(l.top)) {
    debugger
  }
  // Ensure that there are no negative positions
  l.top = Math.max(l.top, 0)
  l.left = Math.max(l.left, 0)

  return l
}
