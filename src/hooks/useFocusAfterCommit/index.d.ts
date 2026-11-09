export default function useFocusAfterCommit(
  focus?: (element: HTMLElement) => void
): (resolve: () => HTMLElement | null | undefined) => void
