import { deliveryOptions } from './deliveryOptions.js';


export let cart;


loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

if (!cart || !Array.isArray(cart)) {
  cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
       deliveryOptionId: '2'
    },
  ];
  saveToStorage();
}
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, selectedQuantity) {
  let matchingItem = cart.find(item => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
       deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId);
  saveToStorage();
}

//  NEW FUNCTION
export function calculateCartQuantity() {
  let totalQuantity = 0;
  for (const item of cart) {
    totalQuantity += item.quantity;
  }
  return totalQuantity;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem = cart.find(item => item.productId === productId);

  if (!matchingItem) {
    return; // productId not found
  }

  const deliveryExists = deliveryOptions.some(
    option => option.id === deliveryOptionId
  );

  if (!deliveryExists) {
    return; // deliveryOptionId not found
  }

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', ()=>{
    console.log(xhr.response);
    fun(response);
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}
export function loadCart(callback) {
  loadFromStorage();
  if (callback) {
    callback();
  }
}

