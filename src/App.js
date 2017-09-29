import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      total: 0.0
    }

    this.calcReceipt = this.calcReceipt.bind(this)
  }

  calcReceipt (e) {
    this.setState({total: e.target.value * (1 + 0.09 + 0.15)})
  }
  render () {
    return (
      <div className="App">
        <h1>Bistromathics!</h1>
        <input type='text' id='subtotal' placeholder='Subtotal' onChange={this.calcReceipt}/>
        <p>
          The total (including taxes and tips) is: ${this.state.total}.
        </p>
      </div>
    )
  }
}

export default App
