import React from 'react'
import "./NavbarItems.css"
import { Link } from 'react-router-dom'

class NavbarItems extends React.Component {

    shoppingCartOpen = () => {
        document.getElementById("shopping-cart").style.width = "26rem"
        console.log("open")
    }
    render() {
        return (

            <div className="navbar" id="main">
                <h3 className="store-name">فروشگاه سبزیجات</h3>
                <ul className="nav-items">
                    <li className="nav-item">
                        <Link to="/">خانه</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/account">ورود</Link>
                    </li>
                    <li className="nav-item">
                        <a onClick={this.shoppingCartOpen} href="#">سبد خرید</a>
                    </li>
                </ul >



            </div >
        )
    }
}
export default NavbarItems