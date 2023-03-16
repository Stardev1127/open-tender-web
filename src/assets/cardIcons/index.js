// https://github.com/aaronfagan/svg-credit-card-payment-icons

import visa from './visa.svg'
import amex from './amex.svg'
import discover from './discover.svg'
import mastercard from './mastercard.svg'
import creditcard from './creditcard.svg'

export { visa, amex, discover, mastercard, creditcard }

export const cardIconMap = {
  VISA: visa,
  MC: mastercard,
  DISC: discover,
  AMEX: amex,
  OTHER: creditcard,
}
