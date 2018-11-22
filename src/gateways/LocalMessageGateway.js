import fetch from 'isomorphic-fetch'

export default class LocalMessageGateway {
  async getMessages () {
    const response = await fetch('http://localhost:3000/messages')
    const json = await response.json()

    return json.messages
  }

  async postMessage (message) {
    await fetch('http://localhost:3000/messages', {
      method: 'POST',
      body: JSON.stringify({ message }),
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
