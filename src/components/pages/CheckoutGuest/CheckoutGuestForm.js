import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkout,
  fetchGuest,
  fetchGuestThanx,
  resetGuestErrors,
  selectCheckout,
  selectCustomer,
  selectGuest,
} from '@open-tender/redux'
import { checkGuestData } from '@open-tender/js'
import { FormWrapper, GuestForm } from '@open-tender/components'

import { selectBrand, selectContent } from '../../../slices'
import { PageTitle } from '../..'
import CheckoutMagicLink from './CheckoutMagicLink'

const defaultText = {
  title: "Let's see if you have an account",
  subtitle: 'Please enter your email address below.',
}

const checkNotFound = (errors) => {
  const errMsg = errors ? errors.email || errors.form : null
  if (!errMsg) return null
  return (
    errMsg.includes('not associated') || errMsg.includes('Account not found')
  )
}

const CheckoutGuestForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { has_thanx } = useSelector(selectBrand)
  const { checkoutFlow } = useSelector(selectContent)
  const config = checkoutFlow?.sections?.email || defaultText
  const { auth } = useSelector(selectCustomer)
  const { form } = useSelector(selectCheckout)
  const { showMagicLink, email, loading, errors } = useSelector(selectGuest)
  const { guestIncomplete } = !auth ? checkGuestData(form.customer, email) : {}
  const notFound = checkNotFound(errors)
  const callback = useCallback(() => navigate('/checkout/signin'), [navigate])
  const checkGuest = useCallback(
    (email) => dispatch(fetchGuest(email, callback)),
    [dispatch, callback]
  )
  const checkGuestThanx = useCallback(
    (email) => dispatch(fetchGuestThanx(email)),
    [dispatch]
  )

  useEffect(() => {
    return () => dispatch(resetGuestErrors())
  }, [dispatch])

  useEffect(() => {
    if (auth || !guestIncomplete) {
      dispatch(checkout())
      navigate('/checkout')
    }
  }, [auth, guestIncomplete, dispatch, navigate])

  useEffect(() => {
    if (notFound) navigate('/checkout/signup')
  }, [notFound, navigate])

  return showMagicLink ? (
    <CheckoutMagicLink />
  ) : (
    <>
      <PageTitle {...config} />
      <FormWrapper>
        <GuestForm
          email={email}
          loading={loading}
          errors={errors}
          checkGuest={has_thanx ? checkGuestThanx : checkGuest}
          submitText="Continue"
        />
      </FormWrapper>
    </>
  )
}

CheckoutGuestForm.displayName = 'CheckoutGuestForm'
export default CheckoutGuestForm
