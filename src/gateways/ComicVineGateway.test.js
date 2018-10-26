// import nock from 'nock'
// import ComicVineGateway from './ComicVineGateway'
//
// describe('Querying characters', () => {
//   describe('when retrieving a character', () => {
//     it('returns details for that character from the ComicVine API', async () => {
//       mockComicVineSearchQuery({
//         query: 'wonder woman',
//         results: [
//           {
//             aliases: 'Diana Prince\r\nDiana of Themyscira\r\nPrincess Diana',
//             count_of_issue_appearances: 6524,
//             image: { icon_url: 'https://example.com/image.jpg' },
//             name: 'Wonder Woman'
//           }
//         ]
//       })
//
//       const gateway = new ComicVineGateway()
//       const characters = await gateway.queryCharacters('wonder woman')
//
//       expect(characters[0]).toEqual({
//         name: 'Wonder Woman',
//         appearances: 6524,
//         iconUrl: 'https://example.com/image.jpg',
//         aliases: [
//           'Diana Prince',
//           'Diana of Themyscira',
//           'Princess Diana'
//         ]
//       })
//     })
//   })
//
//   describe('when retrieving a different character with multiple results', () => {
//     it('returns those results', async () => {
//       mockComicVineSearchQuery({
//         query: 'batman',
//         results: [
//           {
//             aliases: 'Bruce Wayne\r\nThe Caped Crusader\r\nThe Dark Knight',
//             count_of_issue_appearances: 16521,
//             image: { icon_url: 'https://example.com/batman.jpg' },
//             name: 'Batman'
//           },
//           {
//             aliases: 'Bat Knight\nSir William',
//             count_of_issue_appearances: 22,
//             image: { icon_url: 'https://example.com/bat-man.jpg' },
//             name: 'Bat-Man'
//           }
//         ]
//       })
//
//       const gateway = new ComicVineGateway()
//       const characters = await gateway.queryCharacters('batman')
//
//       expect(characters[0]).toEqual({
//         name: 'Batman',
//         appearances: 16521,
//         iconUrl: 'https://example.com/batman.jpg',
//         aliases: [
//           'Bruce Wayne',
//           'The Caped Crusader',
//           'The Dark Knight'
//         ]
//       })
//
//       expect(characters[1]).toEqual({
//         name: 'Bat-Man',
//         appearances: 22,
//         iconUrl: 'https://example.com/bat-man.jpg',
//         aliases: [
//           'Bat Knight',
//           'Sir William'
//         ]
//       })
//     })
//   })
// })
//
// function mockComicVineSearchQuery ({ query, results }) {
//   return nock('https://comicvine.gamespot.com')
//     .get('/api/search')
//     .query({
//       api_key: 'a916fec3a79dd3677ce110aa42880110e1e7c98f',
//       limit: '3',
//       query: query,
//       resources: 'character',
//       format: 'json'
//     })
//     .reply(200, {
//       error: 'OK',
//       results
//     })
// }
