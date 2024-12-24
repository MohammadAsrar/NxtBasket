import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalAmount = () =>
        cartList.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)

      return (
        <div className="summ-cont">
          <h1>
            Order Total: <span>Rs {totalAmount()}/-</span>
          </h1>
          <p>{cartList.length} items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
