import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { Car, RaceCar } from '../data/car.js';

const car1 = new Car('Toyota', 'Corolla');
const raceCar = new RaceCar('McLaren', 'F1', 20);


// Display info
car1.displayInfo();
raceCar.displayInfo();

// Try driving
raceCar.go();
raceCar.go();
raceCar.displayInfo();

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
