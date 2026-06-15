import type { ProductType } from "./Product"

export type CartItemType = {
  id: string
  productId: string
  userId: string
  product: ProductType
  setCartItems?: React.Dispatch<React.SetStateAction<undefined>>
}

export type CartItemContextType = {
    cartItems: CartItemType[]
    setCartItems: React.Dispatch<React.SetStateAction<CartItemType[]>>
}