import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from '@emotion/styled'
import { deviceType, isMobile } from 'react-device-detect'
import {
  selectCartTotal,
  selectCustomer,
  selectMenuSlug,
  selectOrder,
  selectCheckout,
  resetCheck,
  resetConfirmation,
  resetErrors,
  resetTip,
  selectConfirmationOrder,
  setConfirmationOrder,
  setSubmitting,
  setDeviceType,
  validateOrder,
} from '@open-tender/redux'
import { isEmpty, isString } from '@open-tender/js'
import { FormError } from '@open-tender/components'

import { selectBrand, selectConfig } from '../../../slices'
import { Content, Main } from '../..'
import CheckoutCancelEdit from './CheckoutCancelEdit'
import CheckoutCustomer from './CheckoutCustomer'
import CheckoutGuest from './CheckoutGuest'
import CheckoutPickup from './CheckoutPickup'
import CheckoutDelivery from './CheckoutDelivery'
import CheckoutCart from './CheckoutCart'
import CheckoutHeader from './CheckoutHeader'
import CheckoutAddress from './CheckoutAddress'
import CheckoutDetails from './CheckoutDetails'
import CheckoutCurbside from './CheckoutCurbside'
import CheckoutSurcharges from './CheckoutSurcharges'
import CheckoutDiscounts from './CheckoutDiscounts'
import CheckoutPromoCodes from './CheckoutPromoCodes'
import CheckoutTip from './CheckoutTip'
import CheckoutGiftCards from './CheckoutGiftCards'
import CheckoutTenders from './CheckoutTenders'
import CheckoutSection from './CheckoutSection'
import CheckoutSubmit from './CheckoutSubmit'

const makeDeviceType = (deviceType) => {
  switch (deviceType) {
    case 'tablet':
      return 'TABLET'
    case 'mobile':
      return 'MOBILE'
    case 'browser':
      return 'DESKTOP'
    default:
      return 'DESKTOP'
  }
}

const CheckoutView = styled('div')`
  flex: 1 1 auto;
  display: flex;
  width: 100%;
  max-width: 128rem;
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const CheckoutTitle = styled('div')`
  label: CheckoutTitle;
  padding: 0 ${(props) => props.theme.layout.padding} 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile} 0 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile} 0 0;
  }

  h1 {
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }

  & > p:first-of-type {
    margin: 0.5rem 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const CheckoutContent = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  flex: 1 1 auto;
  padding: ${(props) => props.theme.layout.navHeight} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex: 0 0 55%;
    padding: ${(props) => props.theme.layout.navHeightMobile} 0;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 100%;
  }
`

const CheckoutInfo = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    flex-direction: column;
    justify-content: flex-start;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    justify-content: flex-start;
  }

  & > div {
    flex-grow: 1;
    min-width: 50%;
  }
`

const CheckoutSidebar = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  position: relative;
  flex: 0 0 48rem;
  padding: 0 0 0 ${(props) => props.theme.layout.padding};
  background-color: ${(props) => props.theme.bgColors.tertiary};
  border-width: 0;
  border-style: solid;
  border-color: ${(props) => props.theme.border.color};
  border-left-width: ${(props) => props.theme.border.width};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    flex: 0 0 45%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    width: 300%;
    background-color: ${(props) => props.theme.bgColors.tertiary};
  }
`

const CheckoutSidebarContent = styled('div')`
  position: relative;
  z-index: 2;
`

const makeFormTitle = (check, serviceType) => {
  if (!check || !check.config) return {}
  const displayed = check.config.displayed
  const required = check.config.required
  const hasAddress =
    serviceType === 'DELIVERY' &&
    (displayed.address.length || required.address.length)
  const hasDetails = displayed.details.length || required.details.length
  const formTitle =
    hasAddress && hasDetails
      ? 'Address & Order Details'
      : hasAddress
      ? 'Address Details'
      : hasDetails
      ? 'Order Details'
      : null
  return { hasAddress, hasDetails, formTitle }
}

const makeAddressError = (errors) => {
  if (!errors || !errors.address) return null
  const addressError = isString(errors.address)
    ? errors.address
    : errors.address.address || null
  if (!addressError) return null
  const errMsg = addressError.includes('state')
    ? 'your state or province appears to be invalid'
    : addressError.includes('code')
    ? 'your postal code appears to be invalid'
    : addressError
  return `There's something wrong with your address (${errMsg}). Please try changing your address.`
}

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title } = useSelector(selectBrand)
  const { checkout: config } = useSelector(selectConfig)
  const cartTotal = useSelector(selectCartTotal)
  const menuSlug = useSelector(selectMenuSlug)
  const { serviceType, revenueCenter } = useSelector(selectOrder)
  const { revenue_center_id: revenueCenterId } = revenueCenter || {}
  const { auth } = useSelector(selectCustomer)
  const hasCustomer = auth ? true : false
  const { check, form, errors, submitting, completedOrder } =
    useSelector(selectCheckout)
  const confirmedOrder = useSelector(selectConfirmationOrder)
  const hasConfirmationOrder = confirmedOrder ? true : false
  const hasCheck = check ? true : false
  const hasFormCustomer = !isEmpty(form.customer) ? true : false
  const formError = errors ? errors.form || null : null
  const addressError = makeAddressError(errors)
  const deviceTypeName = makeDeviceType(deviceType)
  const { formTitle, hasAddress } = makeFormTitle(check, serviceType)

  useEffect(() => {
    if (!submitting && formError) window.scrollTo(0, 0)
  }, [formError, submitting])

  useEffect(() => {
    dispatch(setSubmitting(false))
    dispatch(resetConfirmation())
    dispatch(setDeviceType(deviceTypeName))
    return () => {
      dispatch(resetErrors())
      dispatch(resetTip())
      dispatch(resetCheck())
    }
  }, [dispatch, deviceTypeName])

  useEffect(() => {
    if (!completedOrder && hasFormCustomer && !hasCheck) {
      dispatch(validateOrder())
    }
  }, [dispatch, completedOrder, hasFormCustomer, hasCheck])

  useEffect(() => {
    if (completedOrder) {
      if (!hasConfirmationOrder) {
        dispatch(setConfirmationOrder(completedOrder))
        navigate('/confirmation')
      }
    } else if (cartTotal === 0) {
      navigate(menuSlug)
    } else if (!revenueCenterId || !serviceType) {
      navigate('/account')
    } else if (!hasCustomer && !hasFormCustomer) {
      navigate('/checkout/guest')
    }
  }, [
    dispatch,
    navigate,
    cartTotal,
    menuSlug,
    revenueCenterId,
    serviceType,
    completedOrder,
    hasCustomer,
    hasFormCustomer,
    hasConfirmationOrder,
  ])

  return (
    <>
      <Helmet>
        <title>Checkout | {title}</title>
      </Helmet>
      <Content>
        <Main bgColor="transparent" style={{ overflow: 'hidden', padding: 0 }}>
          <CheckoutView>
            <CheckoutHeader />
            <CheckoutContent>
              <CheckoutTitle>
                <h1>{config.title}</h1>
                <p>{config.subtitle}</p>
                <CheckoutCancelEdit />
                {formError && <FormError errMsg={formError} />}
                {addressError && <FormError errMsg={addressError} />}
              </CheckoutTitle>
              <CheckoutInfo>
                {auth ? <CheckoutCustomer /> : <CheckoutGuest />}
                {check && (
                  <>
                    {['WALKIN', 'PICKUP'].includes(serviceType) ? (
                      <CheckoutPickup />
                    ) : serviceType === 'DELIVERY' ? (
                      <CheckoutDelivery />
                    ) : null}
                  </>
                )}
              </CheckoutInfo>
              {formTitle && (
                <CheckoutSection title={formTitle} style={{ padding: '0' }}>
                  <CheckoutAddress />
                  <CheckoutDetails hasAddress={hasAddress} />
                </CheckoutSection>
              )}
              {check && (
                <>
                  <CheckoutCurbside />
                  <CheckoutSurcharges />
                  <CheckoutDiscounts />
                  <CheckoutPromoCodes />
                  <CheckoutTip />
                  {isMobile && <CheckoutCart />}
                  <CheckoutGiftCards />
                  <CheckoutTenders />
                  <CheckoutSubmit />
                </>
              )}
            </CheckoutContent>
            <CheckoutSidebar>
              <CheckoutSidebarContent>
                {!isMobile && check && <CheckoutCart />}
              </CheckoutSidebarContent>
            </CheckoutSidebar>
          </CheckoutView>
        </Main>
      </Content>
    </>
  )
}

Checkout.displayName = 'Checkout'

export default Checkout
