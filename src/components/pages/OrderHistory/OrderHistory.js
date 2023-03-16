import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectCustomerOrders,
  fetchCustomerOrders,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageError,
  PageTitle,
} from '../..'
import OrdersList from './OrdersList'

const Orders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const increment = 20
  const limit = 60
  const [count, setCount] = useState(increment)
  const orders = useSelector(selectCustomerOrders)
  const { entities, loading, error } = orders
  const [recentOrders, setRecentOrders] = useState(entities.slice(0, count))
  const { title: siteTitle } = useSelector(selectBrand)
  const { orders: config } = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'

  useEffect(() => {
    if (!auth) return navigate('/account')
  }, [auth, navigate])

  useEffect(() => {
    dispatch(fetchCustomerOrders(limit + 1))
  }, [dispatch])

  useEffect(() => {
    setRecentOrders(entities.slice(0, count))
  }, [entities, count])

  const loadMore = () => {
    setCount(Math.min(count + increment, limit))
  }

  if (!auth) return null

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
          <PageContainer style={{ maxWidth: '114rem' }}>
            <PageTitle {...config} />
            <PageError error={error} />
            {recentOrders.length ? (
              <>
                <OrdersList orders={recentOrders} delay={0} />
                {entities.length - 1 > count && (
                  <ButtonStyled onClick={loadMore}>
                    Load more recent orders
                  </ButtonStyled>
                )}
              </>
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving your order history. Please sit tight." />
                ) : (
                  <p>Looks like you don't have any orders yet.</p>
                )}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Orders.displayName = 'Orders'
export default Orders
