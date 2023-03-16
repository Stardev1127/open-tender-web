import { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchCustomer,
  resetLoginError,
  selectCustomer,
  updateCustomer,
} from '@open-tender/redux'
import { FormWrapper, ProfileForm } from '@open-tender/components'
import { Helmet } from 'react-helmet'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  DeleteAccount,
  HeaderUser,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
  VerifyAccount,
} from '../..'

const AccountProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { title: siteTitle } = useSelector(selectBrand)
  const { profile: config } = useSelector(selectConfig)
  const { profile, loading, error } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const isLoading = loading === 'pending'
  const errMsg = error ? error.message || null : null
  const update = useCallback(
    (data) => dispatch(updateCustomer(data)),
    [dispatch]
  )

  useEffect(() => {
    if (error) window.scrollTo(0, 0)
  }, [error])

  useEffect(() => {
    if (!customer_id) return navigate('/account')
    dispatch(fetchCustomer())
    return () => dispatch(resetLoginError())
  }, [customer_id, dispatch, navigate])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderUser />
        <Main>
          <PageContainer style={{ maxWidth: '72rem' }}>
            <PageTitle {...config}>
              <VerifyAccount style={{ margin: '2rem 0 0' }} />
            </PageTitle>
            {profile ? (
              <FormWrapper>
                <ProfileForm
                  profile={profile}
                  loading={loading}
                  error={error}
                  update={update}
                />
                <DeleteAccount />
              </FormWrapper>
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving your profile & preferences..." />
                ) : errMsg ? (
                  <p>{errMsg}</p>
                ) : null}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountProfile.displayName = 'AccountProfile'
export default AccountProfile
