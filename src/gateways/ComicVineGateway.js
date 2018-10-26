import axios from 'axios'

export default class ComicVineGateway {
  constructor () {
    this.api = axios.create({
      baseURL: 'https://comicvine.gamespot.com/api',
      adapter: require('axios/lib/adapters/http')
    })
  }

  async queryCharacters (name) {
    const params = {
      api_key: 'a916fec3a79dd3677ce110aa42880110e1e7c98f',
      limit: '3',
      query: name,
      resources: 'character',
      format: 'json'
    }

    const response = await this.api.get('/search', { params })
    const characters = response.data.results

    return characters.map(character => ({
      name: character.name,
      appearances: character.count_of_issue_appearances,
      iconUrl: character.image.icon_url,
      aliases: character.aliases.split(/\r?\n/g)
    }))
  }
}
