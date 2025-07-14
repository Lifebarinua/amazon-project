export class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    const data = JSON.parse(localStorage.getItem(this.localStorageKey));
    if (data && Array.isArray(data)) {
      this.cartItems = data;
    } else {
      this.cartItems = [];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    const existingItem = this.cartItems.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }

  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const item = this.cartItems.find(item => item.productId === productId);
    if (item) {
      item.deliveryOptionId = deliveryOptionId;
    }
    this.saveToStorage();
  }

  calculateCartQuantity() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  calculateTotalCents(products, deliveryOptions) {
    let total = 0;
    this.cartItems.forEach(cartItem => {
      const product = products.find(p => p.id === cartItem.productId);
      const deliveryOption = deliveryOptions.find(d => d.id === cartItem.deliveryOptionId);
      if (product && deliveryOption) {
        total += product.priceCents * cartItem.quantity + deliveryOption.priceCents;
      }
    });
    return total;
  }
}

export const cart = new Cart('cart-oop');
