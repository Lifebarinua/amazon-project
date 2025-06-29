import { deliveryOptions } from './deliveryOptions.js';

function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,
   
    loadFromStorage() {
     this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
   
   if (!this.cartItems || !Array.isArray(this.cartItems)) {
    this.cartItems = [{
         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
         quantity: 2,
         deliveryOptionId: '1'
       },
       {
         productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
         quantity: 1,
          deliveryOptionId: '2'
       }];
   }},
   
   saveToStorage() {
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
  },
  
  addToCart(productId, selectedQuantity) {
    let matchingItem = this.cartItems.find(item => item.productId === productId);
  
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
         deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  },
  
  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.saveToStorage();
  },
  
  calculateCartQuantity() {
    let totalQuantity = 0;
    for (const item of this.cartItems) {
      totalQuantity += item.quantity;
    }
    return totalQuantity;
  },
  
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = this.cartItems.find(item => item.productId === productId);
  
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
    this.saveToStorage();
  }
};
  return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

 cart.loadFromStorage();


 businessCart.loadFromStorage();

 console.log(cart);
 console.log(businessCart);