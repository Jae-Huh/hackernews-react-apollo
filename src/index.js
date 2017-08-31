import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './styles/index.css'
// 1
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'

// 2
const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj6zsy76w0ewv0197w6fj1crk'
  // Can get the uri from running 'graphcool endpoints' on command line or from graphcool console.
})

// 3
const client = new ApolloClient({
  networkInterface
})

// 4
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.getElementById('root')
)
registerServiceWorker()
