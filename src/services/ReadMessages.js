export default class ReadMessages {
  constructor ({ messageGateway }) {
    this.messageGateway = messageGateway
  }

  async execute () {
    const messages = await this.messageGateway.getMessages()

    return messages.map(message => ({
      timestamp: message.timestamp,
      message: message.message
    }))
  }
}
