import React from "react"

globalThis.React = React

class ResizeObserver {
  constructor(callback) {
    this.callback = callback
  }
  observe(element) {
    queueMicrotask(() => {
      this.callback([
        {
          target: element,
          contentRect: { width: 500, height: 500 },
          borderBoxSize: [{ inlineSize: 500, blockSize: 500 }],
          contentBoxSize: [{ inlineSize: 500, blockSize: 500 }],
        },
      ])
    })
  }
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver
