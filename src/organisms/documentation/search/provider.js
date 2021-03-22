import React from "react"
import SiteSearchAPIConnector from "@elastic/search-ui-site-search-connector"
import { SearchProvider as ElasticSearchProvider, WithSearch } from "@elastic/react-search-ui"

const apiConnector = new SiteSearchAPIConnector({
  engineKey: "BZL_aEiLAebVKkcm3eFr",
  documentType: "page",
})

const config = {
  apiConnector,
  initialState: {
    resultsPerPage: 100,
  },
  searchQuery: {
    result_fields: {
      title: {
        snippet: {
          size: 100,
          fallback: true,
        },
      },
      url: {
        raw: {},
      },
      description: {
        snippet: {
          size: 100,
          fallback: true,
        },
      },
    },
  },
  alwaysSearchOnInitialLoad: false,
}

const mapContextToProps = ({ searchTerm, setSearchTerm, results, reset }) => ({
  searchTerm,
  setSearchTerm,
  results,
  reset,
})

const SearchProvider = ({ children }) => {
  return (
    <ElasticSearchProvider config={config}>
      <WithSearch mapContextToProps={mapContextToProps}>{props => children(props)}</WithSearch>
    </ElasticSearchProvider>
  )
}

export default SearchProvider
