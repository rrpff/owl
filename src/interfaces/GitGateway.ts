export default interface GitGateway {
  getSingleRef (ref: string): Ref
  getSingleCommit (sha: string): Commit
  createBlob ({ content, encoding }: { content: string, encoding: BlobEncoding }): Blob
  createTree ({ base, tree }: { base: string, tree: TreeInput }): Tree
  createCommit ({ message, treeSha, parentShas }: { message: string, treeSha: string, parentShas: [string] }): Commit
  updateReference ({ ref, sha }: { ref: string, sha: string }): void
}

export interface Ref {
  ref: string
  sha: string
}

export interface Commit {
  sha: string
  treeSha: string
}

export interface Blob {
  sha: string
}

export interface Tree {
  sha: string
  tree: TreeObject[]
}

export interface TreeInput {
  baseSha: string
  tree: TreeObject[]
}

export interface TreeObject {
  mode: TreeObjectMode
  path: string
  sha: string
  type: TreeObjectType
}

export type BlobEncoding = 'utf-8' | 'base64'
export type TreeObjectMode = '100644'
export type TreeObjectType = 'blob'
