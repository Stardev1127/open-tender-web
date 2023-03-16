import { useState, useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, updateForm, validateOrder } from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'
import { ButtonStyled, FormError, Input } from '@open-tender/components'

import { selectContent, selectSettings } from '../../../slices'
import CheckoutSection from './CheckoutSection'
import CheckoutButton from './CheckoutButton'
import CheckoutPromoCodesGuest from './CheckoutPromoCodesGuest'

const CheckoutPromoCodesView = styled.div`
  margin: 1.5rem 0 0;
`

const CheckoutPromoCodeNew = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 0;
`

const CheckoutPromoCodeInput = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0 2rem 0 0;
`

const CheckoutPromoCodeButton = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
`

const getPromoCodeLimit = (settings) => {
  const limit = settings?.orderTypes?.OLO?.promo_code_limit
  return limit || 0
}

const CheckoutPromoCodes = () => {
  const dispatch = useDispatch()
  const [promoCode, setPromoCode] = useState('')
  const [error, setError] = useState('')
  const [pendingPromoCode, setPendingPromoCode] = useState(null)
  const { check, form, loading, errors } = useSelector(selectCheckout)
  const { email } = form.customer
  const { checkout: config } = useSelector(selectContent)
  const { checkout: settings } = useSelector(selectSettings)
  const promoCodeLimit = getPromoCodeLimit(settings)
  const applied = useMemo(
    () =>
      check.discounts
        .filter((i) => i.is_promo_code)
        .map((i) => i.name.trim().toLowerCase()),
    [check.discounts]
  )
  const promoCodeErrors = errors ? errors.promo_codes || null : null
  const index = applied ? applied.length : 0
  const promoCodeError = promoCodeErrors ? promoCodeErrors[index] : null
  const showNew = !promoCodeLimit || applied.length < promoCodeLimit

  useEffect(() => {
    if (loading !== 'pending') setPendingPromoCode(null)
    if (applied.includes(promoCode)) setPromoCode('')
  }, [loading, applied, promoCode])

  useEffect(() => {
    if (promoCodeError) {
      setError(promoCodeError)
      dispatch(updateForm({ promoCodes: applied }))
    }
  }, [promoCodeError, dispatch, applied])

  useEffect(() => {
    if (!promoCodeError && !promoCode) {
      setError('')
    }
  }, [promoCodeError, promoCode])

  const handleChange = (evt) => {
    setError('')
    setPromoCode(evt.target.value.trim().toLowerCase())
  }

  const applyPromoCode = () => {
    const cleanCode = promoCode.trim().toLowerCase()
    setPendingPromoCode(cleanCode)
    dispatch(updateForm({ promoCodes: [...applied, cleanCode] }))
    dispatch(validateOrder())
  }

  const removePromoCode = (code) => {
    setPendingPromoCode(code)
    const filtered = form.promoCodes.filter(
      (i) => i.trim().toLowerCase() !== code.trim().toLowerCase()
    )
    dispatch(updateForm({ promoCodes: filtered }))
    dispatch(validateOrder())
  }

  // const removePendingPromoCode = () => {
  //   setPromoCode('')
  //   setPendingPromoCode(null)
  //   setError('')
  //   if (form.promoCodes.length > applied.length) {
  //     dispatch(updateForm({ promoCodes: applied }))
  //   }
  // }

  if (!email) return <CheckoutPromoCodesGuest />

  return (
    <CheckoutSection title={config.promoCodes.title}>
      <CheckoutPromoCodesView>
        {applied.map((appliedCode) => {
          const discount = check.discounts.find((i) => i.name === appliedCode)
          const amount = discount
            ? formatDollars(-parseFloat(discount.amount))
            : null
          const subtitle = amount ? `${amount} discount applied` : null
          return (
            <CheckoutButton
              key={appliedCode}
              title={appliedCode}
              subtitle={subtitle}
              onPress={() => removePromoCode(appliedCode)}
              isApplied={true}
              disabled={pendingPromoCode ? true : false}
            />
          )
        })}
        {showNew && (
          <>
            <CheckoutPromoCodeNew>
              <CheckoutPromoCodeInput>
                <Input
                  label={
                    applied.length
                      ? 'Enter another promo code'
                      : 'Enter promo code'
                  }
                  value={promoCode}
                  onChange={handleChange}
                  style={{ margin: 0 }}
                />
              </CheckoutPromoCodeInput>
              <CheckoutPromoCodeButton>
                <ButtonStyled
                  onClick={applyPromoCode}
                  disabled={!promoCode || pendingPromoCode ? true : false}
                  size="small"
                  color="secondary"
                >
                  {pendingPromoCode ? 'Applying...' : 'Apply'}
                </ButtonStyled>
              </CheckoutPromoCodeButton>
            </CheckoutPromoCodeNew>
            <FormError errMsg={error} />
          </>
        )}
      </CheckoutPromoCodesView>
    </CheckoutSection>
  )
}

CheckoutPromoCodes.displayName = 'CheckoutPromoCodes'

export default CheckoutPromoCodes
