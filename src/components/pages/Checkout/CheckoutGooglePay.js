import { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import GooglePayButton from '@google-pay/button-react'
import { useDispatch, useSelector } from 'react-redux'
import { submitOrderPay, setCompletedOrder } from '@open-tender/redux'
import { FormError } from '@open-tender/components'

import { selectBrand } from '../../../slices'

const GooglePayView = styled('div')`
  width: 100%;
  margin: 2rem 0 1rem;

  &:nth-of-type(2) {
    margin: -1rem 0 1rem;
  }

  > div {
    width: 100%;

    button {
      min-height: 5rem;
    }
  }
`

const makePaymentRequest = (brand, amount) => {
  const { title, googlePayMerchantId, gatewayId } = brand
  if (!googlePayMerchantId || !gatewayId) return null
  return {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'DISCOVER', 'MASTERCARD', 'VISA'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'gatewayservices',
            gatewayMerchantId: gatewayId,
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: googlePayMerchantId,
      merchantName: title,
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: amount,
      currencyCode: 'USD',
      countryCode: 'US',
    },
  }
}

const CheckoutGooglePay = ({ amount, error, addTender, removeTender }) => {
  const [errMsg, setErrMsg] = useState(null)
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const paymentRequest = makePaymentRequest(brand, amount)
  const nonZero = parseFloat(amount) > 0

  useEffect(() => {
    if (error) setErrMsg(error)
  }, [error])

  const onLoadPaymentData = (data) => {
    const tender = {
      tender_type: 'GOOGLE_PAY',
      amount: amount,
      token: data.paymentMethodData,
    }
    addTender(tender)
    dispatch(submitOrderPay(true)).then((order) => {
      if (order) {
        dispatch(setCompletedOrder(order))
      } else {
        removeTender('GOOGLE_PAY')
      }
    })
  }

  return nonZero && paymentRequest ? (
    <GooglePayView>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <GooglePayButton
        environment="PRODUCTION"
        buttonSizeMode="fill"
        buttonType="plain"
        paymentRequest={paymentRequest}
        onLoadPaymentData={onLoadPaymentData}
      />
    </GooglePayView>
  ) : null
}

CheckoutGooglePay.displayName = 'CheckoutGooglePay'
CheckoutGooglePay.propTypes = {
  amount: propTypes.string,
  error: propTypes.string,
  addTender: propTypes.func,
  removeTender: propTypes.func,
}

export default CheckoutGooglePay
