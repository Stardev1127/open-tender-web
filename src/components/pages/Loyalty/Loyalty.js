import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { selectCustomer } from '@open-tender/redux'

import { selectBrand, selectConfig } from '../../../slices'
import { Content, HeaderDefault, Main, PageContainer, PageTitle } from '../..'
import LoyaltyPrograms from './LoyaltyProgams'

const Loyalty = () => {
  const navigate = useNavigate()
  const { rewards: rewardsConfig } = useSelector(selectConfig)
  const { title: siteTitle, has_loyalty } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    if (!auth || !has_loyalty) return navigate('/account')
  }, [auth, has_loyalty, navigate])

  return auth ? (
    <>
      <Helmet>
        <title>Loyalty | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <PageTitle {...rewardsConfig.loyalty} />
            <LoyaltyPrograms />
          </PageContainer>
        </Main>
      </Content>
    </>
  ) : null
}

Loyalty.displayName = 'Loyalty'
export default Loyalty
