import React from 'react'
import { graphql, gql } from 'react-apollo'

import Link from './Link'

class LinkList extends React.Component {
  render() {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return <div>Error</div>
    }

    const linksToRender = this.props.allLinksQuery.allLinks

    return (
      <div>
        {linksToRender.map(link => (
          <Link key={link.id} link={link} />
        ))}
      </div>
    )
  }
}

// 1 & 2
// gql is used to parse the graphQL code
const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`
// 3
export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery'})(LinkList)
// name is for a prop name
