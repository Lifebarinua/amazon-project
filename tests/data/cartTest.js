import { addToCart, removeFromCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    // Shared setup before each test
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    const expectedCart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }];

    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(expectedCart));
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    const expectedCart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(expectedCart));
  });
});
// ============================
// removeFromCart test suite
// ============================
describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    // Mock localStorage
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'abc123',
          quantity: 1,
          deliveryOptionId: '1'
        },
        {
          productId: 'xyz789',
          quantity: 3,
          deliveryOptionId: '2'
        }
      ]);
    });

    loadFromStorage();
  });

  it('removes a productId that is in the cart', () => {
    removeFromCart('abc123');

    const expectedCart = [
      {
        productId: 'xyz789',
        quantity: 3,
        deliveryOptionId: '2'
      }
    ];

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('xyz789');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify(expectedCart)
    );
  });

  it('does nothing if the productId is not in the cart', () => {
    removeFromCart('not-found-id');

    const expectedCart = [
      {
        productId: 'abc123',
        quantity: 1,
        deliveryOptionId: '1'
      },
      {
        productId: 'xyz789',
        quantity: 3,
        deliveryOptionId: '2'
      }
    ];

    expect(cart.length).toEqual(2);
    expect(cart).toEqual(jasmine.arrayContaining(expectedCart));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify(expectedCart)
    );
  });
});