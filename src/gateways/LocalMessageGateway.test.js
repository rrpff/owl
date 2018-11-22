import nock from 'nock'
import LocalMessageGateway from './LocalMessageGateway'

const MESSAGES_API = nock('http://localhost:3000')

describe('retrieving messages', () => {
  describe('when no messages come back from the API', () => {
    beforeEach(() => {
      MESSAGES_API
        .get('/messages')
        .reply(200, {
          messages: []
        })
    })

    it('should return no messages', async () => {
      const gateway = new LocalMessageGateway()
      const messages = await gateway.getMessages()

      expect(messages).toEqual([])
    })
  })

  describe('when messages come back from the API', () => {
    beforeEach(() => {
      MESSAGES_API
        .get('/messages')
        .reply(200, {
          messages: [{
            timestamp: 1542383455108,
            message: 'hey adrian'
          }]
        })
    })

    it('should return those messages', async () => {
      const gateway = new LocalMessageGateway()
      const messages = await gateway.getMessages()

      expect(messages).toEqual([{
        timestamp: 1542383455108,
        message: 'hey adrian'
      }])
    })
  })
})

describe('posting a message', () => {
  describe('when including a message string', () => {
    it('should send the message to the API', async () => {
      const spy = MESSAGES_API
        .post('/messages', { message: 'hey this is a test message' })
        .reply(201, { ok: true })

      const gateway = new LocalMessageGateway()
      await gateway.postMessage('hey this is a test message')

      spy.done()
    })
  })

  describe('when including a different message string', () => {
    it('should send the message to the API', async () => {
      const spy = MESSAGES_API
        .post('/messages', { message: 'hey this is a different test message' })
        .reply(201, { ok: true })

      const gateway = new LocalMessageGateway()
      await gateway.postMessage('hey this is a different test message')

      spy.done()
    })
  })
})
