import React from 'react'
import './Checkout.css'
import CheckoutItem from './CheckoutItem'
import axios from '../../axios-orders'


class Checkout extends React.Component {
    state = {
        cart: null,
        totalPrice: null,
    }
    componentDidMount = () => {
        axios.get('https://main-shop-react.firebaseio.com/orders.json',)
            .then((response) => {
                let key = Object.keys(response.data)
                let data = response.data[key[key.length - 1]].order
                let totalPrice = response.data[key[key.length - 1]].totalPrice
                this.setState({
                    cart: data,
                    totalPrice: totalPrice
                })
                console.log(response.data)

            })
    }


    render() {

        return (
            <div className="checkout">
                <h2> سفارش من</h2>
                {this.state.cart ?
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>تعداد</th>
                                <th>قیمت</th>
                                <th>نام محصول</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cart.map((item, index) => {
                                    return (
                                        <CheckoutItem
                                            key={index}
                                            id={item.id}
                                            title={item.title}
                                            price={item.price}
                                            image={item.img}
                                            count={item.count}
                                            changeCount={() => this.changeCountHandler(item.id)}
                                        />
                                    )
                                })}
                        </tbody>
                    </table>

                    : <h1>سبدخرید شما خالی است</h1>}
                <p className="total-price">مجموع پرداختی: {this.state.totalPrice}</p>
                <p className="purchase-handler">
                    <a > تایید سفارش و پرداخت</a>
                </p>
            </div>
        )
    }
}
export default Checkout