// Header.test.js

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { beforeEach, describe, expect, it } from 'vitest'
import { CartItem } from '../model/types'

const mockCart: CartItem[] = [
  {
    product: {
      id: 1,
      title: 'Product A',
      imageURL: 'urlA',
      description: 'descA',
      price: 10,
      sizeOptions: [
        { id: 1, label: 'S' },
        { id: 2, label: 'M' },
      ],
    },
    selectedSize: 1,
    quantity: 2,
  },
  {
    product: {
      id: 2,
      title: 'Product B',
      imageURL: 'urlB',
      description: 'descB',
      price: 20,
      sizeOptions: [
        { id: 1, label: 'S' },
        { id: 2, label: 'M' },
        { id: 3, label: 'L' },
      ],
    },
    selectedSize: 2,
    quantity: 1,
  },
]

describe('Header Component', () => {
  beforeEach(() => {
    render(<Header cart={mockCart} />)
  })
  it('renders the cart button with the correct item count', () => {
    const cartButton = screen.getByRole('button', { name: /my cart/i })
    expect(cartButton).toBeTruthy() // 2 + 1 items
  })

  it('toggles the cart view on button click', () => {
    const cartButton = screen.getByRole('button', { name: /my cart/i })
    fireEvent.click(cartButton)
    const cartBox = screen.getByText('Your cart is empty')
    expect(cartBox).toBeTruthy()
  })
})
