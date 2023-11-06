import React, { useEffect, useRef, useState } from "react"
import Flex from "@/components/templates/flex"
import { TextSmall } from "@/components/typography"
import { Range, Slider, SliderTrack } from "./styled"

const MultiRangeInput = ({
  initMax,
  initMin,
  max = 100,
  min = 0,
  onChange,
  onInput,
  step = 1,
  TextComponent = TextSmall,
  ...rest
}) => {
  const [maxValue, setMaxValue] = useState(initMax || max)
  const [minValue, setMinValue] = useState(initMin || min)
  const [width, setWidth] = useState(0)

  const maxValueRef = useRef(null)
  const minValueRef = useRef(null)

  useEffect(() => {
    if (maxValueRef.current) {
      setWidth(maxValueRef.current.getBoundingClientRect().width)
    }
  }, [minValue])

  useEffect(() => {
    setMaxValue(initMax || max)
    setMinValue(initMin || min)
  }, [max, min])

  const handleMaxChange = e => {
    if (onChange) onChange({ max: e.target.value, min: minValue })
  }

  const handleMinChange = e => {
    if (onChange) onChange({ max: maxValue, min: e.target.value })
  }

  const handleMaxInput = e => {
    const value = Math.max(+e.target.value, minValue + step)
    setMaxValue(value)
    e.target.value = value.toString()

    if (onInput) onInput({ max: e.target.value, min: minValue })
  }

  const handleMinInput = e => {
    const value = Math.min(+e.target.value, maxValue - step)
    setMinValue(value)
    e.target.value = value.toString()

    if (onInput) onInput({ max: maxValue, min: e.target.value })
  }

  return (
    <Flex column gap={1} flex>
      <Flex
        alignItems="center"
        data-testid="multiRangeInput"
        justifyContent="center"
        position="relative"
        width="100%"
      >
        <Range
          data-testid="minRangeInput"
          max={max}
          min={min}
          onChange={handleMinChange}
          onInput={handleMinInput}
          position="relative"
          ref={minValueRef}
          step={step}
          value={minValue}
          zIndex={3}
          {...rest}
        />
        <Range
          data-testid="maxRangeInput"
          max={max}
          min={min}
          onChange={handleMaxChange}
          onInput={handleMaxInput}
          ref={maxValueRef}
          step={step}
          value={maxValue}
          zIndex={5}
          {...rest}
        />
        <Slider data-testid="multiRange-slider">
          <SliderTrack
            data-testid="multiRange-sliderTrack"
            max={max}
            maxValue={maxValue}
            min={min}
            minValue={minValue}
            width={width}
          />
        </Slider>
      </Flex>
      <Flex data-testid="multiRange-values" justifyContent="between">
        <TextComponent data-testid="multiRange-minValue">{minValue}</TextComponent>
        <TextComponent data-testid="multiRange-maxValue">{maxValue}</TextComponent>
      </Flex>
    </Flex>
  )
}

export default MultiRangeInput
