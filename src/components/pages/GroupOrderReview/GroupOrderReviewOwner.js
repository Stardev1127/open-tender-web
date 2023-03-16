import React, { useEffect, useState, useRef } from 'react'
import isEqual from 'lodash/isEqual'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import {
  selectOrder,
  selectGroupOrder,
  resetGroupOrder,
  selectMenuSlug,
  updateCustomerGroupOrder,
  closeGroupOrder,
  removeCustomerGroupOrder,
  selectMenuItems,
  showNotification,
  setCart,
  fetchMenuItems,
  checkout,
} from '@open-tender/redux'
import { rehydrateCart, isEmpty, combineCarts } from '@open-tender/js'
import {
  CartSummaryItem,
  ButtonLink,
  ButtonStyled,
  Heading,
} from '@open-tender/components'
import styled from '@emotion/styled'
import {
  Content,
  Main,
  PageTitle,
  PageContent,
  PageContainer,
  LinkSeparator,
} from '../..'
import GroupOrderLink from '../../GroupOrderLink'
import GroupOrderTime from '../../GroupOrderTime'
import {
  GroupOrderCartView,
  GroupOrderCartSection,
  GroupOrderCartSectionHeader,
  GroupOrderCartTitle,
  GroupOrderCartSubtitle,
} from './GroupOrderReview'
import { MenuHeader } from '../Menu'

const GroupOrderReviewOwnerGuestName = styled(Heading)`
  display: block;
  margin: 0 0 2rem;
  font-size: ${(props) => props.theme.fonts.sizes.big};
`

const GroupOrderReviewOwnerGuestList = styled.div`
  ul {
    margin: 1em 0 0;
  }
  ul li {
    margin: 0.5em 0;

    &:last-child {
      margin: 0;
    }
  }
`

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const GroupOrderReviewOwner = () => {
  const [showGuestItems, setShowGuestItems] = useState(true)
  const [guestCart, setGuestCart] = useState([])
  const [guestCartLookup, setGuestCartLookup] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const menuSlug = useSelector(selectMenuSlug)
  const order = useSelector(selectOrder)
  const { entities: menuItems } = useSelector(selectMenuItems)
  const groupOrder = useSelector(selectGroupOrder)
  const {
    cartId,
    token,
    cart: groupCart,
    guestLimit,
    guestCount,
    cartGuests,
    cartOwner,
    revenueCenterId,
    serviceType,
  } = groupOrder
  const prevGroupCart = usePrevious(groupCart)

  useEffect(() => {
    dispatch(fetchMenuItems({ revenueCenterId, serviceType }))
    dispatch(updateCustomerGroupOrder(cartId))
  }, [dispatch, cartId, order.requestedAt, revenueCenterId, serviceType])

  useEffect(() => {
    const update = setInterval(
      () => dispatch(updateCustomerGroupOrder(cartId)),
      15000
    )
    return () => clearInterval(update)
  }, [dispatch, cartId])

  useEffect(() => {
    if (!isEqual(groupCart, prevGroupCart)) {
      const items = groupCart.filter((i) => !i.customer_id)
      const { cart } = rehydrateCart(menuItems, items)
      setGuestCart(cart)
      const cartLookup = cart.reduce((obj, i) => {
        const items = [...(obj[i.cart_guest_id] || []), i]
        return { ...obj, [i.cart_guest_id]: items }
      }, {})
      setGuestCartLookup(cartLookup)
      if (prevGroupCart) dispatch(showNotification('New order added!'))
    }
  }, [dispatch, groupCart, prevGroupCart, menuItems])

  const handleCheckout = () => {
    const combinedCart = combineCarts(
      order.cart,
      guestCart,
      cartOwner,
      cartGuests
    )
    dispatch(setCart(combinedCart))
    dispatch(closeGroupOrder(cartId, true))
    dispatch(checkout())
    navigate('/checkout')
  }

  const save = () => {
    dispatch(resetGroupOrder())
  }

  const cancel = () => {
    dispatch(removeCustomerGroupOrder(cartId))
  }

  const refresh = () => {
    dispatch(updateCustomerGroupOrder(cartId))
    dispatch(showNotification('Guest items refreshed'))
  }

  const toggleGuestItems = () => {
    setShowGuestItems(!showGuestItems)
  }

  return (
    <>
      <Content>
        <MenuHeader backPath={menuSlug} />
        <Main>
          <PageContainer>
            <PageTitle
              title="Review your group order"
              subtitle="Use this page to review the orders that have been submitted before checking out."
            />
            <PageContent>
              <Heading as="p" size="big">
                This group order will remain open for editing until you to
                proceed to the checkout page.
              </Heading>
              <p>
                Orders will be appear below as they're added by your friends.{' '}
                {guestCount} {guestCount > 1 ? 'orders have' : 'order has'} been
                submitted so far
                {guestLimit &&
                  `, and there is a limit of ${guestLimit} orders in total (not including your own)`}
                .
              </p>
              <GroupOrderTime />
              <p>Need to share this group order with orders?</p>
              <GroupOrderLink token={token} instructions={null} />
              <Heading as="p" size="big">
                Ready to submit your order?
              </Heading>
              <p>
                <ButtonStyled onClick={handleCheckout}>
                  Proceed To Checkout
                </ButtonStyled>
              </p>
              <p>
                Change your mind? Save this group order for another day or
                delete it altogether.
              </p>
              <p>
                <ButtonStyled onClick={save} size="small" color="secondary">
                  Save for Later
                </ButtonStyled>{' '}
                <ButtonStyled onClick={cancel} size="small" color="secondary">
                  Delete Forever
                </ButtonStyled>
              </p>
            </PageContent>
            <GroupOrderCartView>
              <GroupOrderCartSection>
                <GroupOrderCartSectionHeader>
                  <GroupOrderCartTitle as="p">Your Items</GroupOrderCartTitle>
                  <GroupOrderCartSubtitle as="p">
                    <Link to={menuSlug}>
                      Click here to get back to the menu if you need to make any
                      changes to your own order.
                    </Link>
                  </GroupOrderCartSubtitle>
                </GroupOrderCartSectionHeader>
                {order.cart.length > 0 ? (
                  <ul>
                    {order.cart.map((item, index) => {
                      return (
                        <li key={`${item.id}-${index}`}>
                          <CartSummaryItem item={item} />
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <p style={{ margin: '1em 0 0' }}>
                    You haven't added any items for yourself yet.
                  </p>
                )}
              </GroupOrderCartSection>
              <GroupOrderCartSection>
                <GroupOrderCartSectionHeader>
                  <GroupOrderCartTitle as="p">
                    Items added by your guests
                  </GroupOrderCartTitle>
                  <GroupOrderCartSubtitle as="p">
                    <ButtonLink onClick={refresh}>
                      Click here to refresh
                    </ButtonLink>
                    <LinkSeparator />
                    <ButtonLink onClick={toggleGuestItems}>
                      {showGuestItems
                        ? 'show guest names only'
                        : 'show guest names & items'}
                    </ButtonLink>
                  </GroupOrderCartSubtitle>
                </GroupOrderCartSectionHeader>
                {!isEmpty(guestCartLookup) ? (
                  showGuestItems ? (
                    cartGuests.map((guest) => {
                      const guestItems = guestCartLookup[guest.cart_guest_id]
                      return (
                        guestItems && (
                          <div
                            key={guest.cart_guest_id}
                            style={{ margin: '1.5rem 0 0' }}
                          >
                            <GroupOrderReviewOwnerGuestName as="p">
                              {guest.first_name} {guest.last_name}
                            </GroupOrderReviewOwnerGuestName>
                            <ul>
                              {guestItems.map((item, index) => {
                                return (
                                  <li key={`${item.id}-${index}`}>
                                    <CartSummaryItem item={item} />
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        )
                      )
                    })
                  ) : (
                    <GroupOrderReviewOwnerGuestList>
                      <ul>
                        {cartGuests.map((guest) => (
                          <li key={guest.cart_guest_id}>
                            <Heading size="main">
                              {guest.first_name} {guest.last_name}
                            </Heading>
                          </li>
                        ))}
                      </ul>
                    </GroupOrderReviewOwnerGuestList>
                  )
                ) : (
                  <p>Your guests haven't added any orders yet.</p>
                )}
              </GroupOrderCartSection>
            </GroupOrderCartView>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

GroupOrderReviewOwner.displayName = 'GroupOrderReviewOwner'
export default GroupOrderReviewOwner
