import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCheckout,
  sendCustomerVerificationEmail,
  updateForm,
  validateOrder,
} from '@open-tender/redux'
import { selectContent } from '../../../slices'
import { ButtonLink, FormError, Text } from '@open-tender/components'

import CheckoutSection from './CheckoutSection'
import CheckoutButton from './CheckoutButton'

const CheckoutDiscountsView = styled.div`
  margin: 2rem 0 0;
`

// const usePrevious = (value) => {
//   const ref = useRef(null)
//   useEffect(() => {
//     ref.current = value
//   })
//   return ref.current
// }

const calcTotal = (totals) => {
  if (!totals) return 0.0
  const { subtotal, surcharge, discount } = totals
  if (!subtotal) return 0.0
  return parseFloat(subtotal) + parseFloat(surcharge) + parseFloat(discount)
}

const CheckoutDiscounts = () => {
  const dispatch = useDispatch()
  const { check, form, loading, errors } = useSelector(selectCheckout)
  const { checkout: config } = useSelector(selectContent)
  const { customer_id, is_verified } = check.customer || {}
  const total = calcTotal(check.totals)
  const [pendingDiscount, setPendingDiscount] = useState(null)
  const discountIds = form.discounts.map((i) => i.id)
  const errMsg = errors ? errors?.customer?.account : null

  // add initial auto applied discounts
  useEffect(() => {
    const initialDiscounts = check.discounts
      .filter((i) => !i.is_optional)
      .filter((i) => !form.discounts.find((a) => i.id === a.id))
      .map((i) => ({ id: i.id, ext_id: i.ext_id || '' }))
    if (initialDiscounts.length) {
      dispatch(
        updateForm({ discounts: [...form.discounts, ...initialDiscounts] })
      )
      dispatch(validateOrder())
    }
  }, [check.discounts, form.discounts, dispatch])

  useEffect(() => {
    if (loading !== 'pending') setPendingDiscount(null)
  }, [loading])

  const discountsOptional = check.config.discounts.length
    ? check.config.discounts
    : null
  if (!discountsOptional) return null

  const applyDiscount = (discountId, extId) => {
    setPendingDiscount(discountId)
    const newDiscount = { id: discountId, ext_id: extId || '' }
    dispatch(updateForm({ discounts: [...form.discounts, newDiscount] }))
    dispatch(validateOrder())
  }

  const removeDiscount = (discountId) => {
    const filtered = form.discounts.filter((i) => i.id !== discountId)
    dispatch(updateForm({ discounts: filtered }))
    dispatch(validateOrder())
  }

  const verifyAccount = () => {
    const linkUrl = `${window.location.origin}/verify`
    dispatch(sendCustomerVerificationEmail(linkUrl))
  }

  const makeDiscountButton = (i) => {
    const title = i.title || i.name
    const isApplied = discountIds.includes(i.id)
    const isPending = i.id === pendingDiscount
    const missingAccount =
      ['ACCOUNT', 'VERIFIED'].includes(i.auth_type) && !customer_id
    const missingVerified = i.auth_type === 'VERIFIED' && !is_verified
    const onPress = isApplied
      ? () => removeDiscount(i.id)
      : () => applyDiscount(i.id, i.ext_id)
    const disabled = isApplied
      ? !i.is_optional
      : missingAccount || missingVerified || total <= 0.0

    return (
      <CheckoutButton
        key={i.id}
        title={title}
        onPress={isPending ? null : onPress}
        isApplied={isApplied}
        disabled={disabled}
        subtitle={
          !i.is_optional ? (
            'Credit has automatically been applied to your order.'
          ) : missingAccount ? (
            <Text size="xSmall" color="error">
              Requires an account. Please create an account to enable this
              discount.
            </Text>
          ) : missingVerified ? (
            <Text size="xSmall" color="error">
              Requires a verified account.{' '}
              <ButtonLink onClick={verifyAccount}>
                Click here to send a verification email
              </ButtonLink>{' '}
              and then refresh this page after {"you've"} verified your account.
            </Text>
          ) : i.per_order === 1 ? (
            'Cannot be used with any other discounts'
          ) : (
            i.description
          )
        }
      />
    )
  }

  const loyalty = discountsOptional.filter((i) => i.discount_type === 'LOYALTY')
  const rewards = discountsOptional.filter((i) => i.discount_type === 'REWARD')
  const deals = discountsOptional.filter((i) => i.discount_type === 'DEAL')
  const other = discountsOptional.filter((i) => i.discount_type === 'DISCOUNT')

  return (
    <CheckoutSection title={config.discounts.title}>
      <FormError errMsg={errMsg} />
      <CheckoutDiscountsView>
        {loyalty.length > 0 && loyalty.map((i) => makeDiscountButton(i))}
        {rewards.length > 0 && rewards.map((i) => makeDiscountButton(i))}
        {deals.length > 0 && deals.map((i) => makeDiscountButton(i))}
        {other.length > 0 && other.map((i) => makeDiscountButton(i))}
      </CheckoutDiscountsView>
    </CheckoutSection>
  )
}

CheckoutDiscounts.displayName = 'CheckoutDiscounts'

export default CheckoutDiscounts
