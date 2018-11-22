import React from 'react'
import MessagesPage from './components/MessagesPage'
import PostMessage from './services/PostMessage'
import ReadMessages from './services/ReadMessages'
import LocalMessageGateway from './gateways/LocalMessageGateway'

const messageGateway = new LocalMessageGateway()
const postMessage = new PostMessage({ messageGateway })
const readMessages = new ReadMessages({ messageGateway })

export default class App extends React.Component {
  render() {
    return (
      <MessagesPage
        postMessage={postMessage}
        readMessages={readMessages}
      />
    )
  }
}
