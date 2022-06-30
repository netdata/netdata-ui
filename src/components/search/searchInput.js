import styled from "styled-components"
import { TextInput } from "src/components/input"

const SearchInput = styled(TextInput)`
  & input {
    background: transparent;
  }

  & > label {
    margin-bottom: 0;
  }
`
export default SearchInput
