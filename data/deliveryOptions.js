import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';



export const deliveryOptions = [{
id: '1',
name: 'Standard Delivery',
deliveryDays: 7,
priceCents: 0
},{
  id: '2',
  name: 'Express Delivery',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  name: 'Royal Delivery',
  deliveryDays: 1,
  priceCents: 998
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option)=>{
    if (option.id === deliveryOptionId) {
        deliveryOption = option;
    }
  });
  
 return deliveryOption || deliveryOptions[0];
}


/**
 * Returns a formatted delivery date string based on the delivery option's days.
 * @param {Object} deliveryOption - An object with a deliveryDays property.
 * @returns {string} - A string like "Saturday, June 22"
 */



export function isWeekend(date) {
  const day = date.format('dddd');
  return day === 'Saturday' || day === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  let date = dayjs();
  let daysToAdd = deliveryOption.deliveryDays;

  while (daysToAdd > 0) {
    date = date.add(1, 'day');
    if (!isWeekend(date)) {
      daysToAdd--;
    }
  }

  return date;
}
