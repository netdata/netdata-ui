import ReactFilterBox from "react-filter-box"

// Library doesn't handle dynamic data, even given an updated handler instance in props
// So we extend base component and update its parser manually
// to enable autosuggestions for dynamic data
export class ExtendedFilterBox extends ReactFilterBox {
  componentDidUpdate(prevProps: any, prevState: any) {
    if (super.componentDidUpdate) {
      super.componentDidUpdate(prevProps, prevState)
    }
    if (prevProps.autoCompleteHandler !== this.props.autoCompleteHandler) {
      this.parser.setAutoCompleteHandler(this.props.autoCompleteHandler)
    }
  }
}
