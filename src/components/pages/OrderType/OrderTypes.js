import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import styled from '@emotion/styled'
import {
  resetRevenueCenters,
  resetOrderType,
  selectGroupOrder,
  resetGroupOrder,
  setOrderServiceType,
  resetCheckout,
} from '@open-tender/redux'
import { Message } from '@open-tender/components'
import {
  openModal,
  selectContent,
  selectSettings,
  setIsGroupOrder,
} from '../../../slices'
import {
  Coffee,
  DollarSign,
  Flag,
  Gift,
  ShoppingBag,
  ShoppingCart,
  Truck,
  UserPlus,
  Users,
} from '../../icons'
import { NavButtons } from '../..'
import OrderTypeLinks from './OrderTypeLinks'

const OrderTypesView = styled.div`

  & > div:first-of-type button {
    ${(props) =>
      !props.showDesc ? `height: ${props.isMobile ? '5.6rem' : '6rem'};` : ``}

`

const OrderTypes = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { orderType: orderTypeContent, home: homeContent } =
    useSelector(selectContent)
  const contentTypes =
    orderTypeContent.orderTypes || homeContent.orderTypes || []
  const { orderTypes } = useSelector(selectSettings)
  const hasOrderTypes = orderTypes && orderTypes.length > 0
  const { cartGuest } = useSelector(selectGroupOrder)
  const { cartGuestId } = cartGuest || {}
  const { showDescriptions, showDescriptionsMobile } = orderTypeContent
  const showDesc = isMobile ? showDescriptionsMobile : showDescriptions
  // const asLinks = ['GIFT_CARDS', 'DONATIONS']
  const asLinks = []
  const orderButtons = orderTypes.filter((i) => !asLinks.includes(i))
  const orderLinks = orderTypes.filter((i) => asLinks.includes(i))

  useEffect(() => {
    dispatch(resetRevenueCenters())
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    dispatch(setIsGroupOrder(false))
  }, [dispatch])

  useEffect(() => {
    if (cartGuestId) dispatch(resetGroupOrder())
  }, [dispatch, cartGuestId])

  const handleOutpost = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP', true))
    navigate('/locations')
  }

  const handleWalkin = () => {
    dispatch(setOrderServiceType('OLO', 'WALKIN'))
    navigate('/locations')
  }

  const handlePickup = () => {
    dispatch(setOrderServiceType('OLO', 'PICKUP'))
    navigate('/locations')
  }

  const handleDelivery = () => {
    dispatch(setOrderServiceType('OLO', 'DELIVERY'))
    navigate('/locations')
  }

  const handleGroupOrder = () => {
    dispatch(openModal({ type: 'groupOrderType' }))
  }

  const handleCatering = () => {
    dispatch(setOrderServiceType('CATERING', 'DELIVERY'))
    navigate('/catering-address')
  }

  const handleMerch = () => {
    dispatch(setOrderServiceType('MERCH', 'DELIVERY'))
    navigate('/locations')
  }

  const handleGiftCards = () => {
    navigate('/gift-cards')
  }

  const handleDonations = () => {
    navigate('/donations')
  }

  const handlers = {
    OUTPOST: handleOutpost,
    WALKIN: handleWalkin,
    PICKUP: handlePickup,
    DELIVERY: handleDelivery,
    GROUP: handleGroupOrder,
    CATERING: handleCatering,
    MERCH: handleMerch,
    GIFT_CARDS: handleGiftCards,
    DONATIONS: handleDonations,
  }

  const iconProps = { size: 18 }

  const icons = {
    OUTPOST: <Flag {...iconProps} />,
    WALKIN: <Coffee {...iconProps} />,
    PICKUP: <ShoppingBag {...iconProps} />,
    DELIVERY: <Truck {...iconProps} />,
    GROUP: <UserPlus {...iconProps} />,
    CATERING: <Users {...iconProps} />,
    MERCH: <ShoppingCart {...iconProps} />,
    GIFT_CARDS: <Gift {...iconProps} />,
    DONATIONS: <DollarSign {...iconProps} />,
  }

  const buttons = orderButtons
    .map((orderType) => ({
      ...contentTypes[orderType],
      icon: icons[orderType],
      onClick: handlers[orderType],
    }))
    .map((orderType) => ({
      ...orderType,
      subtitle: showDesc ? orderType.subtitle : null,
    }))

  return (
    <div>
      {hasOrderTypes ? (
        <OrderTypesView showDesc={showDesc} isMobile={isMobile}>
          <NavButtons buttons={buttons} />
          <OrderTypeLinks
            orderLinks={orderLinks}
            contentTypes={contentTypes}
            icons={icons}
            handlers={handlers}
          />
        </OrderTypesView>
      ) : (
        <Message color="error">
          This brand is not currently accepting online orders.
        </Message>
      )}
    </div>
  )
}

OrderTypes.displayName = 'OrderTypes'

export default OrderTypes
