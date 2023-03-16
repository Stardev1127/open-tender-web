import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { makeRevenueCenterMsg } from '@open-tender/js'
import {
  selectOrder,
  selectGroupOrder,
  selectAutoSelect,
  setAddress,
  setOrderServiceType,
  setRequestedAt,
  setRevenueCenter,
} from '@open-tender/redux'
import { ButtonStyled, Message, Text } from '@open-tender/components'
import { selectConfig, openModal, selectIsGroupOrder } from '../../slices'
import RevenueCenterButtons from './RevenueCenterButtons'

const RevenueCenterOrderView = styled('div')`
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 1rem 0 0;
  }

  button {
    margin: 0 1rem 1rem 0;
    &:last-child {
      margin: 0;
    }
  }
`

const RevenueCenterOrderMessage = styled('div')`
  line-height: ${(props) => props.theme.fonts.body.lineHeight};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }

  p span {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const RevenueCenterOrderMessageMessage = styled('p')`
  span {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: inline-block;
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const RevenueCenterOrderButtons = styled('div')`
  margin-top: 1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: 1.5rem;
  }

  button {
    margin-bottom: 0;
  }
`

const RevenueCenterChange = ({ autoSelect }) => {
  const navigate = useNavigate()
  if (autoSelect) return null

  return (
    <RevenueCenterOrderButtons>
      <ButtonStyled onClick={() => navigate(`/locations`)} size="small">
        Change Location
      </ButtonStyled>
    </RevenueCenterOrderButtons>
  )
}

const RevenueCenterChoose = ({ revenueCenter, serviceType, orderType }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    slug,
    revenue_center_type: rcType,
    is_outpost: isOutpost,
    address,
    first_times,
    order_times,
    status,
  } = revenueCenter
  const menuSlug = `/menu/${slug}`
  const firstTimes = first_times ? first_times[serviceType] : null
  const orderTimes = order_times ? order_times[serviceType] : null
  const { cartId } = useSelector(selectGroupOrder)
  const isGroupOrder = useSelector(selectIsGroupOrder)

  if (!firstTimes && !orderTimes) return null

  if (status !== 'OPEN') return null

  const hasAsap = firstTimes && firstTimes.has_asap
  const isCatering = rcType === 'CATERING'

  const orderAsap = () => {
    if (!hasAsap) return
    dispatch(setRequestedAt('asap'))
    dispatch(setRevenueCenter(revenueCenter))
    dispatch(setOrderServiceType(rcType, serviceType, isOutpost))
    if (isOutpost) dispatch(setAddress(address))
    navigate(menuSlug)
  }

  const orderLater = () => {
    const args = {
      focusFirst: true,
      skipClose: true,
      isGroupOrder: isGroupOrder || cartId ? true : false,
      style: orderTimes ? { alignItems: 'flex-start' } : {},
      revenueCenter,
      serviceType,
      orderType,
    }
    dispatch(openModal({ type: 'requestedAt', args }))
  }

  return (
    <RevenueCenterOrderButtons>
      {!isCatering && firstTimes && (
        <ButtonStyled onClick={orderAsap} disabled={!hasAsap} size="small">
          Order Now
        </ButtonStyled>
      )}
      <ButtonStyled
        onClick={orderLater}
        size="small"
        color={isCatering || !firstTimes ? 'primary' : 'secondary'}
      >
        {isCatering ? 'Order from Here' : 'Order for Later'}
      </ButtonStyled>
    </RevenueCenterOrderButtons>
  )
}

export const RevenueCenterOrder = ({ revenueCenter, isMenu, isLanding }) => {
  const { orderType, serviceType, requestedAt } = useSelector(selectOrder)
  const { cartId } = useSelector(selectGroupOrder)
  const hasGroupOrdering = revenueCenter && revenueCenter.group_ordering
  const autoSelect = useSelector(selectAutoSelect)
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { statusMessages } = rcConfig || {}
  const msg = makeRevenueCenterMsg(
    revenueCenter,
    serviceType,
    requestedAt,
    statusMessages
  )
  const showMsg = msg.message && !isMenu ? true : false

  return (
    <RevenueCenterOrderView>
      {cartId && !hasGroupOrdering ? (
        <RevenueCenterOrderMessage>
          <RevenueCenterOrderMessageMessage>
            <Message color="alert" size="small">
              This location does not offer group ordering.
            </Message>
          </RevenueCenterOrderMessageMessage>
        </RevenueCenterOrderMessage>
      ) : (
        <>
          {showMsg && (
            <RevenueCenterOrderMessage>
              <p>
                <Text
                  color="alert"
                  size="small"
                  style={{ borderRadius: '0.3rem' }}
                >
                  {msg.message}
                </Text>
              </p>
            </RevenueCenterOrderMessage>
          )}
          {isMenu ? (
            <RevenueCenterChange autoSelect={autoSelect} />
          ) : isLanding ? (
            <RevenueCenterOrderButtons>
              <RevenueCenterButtons revenueCenter={revenueCenter} />
            </RevenueCenterOrderButtons>
          ) : (
            <RevenueCenterChoose
              revenueCenter={revenueCenter}
              serviceType={serviceType}
              orderType={orderType}
            />
          )}
        </>
      )}
    </RevenueCenterOrderView>
  )
}

RevenueCenterOrder.displayName = 'RevenueCenterOrder'
RevenueCenterOrder.propTypes = {
  revenueCenter: propTypes.object,
  isMenu: propTypes.bool,
  isOrder: propTypes.bool,
}

export default RevenueCenterOrder
