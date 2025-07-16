import { renderOrderSummary } from "../../script/checkout/orderSummary.js";
import { cart } from '../../data/cart-class.js';
import { formatCurrency } from "../../script/utils/money.js";
import { getProduct } from "../../data/products-test.js";
import { loadProducts, loadProductsFetch } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll((done)=>{
    loadProductsFetch().then(()=>{
      done();
    });
    (()=>{
      done();
    });
  });

  beforeEach(() => {
    document.body.innerHTML = `
    <div class="js-checkout-header"></div>
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>
  `;
  

    spyOn(localStorage, 'getItem').and.callFake((key) => {
      if(key === 'cart-oop') {
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
    }
    return null;
  });

    spyOn(localStorage, 'setItem');

     cart.loadFromStorage(); // ✅ call the method on the singleton cart
  });





  afterEach(() => {
    [
      '.js-checkout-header',
      '.js-order-summary',
      '.js-payment-summary'
    ].forEach(selector => {
      const el = document.querySelector(selector);
      if (el) el.innerHTML = '';
    });
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

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain('Intermediate Size Basketball');

    const expectedPrice1 = `$${formatCurrency(getProduct(productId1).priceCents)}`;
    const expectedPrice2 = `$${formatCurrency(getProduct(productId2).priceCents)}`;

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toEqual(expectedPrice1);
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toEqual(expectedPrice2);
  });

  it('removes a product', () => {
    renderOrderSummary();

    const deleteButton = document.querySelector(`.js-delete-link[data-product-id="${productId1}"]`);
    expect(deleteButton).not.toBeNull();
    deleteButton.click();

    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toBeNull();
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toBeNull();

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);

    expect(document.querySelector(`.js-product-name-${productId1}`)).toBeNull();
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain('Intermediate Size Basketball');
  });

  it('updates delivery option and updates payment summary', () => {
    renderOrderSummary();

    const deliveryOptionElement = document.querySelector(
      `.js-delivery-option[data-product-id="${productId1}"][data-delivery-option-id="3"]`
    );
    expect(deliveryOptionElement).not.toBeNull();
    deliveryOptionElement.click();

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    const shippingElement = document.querySelector('.js-shipping-price');
    const totalElement = document.querySelector('.js-total-price');

    expect(shippingElement.innerText).toEqual('$14.97');
    expect(totalElement.innerText).toEqual('$63.49');
  });

  it('updates delivery option by clicking the third delivery option and updates payment summary correctly', () => {
    renderOrderSummary();

    const deliveryOptionElement = document.querySelector(
      `.js-delivery-option[data-product-id="${productId1}"][data-delivery-option-id="3"]`
    );
    expect(deliveryOptionElement).not.toBeNull();
    deliveryOptionElement.click();

    const inputElement = deliveryOptionElement.querySelector('input');
    expect(inputElement).not.toBeNull();
    expect(inputElement.checked).toBeTrue();

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');

    const shippingElement = document.querySelector('.js-shipping-price');
    const totalElement = document.querySelector('.js-total-price');

    expect(shippingElement.innerText).toEqual('$14.97');
    expect(totalElement.innerText).toEqual('$63.49');
  });
});
