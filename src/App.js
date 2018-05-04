import React, { Component } from 'react'
import './App.css'
import * as utils from './utils'
import BillSplit from './containers/BillSplit'

class App extends Component {
    constructor (props) {
        super(props)

        this.state = {
            total: 0.0,
            customChecked: false,
            tax: 9,
            tip: 15,
            subtotal: 0.0
        }

        this.calcReceipt = this.calcReceipt.bind(this)
        this.updateCustomChecked = this.updateCustomChecked.bind(this)
        this.updateCustomTax = this.updateCustomTax.bind(this)
        this.updateCustomTip = this.updateCustomTip.bind(this)
        this.updateSubtotal = this.updateSubtotal.bind(this)
    }

    updateCustomTax (e) {
        this.setState({ tax: e.target.value }, this.calcReceipt)
    }

    updateCustomTip (e) {
        this.setState({ tip: e.target.value }, this.calcReceipt)
    }

    updateCustomChecked () {
        this.setState({ customChecked: !this.state.customChecked }, () => {
            if (!this.state.customChecked) {
                this.setState({ tip: 15, tax: 9 }, this.calcReceipt)
            }
        })
    }

    updateSubtotal (e) {
        this.setState({ subtotal: e.target.value }, this.calcReceipt)
    }

    calcReceipt () {
        this.setState({ total: utils.round(this.state.subtotal * (1.00 + (this.state.tax / 100) + (this.state.tip / 100)), 2) })
    }
    render () {
        return (
            <div className="App">
                <h1>Bistromathics!</h1>
                <input type="text" id="subtotal" placeholder="Subtotal..." onChange={this.updateSubtotal}/>
                <br/>
                <input type="checkbox" checked={this.state.customChecked} id="customize" onChange={this.updateCustomChecked} />
                <label htmlFor="customize" id="customizeLabel">Click to set custom values for tip and tax.</label>
                <br/>
                <input type="text" hidden={!this.state.customChecked} id="taxPercent" onChange={this.updateCustomTax} placeholder="Custom Tax..."/>
                <input type="text" hidden={!this.state.customChecked} id="tipPercent" onChange={this.updateCustomTip} placeholder="Custom Tip..."/>
                <p id="output">
          The total, including tax ({this.state.tax}%) and tip ({this.state.tip}%), is: ${this.state.total}.
                </p>
                <BillSplit total={this.state.total}/>
            </div>
        )
    }
}

export default App
