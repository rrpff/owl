import React from 'react'

class FileAdder extends React.Component {
  state = { value: '' }

  render () {
    return (
      <div>
        <form onSubmit={e => { e.preventDefault(); this.props.onSubmit(this.state.value); this.setState({ value: '' }) }}>
          <input type="text" placeholder="File name" onChange={e => this.setState({ value: e.target.value })} value={this.state.value} />
          <input type="submit" value="Add" />
        </form>
      </div>
    )
  }
}

export default FileAdder
