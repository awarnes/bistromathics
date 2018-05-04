/*
The component for an individual patron.
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Patron extends Component {
    constructor (props) {
        super(props)
        this.state = {
            name: ''
        }
        this.handleName = this.handleName.bind(this)
    }

    handleName (e) {
        this.setState({ name: e.target.value })
    }

    render () {
        const { name } = this.state
        const { uid, patronTotal, handleCancel } = this.props
        return (
            <tr>
                <td id="cancel"><button id="delete" onClick={() => { handleCancel(uid) }}><strong style={{ color: 'red' }}>X</strong></button></td>
                <td id="name"><input type="text" placeholder="name" value={name} onChange={this.handleName} /></td>
                <td id="patronTotal">{`$${patronTotal}`}</td>
            </tr>
        )
    }
}

Patron.propTypes = {
    uid: PropTypes.string,
    patronTotal: PropTypes.number,
    handleCancel: PropTypes.func
}
