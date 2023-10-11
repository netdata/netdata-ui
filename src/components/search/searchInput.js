import styled from "styled-components"
import { TextInput } from "@/components/input"

const SearchInput = styled(TextInput)`
  & input {
    background: transparent;
  }

  & > label {
    margin-bottom: 0;
  }

  & > div {
    margin-top: 0;
  }
`
export default SearchInput
