import ReactFilterBox from "@netdata/react-filter-box"

// Library doesn't handle dynamic data, even given an updated handler instance in props
// So we extend base component and update its parser manually
// to enable autosuggestions for dynamic data
export class ExtendedFilterBox extends ReactFilterBox {
  componentDidMount() {
    if (super.componentDidMount) {
      super.componentDidMount()
    }
    if (this.props.query) {
      const result = this.parser.parse(this.props.query)
      if (this.props.onParseOk) this.props.onParseOk(result)
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (super.componentDidUpdate) {
      super.componentDidUpdate(prevProps, prevState)
    }
    if (prevProps.autoCompleteHandler !== this.props.autoCompleteHandler) {
      this.parser.setAutoCompleteHandler(this.props.autoCompleteHandler)
    }
  }
}
