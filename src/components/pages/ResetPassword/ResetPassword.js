import React, { useEffect, useCallback } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectResetPassword,
  resetPassword,
  resetPasswordReset,
} from '@open-tender/redux'
import {
  ButtonLink,
  FormWrapper,
  ResetPasswordForm,
} from '@open-tender/components'

import { selectBrand, selectConfig, openModal } from '../../../slices'
import {
  Content,
  HeaderDefault,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
} from '../..'

const ResetPassword = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { hash } = useLocation()
  const resetToken = hash.includes('#') ? hash.split('#')[1] : ''
  const { auth } = useSelector(selectCustomer)
  const { resetPassword: config } = useSelector(selectConfig)
  const { title: siteTitle } = useSelector(selectBrand)
  const { success, loading, error } = useSelector(selectResetPassword)
  const reset = useCallback(
    (new_password, resetToken) =>
      dispatch(resetPassword(new_password, resetToken)),
    [dispatch]
  )
  const resetForm = useCallback(() => dispatch(resetPasswordReset), [dispatch])

  useEffect(() => {
    if (auth) return navigate('/account')
    if (!resetToken) return navigate('/account')
  }, [auth, resetToken, navigate])

  const handleLogin = () => {
    const args = {
      type: 'login',
      args: { callback: () => navigate('/account') },
    }
    dispatch(openModal(args))
  }

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            {success ? (
              <>
                <PageTitle
                  title="Success!"
                  subtitle={
                    <ButtonLink onClick={handleLogin}>
                      Click here to log into your account
                    </ButtonLink>
                  }
                />
              </>
            ) : (
              <>
                <PageTitle {...config} />
                <PageContent>
                  <FormWrapper>
                    <ResetPasswordForm
                      loading={loading}
                      error={error}
                      reset={reset}
                      resetForm={resetForm}
                      resetToken={resetToken}
                    />
                  </FormWrapper>
                  <div style={{ margin: '3rem 0' }}>
                    <p>
                      <Link to="/account">{config.back}</Link>
                    </p>
                  </div>
                </PageContent>
              </>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

ResetPassword.displayName = 'ResetPassword'
export default ResetPassword
