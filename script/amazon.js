import { cart } from '../data/cart-class.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';

products.forEach((product) => {
  // Look up the cart item for this product (if it exists)
  const cartItem = cart.cartItems.find(item => item.productId === product.id);
  const selectedQuantity = cartItem ? cartItem.quantity : 1;

  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${product.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select>
          ${Array.from({ length: 10 }, (_, i) =>
            `<option value="${i + 1}"${i + 1 === selectedQuantity ? ' selected' : ''}>${i + 1}</option>`
          ).join('')}
        </select>
      </div>

      ${product.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>`;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

const addedMessageTimeouts = new Map();

// Call this on page load
updateCartQuantity();

function updateCartQuantity() {
  const cartQuantity = cart.calculateCartQuantity();
  const cartQuantityElement = document.querySelector('.js-cart-quantity');
  if (cartQuantityElement) {
    cartQuantityElement.textContent = cartQuantity;
  }
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const productContainer = button.closest('.product-container');
    const selectedQuantity = Number(productContainer.querySelector('select').value);

    const addedMessage = productContainer.querySelector('.js-added-to-cart');

    // Use cart.addToCart with selected quantity
    cart.addToCart(productId, selectedQuantity);

    updateCartQuantity();

    if (addedMessageTimeouts.has(productId)) {
      clearTimeout(addedMessageTimeouts.get(productId));
    }

    addedMessage.classList.add('added-visible');
    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-visible');
      addedMessageTimeouts.delete(productId);
    }, 2000);

    addedMessageTimeouts.set(productId, timeoutId);
  });
});
