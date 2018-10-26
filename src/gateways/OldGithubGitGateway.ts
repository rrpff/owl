// import GitGateway, { Ref, Commit, Blob, BlobEncoding, TreeInput, Tree } from '../interfaces/GitGateway'
//
// export default class GithubGitGateway implements GitGateway {
//   getSingleRef (ref: string): Ref {
//     return {
//       ref: 'string',
//       sha: 'string'
//     }
//     // http GET https://api.github.com/repos/zuren/notes/git/refs/heads/master 'Authorization: token 6ea3bb79e45669758908417df3eaba7d0bc95119'
//
//     // {
//     //     "documentation_url": "https://developer.github.com/v3/git/refs/#get-a-reference",
//     //     "message": "Git Repository is empty."
//     // }
//
//     // {
//     //     "node_id": "MDM6UmVmMTUzNzgxNzg5Om1hc3Rlcg==",
//     //     "object": {
//     //         "sha": "5df002643567843c210e01caba45bc2806d62c28",
//     //         "type": "commit",
//     //         "url": "https://api.github.com/repos/zuren/notes/git/commits/5df002643567843c210e01caba45bc2806d62c28"
//     //     },
//     //     "ref": "refs/heads/master",
//     //     "url": "https://api.github.com/repos/zuren/notes/git/refs/heads/master"
//     // }
//   }
//
//   getSingleCommit (sha: string): Commit {
//     return {
//       sha: 'string',
//       treeSha: 'string'
//     }
//     // http GET https://api.github.com/repos/zuren/notes/git/commits/5df002643567843c210e01caba45bc2806d62c28 'Authorization: token 6ea3bb79e45669758908417df3eaba7d0bc95119'
//
//     // {
//     //     "author": {
//     //         "date": "2018-10-19T12:50:50Z",
//     //         "email": "richard@rpf.me",
//     //         "name": "Richard Foster"
//     //     },
//     //     "committer": {
//     //         "date": "2018-10-19T12:50:50Z",
//     //         "email": "richard@rpf.me",
//     //         "name": "Richard Foster"
//     //     },
//     //     "html_url": "https://github.com/zuren/notes/commit/5df002643567843c210e01caba45bc2806d62c28",
//     //     "message": "Add test note",
//     //     "node_id": "MDY6Q29tbWl0MTUzNzgxNzg5OjVkZjAwMjY0MzU2Nzg0M2MyMTBlMDFjYWJhNDViYzI4MDZkNjJjMjg=",
//     //     "parents": [],
//     //     "sha": "5df002643567843c210e01caba45bc2806d62c28",
//     //     "tree": {
//     //         "sha": "f81dbe00fa91182a2dfb28129f81a7cae55c2aec",
//     //         "url": "https://api.github.com/repos/zuren/notes/git/trees/f81dbe00fa91182a2dfb28129f81a7cae55c2aec"
//     //     },
//     //     "url": "https://api.github.com/repos/zuren/notes/git/commits/5df002643567843c210e01caba45bc2806d62c28",
//     //     "verification": {
//     //         "payload": null,
//     //         "reason": "unsigned",
//     //         "signature": null,
//     //         "verified": false
//     //     }
//     // }
//   }
//
//   createBlob ({ content, encoding }: { content: string, encoding: BlobEncoding }): Blob {
//     return {
//       sha: 'string'
//     }
//     // http POST https://api.github.com/repos/zuren/notes/git/blobs content='new test file' encoding='utf-8' 'Authorization: token 6ea3bb79e45669758908417df3eaba7d0bc95119'
//
//     // {
//     //     "sha": "8c73d0e136761f7bf0ef1c52b047e8b4e4a4c67d",
//     //     "url": "https://api.github.com/repos/zuren/notes/git/blobs/8c73d0e136761f7bf0ef1c52b047e8b4e4a4c67d"
//     // }
//   }
//
//   // getSingleTree () {
//     // http GET https://api.github.com/repos/zuren/notes/git/trees/f81dbe00fa91182a2dfb28129f81a7cae55c2aec 'Authorization: token 6ea3bb79e45669758908417df3eaba7d0bc95119'
//
//     // {
//     //     "sha": "f81dbe00fa91182a2dfb28129f81a7cae55c2aec",
//     //     "tree": [
//     //         {
//     //             "mode": "100644",
//     //             "path": "test.md",
//     //             "sha": "b2201cdaf61ed7ba2016ceca49a7abef51093d01",
//     //             "size": 28,
//     //             "type": "blob",
//     //             "url": "https://api.github.com/repos/zuren/notes/git/blobs/b2201cdaf61ed7ba2016ceca49a7abef51093d01"
//     //         }
//     //     ],
//     //     "truncated": false,
//     //     "url": "https://api.github.com/repos/zuren/notes/git/trees/f81dbe00fa91182a2dfb28129f81a7cae55c2aec"
//     // }
//   // }
//
//   createTree ({ base, tree }: { base: string, tree: TreeInput }): Tree {
//     return {
//       sha: 'string',
//       tree: []
//     }
//     // gogogo {
//     //   "base_tree": "f81dbe00fa91182a2dfb28129f81a7cae55c2aec",
//     //   "tree": [
//     //     {
//     //       "path": "test.md",
//     //       "mode": "100644",
//     //       "type": "blob",
//     //       "sha": "b2201cdaf61ed7ba2016ceca49a7abef51093d01"
//     //     },
//     //     {
//     //       "path": "new.md",
//     //       "mode": "100644",
//     //       "type": "blob",
//     //       "sha": "8c73d0e136761f7bf0ef1c52b047e8b4e4a4c67d"
//     //     }
//     //   ]
//     // }
//
//     // http POST https://api.github.com/repos/zuren/notes/git/trees 'Authorization: token 6ea3bb79e45669758908417df3eaba7d0bc95119' < newtree.json
//
//     // {
//     //     "sha": "7dcc1750347606b6aed05be645dc88be650694c7",
//     //     "tree": [
//     //         {
//     //             "mode": "100644",
//     //             "path": "new.md",
//     //             "sha": "8c73d0e136761f7bf0ef1c52b047e8b4e4a4c67d",
//     //             "size": 13,
//     //             "type": "blob",
//     //             "url": "https://api.github.com/repos/zuren/notes/git/blobs/8c73d0e136761f7bf0ef1c52b047e8b4e4a4c67d"
//     //         },
//     //         {
//     //             "mode": "100644",
//     //             "path": "test.md",
//     //             "sha": "b2201cdaf61ed7ba2016ceca49a7abef51093d01",
//     //             "size": 28,
//     //             "type": "blob",
//     //             "url": "https://api.github.com/repos/zuren/notes/git/blobs/b2201cdaf61ed7ba2016ceca49a7abef51093d01"
//     //         }
//     //     ],
//     //     "truncated": false,
//     //     "url": "https://api.github.com/repos/zuren/notes/git/trees/7dcc1750347606b6aed05be645dc88be650694c7"
//     // }
//   }
//
//   createCommit ({ message, treeSha, parentShas }: { message: string, treeSha: string, parentShas: [string] }): Commit {
//     return {
//       sha: 'string',
//       treeSha: 'string'
//     }
//     // http POST https://api.github.com/repos/zuren/notes/git/commits message='add new file' tree='7dcc1750347606b6aed05be645dc88be650694c7' parents:='["5df002643567843c210e01caba45bc2806d62c28"]' 'Authorization: token 6ea3bb79e45669758908417df3eaba7d0bc95119'
//
//     // {
//     //     "author": {
//     //         "date": "2018-10-19T13:27:37Z",
//     //         "email": "richard@rpf.me",
//     //         "name": "Richard Foster"
//     //     },
//     //     "committer": {
//     //         "date": "2018-10-19T13:27:37Z",
//     //         "email": "richard@rpf.me",
//     //         "name": "Richard Foster"
//     //     },
//     //     "html_url": "https://github.com/zuren/notes/commit/c006a9cd071283a2d96f045760b90b3f507e9914",
//     //     "message": "add new file",
//     //     "node_id": "MDY6Q29tbWl0MTUzNzgxNzg5OmMwMDZhOWNkMDcxMjgzYTJkOTZmMDQ1NzYwYjkwYjNmNTA3ZTk5MTQ=",
//     //     "parents": [
//     //         {
//     //             "html_url": "https://github.com/zuren/notes/commit/5df002643567843c210e01caba45bc2806d62c28",
//     //             "sha": "5df002643567843c210e01caba45bc2806d62c28",
//     //             "url": "https://api.github.com/repos/zuren/notes/git/commits/5df002643567843c210e01caba45bc2806d62c28"
//     //         }
//     //     ],
//     //     "sha": "c006a9cd071283a2d96f045760b90b3f507e9914",
//     //     "tree": {
//     //         "sha": "7dcc1750347606b6aed05be645dc88be650694c7",
//     //         "url": "https://api.github.com/repos/zuren/notes/git/trees/7dcc1750347606b6aed05be645dc88be650694c7"
//     //     },
//     //     "url": "https://api.github.com/repos/zuren/notes/git/commits/c006a9cd071283a2d96f045760b90b3f507e9914",
//     //     "verification": {
//     //         "payload": null,
//     //         "reason": "unsigned",
//     //         "signature": null,
//     //         "verified": false
//     //     }
//     // }
//   }
//
//   updateReference ({ ref, sha }: { ref: string, sha: string }): void {
//     // http PATCH https://api.github.com/repos/zuren/notes/git/refs/heads/master sha=c006a9cd071283a2d96f045760b90b3f507e9914 'Authorization: token 6ea3bb79e45669758908417df3eaba7d0bc95119'
//
//     // {
//     //     "node_id": "MDM6UmVmMTUzNzgxNzg5Om1hc3Rlcg==",
//     //     "object": {
//     //         "sha": "c006a9cd071283a2d96f045760b90b3f507e9914",
//     //         "type": "commit",
//     //         "url": "https://api.github.com/repos/zuren/notes/git/commits/c006a9cd071283a2d96f045760b90b3f507e9914"
//     //     },
//     //     "ref": "refs/heads/master",
//     //     "url": "https://api.github.com/repos/zuren/notes/git/refs/heads/master"
//     // }
//   }
// }
