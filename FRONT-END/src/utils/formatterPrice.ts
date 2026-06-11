export const formatterPrice = (value: number) => {
  return `R$${value.toFixed(2).replace(".", ",")}`
}