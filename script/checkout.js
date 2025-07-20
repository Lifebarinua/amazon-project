import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { loadProductsFetch, getProduct } from '../data/products.js';
import { loadCartFetch } from '../data/cart.js';
import { cart } from '../data/cart-class.js';
import { addOrder } from '../data/orders.js';
import { getDeliveryOption } from '../data/deliveryOptions.js';

async function loadPage() {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch()
    ]);

    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  } catch (error) {
    console.log('Unexpected error, please try again later.');
  }
}

loadPage();

// Handle place order
function placeOrder() {
  const now = new Date().toISOString();

  cart.cartItems.forEach(cartItem => {
    const product = getProduct(cartItem.productId);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    const deliveryDate = deliveryOption.estimatedDeliveryDate;

    const order = {
      orderId: crypto.randomUUID(),
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      quantity: cartItem.quantity,
      priceCents: product.priceCents,
      deliveryAddress: '123 Main St', // update with real input later
      orderPlacedDate: now,
      deliveryDate: deliveryDate
    };

    addOrder(order);
  });

  cart.clearCart();
  window.location.href = 'orders.html';
}

document.querySelector('.js-place-order-button')
  .addEventListener('click', placeOrder);
