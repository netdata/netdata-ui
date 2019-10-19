type SyntheticEventT<T> = import("react").SyntheticEvent

type MockPropsT = { text?: string; onClick?: (e: SyntheticEventT<HTMLButtonElement>) => void }
