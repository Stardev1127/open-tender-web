import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { capitalize, serviceTypeNamesMap } from '@open-tender/js'
import {
  addAlert,
  fetchMenu,
  setAddress,
  setOrderServiceType,
  setRequestedAt,
  setRevenueCenter,
} from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'

import { closeModal, toggleSidebar } from '../../../slices'
import { ModalClose, ModalContent } from '../..'
import ModalView from '../../Modal/ModalView'
import RequestedAtDateTime from './RequestedAtDateTime'
import RequestedAtTimes from './RequestedAtTimes'

const RequestedAtModalView = styled(ModalView)`
  width: ${(props) => props.width};

  & > div {
    padding: 3.5rem 3.5rem 4rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      padding: 3rem ${(props) => props.theme.layout.paddingMobile};
    }
  }
`

const RequestedAt = ({
  revenueCenter,
  orderType,
  serviceType,
  requestedAt,
  openSidebar = false,
  isReorder = false,
  isGroupOrder = false,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isLocation = pathname.includes('/locations')
  const isLanding = pathname.includes('/locations/')
  if (!revenueCenter) return null

  const {
    revenue_center_id: revenueCenterId,
    revenue_center_type: rcType,
    is_outpost: isOutpost,
    slug,
    address,
    first_times,
    order_times,
  } = revenueCenter
  const menuSlug = `/menu/${slug}`
  const firstTimes = first_times ? first_times[serviceType] : null
  const orderTimes = order_times ? order_times[serviceType] : null
  const serviceTypeName = serviceTypeNamesMap[serviceType].toLowerCase()

  const chooseTime = (requestedAt) => {
    dispatch(setRequestedAt(requestedAt))
    dispatch(addAlert('Requested time updated!'))
    if (isLocation) {
      dispatch(setRevenueCenter(revenueCenter))
      dispatch(setOrderServiceType(rcType, serviceType, isOutpost))
      if (isOutpost) dispatch(setAddress(address))
      dispatch(closeModal())
      navigate(menuSlug)
    } else {
      dispatch(fetchMenu({ revenueCenterId, serviceType, requestedAt }))
      dispatch(closeModal())
    }
    if (openSidebar) dispatch(toggleSidebar())
  }

  const cancel = () => {
    dispatch(closeModal())
  }

  return (
    <RequestedAtModalView width={firstTimes ? '44rem' : '56rem'}>
      {firstTimes ? (
        <>
          <ModalClose />
          <RequestedAtDateTime
            revenueCenter={revenueCenter}
            serviceType={serviceType}
            orderType={orderType}
            requestedAt={requestedAt}
            chooseTime={chooseTime}
            cancel={cancel}
            isLocation={isLocation}
            isReorder={isReorder}
            isLanding={isLanding}
            isGroupOrder={isGroupOrder}
          />
        </>
      ) : orderTimes ? (
        <ModalContent
          title="Choose an order date & time"
          subtitle={
            <p>
              Please select from the available {serviceTypeName} times below
            </p>
          }
        >
          <RequestedAtTimes
            orderTimes={orderTimes}
            revenueCenter={revenueCenter}
            requestedAt={requestedAt}
            setRequestedAt={chooseTime}
          />
        </ModalContent>
      ) : (
        <ModalContent
          title={`${capitalize(serviceTypeName)} is not available`}
          subtitle={<p>Please choose a different location</p>}
        >
          <ModalClose />
          <ButtonStyled onClick={() => dispatch(closeModal())}>
            Close
          </ButtonStyled>
        </ModalContent>
      )}
    </RequestedAtModalView>
  )
}

RequestedAt.displayName = 'RequestedAt'
RequestedAt.propTypes = {
  revenueCenter: propTypes.object,
  serviceType: propTypes.string,
  orderType: propTypes.string,
  requestedAt: propTypes.string,
  openSidebar: propTypes.bool,
  isReorder: propTypes.bool,
}

export default RequestedAt
