import PostMessage from './PostMessage'

describe('when sending a message', () => {
  it('should send the message to the messages gateway', async () => {
    const stubMessageGateway = {
      messages: [],
      postMessage: message => stubMessageGateway.messages.push(message)
    }

    const reader = new PostMessage({ messageGateway: stubMessageGateway })
    await reader.execute('this is my cool message')

    expect(stubMessageGateway.messages).toEqual(['this is my cool message'])
  })
})

describe('when sending a different message', () => {
  it('should send the message to the messages gateway', async () => {
    const stubMessageGateway = {
      messages: [],
      postMessage: message => stubMessageGateway.messages.push(message)
    }

    const reader = new PostMessage({ messageGateway: stubMessageGateway })
    await reader.execute('this is my other cool message')

    expect(stubMessageGateway.messages).toEqual(['this is my other cool message'])
  })
})
