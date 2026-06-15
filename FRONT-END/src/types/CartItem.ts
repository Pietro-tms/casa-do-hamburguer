import type { ProductType } from "./Product"

export type CartItemType = {
  id: string
  productId: string
  userId: string
  product: ProductType
}