import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectCustomerFavorites,
  fetchCustomerFavorites,
  selectCustomerOrders,
  fetchMenuItems,
} from '@open-tender/redux'
import { getLastOrder, makeDisplayItem } from '@open-tender/js'

import { selectConfig, selectBrand } from '../../../slices'
import {
  Content,
  ItemCards,
  HeaderDefault,
  Loading,
  Main,
  OrderCardItem,
  PageTitle,
  PageError,
  PageContainer,
  PageContent,
} from '../..'

const Favorites = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { entities, loading, error } = useSelector(selectCustomerFavorites)
  const { entities: orders } = useSelector(selectCustomerOrders)
  const lastOrder = useMemo(() => getLastOrder(orders), [orders])
  const [favorites, setFavorites] = useState(entities)
  const { title: siteTitle, has_favorites } = useSelector(selectBrand)
  const { favorites: config } = useSelector(selectConfig)
  const { auth } = useSelector(selectCustomer)
  const isLoading = loading === 'pending'
  const items = favorites.map((i) => ({ ...i.item }))

  useEffect(() => {
    if (!auth || !has_favorites) return navigate('/account')
  }, [auth, has_favorites, navigate])

  useEffect(() => {
    if (error) window.scrollTo(0, 0)
  }, [error])

  useEffect(() => {
    dispatch(fetchCustomerFavorites())
  }, [dispatch])

  useEffect(() => {
    const favs = entities.map((i) => ({ ...i, item: makeDisplayItem(i.item) }))
    setFavorites(favs)
  }, [entities])

  useEffect(() => {
    if (lastOrder) {
      const { revenue_center, service_type: serviceType } = lastOrder
      const { revenue_center_id: revenueCenterId } = revenue_center
      dispatch(fetchMenuItems({ revenueCenterId, serviceType }))
    }
  }, [lastOrder, dispatch])

  return auth ? (
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
            {items.length ? (
              <ItemCards
                items={items}
                delay={0}
                sequential={false}
                renderItem={(props) => <OrderCardItem {...props} />}
              />
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving your favorites..." />
                ) : (
                  <p>
                    Looks like you don't have any favorites yet. Please visit
                    the Recent Orders page to add some.
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

Favorites.displayName = 'Favorites'
export default Favorites
