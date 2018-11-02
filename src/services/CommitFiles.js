export default class CommitFiles {
  constructor ({ gitGateway }) {
    this.git = gitGateway
  }

  async execute ({ message, files }) {
    const head = await this.git.getSingleRef('heads/master')
    const lastCommit = await this.git.getSingleCommit(head.sha)
    const newFilenamesToShas = await Promise.all(Object.keys(files).map(async fileName => {
      const blob = await this.git.createBlob({ content: files[fileName], encoding: 'utf-8' })
      return { fileName: fileName, sha: blob.sha }
    }))

    const newTree = await this.git.createTree({
      baseSha: lastCommit.treeSha,
      tree: newFilenamesToShas.map(({ fileName, sha }) => ({
        path: fileName,
        mode: '100644',
        type: 'blob',
        sha: sha
      }))
    })

    const commit = await this.git.createCommit({
      message: message,
      treeSha: newTree.sha,
      parentShas: [lastCommit.sha]
    })

    await this.git.updateReference({
      ref: 'heads/master',
      sha: commit.sha
    })
  }
}
