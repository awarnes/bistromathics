import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      total: 0.0,
      customChecked: false,
      tax: 9,
      tip: 15
    }

    this.calcReceipt = this.calcReceipt.bind(this)
    this.updateCustomChecked = this.updateCustomChecked.bind(this)
  }

  updateCustomChecked () {
    this.setState({customChecked: !this.state.customChecked})
  }

  calcReceipt (e) {
    this.setState({total: e.target.value * (1 + 0.09 + 0.15)})
  }
  render () {
    return (
      <div className="App">
        <h1>Bistromathics!</h1>
        <input type='text' id='subtotal' placeholder='Subtotal...' onChange={this.calcReceipt}/>
        <br/>
        <input type='checkbox' checked={this.state.customChecked} id='customize' onChange={this.updateCustomChecked} />
        <label htmlFor='customize'>Click to set custom values for tip and tax.</label>
        <br/>
        <input type='text' hidden={!this.state.customChecked} id='tipPercent' onChange={this.updateCustomTip} placeholder='Custom Tip...'/>
        <input type='text' hidden={!this.state.customChecked} id='taxPercent' onChange={this.updateCustomTax} placeholder='Custom Tax...'/>
        <p>
          The total, including tax ({this.state.tax}%) and tip ({this.state.tip}%), is: ${this.state.total}.
        </p>
      </div>
    )
  }
}

export default App
