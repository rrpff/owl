import fetch from 'isomorphic-fetch'

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
