import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { selectCustomer } from '@open-tender/redux'

import { selectBrand, selectContentSection } from '../../../slices'
import { Content, HeaderDefault, Main, PageContainer } from '../..'
import LevelUpLoyalty from './LevelUpLoyalty'
import ThanxLoyalty from './ThanxLoyalty'
import RewardsList from './RewardsList'
import PageContent from '../../PageContent'
import PageTitle from '../../PageTitle'

const Rewards = () => {
  const navigate = useNavigate()
  const {
    title: siteTitle,
    has_thanx,
    has_levelup,
    has_rewards,
  } = useSelector(selectBrand)
  const hasRewards = has_rewards || has_thanx || has_levelup
  const { auth } = useSelector(selectCustomer)
  const { title, subtitle } = useSelector(selectContentSection('rewards'))

  useEffect(() => {
    if (!auth || !hasRewards) return navigate('/account')
  }, [auth, hasRewards, navigate])

  return auth ? (
    <>
      <Helmet>
        <title>Rewards | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <PageTitle title={title} subtitle={subtitle} />
            <PageContent style={has_rewards ? { maxWidth: '99rem' } : null}>
              {has_levelup ? (
                <LevelUpLoyalty />
              ) : has_thanx ? (
                <ThanxLoyalty />
              ) : (
                <RewardsList />
              )}
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  ) : null
}

Rewards.displayName = 'Rewards'
export default Rewards
