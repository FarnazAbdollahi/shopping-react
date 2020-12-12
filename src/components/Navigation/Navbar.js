import React from 'react'
import NavbarItems from '../Navigation/NavbarItems'
import "./NavbarItems.css"
class Navbar extends React.Component {
    render() {
        console.log("Navbar")
        return (
            <header className="navbar">
                <NavbarItems />
            </header>

        )
    }
}

export default Navbar