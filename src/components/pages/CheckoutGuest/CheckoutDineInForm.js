import { useCallback, useEffect } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  checkout,
  resetGuest,
  selectCheckout,
  selectCustomer,
  updateForm,
} from '@open-tender/redux'
import { ButtonLink, DineInForm, FormWrapper } from '@open-tender/components'

import { openModal, selectContent } from '../../../slices'
import { PageTitle } from '../..'

const defaultText = {
  title: 'Please add a name or create an account',
  subtitle:
    'Creating an account allows you to apply promo codes and to start earning rewards. It takes just a few seconds!',
}

const CheckoutDineInFormView = styled.div`
  & > div:first-of-type h1 {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }

  & > div:first-of-type p {
    margin: 2rem 0 0;
  }

  form {
    margin: 3rem 0 0;
  }
`

const CheckoutDineInForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { checkoutFlow } = useSelector(selectContent)
  const config = checkoutFlow?.sections?.name || defaultText
  const { auth } = useSelector(selectCustomer)
  const { form } = useSelector(selectCheckout)
  const { first_name, last_name } = form ? form.customer : {}
  const initialData = { first_name, last_name }

  const submitGuest = useCallback(
    (data) => {
      dispatch(resetGuest())
      dispatch(updateForm(data))
      dispatch(checkout())
      navigate('/checkout')
    },
    [dispatch, navigate]
  )

  const signUp = () => {
    dispatch(openModal({ type: 'signUp' }))
  }

  const signIn = () => {
    dispatch(openModal({ type: 'login' }))
  }

  useEffect(() => {
    return () => dispatch(resetGuest())
  }, [dispatch])

  useEffect(() => {
    if (auth) {
      dispatch(checkout())
      navigate('/checkout')
    }
  }, [auth, dispatch, navigate])

  return (
    <CheckoutDineInFormView>
      <PageTitle title={config.title} style={{ margin: '0 auto' }}>
        <p>{config.subtitle}</p>
        <p>
          <ButtonLink onClick={signUp}>Create an account</ButtonLink> or{' '}
          <ButtonLink onClick={signIn}>sign into an existing one</ButtonLink>
        </p>
      </PageTitle>
      <FormWrapper>
        <DineInForm
          initialData={initialData}
          submitGuest={submitGuest}
          submitText="Continue"
        />
      </FormWrapper>
    </CheckoutDineInFormView>
  )
}

CheckoutDineInForm.displayName = 'CheckoutDineInForm'
export default CheckoutDineInForm
