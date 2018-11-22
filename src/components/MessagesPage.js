import React from 'react'
import TimeAgo from 'react-timeago'
import './MessagesPage.css'

export default class MessagesPage extends React.Component {
  state = {
    loading: true,
    currentMessage: '',
    messages: []
  }

  async componentDidMount () {
    await this.loadMessages()
  }

  loadMessages = async () => {
    const messages = await this.props.readMessages.execute()
    this.setState({ messages, loading: false })
  }

  clearCurrentMessage = async () => {
    this.setState({ currentMessage: '' })
  }

  submitMessage = async e => {
    e.preventDefault()
    await this.props.postMessage.execute(this.state.currentMessage)
    await this.clearCurrentMessage()
    await this.loadMessages()
  }

  setText = e => {
    this.setState({ currentMessage: e.target.value })
  }

  render () {
    return (
      <section className="wrapper">
        <h1>Cool anonymous message board</h1>

        <h3>Write your own cool anonymous message</h3>
        <form purpose="Submit Message Form" onSubmit={this.submitMessage}>
          <input purpose="Message Input" type="text" value={this.state.currentMessage} onChange={this.setText} />
          <button>Submit</button>
        </form>

        <h3>What cool anonymouses have written so far</h3>
        <ul className="message-list">
          {this.state.messages.map(message =>
            <li purpose="Message List Item" key={message.timestamp} class="message-list__message">
              <span className="message-list__message__content">
                {message.message}
              </span>
              <span className="message-list__message__time">
                <TimeAgo date={message.timestamp} />
              </span>
            </li>
          )}
        </ul>
      </section>
    )
  }
}
