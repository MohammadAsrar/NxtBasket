import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  incrementCartItemQuantity = uid => {
    const {cartList} = this.state

    const updatedCartList = cartList.map(prod =>
      prod.id === uid ? {...prod, quantity: prod.quantity + 1} : prod,
    )

    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = uid => {
    let {cartList} = this.state

    const productExists = cartList.find(prod => prod.id === uid)

    if (productExists.quantity > 1) {
      const updatedCartList = cartList.map(prod =>
        prod.id === uid ? {...prod, quantity: prod.quantity - 1} : prod,
      )
      this.setState({cartList: updatedCartList})
    } else {
      cartList = cartList.filter(prod => prod.id !== uid)
      this.setState({cartList})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state

    const productExists = cartList.find(prod => prod.id === product.id)

    if (productExists) {
      const updatedCartList = cartList.map(prod =>
        prod.id === product.id
          ? {...prod, quantity: prod.quantity + product.quantity}
          : prod,
      )

      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = uid => {
    let {cartList} = this.state

    cartList = cartList.filter(prod => prod.id !== uid)
    this.setState({cartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
