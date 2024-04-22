import { useState, useEffect } from 'react'
import Header from './Header'
import { Product } from '../model/types'
import { Toaster, toast } from 'sonner'
import { useCart } from '../../hooks/use-cart'

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product'
        )

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }

        const data: Product = await response.json()
        setProduct(data)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        }
      }
    }

    fetchData()
  }, [])

  const handleSizeClick = (sizeId: number) => {
    setSelectedSize(sizeId)
  }

  const { addItem, items: cart } = useCart()

  const handleAddToCart = (product: Product, selectedSize: number) => {
    if (!product || !selectedSize) {
      toast.error('Please select a size')
      return
    }
    if (product && selectedSize !== null) {
      const currentCartItem = cart.find(
        (cartItem) =>
          cartItem.product.id === product.id &&
          cartItem.selectedSize === selectedSize
      )
      if (currentCartItem) {
        const updatedCart = cart.map((item) => {
          if (
            item.product.id === product.id &&
            item.selectedSize === selectedSize
          ) {
            return {
              ...item,
              quantity: item.quantity + 1,
            }
          }
          return item
        })
        addItem(updatedCart)
      } else {
        addItem([...cart, { product, selectedSize, quantity: 1 }])
      }
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Toaster richColors closeButton expand={true} position="top-center" />
      <Header />
      <div className="main-container">
        <div className="img-container">
          <img
            className="product-img"
            src={product.imageURL}
            alt={product.title}
          />
        </div>
        <div className="product-container">
          <h1 className="product-title">{product.title}</h1>
          <h3 className="product-price">${product.price}</h3>
          <p className="product-desc">{product.description}</p>
          <div className="size-container">
            <div className="size">
              Size<span className="star">*</span>{' '}
              {product.sizeOptions.map((size) => (
                <div key={`${size.id}-${size.label}`}>
                  <p className="selected-size">
                    {selectedSize === size.id ? size.label : ''}
                  </p>
                </div>
              ))}{' '}
            </div>
            <div className="option-container">
              <div className="size-options">
                {product.sizeOptions.map((size) => (
                  <p key={`${size.label}-${size.id}`}>
                    <button
                      className={`size-button ${
                        selectedSize === size.id ? 'selected' : ''
                      }`}
                      onClick={() => handleSizeClick(size.id)}
                    >
                      {size.label}
                    </button>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <button
            className="add-cart"
            onClick={() => handleAddToCart(product, selectedSize || 0)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
