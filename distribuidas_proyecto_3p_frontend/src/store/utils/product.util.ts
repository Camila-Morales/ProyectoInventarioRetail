export function generateSku(id: number, name: string): string {
  const abbreviationName = name.substring(0, 3).toUpperCase()

  const productId = id.toString().padStart(4, '0')

  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '')

  return `${abbreviationName}-${productId}-${currentDate}`
}
