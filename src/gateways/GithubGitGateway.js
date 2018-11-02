import fetch from 'isomorphic-fetch'

// import GitGateway, { Ref, Commit, Blob, BlobEncoding, TreeInput, Tree } from '../interfaces/GitGateway'
// import GitGateway from '../interfaces/GitGateway'

// export default class GithubGitGateway implements GitGateway {
export default class GithubGitGateway {
  constructor ({ user, repo, accessToken }) {
    this.repoBaseUrl = `https://api.github.com/repos/${user}/${repo}/git`
    this.repoBaseHeaders = { Authorization: `token ${accessToken}` }
  }

  async getSingleRef (ref) {
    const response = await fetch(`${this.repoBaseUrl}/refs/${ref}`, { headers: this.repoBaseHeaders })

    const json = await response.json()

    return {
      ref: ref,
      sha: json.object.sha
    }
  }

  async getSingleCommit (sha) {
    const response = await fetch(`${this.repoBaseUrl}/commits/${sha}`, { headers: this.repoBaseHeaders })

    const json = await response.json()

    return {
      sha: sha,
      treeSha: json.tree.sha
    }
  }

  async createBlob ({ content, encoding }) {
    const body = { content, encoding }
    const response = await fetch(`${this.repoBaseUrl}/blobs`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.repoBaseHeaders
    })

    const json = await response.json()

    return {
      sha: json.sha
    }
  }

  // getSingleTree () {
    // http GET https://api.github.com/repos/zuren/notes/git/trees/f81dbe00fa91182a2dfb28129f81a7cae55c2aec 'Authorization: token 6ea3bb79e45669758908417df3eaba7d0bc95119'

    // {
    //     "sha": "f81dbe00fa91182a2dfb28129f81a7cae55c2aec",
    //     "tree": [
    //         {
    //             "mode": "100644",
    //             "path": "test.md",
    //             "sha": "b2201cdaf61ed7ba2016ceca49a7abef51093d01",
    //             "size": 28,
    //             "type": "blob",
    //             "url": "https://api.github.com/repos/zuren/notes/git/blobs/b2201cdaf61ed7ba2016ceca49a7abef51093d01"
    //         }
    //     ],
    //     "truncated": false,
    //     "url": "https://api.github.com/repos/zuren/notes/git/trees/f81dbe00fa91182a2dfb28129f81a7cae55c2aec"
    // }
  // }

  async createTree ({ baseSha, tree }) {
    const body = {
      base_tree: baseSha,
      tree: tree.map(node => ({
        path: node.path,
        mode: node.mode,
        type: node.type,
        sha: node.sha
      }))
    }

    const response = await fetch(`${this.repoBaseUrl}/trees`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.repoBaseHeaders
    })

    const json = await response.json()

    return {
      sha: json.sha
    }
  }

  async createCommit ({ message, treeSha, parentShas }) {
    const body = {
      message: message,
      tree: treeSha,
      parents: parentShas,
    }

    const response = await fetch(`${this.repoBaseUrl}/commits`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.repoBaseHeaders
    })

    const json = await response.json()

    return {
      sha: json.sha
    }
  }

  async updateReference ({ ref, sha }) {
    await fetch(`${this.repoBaseUrl}/refs/${ref}`, {
      method: 'PATCH',
      body: JSON.stringify({ sha }),
      headers: this.repoBaseHeaders
    })
  }
}
