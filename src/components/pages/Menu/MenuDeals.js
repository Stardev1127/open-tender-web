import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { Container, Reward } from '../..'
import { MenuCategoryView, MenuCategoryHeader } from './MenuCategory'

const MenuDealsView = styled('div')`
  display: flex;
  flex-wrap: wrap;
  padding: ${(props) => props.theme.layout.padding};
  padding-top: 0;
  padding-right: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-top: 0;
    padding-right: 0;
  }
`

const MenuDeal = styled('div')`
  position: relative;
  width: 25%;
  padding: ${(props) => props.theme.layout.padding};
  padding-bottom: 0;
  padding-left: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.laptop}) {
    width: 33.33333%;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    width: 50%;
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-bottom: 0;
    padding-left: 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: ${(props) => props.theme.layout.paddingMobile};
    padding-bottom: 0;
    padding-left: 0;
  }
`

const MenuDeals = ({ deals }) => {
  if (!deals || !deals.length) return null
  return (
    <MenuCategoryView id="deals">
      <MenuCategoryHeader>
        <Container>
          <h2>Today's Deals</h2>
          <p>
            These deals can be redeemed from the checkout page once you've added
            the relevant items to your cart
          </p>
        </Container>
      </MenuCategoryHeader>
      <MenuDealsView>
        {deals.map((deal) => (
          <MenuDeal key={deal.discount_id}>
            <Reward item={deal} />
          </MenuDeal>
        ))}
      </MenuDealsView>
    </MenuCategoryView>
  )
}

MenuDeals.displayName = 'MenuDeals'
MenuDeals.propTypes = {
  deals: propTypes.array,
}

export default MenuDeals
