import { createContext } from "react"

export const LayoutContext = createContext({})

export const StickyListContext = createContext({})
StickyListContext.displayName = "StickyListContext"

export const LayoutContextProvider = LayoutContext.Provider
export const LayoutContextConsumer = LayoutContext.Consumer

export const StickyListContextProvider = StickyListContext.Provider
export const StickyListContextConsumer = StickyListContext.Consumer
