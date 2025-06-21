import { calculateCartQuantity } from '../../data/cart.js';

export function renderCheckoutHeader() {
  const cartQuantity = calculateCartQuantity();

  const headerHTML = `
    <div class="checkout-header">
      <div class="checkout-header-left-section">
        <a href="amazon.html" class="header-link">
          <img class="amazon-logo" src="images/amazon-logo.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
        </a>
      </div>

      <div class="checkout-header-middle-section">
       Checkout (<span class="js-cart-quantity">${cartQuantity}</span>&nbsp;items)

      </div>

      <div class="checkout-header-right-section">
        <img class="checkout-lock-icon" src="../../images/icons/checkout-lock-icon.png">
      </div>
    </div>
  `;

  document.querySelector('.js-checkout-header').innerHTML = headerHTML;
}
