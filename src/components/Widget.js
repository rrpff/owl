import React from 'react'
import FileStateContext from '../contexts/FileStateContext'
import FileAdder from './FileAdder'
import FileTree from './FileTree'
import FileEditor from './FileEditor'
import MarkdownViewer from './MarkdownViewer'

class Widget extends React.Component {
  handleFileChange = change => {
    this.setState({
      files: {
        ...this.state.files,
        [this.state.selectedFileName]: {
          ...this.state.files[this.state.selectedFileName],
          content: change.value,
          changed: this.state.originalFiles[this.state.selectedFileName] && this.state.originalFiles[this.state.selectedFileName].content !== change.value
        }
      }
    })
  }

  handleFileReset = () => {
    if (!this.state.originalFiles[this.state.selectedFileName]) return

    this.setState({
      files: {
        ...this.state.files,
        [this.state.selectedFileName]: {
          content: this.state.originalFiles[this.state.selectedFileName].content,
          changed: false,
          new: false
        }
      }
    })
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      originalFiles: props.files,
      files: props.files,
      selectedFileName: 'test.md'
    }
  }

  async componentDidMount () {
    const { files } = await this.props.readFiles(this.props.ref)
    this.setState({ originalFiles: files })
  }

  render () {
    return (
      <section>
        <FileAdder onSubmit={name => this.setState({ files: { ...this.state.files, [name]: { content: '', changed: true, new: true } } })} />
        <FileTree onFileSelect={name => this.setState({ selectedFileName: name })} files={Object.keys(this.state.files).map(name => ({ name, content: this.state.files[name].content, changed: this.state.files[name].changed, new: this.state.files[name].new }))} />
        <FileEditor name={this.state.selectedFileName} content={this.state.files[this.state.selectedFileName].content} onChange={this.handleFileChange} onResetFile={this.handleFileReset} />
        <MarkdownViewer content={this.state.files[this.state.selectedFileName].content} />
      </section>
    )
  }
}

export default Widget
