import CommitFiles from './CommitFiles'

class MockGitGateway {
  constructor () {
    this.head = '5df002643567843c210e01caba45bc2806d62c28'
  }

  getSingleRef (ref) {
    if (ref !== 'heads/master') throw 'Retrieving the wrong ref'

    return {
      ref: 'refs/heads/master',
      sha: '5df002643567843c210e01caba45bc2806d62c28'
    }
  }

  getSingleCommit (sha) {
    if (sha !== '5df002643567843c210e01caba45bc2806d62c28') throw 'Retrieving the wrong commit SHA'

    return {
      sha: '5df002643567843c210e01caba45bc2806d62c28',
      treeSha: 'f81dbe00fa91182a2dfb28129f81a7cae55c2aec'
    }
  }

  createBlob ({ content, encoding }) {
    if (content !== 'cool test content') throw 'Creating the wrong blob'
    if (encoding !== 'utf-8') throw 'Using the wrong encoding'

    return {
      sha: '8c73d0e136761f7bf0ef1c52b047e8b4e4a4c67d'
    }
  }

  createTree ({ baseSha, tree }) {
    if (baseSha !== 'f81dbe00fa91182a2dfb28129f81a7cae55c2aec') throw 'Using the wrong base tree SHA'
    if (tree.length !== 1) throw 'Only create one file'
    if (tree[0].mode !== '100644') throw 'Only use 100644 mode'
    if (tree[0].path !== 'new.md') throw 'Only use the new.md path'
    if (tree[0].sha !== '8c73d0e136761f7bf0ef1c52b047e8b4e4a4c67d') throw 'Only use the 8c73d0e136761f7bf0ef1c52b047e8b4e4a4c67d sha'
    if (tree[0].type !== 'blob') throw 'Only use blob type'

    return {
      sha: '7dcc1750347606b6aed05be645dc88be650694c7'
    }
  }

  createCommit ({ message, treeSha, parentShas }) {
    if (message !== 'my cool commit message') throw 'Only use "my cool commit message"'
    if (treeSha !== '7dcc1750347606b6aed05be645dc88be650694c7') throw 'Using the wrong tree SHA for the commit'
    if (parentShas.length !== 1) throw 'Using the wrong parent SHAs for the commit'
    if (parentShas[0] !== '5df002643567843c210e01caba45bc2806d62c28') throw 'Using the wrong parent SHAs for the commit'

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

it('should create a commit', async () => {
  const gitGateway = new MockGitGateway()
  const service = new CommitFiles({ gitGateway })

  await service.execute({
    message: 'my cool commit message',
    files: {
      'new.md': 'cool test content'
    }
  })

  gitGateway.assertReferenceUpdated()
})
