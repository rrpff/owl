import React from 'react'

const fileColour = file => {
  if (file.new) return 'green'
  if (file.changed) return 'orange'
  return 'grey'
}

const FileTreeEmpty = () =>
  <span>You have no notes</span>

const FileTreeList = ({ files, onFileSelect }) => {
  const sortedFiles = files.sort((a, b) => a.name >= b.name)

  return (
    <ul>
      {sortedFiles.map(file =>
        <li key={file.name}>
          <a href="#" onClick={e => { e.preventDefault(); onFileSelect(file.name) }} style={{ color: fileColour(file) }}>
            {file.selected
              ? <strong>{file.name}</strong>
              : <span>{file.name}</span>
            }
          </a>
        </li>
      )}
    </ul>
  )
}

const FileTree = ({ files, onFileSelect }) =>
  <div>
    { files.length > 0
      ? <FileTreeList files={files} onFileSelect={onFileSelect} />
      : <FileTreeEmpty />
    }
  </div>

export default FileTree
