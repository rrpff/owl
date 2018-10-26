import GitGateway, { Ref, Commit, Blob, BlobEncoding, TreeInput, Tree } from '../interfaces/GitGateway'

class MockGitGateway implements GitGateway {
  private head: string;

  constructor () {
    this.head = '5df002643567843c210e01caba45bc2806d62c28'
  }

  getSingleRef (ref: string): Ref {
    if (ref !== 'heads/master') throw 'Retrieving the wrong ref'

    return {
      ref: 'refs/heads/master',
      sha: '5df002643567843c210e01caba45bc2806d62c28'
    }
  }

  getSingleCommit (sha: string): Commit {
    if (sha !== '5df002643567843c210e01caba45bc2806d62c28') throw 'Retrieving the wrong commit SHA'

    return {
      sha: '5df002643567843c210e01caba45bc2806d62c28',
      treeSha: 'f81dbe00fa91182a2dfb28129f81a7cae55c2aec'
    }
  }

  createBlob ({ content, encoding }: { content: string, encoding: BlobEncoding }): Blob {
    if (content !== 'cool test content') throw 'Retrieving the wrong'

    return {
      sha: '8c73d0e136761f7bf0ef1c52b047e8b4e4a4c67d'
    }
  }

  createTree (_input: { base: string, tree: TreeInput }): Tree {
    return {
      sha: '7dcc1750347606b6aed05be645dc88be650694c7',
      tree: [
        {
            "mode": "100644",
            "path": "new.md",
            "sha": "8c73d0e136761f7bf0ef1c52b047e8b4e4a4c67d",
            "type": "blob"
        },
        {
            "mode": "100644",
            "path": "test.md",
            "sha": "b2201cdaf61ed7ba2016ceca49a7abef51093d01",
            "type": "blob"
        }
      ]
    }
  }

  createCommit (_input: { message: string, treeSha: string, parentShas: [string] }): Commit {
    return {
      sha: 'c006a9cd071283a2d96f045760b90b3f507e9914',
      treeSha: '7dcc1750347606b6aed05be645dc88be650694c7'
    }
  }

  updateReference ({ ref, sha }: { ref: string, sha: string }): void {
    if (ref !== 'heads/master') throw 'Updating the wrong reference'
    if (sha !== 'c006a9cd071283a2d96f045760b90b3f507e9914') throw 'Updating master to the wrong SHA'

    this.head = sha
  }

  assertReferenceUpdated () {
    if (this.head !== 'c006a9cd071283a2d96f045760b90b3f507e9914') {
      throw 'Reference was not updated correctly'
    }
  }
}


it('should create a commit', () => {
  const gateway = new MockGitGateway()
  gateway.assertReferenceUpdated()
})
