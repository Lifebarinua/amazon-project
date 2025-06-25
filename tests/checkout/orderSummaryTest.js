import { renderOrderSummary } from "../../script/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    // Set up shared HTML container for all tests
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-checkout-header"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ]);
    });

    spyOn(localStorage, 'setItem');
    loadFromStorage();
  });

  // ✅ New afterEach to clean up DOM after each test
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('displays the cart', () => {
    renderOrderSummary();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(
      document.querySelector(`.js-checkout-quantity-select[data-product-id="${productId1}"]`).value
    ).toEqual('2');
    expect(
      document.querySelector(`.js-checkout-quantity-select[data-product-id="${productId2}"]`).value
    ).toEqual('1');
  });

  it('removes a product', () => {
    renderOrderSummary();

    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });
});
