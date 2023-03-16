import { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  logoutCustomer,
  resetCheckout,
  selectCheckout,
  selectCustomer,
  updateForm,
  validateOrder,
} from '@open-tender/redux'
import { isEmpty } from '@open-tender/js'
import { ButtonLink } from '@open-tender/components'
import { openModal, selectBrand } from '../../../slices'
import { Loading } from '../..'
import CheckoutCompany from './CheckoutCompany'
import CheckoutSection from './CheckoutSection'
import CheckoutSectionFootnote from './CheckoutSectionFootnote'
import CheckoutSectionTitle from './CheckoutSectionTitle'

const CheckoutCustomer = () => {
  const dispatch = useDispatch()
  const { has_thanx } = useSelector(selectBrand)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { auth, profile } = useSelector(selectCustomer)
  const { form, check, errors, loading } = useSelector(selectCheckout)
  const { sso } = check ? check.customer || {} : {}
  const noCustomer = isEmpty(form.customer)
  const { customer_id, first_name, last_name, email, phone, company } =
    profile || {}
  const noCustomerId = customer_id && !form.customer.customer_id
  const isLoading = !check && loading === 'pending'
  const showCustomer = check && profile

  useEffect(() => {
    if (!isLoggingOut) {
      if ((noCustomer || noCustomerId) && customer_id) {
        const customer = {
          customer_id,
          first_name,
          last_name,
          email,
          phone,
          company,
        }
        dispatch(updateForm({ customer }))
      }
    }
  }, [
    dispatch,
    noCustomer,
    noCustomerId,
    customer_id,
    first_name,
    last_name,
    email,
    phone,
    company,
    isLoggingOut,
  ])

  useEffect(() => {
    if (has_thanx && customer_id && sso && !sso.connected) {
      dispatch(logoutCustomer())
    }
  }, [has_thanx, customer_id, sso, dispatch])

  const callback = (data) => {
    const { first_name, last_name, email, phone, company } = data
    const customer = {
      customer_id,
      first_name,
      last_name,
      email,
      phone,
      company,
    }
    dispatch(updateForm({ customer }))
    dispatch(validateOrder())
  }

  const update = () => {
    dispatch(openModal({ type: 'profile', args: { callback } }))
  }

  const signOut = () => {
    setIsLoggingOut(true)
    dispatch(resetCheckout())
    dispatch(logoutCustomer())
  }

  if (!auth) return null

  return isLoading ? (
    <CheckoutSection>
      <Loading text="Loading..." style={{ textAlign: 'left' }} />
    </CheckoutSection>
  ) : showCustomer ? (
    <CheckoutSection title="Contact Info">
      <CheckoutSectionTitle>
        {first_name} {last_name}
      </CheckoutSectionTitle>
      <CheckoutCompany callback={callback} />
      <p>{email}</p>
      <p>{phone}</p>
      <CheckoutSectionFootnote>
        <p>
          <ButtonLink onClick={update}>Update your contact info</ButtonLink> or{' '}
          <ButtonLink onClick={signOut}>sign out</ButtonLink>
        </p>
      </CheckoutSectionFootnote>
      {/* {check && <CheckoutCompany errors={errors} />} */}
    </CheckoutSection>
  ) : (
    !isLoggingOut &&
    !errors && (
      <CheckoutSection>
        <Loading text="Retrieving your info..." style={{ textAlign: 'left' }} />
      </CheckoutSection>
    )
  )
}

CheckoutCustomer.displayName = 'CheckoutCustomer'
CheckoutCustomer.propTypes = {
  errors: propTypes.object,
}

export default CheckoutCustomer
