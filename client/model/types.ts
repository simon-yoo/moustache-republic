export interface Product {
  id: number
  title: string
  description: string
  price: number
  imageURL: string
  sizeOptions: { id: number; label: string }[]
}

export interface CartItem {
  product: Product
  selectedSize: number | null
  quantity: number
}

export interface SizeOption {
  id: number
  label: string
}
