import { measureElement } from "@tanstack/react-virtual"

const getCachedSize = (element, instance) => {
  const index = instance.indexFromElement(element)
  const key = instance.options.getItemKey(index)

  return instance.itemSizeCache.get(key)
}

export const measureTableElement = (element, entry, instance) => {
  if (!entry) {
    const cached = getCachedSize(element, instance)
    if (cached !== undefined) return cached
  }

  const measuredSize = measureElement(element, entry, instance)

  return measuredSize || instance.options.estimateSize(instance.indexFromElement(element))
}
