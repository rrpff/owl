export default class ReadFiles {
  constructor ({ gitGateway }) {
    this.git = gitGateway
  }

  async execute (ref) {
    const { sha } = await this.git.getSingleRef(ref)
    const { treeSha } = await this.git.getSingleCommit(sha)
    const { tree } = await this.git.getSingleTree(treeSha)
    const files = await Promise.all(tree.map(async node => ({
      file: node.path,
      content: (await this.git.getBlob(node.sha)).content
    })))

    return { files }
  }
}
