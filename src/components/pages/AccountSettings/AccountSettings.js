import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  DeleteAccount,
  HeaderDefault,
  Main,
  PageContainer,
  PageTitle,
  VerifyAccount,
} from '../..'
import AccountSettingsButtons from './AccountSettingsButtons'

const AccountSettingsLogOut = styled.div`
  margin: 1rem 0 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const AccountSettings = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { accountSettings: config } = useSelector(selectConfig)
  const { auth, profile } = useSelector(selectCustomer)

  useEffect(() => {
    if (!auth) return navigate('/guest')
  }, [auth, navigate])

  return profile ? (
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
            <PageTitle {...config}>
              <AccountSettingsLogOut>
                <p>
                  <ButtonLink onClick={() => dispatch(logoutCustomer())}>
                    Log out of your account
                  </ButtonLink>
                </p>
                <VerifyAccount style={{ margin: '2rem 0 0' }} />
              </AccountSettingsLogOut>
            </PageTitle>
            <AccountSettingsButtons />
            <DeleteAccount />
          </PageContainer>
        </Main>
      </Content>
    </>
  ) : null
}

AccountSettings.displayName = 'AccountSettings'
export default AccountSettings
