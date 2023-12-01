import "@testing-library/jest-dom/jest-globals"

export { default as renderWithProviders } from "./renderWithProviders"
export { default as renderHookWithProviders } from "./renderHookWithProviders"

import userEvent from "@testing-library/user-event"
export const user = () => userEvent.setup()
export { userEvent }

export * from "@testing-library/react"
