import React from 'react'
import Cart from './Cart'
import './CartBox.css'
import { Link } from 'react-router-dom'

class CartBox extends React.Component {
    state = { cartboxEmpty: true }
    componentDidUnMount = () => {
        this.setState({ cartboxEmpty: false })
    }
    shoppingCartClose = () => {
        document.getElementById("shopping-cart").style.width = "0"
        console.log("close")
    }

    render() {
        return (
            <div id="shopping-cart" className="sidenav">
                <div>
                    <button className="close-btn" onClick={this.shoppingCartClose}>&times;</button>
                </div>
                {this.state.cartboxEmpty ?
                    <ul className="cart-list">
                        {this.props.selectedProductsList.map((item, index) => {
                            return (
                                <Cart
                                    key={index}
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    image={item.img}
                                    count={item.count}
                                    changeCount={() => this.props.changeCount(item.id)}
                                    add={() => this.props.addProduct(item.id)}
                                    delete={() => this.props.deleteProduct(item.id)}
                                />
                            )
                        })}
                    </ul>
                    : <h3>سبد خرید خالی است</h3>}
                <div className="cart-footer">
                    <p className="total-price">مجموع پرداختی: {this.props.totalPrice}</p>
                    <p className="purchase-handler">
                        <Link to="/checkout-order" onClick={this.props.purchaseHandler}>ثبت سفارش</Link>
                    </p>

                </div>
            </div >)
    }

}
export default CartBox