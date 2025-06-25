import {formatCurrency} from '../../script/utils/money.js'

console.log('test suite: fromatCurrency')
console.log('convert cents to dollar')
if (formatCurrency(2095)==='20.95'){
  console.log('passed');
} else {
  console.log('failed');
}

console.log('work with 0')
if (formatCurrency(0)==='0.00'){
  console.log('passed');
} else {
  console.log('failed')}

console.log('round up to the nearest cent')
if (formatCurrency(2000.5==='20.01')){
  console.log('passed')
} else {
  console.log('failed')
}
console.log('round up to the nearest cent')
if (formatCurrency(2000.4==='20.00')){
  console.log('passed')
} else {
  console.log('failed')
}
console.log('round up to the nearest cent')
if (formatCurrency(-2500.2==='-25.00')){
  console.log('passed')
} else {
  console.log('failed')
}