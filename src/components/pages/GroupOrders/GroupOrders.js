import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectCustomerGroupOrders,
  fetchCustomerGroupOrders,
} from '@open-tender/redux'

import { selectAccountConfig, selectBrand } from '../../../slices'
import {
  Container,
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageContent,
  PageError,
  PageTitle,
} from '../..'
import OrdersList from '../OrderHistory/OrdersList'

const GroupOrders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orders = useSelector(selectCustomerGroupOrders)
  const { entities: groupOrders, loading, error } = orders
  const { title: siteTitle } = useSelector(selectBrand)
  const config = useSelector(selectAccountConfig)
  const { auth } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'

  useEffect(() => {
    if (!auth) return navigate('/account')
  }, [auth, navigate])

  useEffect(() => {
    dispatch(fetchCustomerGroupOrders())
  }, [dispatch])

  if (!auth) return null

  return (
    <>
      <Helmet>
        <title>Order History | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main bgColor="secondary">
          <Container>
            <PageTitle {...config.groupOrders} />
            <PageContent>
              <PageError error={error} />
              {groupOrders.length ? (
                <OrdersList orders={groupOrders} isGroup={true} />
              ) : isLoading ? (
                <Loading text="Retrieving your group orders..." />
              ) : (
                <p>Looks like you don't have any group orders yet</p>
              )}
            </PageContent>
          </Container>
        </Main>
      </Content>
    </>
  )
}

GroupOrders.displayName = 'GroupOrders'
export default GroupOrders
