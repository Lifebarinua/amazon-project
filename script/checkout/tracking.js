import { orders } from '../data/orders.js';

function getTrackingParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get('orderId');
  const productId = urlParams.get('productId');
  return { orderId, productId };
}

function calculateProgress(orderPlacedDate, deliveryDate) {
  const now = new Date();
  const orderTime = new Date(orderPlacedDate).getTime();
  const deliveryTime = new Date(deliveryDate).getTime();

  const percent = ((now - orderTime) / (deliveryTime - orderTime)) * 100;
  return Math.min(Math.round(percent), 100); // cap at 100
}

function getDeliveryStatus(progress) {
  if (progress < 50) return 'Preparing';
  if (progress < 100) return 'Shipped';
  return 'Delivered';
}

function renderTrackingPage() {
  const container = document.querySelector('.js-tracking-container');
  const { orderId, productId } = getTrackingParams();

  if (!orderId || !productId) {
    container.innerHTML = '<p>Error: Missing orderId or productId in the URL.</p>';
    return;
  }

  const order = orders.find(order => order.orderId === orderId);
  if (!order) {
    container.innerHTML = `<p>Error: Order with ID "${orderId}" not found.</p>`;
    return;
  }

  if (order.productId !== productId) {
    container.innerHTML = `<p>Error: Product with ID "${productId}" not found in this order.</p>`;
    return;
  }

  const progress = calculateProgress(order.orderPlacedDate, order.deliveryDate);
  const status = getDeliveryStatus(progress);

  container.innerHTML = `
    <h2>Tracking Package</h2>
    <div class="tracking-info">
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Product:</strong> ${order.productName}</p>
      <img src="${order.productImage}" alt="${order.productName}" style="max-width: 150px;">
      <p><strong>Quantity:</strong> ${order.quantity}</p>
      <p><strong>Delivery Address:</strong> ${order.deliveryAddress}</p>
      <p><strong>Estimated Delivery:</strong> ${order.deliveryDate}</p>
      <p><strong>Status:</strong> <span style="color: green;">${status}</span></p>

      <div style="background-color: #eee; width: 100%; height: 20px; border-radius: 10px; overflow: hidden; margin-top: 10px;">
        <div style="background-color: green; height: 100%; width: ${progress}%; transition: width 0.5s;"></div>
      </div>
      <p style="margin-top: 5px;">${progress}% complete</p>
    </div>
  `;
}

renderTrackingPage();
