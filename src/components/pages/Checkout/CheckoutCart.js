import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import {
  resetTip,
  selectCheckout,
  selectOrder,
  updateForm,
  validateOrder,
} from '@open-tender/redux'
import { formatQuantity } from '@open-tender/js'
import {
  ButtonLink,
  CartSummary,
  CheckSummary,
  Heading,
  Text,
} from '@open-tender/components'
import { toggleSidebar, selectSidebar } from '../../../slices'
import { Loading } from '../..'
import { Star } from '../../icons'

const CheckoutCartView = styled.div`
  padding: 0 0 ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0;
  }
`

const CheckoutCartHeader = styled.div`
  height: ${(props) => props.theme.layout.navHeight};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: ${(props) =>
      props.hasPoints ? props.theme.layout.navHeight : '3rem'};
  }

  p:first-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  p:last-of-type {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const CheckoutCartEdit = styled.div`
  width: 100%;
  padding: ${(props) => props.theme.layout.padding} 0;
  display: flex;
  justify-content: center;
  align-items: baseline;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    display: none;
  }

  span {
    display: block;
    padding: 0 1rem;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    color: ${(props) => props.theme.colors.tertiary};
  }

  button {
    display: block;
    text-decoration: none;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    color: ${(props) => props.theme.links.dark.color};
    padding: 0 0 0.2rem;
    border-bottom: 0.1rem solid ${(props) => props.theme.colors.primary};

    &:hover,
    &:active {
      color: ${(props) => props.theme.links.dark.hover};
      border-color: ${(props) => props.theme.links.dark.hover};
    }
  }
`

const CheckoutCart = () => {
  const dispatch = useDispatch()
  const [hasOpened, setHasOpened] = useState(false)
  const { cart } = useSelector(selectOrder)
  const [cartLength, setCartLength] = useState(cart.length)
  const { isOpen } = useSelector(selectSidebar)
  const { check, form, loading, submitting } = useSelector(selectCheckout)
  const { points } = check?.config || {}
  const { cart: items = [] } = check || {}
  const itemsPoints = items.length
    ? items.reduce((obj, i, index) => {
        if (!i.points) return obj
        return { ...obj, [index]: { index, ...i.points } }
      }, {})
    : {}
  const cartWithPoints = cart.map((i, index) => ({
    ...i,
    index,
    points: points ? itemsPoints[index.toString()] : null,
  }))
  const pointsApplied = useMemo(
    () => (form.points ? form.points.reduce((t, i) => (t += i.points), 0) : 0),
    [form.points]
  )
  const cartDiff = cart.length - cartLength
  const pointsName = points ? points.name.toLowerCase() : null

  const editCart = () => {
    dispatch(toggleSidebar())
  }

  const applyPoints = (item) => {
    const currentItem = form.points.find((i) => i.index === item.index)
    const currentPoints = currentItem ? currentItem.points : 0
    if (currentPoints >= item.points.total) return
    const updatedItem = {
      index: item.index,
      points: currentPoints + item.points.per,
    }
    const otherItems = form.points.filter((i) => i.index !== item.index)
    const updatedPoints = [...otherItems, updatedItem]
    dispatch(updateForm({ points: updatedPoints }))
  }

  const removePoints = (item) => {
    const currentItem = form.points.find((i) => i.index === item.index)
    const currentPoints = currentItem ? currentItem.points : 0
    if (currentPoints === 0) return
    const updatedItem = {
      index: item.index,
      points: currentPoints - item.points.per,
    }
    const otherItems = form.points.filter((i) => i.index !== item.index)
    const updatedPoints =
      updatedItem.points > 0 ? [...otherItems, updatedItem] : otherItems
    dispatch(updateForm({ points: updatedPoints }))
  }

  const pointsObj = points
    ? {
        points,
        applied: form.points || [],
        apply: applyPoints,
        remove: removePoints,
        icon: <Star strokeWidth={2} />,
      }
    : null

  useEffect(() => {
    if (!isOpen) {
      if (hasOpened) {
        dispatch(resetTip())
        dispatch(validateOrder())
      }
    } else {
      setHasOpened(true)
    }
  }, [dispatch, isOpen, hasOpened])

  useEffect(() => {
    dispatch(validateOrder())
  }, [dispatch, pointsApplied])

  useEffect(() => {
    if (cartDiff < 0) {
      setCartLength(cart.length)
      dispatch(updateForm({ points: [] }))
      dispatch(resetTip())
      dispatch(validateOrder())
    }
  }, [dispatch, cartDiff, cart.length])

  return (
    <CheckoutCartView>
      <CheckoutCartHeader hasPoints={points ? true : false}>
        {points && (
          <div>
            <Heading as="p">
              You've got {formatQuantity(points.balance)} {pointsName}!
            </Heading>
            {points.remaining < points.balance ? (
              <Text as="p" color="alert">
                {formatQuantity(pointsApplied)} {pointsName} applied.{' '}
                {formatQuantity(points.remaining)} remaining. See discount
                below.
              </Text>
            ) : (
              <p>Click the buttons below to apply.</p>
            )}
          </div>
        )}
      </CheckoutCartHeader>
      <CartSummary cart={cartWithPoints} pointsObj={pointsObj} />
      {check && (
        <CheckSummary
          check={check}
          tenders={form.tenders}
          updating={loading === 'pending' && !submitting}
          loader={<Loading />}
          showTenders={!isMobile}
        />
      )}
      <CheckoutCartEdit>
        <ButtonLink onClick={editCart}>Edit Cart</ButtonLink>
        {/* <span>or</span>
        <ButtonLink onClick={editCart}>Back to Menu</ButtonLink> */}
      </CheckoutCartEdit>
    </CheckoutCartView>
  )
}

CheckoutCart.displayName = 'CheckoutCart'
export default CheckoutCart
