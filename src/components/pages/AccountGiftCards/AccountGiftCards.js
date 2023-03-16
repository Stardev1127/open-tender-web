import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectCustomerGiftCards,
  fetchCustomerGiftCards,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { openModal, selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  HeaderUser,
  Loading,
  Main,
  PageTitle,
  PageContainer,
  PageContent,
  PageTitleButtons,
} from '../..'
import GiftCardsList from './GiftCardsList'

const AccountGiftCards = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { title: siteTitle } = useSelector(selectBrand)
  const { giftCardsAccount: config } = useSelector(selectConfig)
  const { entities, loading } = useSelector(selectCustomerGiftCards)
  const isLoading = loading === 'pending'
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    if (!auth) return navigate('/account')
  }, [auth, navigate])

  useEffect(() => {
    dispatch(fetchCustomerGiftCards())
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
            <PageTitle {...config}>
              <PageTitleButtons>
                <ButtonStyled onClick={() => navigate('/gift-cards')}>
                  Buy Gift Cards For Others
                </ButtonStyled>
                <ButtonStyled
                  onClick={() => dispatch(openModal({ type: 'giftCard' }))}
                  color="secondary"
                >
                  Buy a New Gift Card
                </ButtonStyled>
                <ButtonStyled
                  onClick={() =>
                    dispatch(openModal({ type: 'giftCardAssign' }))
                  }
                  color="secondary"
                >
                  Add Gift Card To Account
                </ButtonStyled>
              </PageTitleButtons>
            </PageTitle>
            {entities.length ? (
              <GiftCardsList giftCards={entities} isLoading={isLoading} />
            ) : (
              <PageContent>
                {isLoading ? (
                  <Loading text="Retrieving your gift cards..." />
                ) : (
                  <p>Looks like you haven't added any gift cards yet.</p>
                )}
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountGiftCards.displayName = 'AccountGiftCards'
export default AccountGiftCards
