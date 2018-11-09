import faker from 'faker'
import ReadFiles from './ReadFiles'

class FakeGitGateway {
  constructor ({ refs = {}, commits = {}, trees = {}, blobs = {} }) {
    this.refs = refs
    this.commits = commits
    this.trees = trees
    this.blobs = blobs
  }

  getSingleRef (refName) {
    const ref = this.refs[refName]
    if (!ref) throw 'Ref does not exist'

    return { ref: refName, sha: ref.sha }
  }

  getSingleCommit (sha) {
    const commit = this.commits[sha]
    if (!commit) throw 'Commit does not exist'

    return { sha, treeSha: commit.treeSha }
  }

  getSingleTree (sha) {
    const tree = this.trees[sha]
    if (!tree) throw 'Tree does not exist'

    return { sha, tree }
  }

  getBlob (sha) {
    const blob = this.blobs[sha]
    if (!blob) throw 'Blob does not exist'

    return { sha, content: blob }
  }
}

it('should return all files and their contents for a given ref', async () => {
  const fileNameA = faker.system.fileName()
  const fileNameB = faker.system.fileName()
  const contentA = faker.lorem.sentence()
  const contentB = faker.lorem.sentence()
  const gitGateway = new FakeGitGateway({
    refs: { 'heads/master': { sha: '123456' } },
    commits: { '123456': { treeSha: 'abcdef' } },
    trees: { 'abcdef': [{ path: fileNameA, sha: '123' }, { path: fileNameB, sha: '456' }] },
    blobs: { '123': contentA, '456': contentB }
  })

  const service = new ReadFiles({ gitGateway })
  const response = await service.execute('heads/master')

  expect(response.files).toEqual([
    { file: fileNameA, content: contentA },
    { file: fileNameB, content: contentB }
  ])
})
