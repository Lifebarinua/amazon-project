import { 
  addToCart, 
  updateDeliveryOption, 
  removeFromCart, 
  cart, 
  loadFromStorage 
} from "../../data/cart.js";

// ============================
// addToCart test suite
// ============================
describe('test suite: addToCart', () => {
  beforeEach(() => {
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

    const expectedCart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }
    ];

    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(expectedCart));
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    const expectedCart = [
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }
    ];

    expect(cart.length).toEqual(1);
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(expectedCart));
  });
});

// ============================
// removeFromCart test suite
// ============================
describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        { productId: 'abc123', quantity: 1, deliveryOptionId: '1' },
        { productId: 'xyz789', quantity: 3, deliveryOptionId: '2' }
      ]);
    });

    loadFromStorage();
  });

  it('removes a productId that is in the cart', () => {
    removeFromCart('abc123');

    const expectedCart = [
      { productId: 'xyz789', quantity: 3, deliveryOptionId: '2' }
    ];

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('xyz789');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(expectedCart));
  });

  it('does nothing if the productId is not in the cart', () => {
    removeFromCart('not-found-id');

    const expectedCart = [
      { productId: 'abc123', quantity: 1, deliveryOptionId: '1' },
      { productId: 'xyz789', quantity: 3, deliveryOptionId: '2' }
    ];

    expect(cart.length).toEqual(2);
    expect(cart).toEqual(jasmine.arrayContaining(expectedCart));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(expectedCart));
  });
});

// ============================
// updateDeliveryOption test suite
// ============================
describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    // Spy on localStorage
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'abc123',
          quantity: 2,
          deliveryOptionId: '1'
        }
      ]);
    });

    loadFromStorage();
  });

  it('updates the delivery option for a product in the cart', () => {
    updateDeliveryOption('abc123', '2');

    const expectedCart = [
      {
        productId: 'abc123',
        quantity: 2,
        deliveryOptionId: '2'
      }
    ];

    expect(cart).toEqual(jasmine.arrayContaining(expectedCart));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify(expectedCart)
    );
  });

  it('does nothing if productId is not in the cart', () => {
    updateDeliveryOption('not-in-cart-id', '2');

    const expectedCart = [
      {
        productId: 'abc123',
        quantity: 2,
        deliveryOptionId: '1'
      }
    ];

    expect(cart).toEqual(jasmine.arrayContaining(expectedCart));
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('does nothing if deliveryOptionId does not exist', () => {
    updateDeliveryOption('abc123', '999'); // invalid delivery option id

    const expectedCart = [
      {
        productId: 'abc123',
        quantity: 2,
        deliveryOptionId: '1'
      }
    ];

    expect(cart).toEqual(jasmine.arrayContaining(expectedCart));
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
