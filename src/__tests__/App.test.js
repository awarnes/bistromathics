import React from 'react'
import ReactDOM from 'react-dom'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from '../App'

Enzyme.configure({ adapter: new Adapter() })

/* global it describe expect beforeEach */

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
})

describe('App renders', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallow(<App />)
    })

    it('the title component', () => {
        expect(wrapper.find('h1').exists()).toBe(true)
    })

    it('the subtotal input component', () => {
        expect(wrapper.find('#subtotal').exists()).toBe(true)
    })

    it('the customize checkbox component', () => {
        expect(wrapper.find('#customize').exists()).toBe(true)
    })

    it('the customizeLabel component', () => {
        expect(wrapper.find('#customizeLabel').exists()).toBe(true)
    })

    it('the taxPercent input component', () => {
        expect(wrapper.find('#taxPercent').exists()).toBe(true)
    })

    it('the tipPercent input component', () => {
        expect(wrapper.find('#tipPercent').exists()).toBe(true)
    })

    it('the output paragraph component', () => {
        expect(wrapper.find('#output').exists()).toBe(true)
    })
})

describe('App function', () => {
    let app, wrapper

    beforeEach(() => {
        wrapper = shallow(<App />)
        app = wrapper.instance()
    })

    it('updateCustomTax returns correctly', () => {
        expect(app.state.tax).toEqual(9)
        app.updateCustomTax({ target: { value: 1 } })
        expect(app.state.tax).toEqual(1)
    })

    it('updateCustomTip returns correctly', () => {
        expect(app.state.tip).toEqual(15)
        app.updateCustomTip({ target: { value: 1 } })
        expect(app.state.tip).toEqual(1)
    })

    it('updateCustomChecked returns correctly', () => {
        expect(app.state.customChecked).toEqual(false)
        app.updateCustomChecked()
        expect(app.state.customChecked).toEqual(true)
    })

    it('updateCustomSubtotal returns correctly', () => {
        expect(app.state.subtotal).toEqual(0.0)
        app.updateSubtotal({ target: { value: 12.2 } })
        expect(app.state.subtotal).toEqual(12.2)
    })

    it('calcReceipt returns correctly', () => {
        app.setState({ subtotal: 20 })
        const expectedState = {
            total: 0.0,
            customChecked: false,
            tax: 9,
            tip: 15,
            subtotal: 20
        }
        expect(app.state).toEqual(expectedState)
        app.calcReceipt()
        expect(app.state.total).toEqual(24.8)
    })

    it('updateCustomChecked resets tax and tip to defaults when unchecked', () => {
        app.setState({ customChecked: true, tip: 10, tax: 2 })

        const expectedBeforeState = {
            total: 0.0,
            customChecked: true,
            tax: 2,
            tip: 10,
            subtotal: 0.0
        }

        expect(app.state).toEqual(expectedBeforeState)
        app.updateCustomChecked()

        const expectedAfterState = {
            total: 0.0,
            customChecked: false,
            tax: 9,
            tip: 15,
            subtotal: 0.0
        }

        expect(app.state).toEqual(expectedAfterState)
    })
})
