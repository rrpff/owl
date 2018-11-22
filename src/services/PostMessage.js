export default class PostMessage {
  constructor ({ messageGateway }) {
    this.messageGateway = messageGateway
  }

  async execute (message) {
    await this.messageGateway.postMessage(message)
  }
}
