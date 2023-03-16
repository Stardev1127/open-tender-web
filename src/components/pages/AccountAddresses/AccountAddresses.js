import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerAddresses,
  selectCustomerAddresses,
} from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  HeaderUser,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
} from '../..'
import Addresses from './Addresses'

const AccountAddresses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { addresses: config } = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const { entities, loading } = useSelector(selectCustomerAddresses)
  const isLoading = loading === 'pending'
  const limit = 50

  useEffect(() => {
    if (!auth) return navigate('/account')
  }, [auth, navigate])

  useEffect(() => {
    dispatch(fetchCustomerAddresses(limit))
  }, [dispatch])

  return auth ? (
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
            {entities.length ? (
              <Addresses addresses={entities} isLoading={isLoading} />
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving your addresses..." />
                ) : (
                  <p>
                    Looks like you haven't added any addresses yet. Please place
                    an order to add one.
                  </p>
                )}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  ) : null
}

AccountAddresses.displayName = 'AccountAddresses'
export default AccountAddresses
