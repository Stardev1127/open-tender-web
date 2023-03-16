import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCustomer, fetchCustomerCreditCards } from '@open-tender/redux'
import { AuthApplePay, Message } from '@open-tender/components'

import { closeModal, selectApi, selectBrand } from '../../slices'
import { Loading, ModalContent, ModalView } from '..'

const CreditCardLinked = () => {
  const dispatch = useDispatch()
  const brand = useSelector(selectBrand)
  const api = useSelector(selectApi)
  const { profile } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const callback = useCallback(() => {
    const includeLinked = true
    dispatch(fetchCustomerCreditCards(includeLinked))
    dispatch(closeModal())
  }, [dispatch])

  return (
    <ModalView>
      <ModalContent
        title="Add a new linked card"
        subtitle={
          <p>
            Adding a linked credit card allows you to be recognized at the point
            of sale when you pay with this card using Apple Pay or Google Pay.
          </p>
        }
      >
        {!!brand.applePayMerchantId ? (
          <>
            <AuthApplePay
              api={api}
              brand={brand}
              customerId={customer_id}
              amount="1.00"
              spinner={<Loading />}
              callback={callback}
            />
            <Message color="alert" size="small" style={{ width: '100%' }}>
              PLEASE NOTE: Linked cards should be added on the device you're
              using to pay at the store. So if you're paying with your mobile
              phone, you should add your card from this page on your mobile
              phone.
            </Message>
          </>
        ) : (
          <Message color="error" size="small" style={{ width: '100%' }}>
            This brand is not currently accepting linked cards added via Apple
            Pay or Google Pay. Please try back at a later time.
          </Message>
        )}
      </ModalContent>
    </ModalView>
  )
}

CreditCardLinked.displayName = 'CreditCardLinked'

export default CreditCardLinked
