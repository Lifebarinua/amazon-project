import { cart } from './cart-class.js';

describe('Cart class', () => {
  beforeEach(() => {
    cart.cartItems = [];
  });

  it('adds products correctly', () => {
    cart.addToCart('p1');
    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].productId).toBe('p1');
    expect(cart.cartItems[0].quantity).toBe(1);

    cart.addToCart('p1');
    expect(cart.cartItems[0].quantity).toBe(2);
  });

  it('removes products correctly', () => {
    cart.cartItems = [
      { productId: 'p1', quantity: 1, deliveryOptionId: '1' }
    ];
    cart.removeFromCart('p1');
    expect(cart.cartItems.length).toBe(0);
  });

  it('updates delivery option correctly', () => {
    cart.cartItems = [
      { productId: 'p1', quantity: 1, deliveryOptionId: '1' }
    ];
    cart.updateDeliveryOption('p1', '3');
    expect(cart.cartItems[0].deliveryOptionId).toBe('3');
  });

  it('calculates total cents correctly', () => {
    const products = [
      { id: 'p1', priceCents: 1000 },
      { id: 'p2', priceCents: 2000 }
    ];
    const deliveryOptions = [
      { id: '1', priceCents: 300 },
      { id: '3', priceCents: 500 }
    ];
    cart.cartItems = [
      { productId: 'p1', quantity: 2, deliveryOptionId: '1' },
      { productId: 'p2', quantity: 1, deliveryOptionId: '3' }
    ];

    const total = cart.calculateTotalCents(products, deliveryOptions);
    // (2*1000 + 300) + (1*2000 + 500) = 2300 + 2500 = 4800
    expect(total).toBe(4800);
  });
});
