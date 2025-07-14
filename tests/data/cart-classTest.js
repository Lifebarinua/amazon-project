import { cart } from "../../data/cart-class.js";

describe("test suite: cart-class.js", () => {
  beforeEach(() => {
    // Clear and spy on localStorage before each test
    cart.cartItems = [];
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.returnValue(null);
  });

  it("starts with empty cartItems", () => {
    expect(Array.isArray(cart.cartItems)).toBeTrue();
    expect(cart.cartItems.length).toBe(0);
  });

  it("adds a product to the cart", () => {
    cart.addToCart("abc123");
    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].productId).toBe("abc123");
    expect(cart.cartItems[0].quantity).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it("increments quantity if product already exists", () => {
    cart.addToCart("abc123");
    cart.addToCart("abc123");
    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].quantity).toBe(2);
  });

  it("removes a product from the cart", () => {
    cart.addToCart("abc123");
    cart.addToCart("def456");
    cart.removeFromCart("abc123");
    expect(cart.cartItems.length).toBe(1);
    expect(cart.cartItems[0].productId).toBe("def456");
  });

  it("updates delivery option", () => {
    cart.addToCart("abc123");
    cart.updateDeliveryOption("abc123", "2");
    expect(cart.cartItems[0].deliveryOptionId).toBe("2");
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
