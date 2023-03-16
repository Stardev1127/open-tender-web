import React, { useEffect, useCallback } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectSignUp,
  signUpCustomer,
  resetSignUp,
  linkPosToken,
} from '@open-tender/redux'
import { ButtonLink, FormWrapper, SignUpForm } from '@open-tender/components'

import {
  openModal,
  selectApi,
  selectBrand,
  selectConfig,
  selectOptIns,
} from '../../../slices'
import {
  Content,
  Main,
  PageTitle,
  HeaderDefault,
  PageContainer,
  PageContent,
} from '../..'

export const ThanxTerms = () => (
  <p>
    By signing up you agree to our{' '}
    <a
      href="https://app.thanx.com/privacy"
      rel="noopener noreferrer"
      target="_blank"
    >
      privacy policy
    </a>{' '}
    and our{' '}
    <a
      href="https://app.thanx.com/terms"
      rel="noopener noreferrer"
      target="_blank"
    >
      terms of service
    </a>
    .
  </p>
)

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const posToken = useQuery().get('pos-token')
  const api = useSelector(selectApi)
  const { signUp: signupConfig } = useSelector(selectConfig)
  const { title: siteTitle, has_thanx } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const token = auth ? auth.access_token : null
  const { loading, error } = useSelector(selectSignUp)
  const optIns = useSelector(selectOptIns)
  const signUp = useCallback(
    (data, callback) => dispatch(signUpCustomer(data, callback)),
    [dispatch]
  )

  useEffect(() => {
    dispatch(resetSignUp())
    return () => dispatch(resetSignUp())
  }, [dispatch])

  useEffect(() => {
    if (auth) {
      if (posToken) {
        dispatch(linkPosToken(posToken)).finally(navigate('/account'))
      } else {
        return navigate('/account')
      }
    }
  }, [auth, navigate, posToken, token, api, dispatch])

  useEffect(() => {
    if (error) window.scrollTo(0, 0)
  }, [error])

  const login = () => {
    dispatch(openModal({ type: 'login' }))
  }

  return (
    <>
      <Helmet>
        <title>
          {signupConfig.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...signupConfig}>
              <p style={{ margin: '2rem 0' }}>
                Already have an account?{' '}
                <ButtonLink onClick={login}>Click here to log in.</ButtonLink>
              </p>
              {has_thanx && <ThanxTerms />}
            </PageTitle>
            <FormWrapper>
              <SignUpForm
                loading={loading}
                error={error}
                signUp={signUp}
                optIns={optIns}
                hasThanx={has_thanx}
              />
            </FormWrapper>
            <PageContent>
              <p>
                <Link to="/account">{signupConfig.back}</Link>
              </p>
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

SignUp.displayName = 'SignUp'
export default SignUp
