import React, { useState } from 'react'
import { CartItem } from '../model/types'
import { useCart } from '../../hooks/use-cart'
import { toast } from 'sonner'
import { FaShoppingCart } from 'react-icons/fa'

interface Props {
  cart: CartItem[]
}

const Header: React.FC<Props> = () => {
  const { items: cart, clearCart } = useCart()
  console.log(cart)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  const getSizeLabel = (
    productId: number,
    selectedSizeId: number | null,
    quantity: number
  ) => {
    const product = cart.find((item) => item.product.id === productId)?.product
    if (product && selectedSizeId !== null) {
      const size = product.sizeOptions.find(
        (size) => size.id === selectedSizeId
      )
      return size ? size.label : ''
    }
  }

  return (
    <div className="header">
      <div>
        <button
          className="cart-btn"
          style={{
            borderBottom: isCartOpen ? '1px solid white' : 'none',
          }}
          onClick={toggleCart}
        >
          <span className="icon">
            <FaShoppingCart />
          </span>
          <span className="label">
            My cart ({cart.reduce((a, b) => a + b.quantity, 0)})
          </span>{' '}
        </button>
      </div>
      {isCartOpen && (
        <div className="cart-box">
          {cart.length > 0 ? (
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.product.title}`}
                  className="cart-item"
                >
                  <img
                    className="cart-img"
                    src={item.product.imageURL}
                    alt={item.product.title}
                  />
                  <div className="cart-desc">
                    <p> {item.product.title}</p>
                    <p className="cart-quantity">
                      <span>{item.quantity}x</span>
                      <span>${item.product.price}</span>
                    </p>
                    <p className="cart-size">
                      <span>Size:</span>
                      <span className="">
                        {getSizeLabel(
                          item.product.id,
                          item.selectedSize,
                          item.quantity
                        )}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
              <p></p>
              <div className="clear-cart">
                <button
                  className="clear-btn"
                  onClick={() =>
                    toast('Do you really want to remove your items?', {
                      action: {
                        label: 'Delete',
                        onClick: () => {
                          clearCart()
                        },
                      },
                    })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      )}
    </div>
  )
}

export default Header
