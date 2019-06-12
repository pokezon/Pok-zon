import React, {Component} from 'react'
import {gettingProduct} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class SingleProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id)
  }

  render() {
    const product = this.props.product
    console.log('------------------', product)
    if (!product) {
      return (
        <div>
          <h1>NOT DISCOVERED YET</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h2>{product.name}</h2>
          <img src={product.imageUrl} />
          <h2>The {product.type} Pokemon</h2>
          <h2>${product.price}</h2>
          <h2>{product.description}</h2>
          <Link to="/">Back to Home</Link>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({product: state.products.selectedProduct})

const mapDispatchToProps = dispatch => ({
  getProduct: id => dispatch(gettingProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
