import React, { useEffect } from 'react'
import './Product.css'


const Product = (props) => {
    useEffect(() => {
        console.log("PRODUCT useEffect")

    })
    return (
        <div className="product">
            <img src={props.img} alt="Product" className="img-hover" />
            <p className="product-title">{props.title}</p>
            <p>{`${props.price} تومان`}</p>
            <button onClick={props.add}>+</button>
            <button onClick={props.delete}>-</button>

        </div>
    )

}

export default Product 