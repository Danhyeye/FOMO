export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`
  }
  return `${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 0)}k`
}

export function formatPriceVN(price: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(price)} đ`
}