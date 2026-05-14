import React, { isValidElement } from "react"

const RowPlaceholdersRenderer = ({
  RowPlaceholder,
  items = [],
  getPlaceholderOffset,
  ...props
}) => {
  if (!items.length) return null

  return (
    <>
      {items.map(index => (
        <div
          key={`placeholder-${index}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            minWidth: "100%",
            ...(typeof getPlaceholderOffset === "function"
              ? { transform: `translateY(${getPlaceholderOffset(index)}px)` }
              : {}),
          }}
        >
          {RowPlaceholder ? <RowPlaceholder index={index - 1} /> : null}
        </div>
      ))}
    </>
  )
}

export default RowPlaceholdersRenderer
