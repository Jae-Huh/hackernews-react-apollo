import React from 'react'
import { graphql, gql } from 'react-apollo'

import Link from './Link'

class LinkList extends React.Component {
  _updateCacheAfterVote = (store, createVote, linkId) => {
    // 1
    const data = store.readQuery({ query: ALL_LINKS_QUERY })

    // 2
    const votedLink = data.allLinks.find(link => link.id === linkId)
    votedLink.votes = createVote.link.votes

    // 3
    store.writeQuery({ query: ALL_LINKS_QUERY, data })
  }

  render() {
    if (this.props.allLinksQuery && this.props.allLinksQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.allLinksQuery && this.props.allLinksQuery.error) {
      return <div>{this.props.allLinksQuery.error.message}</div>
    }

    const linksToRender = this.props.allLinksQuery.allLinks

    return (
      <div>
        {linksToRender.map((link, index) => (
          <Link key={link.id} updateStoreAfterVote={this._updateCacheAfterVote}  index={index} link={link}/>
        ))}
      </div>
    )
  }
}

// 1 & 2
// gql is used to parse the graphQL code
export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`
// 3
export default graphql(ALL_LINKS_QUERY, { name: 'allLinksQuery'})(LinkList)
// name is for a prop name
