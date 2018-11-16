import React from 'react'
import FileStateContext from './contexts/FileStateContext'
import GithubGitGateway from './gateways/GithubGitGateway'
import ReadFiles from './services/ReadFiles'
import CommitFiles from './services/CommitFiles'
import Widget from './components/Widget'
// import './App.css'

const gitGateway = new GithubGitGateway({ user: 'zuren', repo: 'notes', accessToken: '6ea3bb79e45669758908417df3eaba7d0bc95119' })
const readFiles = new ReadFiles({ gitGateway })
const commitFiles = new CommitFiles({ gitGateway })

class App extends React.Component {
  render() {
    return (
      <Widget
        ref="heads/master"
        readFiles={readFiles}
        commitFiles={commitFiles}
      />
    )
  }
}

export default App
