import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { Car, RaceCar } from '../data/car.js';
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';

// import '../data/backend-practice.js';

new Promise((resolve)=> {
  loadProducts((response)=>{
    resolve(response);
  });

}).then(()=>{
   return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
   });

}).then(()=>{
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/*
loadProducts(()=>{
 
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

const car1 = new Car('Toyota', 'Corolla');
const raceCar = new RaceCar('McLaren', 'F1', 20);


// Display info
car1.displayInfo();
raceCar.displayInfo();

// Try driving
raceCar.go();
raceCar.go();
raceCar.displayInfo();

