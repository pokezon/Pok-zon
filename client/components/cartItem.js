import React, {Component} from 'react'
import {removingCartItem, updatingCartItem} from '../store/cart'
import {connect} from 'react-redux'

class CartItem extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }
  componentDidMount() {
    this.setState({quantity: this.props.item.quantity})
  }

  removeItem = id => {
    if (this.props.isLoggedIn) {
      this.props.removeCartItem(id)
    } else {
      let localStorageCart = JSON.parse(
        localStorage.getItem('LocalStorageCart')
      )
      localStorageCart = localStorageCart.filter(entry => entry.id !== id)
      localStorage.setItem('LocalStorageCart', JSON.stringify(localStorageCart))
    }
  }

  incrementQuantity = () => {
    const {quantity} = this.state
    this.props.updatingCartItem({...this.props.item, quantity: quantity + 1})
    this.setState(prevState => ({
      quantity: prevState.quantity + 1
    }))
  }

  decrementQuantity = () => {
    const {quantity} = this.state
    if (quantity === 1) {
      this.removeItem(this.props.item.id)
    } else {
      this.props.updatingCartItem({...this.props.item, quantity: quantity - 1})
    }
    this.setState(prevState => ({
      quantity: prevState.quantity - 1
    }))
  }

  render() {
    const {product, id} = this.props.item
    return (
      <div>
        <h2>{product.name}</h2>
        {/* eventually to add ability to update quantity */}
        <h3>Quantity: {this.state.quantity}</h3>
        <button
          className="btn btn-success"
          onClick={this.incrementQuantity}
          type="button"
        >
          +
        </button>
        <button
          className="btn btn-danger"
          onClick={this.decrementQuantity}
          type="button"
        >
          -
        </button>
        <h2>${product.price}</h2>
        <button
          className="btn btn-danger"
          onClick={() => this.removeItem(id)}
          type="button"
        >
          Delete
        </button>
      </div>
    )
  }
}

const dispatchToProps = dispatch => {
  return {
    removeCartItem: id => dispatch(removingCartItem(id)),
    updatingCartItem: item => dispatch(updatingCartItem(item))
  }
}

export default connect(null, dispatchToProps)(CartItem)
