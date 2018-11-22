import ReadMessages from './ReadMessages'

it('should return no messages when the message gateway returns none', async () => {
  const stubMessageGateway = {
    getMessages: () => []
  }

  const reader = new ReadMessages({ messageGateway: stubMessageGateway })
  const messages = await reader.execute()

  expect(messages).toEqual([])
})

it('should return the contents of the messages that the messages gateway returns', async () => {
  const stubMessageGateway = {
    getMessages: () => [
      { timestamp: 1542383455108, message: 'this is a test message' },
      { timestamp: 1542383455109, message: 'this is another test message' }
    ]
  }

  const reader = new ReadMessages({ messageGateway: stubMessageGateway })
  const messages = await reader.execute()

  expect(messages).toEqual([
    { timestamp: 1542383455108, message: 'this is a test message' },
    { timestamp: 1542383455109, message: 'this is another test message' }
  ])
})

it('should return the contents of different messages that the messages gateway returns', async () => {
  const stubMessageGateway = {
    getMessages: () => [
      { timestamp: 1542383455110, message: 'this is a totally different test message' },
      { timestamp: 1542383455111, message: 'this is not a test message' }
    ]
  }

  const reader = new ReadMessages({ messageGateway: stubMessageGateway })
  const messages = await reader.execute()

  expect(messages).toEqual([
    { timestamp: 1542383455110, message: 'this is a totally different test message' },
    { timestamp: 1542383455111, message: 'this is not a test message' }
  ])
})
