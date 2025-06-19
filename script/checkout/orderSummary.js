import {cart, removeFromCart, calculateCartQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions} from '../../data/deliveryOptions.js';

hello();
const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));

 export function renderOrderSummary(){
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


      let matchingProduct;

      products.forEach((product)=>{
        if (product.id === productId) {
          matchingProduct = product;
        }
      });

      const deliveryOptionId = cartItem.deliveryOptionId;

      const deliveryOption = deliveryOptions.find((option) => {
        return option.id === deliveryOptionId;
      });
      

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');


      cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
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
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
      `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';



      deliveryOptions.forEach((deliveryOption)=>{
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays,
          'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        :`$${formatCurrency(deliveryOption.priceCents)}`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        html +=
        `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id = "${deliveryOption.id}">
            <input type="radio" 
            ${isChecked ? 'checked': ''}
            class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div> 
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price">${priceString} - Shipping</div>
            </div>
          </div>
        `
      });
      return html;
    }

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

    document.querySelectorAll('.js-delivery-option').forEach((element)=> {
      element.addEventListener('click', ()=>{
        const { productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
      });
    });
  }
  