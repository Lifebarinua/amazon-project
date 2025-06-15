import {cart, removeFromCart, calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

function updateCartQuantity() {
  const totalQuantity = calculateCartQuantity();
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.textContent = totalQuantity;
  }
}


updateCartQuantity();

let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const matchingProduct = products.find(product => product.id === productId);

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${productId}">
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

// DELETE BUTTON FUNCTIONALITY
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    if (container) container.remove();

    updateCartQuantity();
  });
});

// UPDATE BUTTON DROPDOWN
document.querySelectorAll('.js-update-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    const quantitySpan = container.querySelector('.quantity-label');

    // Prevent adding another select if one already exists
    if (container.querySelector('.js-quantity-select')) return;

    const selectEl = document.createElement('select');
    selectEl.classList.add('js-quantity-select');
    selectEl.style.marginLeft = '10px';

    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      if (i === parseInt(quantitySpan.textContent)) {
        option.selected = true;
      }
      selectEl.appendChild(option);
    }

    quantitySpan.parentElement.appendChild(selectEl);

    selectEl.addEventListener('change', () => {
      const newQuantity = parseInt(selectEl.value);
      const cartItem = cart.find(item => item.productId === productId);
      if (cartItem) {
        cartItem.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        quantitySpan.textContent = newQuantity;
        updateCartQuantity();
      }
      selectEl.remove();
    });
  });
});

