import React from 'react'
import './Cart.css'

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
    }
    componentDidMount() {
        this.inputRef.current.focus()
    }
    render() {
        return (
            < li className="chosen-product"  >
                <img className="chosen-product-image" alt="img" src={this.props.image} />
                <p className="chosen-product-title">{this.props.title}</p>
                <p className="chosen-product-price">{`${this.props.price} تومان`}</p>
                <div className="product-count">
                    <button id="add" className="btn" onClick={this.props.add}>&#43;</button>
                    <input
                        ref={this.inputRef}
                        type="text"
                        id={this.props.id}
                        className="chosen-product-count"
                        value={this.props.count}
                        onChange={this.props.changeCount}
                    />
                    <button id="delete" className="btn" onClick={this.props.delete}>&minus;</button>
                </div>
            </li >
        )
    }
}
export default Cart