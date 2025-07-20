import { orders } from '../data/orders.js';
import { cart } from '../data/cart-class.js';
import { formatCurrency } from './utils/money.js';

function renderOrdersPage() {
  const ordersContainer = document.querySelector('.js-orders-container');

  if (!orders.length) {
    ordersContainer.innerHTML = `<p>You have no orders yet.</p>`;
    return;
  }

  let html = '';

  orders.forEach(order => {
    order.products.forEach(product => {
      html += `
        <div class="order">
          <div class="order-header">
            <div><strong>Order Placed:</strong> ${order.orderTime || 'N/A'}</div>
            <div><strong>Total:</strong> $${formatCurrency(order.totalCostCents || 0)}</div>
            <div><strong>Ship To:</strong> ${order.shippingAddress || 'N/A'}</div>
          </div>
          <div class="order-details">
            <img src="${product.image || ''}" alt="${product.name || ''}" class="product-image">
            <div class="product-info">
              <div class="product-name">${product.name || 'Unknown Product'}</div>
              <div class="product-quantity">Quantity: ${product.quantity || 1}</div>
              <div class="delivery-date">Delivered on ${product.deliveryDate || 'Unknown Date'}</div>

              <div class="order-actions">
                <button class="js-buy-again-button" data-product-id="${product.productId}">
                  Buy it again
                </button>
                <button class="js-track-package-button" 
                        data-order-id="${order.id}" 
                        data-product-id="${product.productId}">
                  Track package
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  });

  ordersContainer.innerHTML = html;
  addInteractivity();
}

function addInteractivity() {
  document.querySelectorAll('.js-buy-again-button').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      cart.addToCart(productId);
      alert('Added to cart!');
    });
  });

  document.querySelectorAll('.js-track-package-button').forEach(button => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderId;
      const productId = button.dataset.productId;
      const url = `tracking.html?orderId=${orderId}&productId=${productId}`;
      window.location.href = url;
    });
  });
}

renderOrdersPage();
