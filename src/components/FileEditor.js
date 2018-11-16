import React from 'react'

class FileEditor extends React.Component {
  handleResetFile = e => {
    e.preventDefault()
    this.props.onResetFile()
  }

  handleChange = e =>
    this.props.onChange({
      value: e.currentTarget.value
    })

  render () {
    return (
      <div>
        <form onSubmit={this.handleResetFile}>
          <button type="submit">Reset File</button>
        </form>
        <textarea cols="30" rows="10" onChange={this.handleChange} key={this.props.name} value={this.props.content} />
      </div>
    )
  }
}

export default FileEditor
