import { cart } from '../../data/cart-class.js';
import { products, getProduct } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {
  // Update header cart quantity
  renderCheckoutHeader();

  // Re-render payment summary
  renderPaymentSummary();

  let cartSummaryHTML = '';

  // Define delivery options helper BEFORE using it
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption).format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)}`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-name">${deliveryOption.name}</div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} - Shipping</div>
          </div>
        </div>
      `;
    });

    return html;
  }

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    if (!matchingProduct) {
      console.warn('Product not found for cart item:', productId);
      return; // skip this cartItem and continue to the next
    }
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML += `
<div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">Delivery date: ${dateString}</div>
  <div class="cart-item-details-grid">
    <img class="product-image" src="${matchingProduct.image}">
    <div class="cart-item-details">
      <div class="product-name js-product-name-${matchingProduct.id}">${matchingProduct.name}</div>
      <div class="product-price js-product-price-${matchingProduct.id}">$${formatCurrency(matchingProduct.priceCents)}</div>
      <div class="product-quantity">
        <span>
          Quantity:
          <select class="js-checkout-quantity-select" data-product-id="${matchingProduct.id}">
            ${Array.from({ length: 10 }, (_, i) => `
              <option value="${i + 1}" ${cartItem.quantity === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
          </select>
        </span>
        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
      </div>
    </div>
    <div class="delivery-options">
      <div class="delivery-options-title">Choose a delivery option:</div>
      ${deliveryOptionsHTML(matchingProduct, cartItem)}
    </div>
  </div>
</div>
`;
  });

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

  // DELETE button handler
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      cart.removeFromCart(productId);
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckoutHeader();
    });
  });

  // DELIVERY OPTION selection handler
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // QUANTITY SELECT handler
  document.querySelectorAll('.js-checkout-quantity-select').forEach((selectElement) => {
    selectElement.addEventListener('change', () => {
      const productId = selectElement.dataset.productId;
      const newQuantity = parseInt(selectElement.value, 10);

      const cartItem = cart.cartItems.find(item => item.productId === productId);
      if (cartItem) {
        cartItem.quantity = newQuantity;
        cart.saveToStorage();
        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
      }
    });
  });
}
