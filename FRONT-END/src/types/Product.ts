export type ProductType = {
    id: string
    name: string
    description: string
    price: number
    img: string
    category: string
    getProducts?: () => Promise<void>
}