import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectCustomer,
  selectCustomerHouseAccounts,
  fetchCustomerHouseAccounts,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  HeaderUser,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageError,
  PageTitle,
} from '../..'
import HouseAccountsList from './HouseAccountsList'

const AccountHouseAccounts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { title: siteTitle, has_house_accounts } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { houseAccounts: config } = useSelector(selectConfig)
  const { entities, loading, error } = useSelector(selectCustomerHouseAccounts)
  const isLoading = loading === 'pending'

  useEffect(() => {
    if (!auth || !has_house_accounts) return navigate('/account')
  }, [auth, has_house_accounts, navigate])

  useEffect(() => {
    dispatch(fetchCustomerHouseAccounts())
  }, [dispatch])

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
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...config} />
            <PageError error={error} />
            {entities.length ? (
              <HouseAccountsList houseAccounts={entities} />
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving your house accounts..." />
                ) : (
                  <p>
                    Looks like your account isn't currently associated with any
                    house accounts.
                  </p>
                )}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountHouseAccounts.displayName = 'AccountHouseAccounts'
export default AccountHouseAccounts
