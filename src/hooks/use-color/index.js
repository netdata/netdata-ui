import { ThemeContext } from "styled-components"
import { useContext } from "react"
import { getColor } from "@/theme"

const useColor = () => {
  const theme = useContext(ThemeContext)
  const pickColor = color => getColor(color)({ theme })

  return pickColor
}

export default useColor
