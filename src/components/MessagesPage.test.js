import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MessagesPage from './MessagesPage'

Enzyme.configure({ adapter: new Adapter() })

const sleep = ms => new Promise(accept => setTimeout(accept, ms))

describe('when listing messages', () => {
  describe('and there are no messages', () => {
    it('should render an empty list', async () => {
      const readMessagesStub = { execute: async () => [] }

      const page = mount(<MessagesPage readMessages={readMessagesStub} />)
      await sleep(10)
      page.update()

      const messageListItems = page.find('[purpose="Message List Item"]')

      expect(messageListItems.length).toEqual(0)
    })
  })

  describe('and there is a message', () => {
    it('should render the message in a list', async () => {
      const readMessagesStub = {
        execute: async () => [{
          timestamp: 1542383455109,
          message: 'hello world'
        }]
      }

      const page = mount(<MessagesPage readMessages={readMessagesStub} />)
      await sleep(10)
      page.update()

      const messageListItems = page.find('[purpose="Message List Item"]')
      expect(messageListItems.first().find('TimeAgo').prop('date')).toEqual(1542383455109)
      expect(messageListItems.first().text()).toContain('hello world')
    })
  })

  describe('and there are several messages', () => {
    it('should render the messages in a list', async () => {
      const readMessagesStub = {
        execute: async () => [{
          timestamp: 1542383455110,
          message: 'cool world'
        }, {
          timestamp: 1542383455111,
          message: 'great world'
        }]
      }

      const page = mount(<MessagesPage readMessages={readMessagesStub} />)
      await sleep(10)
      page.update()

      const messageListItems = page.find('[purpose="Message List Item"]')

      expect(messageListItems.at(0).find('TimeAgo').prop('date')).toEqual(1542383455110)
      expect(messageListItems.at(0).text()).toContain('cool world')

      expect(messageListItems.at(1).find('TimeAgo').prop('date')).toEqual(1542383455111)
      expect(messageListItems.at(1).text()).toContain('great world')
    })
  })
})

describe('when posting a new message', () => {
  describe('and the message is empty', () => {
    it('should do nothing', async () => {
      const readMessagesStub = { execute: async () => [] }
      const postMessageSpy = jest.fn()

      const page = mount(<MessagesPage readMessages={readMessagesStub} postMessage={postMessageSpy} />)
      await sleep(10)
      page.update()

      // page.find('[purpose="Message Input"]').simulate('change', { value: '' })
      page.find('button').simulate('click')
      await sleep(10)
      page.update()

      expect(postMessageSpy.mock.calls.length).toBe(0)
    })
  })

  describe('and the message has been filled in', () => {
    it('should attempt to post it', async () => {
      const readMessagesStub = { execute: async () => [] }
      const postMessageSpy = { execute: jest.fn() }

      const page = mount(<MessagesPage readMessages={readMessagesStub} postMessage={postMessageSpy} />)
      await sleep(10)
      page.update()

      page.find('[purpose="Message Input"]').simulate('change', { target: { value: 'cool message' } })
      page.find('[purpose="Submit Message Form"]').simulate('submit')
      await sleep(10)
      page.update()

      expect(postMessageSpy.execute.mock.calls.length).toBe(1)
      expect(postMessageSpy.execute.mock.calls[0]).toEqual(['cool message'])
    })

    it('should display the new message in the list', async () => {
      const readMessagesStub = { execute: jest.fn() }
      const postMessageStub = { execute: jest.fn() }

      readMessagesStub.execute
        .mockReturnValueOnce([])
        .mockReturnValueOnce([{ message: 'cool message', timestamp: 1542383455156 }])

      const page = mount(<MessagesPage readMessages={readMessagesStub} postMessage={postMessageStub} />)
      await sleep(10)
      page.update()

      page.find('[purpose="Message Input"]').simulate('change', { target: { value: 'cool message' } })
      page.find('[purpose="Submit Message Form"]').simulate('submit')
      await sleep(10)
      page.update()

      const messageListItems = page.find('[purpose="Message List Item"]')

      expect(messageListItems.at(0).find('TimeAgo').prop('date')).toEqual(1542383455156)
      expect(messageListItems.at(0).text()).toContain('cool message')
    })

    it('should clear the input', async () => {
      const readMessagesStub = { execute: async () => [] }
      const postMessageSpy = { execute: jest.fn() }

      const page = mount(<MessagesPage readMessages={readMessagesStub} postMessage={postMessageSpy} />)
      await sleep(10)
      page.update()

      page.find('[purpose="Message Input"]').simulate('change', { target: { value: 'cool message' } })
      page.find('[purpose="Submit Message Form"]').simulate('submit')
      await sleep(10)
      page.update()

      expect(page.find('[purpose="Message Input"]').prop('value')).toEqual('')
    })
  })

  describe('and a different message has been filled in', () => {
    it('should attempt to post it', async () => {
      const readMessagesStub = { execute: async () => [] }
      const postMessageSpy = { execute: jest.fn() }

      const page = mount(<MessagesPage readMessages={readMessagesStub} postMessage={postMessageSpy} />)
      await sleep(10)
      page.update()

      page.find('[purpose="Message Input"]').simulate('change', { target: { value: 'great message' } })
      page.find('[purpose="Submit Message Form"]').simulate('submit')
      await sleep(10)
      page.update()

      expect(postMessageSpy.execute.mock.calls.length).toBe(1)
      expect(postMessageSpy.execute.mock.calls[0]).toEqual(['great message'])
    })
  })
})
