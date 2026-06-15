export type ProductType = {
    id: string
    name: string
    description: string
    price: number
    img: string
    category: string
}

export type ProductTypeProps = ProductType & { getProducts: () => Promise<void>}