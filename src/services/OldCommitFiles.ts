// import State from '../interfaces/StateGateway'
// import GitGateway from '../interfaces/GitGateway'
//
// class CommitFiles {
//   private state: StateGateway;
//   private git: GitGateway;
//
//   constructor ({ stateGateway, gitGateway }: { stateGateway: StateGateway, gitGateway: GitGateway }) {
//     this.state = stateGateway
//     this.git = githubGitGateway
//   }
//
//   async execute ({ message: string, files: Tree }): void {
//     try {
//       const head = await git.getSingleRef('heads/master')
//       const lastCommit = await git.getSingleCommit(head.ref)
//       const newFilenamesToShas = await Promise.all(Object.keys(files).map(async fileName => {
//         const blob = await git.createBlob(head.ref)
//         return { fileName: fileName, sha: blob.sha }
//       }))
//
//       // const lastTree = await git.getSingleTree(lastCommit.tree.sha)
//       const newTree = await git.createTree({
//         baseSha: lastCommit.tree.sha,
//         tree: newFilenamesToShas.map(({ fileName, sha }) => ({
//           path: fileName,
//           mode: '100644',
//           type: 'blob',
//           sha: sha
//         }))
//       })
//
//       const commit = await git.createCommit({
//         message: message,
//         treeSha: newTree.sha,
//         parentShas: [lastCommit.sha]
//       })
//
//       await git.updateReference({
//         ref: 'heads/master',
//         sha: commit.sha
//       })
//
//       this.state.dispatch({ type: 'COMMIT_CREATED', message: message })
//     } catch (e) {
//
//     }
//   }
// }
