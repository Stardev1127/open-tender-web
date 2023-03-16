import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { selectCustomer, selectDeals, fetchDeals } from '@open-tender/redux'

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
  Rewards,
} from '../..'

const Deals = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle, has_deals } = useSelector(selectBrand)
  const { deals: config } = useSelector(selectConfig)
  const { profile } = useSelector(selectCustomer)
  const { customer_id } = profile || {}
  const { entities: deals, loading, error } = useSelector(selectDeals)
  const hasDeals = deals.length > 0
  const isLoading = loading === 'pending'

  useEffect(() => {
    if (!has_deals) return navigate('/account')
  }, [has_deals, navigate])

  useEffect(() => {
    dispatch(fetchDeals())
  }, [dispatch, customer_id])

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
          <PageContainer>
            <PageTitle {...config} />
            {error ? (
              <PageError error={error} />
            ) : (
              <PageContent style={{ maxWidth: '99rem' }}>
                {hasDeals ? (
                  <Rewards rewards={deals} />
                ) : isLoading ? (
                  <Loading text="Retrieving today's deals..." />
                ) : (
                  <p>
                    We're not featuring any deals today. Please check back soon!
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

Deals.displayName = 'Deals'
export default Deals
