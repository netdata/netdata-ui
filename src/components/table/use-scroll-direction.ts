import { useRef, useState, useEffect, MutableRefObject } from "react"
import { useScroll, usePreviousDistinct } from "react-use"

type ScrollIsVertical = boolean
type PrevScrollIsVertical = boolean
type ScrollY = number
type ScrollX = number

type UseScrollDirection = ({
  scrollRef,
}: {
  scrollRef: MutableRefObject<any>
}) => [ScrollIsVertical, PrevScrollIsVertical, ScrollY, ScrollX]

const initialScrollIsVertical = true

// TODO - should be useScrollPosition
export const useScrollDirection: UseScrollDirection = ({ scrollRef }: any) => {
  const [scrollState, setScrollState] = useState({
    isVertical: initialScrollIsVertical,
    x: 0,
    y: 0,
  })
  const prevScrollStateIsVertical = usePreviousDistinct(scrollState.isVertical)

  const scrollCoordinates = useRef(null) as any
  const { x, y } = useScroll(scrollRef)

  const prevIsVertical =
    prevScrollStateIsVertical === undefined ? initialScrollIsVertical : prevScrollStateIsVertical

  useEffect(() => {
    if (scrollCoordinates.current === null) {
      scrollCoordinates.current = { x, y }
    } else if (x !== scrollState.x) {
      scrollCoordinates.current = { x, y }
      setScrollState({ isVertical: false, x, y })
    } else if (y !== scrollState.y) {
      scrollCoordinates.current = { x, y }
      setScrollState({ isVertical: true, x, y })
    }
  }, [prevIsVertical, scrollCoordinates, scrollState.x, scrollState.y, x, y])

  return [scrollState.isVertical, prevIsVertical, scrollState.y, scrollState.x]
}
