import React from 'react'
import Wrapper from '../../hoc/Wrapper'
import Products from '../../components/Products/Products'
import CartBox from '../../components/cart/CartBox'
import Loader from '../../components/Loader/Loader'
import axios from '../../axios-orders'

class Shopping extends React.Component {
    constructor(props) {
        super(props)
        console.log('Shopping.js constructed')
    }
    state = {
        products: null,
        selectedProducts: [],
        totalPrice: 0,
        loading: false,
    }

    componentDidMount = () => {
        console.log(this.props)
        axios.get('https://main-shop-react.firebaseio.com/products.json')
            .then((response) => {
                this.setState({ products: response.data })
            })
    }
    shouldComponentUpdate() {
        console.log("Shopping shouldComponentUpdate")
        return true

    }
    componentDidUpdate() {
        console.log("Shopping componentDidUpdate")
    }

    deleteProductFromCart = (itemID) => {

        let element = this.state.selectedProducts.find((item) => {
            return item.id === itemID
        })
        if (element === undefined) {
            window.alert("Item is not selected")
        }
        else if (element.count === 1) {
            this.setState({ selectedProducts: this.state.selectedProducts.splice(this.state.selectedProducts.findIndex(index => index.id === itemID), 1) })
            element.count = 0
        }
        else {
            let oldCount = element.count
            let newCount = oldCount - 1
            element.count = newCount
        }
        this.setState({
            selectedProducts: this.state.selectedProducts
        })
        this.totalPriceHandler()

        console.log("deleted")
    }

    addProductToCard = (itemID) => {
        let element = this.state.selectedProducts.find((item) => item.id === itemID)
        console.log(element)
        if (element === undefined) {
            let selectedPro = this.state.products[itemID]
            selectedPro.count = 1
            let updatedProducts = this.state.selectedProducts.concat(selectedPro)
            this.setState({
                selectedProducts: [...updatedProducts]
            })
            console.log(this.state.selectedProducts)

        }
        else {
            let oldCount = element.count
            let newCount = oldCount + 1
            element.count = newCount

            this.setState({
                selectedProducts: [...this.state.selectedProducts]
            })
        }
        console.log(this.state.selectedProducts)
        this.totalPriceHandler()

        console.log("added")

    }

    changeCountHandler = (itemID, event) => {
        let element = this.state.selectedProducts.find((item) => {
            return item.id === itemID
        })
        if (element.count <= event.target.value) {
            this.deleteProductFromCard(itemID)
        }
        else {
            this.addProductToCard(itemID)
        }


    }

    totalPriceHandler = () => {

        let itemPrice = 0
        let updatedTotalPrice = 0
        let totalPriceOfEachProduct = 0
        let i = 0

        totalPriceOfEachProduct = this.state.selectedProducts.map((item) => {
            itemPrice = Number(item.count) * Number(item.price)
            totalPriceOfEachProduct = Number(updatedTotalPrice) + Number(itemPrice)
            return totalPriceOfEachProduct
        })

        for (i = 0; i < totalPriceOfEachProduct.length; i++) {
            console.log(i)
            updatedTotalPrice = updatedTotalPrice + totalPriceOfEachProduct[i]
        }
        this.setState({ totalPrice: updatedTotalPrice })
        console.log("price added")
    }



    purchasedProductsHandler = () => {
        console.log("redirected")
        this.setState({ loading: true })

        // const order = this.state.selectedProducts
        axios.post('/orders.json', { order: this.state.selectedProducts, totalPrice: this.state.totalPrice })
            .then((response) => {
                this.setState({ loading: false })

            })
            .catch((error) => {
                this.setState({ loading: false })
            })


    }
    render() {
        let productsControl = <Loader />
        if (this.state.products) {
            productsControl = (
                <Products
                    addProduct={this.addProductToCard}
                    deleteProduct={this.deleteProductFromCart}
                >
                    {this.state.products}
                </Products>
            )
        }
        return (
            <Wrapper>
                <CartBox
                    selectedProductsList={this.state.selectedProducts}
                    totalPrice={this.state.totalPrice}
                    changeCount={this.changeCountHandler}
                    addProduct={this.addProductToCard}
                    deleteProduct={this.deleteProductFromCart}
                    purchaseHandler={this.purchasedProductsHandler}
                >
                </CartBox>
                {productsControl}



            </Wrapper>
        )
    }
}

export default Shopping