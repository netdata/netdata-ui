import React, { useRef, forwardRef, Fragment, useLayoutEffect } from "react"
import Drop from "src/components/drops/drop"
import useForwardRef from "src/hooks/use-forward-ref"
import useToggle from "src/hooks/use-toggle"
import useClonedChildren from "src/components/drops/mixins/useClonedChildren"
import useDescribedId from "src/components/drops/mixins/useDescribedId"
import dropAlignMap from "src/components/drops/mixins/dropAlignMap"
import Container from "src/components/drops/container"
import Content from "./content"

const getContent = (content, props) =>
  typeof content === "function" ? content() : <Content content={content} {...props} />

const Tooltip = forwardRef(
  (
    {
      align = "top",
      allowHoverOnTooltip,
      animation,
      background = "tooltip",
      children,
      content,
      disabled,
      dropProps,
      icon,
      iconColor,
      isBasic,
      open: initialOpen = false,
      padding = [2],
      plain,
      small,
      title,
      width,
      zIndex = 80,
      ...rest
    },
    parentRef
  ) => {
    const id = useDescribedId(rest["aria-describedby"])
    const [isOpen, , open, close] = useToggle(false)

    const [ref, setRef] = useForwardRef(parentRef)

    const targetElement = useClonedChildren(children, setRef, {
      onBlur: close,
      onFocus: open,
      onMouseEnter: open,
      onMouseLeave: !allowHoverOnTooltip
        ? close
        : () =>
            setTimeout(() => {
              if (onTooltipRef.current) return
              close()
            }, 300),
      ...(isOpen && { "aria-describedby": id }),
      ...rest,
    })

    const onTooltipRef = useRef(false)

    useLayoutEffect(() => {
      if (ref.current && initialOpen) open()
    }, [])

    if (!content && !title) {
      return children
    }

    const tooltipContent = getContent(content, {
      background,
      icon,
      iconColor,
      padding,
      title,
      ...(!isBasic ? { width: { max: width || small ? "200px" : "300px" } } : {}),
      ...(plain ? { margin: [2] } : {}),
    })

    return (
      <Fragment>
        {targetElement}
        {isOpen && ref.current && !disabled && (
          <Drop
            align={dropProps?.align || dropAlignMap[align]}
            animation={animation}
            hideShadow
            id={id}
            onClickOutside={close}
            onEsc={close}
            onMouseEnter={() => (onTooltipRef.current = true)}
            onMouseLeave={() => {
              onTooltipRef.current = false
              close()
            }}
            target={ref.current}
            zIndex={zIndex}
            {...dropProps}
          >
            {plain ? (
              tooltipContent
            ) : (
              <Container align={align} padding={[0]}>
                {tooltipContent}
              </Container>
            )}
          </Drop>
        )}
      </Fragment>
    )
  }
)

export default Tooltip
