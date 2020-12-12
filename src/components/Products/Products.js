import React from 'react'
import Product from '../../components/Product/Product'
import './Products.css'

class Products extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        console.log('Products shouldComponentUpdate')
        return true
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("Products getSnapshotBeforeUpdate")
        return null
    }
    componentDidUpdate() {
        console.log("Products componentDidUpdate")
    }
    componentWillUnmount() {
        console.log("Products componentWillUnmount")
    }
    render() {
        return (
            <div className="products" >

                {< h2 className="top-products" > محصولات برتر</h2>}
                {
                    this.props.children.map((item, index) => {
                        return (<Product
                            key={item.id}
                            title={item.title}
                            type={item.type}
                            price={item.price}
                            img={item.img}
                            add={() => this.props.addProduct(item.id)}
                            delete={() => this.props.deleteProduct(item.id)}
                        >
                        </Product>)
                    })
                }
            </div >
        )
    }
}


export default Products