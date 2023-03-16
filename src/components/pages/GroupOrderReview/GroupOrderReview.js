import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectGroupOrder } from '@open-tender/redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import { Body, Box, Headline } from '@open-tender/components'

import { selectBrand } from '../../../slices'
import GroupOrderReviewGuest from './GroupOrderReviewGuest'
import GroupOrderReviewOwner from './GroupOrderReviewOwner'

export const GroupOrderCartView = styled(Box)`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.375s forwards;
  max-width: ${(props) => props.theme.layout.maxWidth};
  margin: ${(props) => props.theme.layout.padding} auto;
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} auto;
    padding: ${(props) => props.theme.layout.paddingMobile};
  }
`

export const GroupOrderCartSection = styled.div`
  margin: 0 0 3rem;
`

export const GroupOrderCartSectionHeader = styled.div`
  margin: 0 0 3rem;
`

export const GroupOrderCartTitle = styled(Headline)`
  margin: 0 0 0 -0.1rem;
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

export const GroupOrderCartSubtitle = styled(Body)`
  margin: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const GroupOrderReview = () => {
  const navigate = useNavigate()
  const { title: siteTitle } = useSelector(selectBrand)
  const groupOrder = useSelector(selectGroupOrder)
  const { cartId, cartOwner, cartGuest } = groupOrder

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!cartId) navigate(`/account`)
  }, [cartId, navigate])

  return (
    <>
      <Helmet>
        <title>Review Group Order | {siteTitle}</title>
      </Helmet>
      {cartGuest ? (
        <GroupOrderReviewGuest />
      ) : cartOwner ? (
        <GroupOrderReviewOwner />
      ) : null}
    </>
  )
}

GroupOrderReview.displayName = 'GroupOrderReview'
export default GroupOrderReview
