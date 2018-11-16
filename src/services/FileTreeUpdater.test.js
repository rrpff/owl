it('should be able to update a file\'s contents', () => {
  const state = FileTreeUpdater.updateFile({
    original: {
      files: [{
        path: 'test.md',
        content: 'this is a test'
      }]
    },
    current: {
      files: [{
        path: 'test.md',
        content: 'this is a test'
      }}
    },
    fileName: 'test.md',
    newContent: 'this is not a test'
  })

  expect(state).toEqual({
    original: {
      files: [{
        path: 'test.md',
        content: 'this is a test'
      }]
    },
    current: {
      files: [{
        path: 'test.md',
        content: 'this is not a test'
      }}
    }
  })
})

// describe('updating a file', () => {
//   it('should update the correct file', async () => {
//     const storage = new FileStorage()
//   })
// })
