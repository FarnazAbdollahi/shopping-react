import React from 'react'
import './Checkout.css'

class CheckoutItem extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }
    componentDidMount() {
    }
    render() {
        return (
            <tr>
                <td>{this.props.count}</td>
                <td>{`${this.props.price} تومان`}</td>
                <td >{this.props.title}</td>
                <td><img className="chosen-product-image" alt="img" src={this.props.image} /></td>
                <td>&times;</td>
            </tr>

        )
    }
}
export default CheckoutItem