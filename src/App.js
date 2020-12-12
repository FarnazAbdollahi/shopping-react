import React from 'react';
import './App.css';
import Shopping from './container/Shopping/Shopping';
import Account from './container/Account/Account';
import Checkout from './container/Checkout/Checkout';
import Navbar from './components/Navigation/Navbar'

import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar loginHandler={this.loginHandler} />
          <Switch>
            <Route path="/account" exact component={Account} />
            <Route path="/checkout-order" exact render={() =>
              <Checkout
                changeCount={this.props.changeCountHandler}
                addProduct={this.props.addProductToCard}
                deleteProduct={this.props.deleteProductFromCart}
                purchaseHandler={this.props.purchasedProductsHandler}
              >
              </Checkout>} />
            <Route path="/" component={Shopping} />
          </Switch>
        </Router>
      </div>


    )
  }
}

export default App;
