import React from 'react'

class ColourChanger extends React.Component {
  state = {
    colour: 'red'
  }

  changeColour = () => {
    const colours = ['orange', 'green', 'blue', 'teal', 'pink', 'purple', 'red']
    this.setState({ colour: colours[Math.ceil(Math.random() * colours.length)] })
  }

  render () {
    return (
      <div style={{ background: this.state.colour, padding: '30px' }}>
        <button onClick={this.changeColour}>change my colour!</button>
      </div>
    )
  }
}

export default ColourChanger
