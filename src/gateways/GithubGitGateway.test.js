import 'bdd-lazy-var/global'
import faker from 'faker'
import nock from 'nock'
import GithubGitGateway from './GithubGitGateway'

const GITHUB_API_DOUBLE = nock('https://api.github.com', { reqheaders: { 'Authorization': 'token 123456' } })

def('user', () => 'some-user')
def('repo', () => 'some-notes-repo')
def('gateway', () => new GithubGitGateway({ user: $user, repo: $repo, accessToken: '123456' }))

describe('getSingleRef', () => {
  subject(() => $gateway.getSingleRef('heads/master'))
  beforeEach(() => stubRefsEndpoint({
    expectedUser: $user,
    expectedRepo: $repo,
    expectedRef: 'heads/master',
    expectedSha: $expectedSha
  }))

  describe('when given a ref', async () => {
    def('expectedSha', faker.random.uuid)

    it('should return the sha for the given ref', async () => {
      expect(await $subject).toEqual({ ref: 'heads/master', sha: $expectedSha })
    })
  })
})

describe('getSingleTree', () => {
  subject(() => $gateway.getSingleTree($sha))
  beforeEach(() => stubTreesEndpoint({
    expectedUser: $user,
    expectedRepo: $repo,
    expectedSha: $sha,
    responseTree: [{
      path: $blobFilename,
      sha: $blobSha
    }]
  }))

  describe('when given a sha', async () => {
    def('sha', faker.random.uuid)
    def('blobFilename', faker.system.fileName)
    def('blobSha', faker.random.uuid)

    it('should return the correct sha and tree', async () => {
      expect(await $subject).toEqual({
        sha: $sha,
        tree: [{
          path: $blobFilename,
          sha: $blobSha
        }]
      })
    })
  })
})

describe('getBlob', () => {
  subject(() => $gateway.getBlob($sha))
  beforeEach(() => stubBlobEndpoint({
    expectedUser: $user,
    expectedRepo: $repo,
    expectedSha: $sha,
    responseContent: $responseContent
  }))

  describe('when given a sha', async () => {
    def('sha', faker.random.uuid)
    def('testSentence', faker.lorem.sentence)
    def('responseContent', () => Buffer.from($testSentence).toString('base64'))

    it('should return the correct content and sha', async () => {
      expect(await $subject).toEqual({
        sha: $sha,
        content: $testSentence
      })
    })
  })
})

describe('getSingleCommit', () => {
  subject(() => $gateway.getSingleCommit($sha))
  beforeEach(() => stubCommitEndpoint({
    expectedUser: $user,
    expectedRepo: $repo,
    expectedSha: $sha,
    expectedTreeSha: $expectedTreeSha
  }))

  describe('given a sha', () => {
    def('sha', faker.random.uuid())
    def('expectedTreeSha', faker.random.uuid())

    it('should return the tree sha for the given sha', async () => {
      expect(await $subject).toEqual({ sha: $sha, treeSha: $expectedTreeSha })
    })
  })
})

describe('createBlob', () => {
  def('sha', faker.random.uuid)
  subject(() => $gateway.createBlob({ content: $content, encoding: 'utf-8' }))
  beforeEach(() => stubCreateBlobEndpoint({
    expectedUser: $user,
    expectedRepo: $repo,
    expectedContent: $content,
    expectedEncoding: 'utf-8',
    responseSha: $sha
  }))

  describe('given some content', () => {
    def('content', faker.lorem.sentence)

    it('should return a sha for the new blob', async () => {
      expect(await $subject).toEqual({ sha: $sha })
    })
  })
})

describe('createTree', () => {
  def('baseSha', faker.random.uuid)
  def('sha', faker.random.uuid)
  def('tree', () => [{
    path: faker.system.fileName(),
    mode: '100644',
    type: 'blob',
    sha: faker.random.uuid()
  }])

  subject(() => $gateway.createTree({ baseSha: $baseSha, tree: $tree }))
  beforeEach(() => stubCreateTreeEndpoint({
    expectedUser: $user,
    expectedRepo: $repo,
    expectedBaseSha: $baseSha,
    expectedTree: $tree,
    responseSha: $sha
  }))

  describe('given files for a new tree', () => {
    it('should return a sha for the new tree', async () => {
      expect(await $subject).toEqual({ sha: $sha })
    })
  })
})

describe('createCommit', () => {
  def('sha', faker.random.uuid)
  def('message', faker.lorem.sentence)
  def('treeSha', faker.random.uuid)
  def('parentShas', () => [faker.random.uuid()])

  subject(() => $gateway.createCommit({ message: $message, treeSha: $treeSha, parentShas: $parentShas }))
  beforeEach(() => stubCreateCommitEndpoint({
    expectedUser: $user,
    expectedRepo: $repo,
    expectedMessage: $message,
    expectedTreeSha: $treeSha,
    expectedParentShas: $parentShas,
    responseSha: $sha
  }))

  describe('given a new tree sha, a parent sha and a message', () => {
    it('should return a sha for the new commit', async () => {
      expect(await $subject).toEqual({ sha: $sha })
    })
  })
})

describe('updateReference', () => {
  def('sha', faker.random.uuid)
  def('ref', () => 'heads/master')
  def('stubRequest', () => stubUpdateReferenceEndpoint({
    expectedUser: $user,
    expectedRepo: $repo,
    expectedSha: $sha,
    expectedRef: $ref
  }))

  subject(() => $gateway.updateReference({ sha: $sha, ref: $ref }))
  beforeEach(() => $stubRequest)

  describe('given a sha and a ref', () => {
    it('should make the correct request to GitHub', async () => {
      await $subject
      $stubRequest.done()
    })
  })
})

const stubRefsEndpoint = ({ expectedUser, expectedRepo, expectedRef, expectedSha }) =>
  GITHUB_API_DOUBLE.get(`/repos/${expectedUser}/${expectedRepo}/git/refs/${expectedRef}`).reply(200, {
    node_id: 'something==',
    object: {
      sha: expectedSha,
      type: 'commit',
      url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/commits/${expectedSha}`
    },
    ref: `refs/${expectedRef}`,
    url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/refs/${expectedRef}`
  })

const stubTreesEndpoint = ({ expectedUser, expectedRepo, expectedSha, responseTree }) =>
  GITHUB_API_DOUBLE.get(`/repos/${expectedUser}/${expectedRepo}/git/trees/${expectedSha}`).reply(200, {
    sha: expectedSha,
    tree: responseTree.map(blob => ({
      mode: '100644',
      path: blob.path,
      sha: blob.sha,
      size: 28,
      type: 'blob',
      url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/blobs/${blob.sha}`
    })),
    truncated: false,
    url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/trees/${expectedSha}`
  })

const stubBlobEndpoint = ({ expectedUser, expectedRepo, expectedSha, responseContent }) =>
  GITHUB_API_DOUBLE.get(`/repos/${expectedUser}/${expectedRepo}/git/blobs/${expectedSha}`).reply(200, {
    content: responseContent,
    encoding: 'base64',
    url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/blobs/${expectedSha}`,
    sha: expectedSha,
    size: 19
  })

const stubCommitEndpoint = ({ expectedUser, expectedRepo, expectedSha, expectedTreeSha }) =>
  GITHUB_API_DOUBLE.get(`/repos/${expectedUser}/${expectedRepo}/git/commits/${expectedSha}`).reply(200, {
    author: {
      date: '2018-10-19T12:50:50Z',
      email: 'test@example.com',
      name: 'Example User'
    },
    committer: {
      date: '2018-10-19T12:50:50Z',
      email: 'test@example.com',
      name: 'Example User'
    },
    html_url: `https://github.com/${expectedUser}/${expectedRepo}/commit/${expectedSha}`,
    message: 'Some commit message',
    node_id: 'something=',
    parents: [],
    sha: expectedSha,
    tree: {
      sha: expectedTreeSha,
      url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/trees/${expectedTreeSha}`
    },
    url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/commits/${expectedSha}`,
    verification: {
      payload: null,
      reason: 'unsigned',
      signature: null,
      verified: false
    }
  })

const stubCreateBlobEndpoint = ({ expectedUser, expectedRepo, expectedContent, expectedEncoding, responseSha }) =>
  GITHUB_API_DOUBLE.post(`/repos/${expectedUser}/${expectedRepo}/git/blobs`, { content: expectedContent, encoding: expectedEncoding }).reply(200, {
    sha: responseSha,
    url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/blobs/${responseSha}`
  })

const stubCreateTreeEndpoint = ({ expectedUser, expectedRepo, expectedBaseSha, expectedTree, responseSha }) =>
  GITHUB_API_DOUBLE.post(`/repos/${expectedUser}/${expectedRepo}/git/trees`, { base_tree: expectedBaseSha, tree: expectedTree }).reply(200, {
    sha: responseSha,
    tree: expectedTree.map(node => ({
      mode: node.mode,
      path: node.path,
      sha: node.sha,
      size: faker.random.number(),
      type: node.type,
      url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/blobs/${node.sha}`
    }))
  })

const stubCreateCommitEndpoint = ({ expectedUser, expectedRepo, expectedMessage, expectedTreeSha, expectedParentShas, responseSha }) =>
  GITHUB_API_DOUBLE.post(`/repos/${expectedUser}/${expectedRepo}/git/commits`, { message: expectedMessage, tree: expectedTreeSha, parents: expectedParentShas }).reply(200, {
    author: {
      date: '2018-10-19T13:27:37Z',
      email: 'test@example.com',
      name: 'Example User'
    },
    committer: {
      date: '2018-10-19T13:27:37Z',
      email: 'test@example.com',
      name: 'Example User'
    },
    html_url: `https://github.com/${expectedUser}/${expectedRepo}/commit/${responseSha}`,
    message: expectedMessage,
    node_id: 'abcdQ29tbWl0MTUzNzgxNzg5OmMwMDZhOWNkMDcxMjgzYTJkOTZmMDQ1NzYwYjkwYjNmNTA3ZTk5MTQ=',
    parents: expectedParentShas.map(parentSha => ({
      html_url: `https://github.com/${expectedUser}/${expectedRepo}/commit/${parentSha}`,
      sha: parentSha,
      url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/commits/${parentSha}`
    })),
    sha: responseSha,
    tree: {
      sha: expectedTreeSha,
      url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/trees/${expectedTreeSha}`
    },
    url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/commits/${responseSha}`,
    verification: {
      payload: null,
      reason: 'unsigned',
      signature: null,
      verified: false
    }
  })

const stubUpdateReferenceEndpoint = ({ expectedUser, expectedRepo, expectedSha, expectedRef }) =>
  GITHUB_API_DOUBLE.patch(`/repos/${expectedUser}/${expectedRepo}/git/refs/${expectedRef}`, { sha: expectedSha }).reply(200, {
    node_id: 'ABC6UmVmMTUzNzgxNzg5Om1hc3Rlcg==',
    object: {
        sha: expectedSha,
        type: 'commit',
        url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/commits/${expectedSha}`
    },
    ref: `refs/${expectedRef}`,
    url: `https://api.github.com/repos/${expectedUser}/${expectedRepo}/git/refs/${expectedRef}`
  })
