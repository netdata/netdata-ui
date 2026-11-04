import React, { useMemo, Children, cloneElement, isValidElement } from "react"
import setRef from "@/mixins/set-ref"

const getChild = children => {
  if (Children.count(children) !== 1) return Children.only(children)
  if (isValidElement(children)) return children

  return <span>{children}</span>
}

export default (children, ref, childProps) =>
  useMemo(() => {
    if (children === undefined || children === null) return children

    if (typeof children === "function") {
      return children({ ref: node => setRef(ref, node), ...childProps })
    }

    const child = getChild(children)

    return cloneElement(child, {
      ...childProps,
      ref: node => {
        setRef(ref, node)
        setRef(child.props.ref, node)
      },
    })
    // Open state and its aria link must re-clone, otherwise the target never gets aria-describedby.
  }, [children, childProps.open, childProps.isOpen, childProps["aria-describedby"]])
