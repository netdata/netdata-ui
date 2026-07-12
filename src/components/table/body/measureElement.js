const getCachedSize = (element, instance) => {
  const index = instance.indexFromElement(element)
  const key = instance.options.getItemKey(index)

  return {
    cached: instance.itemSizeCache.get(key),
    estimated: instance.options.estimateSize(index),
  }
}

const getObservedSize = (entry, horizontal) => {
  const borderBoxSize = entry?.borderBoxSize
  const box = Array.isArray(borderBoxSize) ? borderBoxSize[0] : borderBoxSize

  return box?.[horizontal ? "inlineSize" : "blockSize"]
}

export const measureTableElement = (element, entry, instance) => {
  const horizontal = instance.options.horizontal

  if (instance.options.useCachedMeasurements) {
    const { cached, estimated } = getCachedSize(element, instance)
    return cached ?? estimated
  }

  const observedSize = getObservedSize(entry, horizontal)
  if (observedSize) return observedSize

  if (!entry) {
    const { cached } = getCachedSize(element, instance)
    if (cached !== undefined) return cached
  }

  const rect = element.getBoundingClientRect()
  const measuredSize = horizontal ? rect.width : rect.height

  return measuredSize || instance.options.estimateSize(instance.indexFromElement(element))
}
