import {renderOrderSummary} from '../script/checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js'
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();
