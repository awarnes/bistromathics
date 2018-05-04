import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Patron from '../components/Patron'

const idGen = (index) => {
    return Math.random() * Math.floor(index)
}

export default class BillSplit extends Component {
    constructor (props) {
        super(props)

        this.state = {
            patrons: []
        }

        this.addPatron = this.addPatron.bind(this)
        this.deletePatron = this.deletePatron.bind(this)
    }

    addPatron () {
        const { patrons } = this.state
        patrons.push({ uid: `${idGen(patrons.length)}-${idGen(patrons.length)}-${idGen(patrons.length)}` })

        this.setState({ patrons })
    }

    deletePatron (uid) {
        let { patrons } = this.state
        patrons = patrons.filter((patron) => {
            return patron.uid !== uid
        })
        this.setState({ patrons })
    }

    render () {
        const { patrons } = this.state
        const patronList = patrons.map(patron => {
            return (<Patron
                key={patron.uid}
                uid={patron.uid}
                handleCancel={this.deletePatron}
                patronTotal={this.props.total / patrons.length}
            />)
        })

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th><button id="addPatron" onClick={this.addPatron}><i className="fa fa-plus" /></button></th>
                            <th>Name</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {patronList}
                    </tbody>
                </table>
            </div>
        )
    }
}

BillSplit.propTypes = {
    total: PropTypes.number
}
