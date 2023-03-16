/* eslint-disable no-undef */
import { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { submitOrderPay, setCompletedOrder } from '@open-tender/redux'
import { FormError } from '@open-tender/components'

import { selectApi, selectBrand } from '../../../slices'
import { Loading } from '../..'

const ApplePayView = styled('div')`
  margin: 2rem 0 1rem;
`

const ApplePayButton = styled('button')`
  display: inline-block;
  -webkit-appearance: -apple-pay-button;
  -apple-pay-button-type: plain;
  -apple-pay-button-style: black;
  width: 100%;
  height: 5rem;
`

const ApplePayChecking = styled('div')`
  width: 100%;
  padding: 0 0 1rem;
  text-align: center;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.primary};

  > div {
    display: inline-block;
    margin: 0 0 1rem;
  }
`

const paymentSessionConfig = {
  countryCode: 'US',
  currencyCode: 'USD',
  supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
  merchantCapabilities: ['supports3DS'],
  // total: { label: 'Your Merchant Name', amount: '10.00' },
}

// https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/checking_for_apple_pay_availability
const checkApplePayWithActiveCard = (applePayMerchantId, setChecking) => {
  if (applePayMerchantId && window.ApplePaySession) {
    setChecking(true)
    const promise =
      ApplePaySession.canMakePaymentsWithActiveCard(applePayMerchantId)
    return promise
      .then((canMakePayments) => {
        const canPay = ApplePaySession.canMakePayments()
        console.log('canMakePayments', canMakePayments, canPay)
        return canMakePayments || canPay
      })
      .catch(() => false)
      .finally(() => setChecking(false))
  } else {
    return new Promise((resolve) => resolve(false))
  }
}

const validateSession = async (api, validationURL, callback) => {
  try {
    const host = window.location.hostname
    const { merchant_session } = await api.postApplePayValidate(
      host,
      validationURL
    )
    callback(merchant_session)
  } catch (err) {
    throw new Error(err.detail || err.message)
  }
}

const CheckoutApplePay = ({ amount, error, addTender, removeTender }) => {
  const dispatch = useDispatch()
  const [checking, setChecking] = useState(false)
  const [showApplePay, setShowApplePay] = useState(false)
  const [errMsg, setErrMsg] = useState(null)
  const { title: label, applePayMerchantId } = useSelector(selectBrand)
  const api = useSelector(selectApi)
  const config = { ...paymentSessionConfig, total: { label, amount } }
  const nonZero = parseFloat(amount) > 0
  const show = nonZero && (checking || showApplePay || errMsg)

  useEffect(() => {
    checkApplePayWithActiveCard(applePayMerchantId, setChecking).then((show) =>
      setShowApplePay(show)
    )
  }, [applePayMerchantId])

  useEffect(() => {
    if (error) setErrMsg(error)
  }, [error])

  const onClick = (evt) => {
    evt.preventDefault()
    const applePaySession = new ApplePaySession(6, config)
    applePaySession.begin()

    applePaySession.onvalidatemerchant = (evt) => {
      validateSession(api, evt.validationURL, (merchantSession) => {
        applePaySession.completeMerchantValidation(merchantSession)
      }).catch((err) => {
        applePaySession.abort()
        setErrMsg(err.detail || err.message)
      })
    }

    applePaySession.onpaymentauthorized = (evt) => {
      const tender = {
        tender_type: 'APPLE_PAY',
        amount: amount,
        token: evt.payment.token,
      }
      addTender(tender)
      dispatch(submitOrderPay()).then((order) => {
        if (order) {
          applePaySession.completePayment(ApplePaySession.STATUS_SUCCESS)
          dispatch(setCompletedOrder(order))
        } else {
          applePaySession.completePayment(ApplePaySession.STATUS_FAILURE)
          removeTender('APPLE_PAY')
        }
      })
    }
  }

  return show ? (
    <ApplePayView>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      {checking ? (
        <ApplePayChecking>
          <Loading />
          <p>Checking for Apple Pay support...</p>
        </ApplePayChecking>
      ) : showApplePay ? (
        <ApplePayButton onClick={onClick} />
      ) : null}
    </ApplePayView>
  ) : null
}

CheckoutApplePay.displayName = 'CheckoutApplePay'
CheckoutApplePay.propTypes = {
  amount: propTypes.string,
  error: propTypes.string,
  addTender: propTypes.func,
  removeTender: propTypes.func,
}

export default CheckoutApplePay
