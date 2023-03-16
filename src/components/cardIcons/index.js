import Amex from './Amex'
import CreditCard from './CreditCard'
import Discover from './Discover'
import Mastercard from './Mastercard'
import Visa from './Visa'

export const cardIconsMap = {
  AMEX: <Amex />,
  DISC: <Discover />,
  MC: <Mastercard />,
  VISA: <Visa />,
  OTHER: <CreditCard />,
}

export const cardIconsMapWidth = {
  AMEX: <Amex size="30px" />,
  DISC: <Discover size="30px" />,
  MC: <Mastercard size="30px" />,
  VISA: <Visa size="30px" />,
  OTHER: <CreditCard size="30px" />,
}
