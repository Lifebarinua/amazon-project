export const products = [
  {
    id: 'test-product-1',
    name: 'Test Product',
    priceCents: 1234,
    image: '/test-product.jpg'
  }
];

export function getProduct(productId) {
  return products.find(p => p.id === productId);
}
