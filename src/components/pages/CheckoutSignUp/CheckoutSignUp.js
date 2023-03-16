import React, { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import Helmet from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkout,
  resetSignUp,
  selectCheckout,
  selectCustomer,
  selectGuest,
  selectSignUp,
  signUpCustomer,
  updateForm,
} from '@open-tender/redux'
import {
  ButtonLink,
  FormWrapper,
  SignUpGuestForm,
} from '@open-tender/components'

import { selectBrand, selectContent } from '../../../slices'
import { Content, HeaderCheckout, Main, PageContainer, PageTitle } from '../..'

const defaultText = {
  title: 'Sign up or checkout as a guest',
  subtitle: 'To checkout as a guest, you can skip the password field.',
}

const CheckoutSignUpEmail = styled('div')`
  margin: 2rem 0;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const CheckoutSignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { checkoutFlow } = useSelector(selectContent)
  const config = checkoutFlow?.sections?.signUp || defaultText
  const { form } = useSelector(selectCheckout)
  const { email } = useSelector(selectGuest)
  const { loading, error } = useSelector(selectSignUp)
  const { auth } = useSelector(selectCustomer)

  const signUp = useCallback(
    (data) => dispatch(signUpCustomer(data)),
    [dispatch]
  )

  const submitGuest = useCallback(
    (data) => {
      dispatch(resetSignUp())
      dispatch(updateForm({ customer: data }))
      navigate('/checkout')
    },
    [dispatch, navigate]
  )

  const changeEmail = () => {
    dispatch(updateForm({ customer: {} }))
    navigate('/checkout/guest')
  }

  useEffect(() => {
    if (auth) {
      dispatch(checkout())
      navigate('/checkout')
    }
  }, [auth, dispatch, navigate])

  return (
    <>
      <Helmet>
        <title>Checkout Sign Up | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderCheckout />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...config}>
              <CheckoutSignUpEmail>
                <p>
                  <ButtonLink onClick={changeEmail}>
                    Go back & enter a different email address
                  </ButtonLink>
                </p>
              </CheckoutSignUpEmail>
            </PageTitle>
            <FormWrapper>
              <SignUpGuestForm
                email={email}
                guest={form.customer}
                loading={loading}
                error={error}
                signUp={signUp}
                showGuest={config.showGuest}
                submitGuest={submitGuest}
                hasThanx={has_thanx}
              />
            </FormWrapper>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CheckoutSignUp.displayName = 'CheckoutSignUp'
export default CheckoutSignUp
