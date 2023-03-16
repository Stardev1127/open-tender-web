import { useEffect, useState, useCallback } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import {
  selectOrder,
  setRevenueCenter,
  selectAutoSelect,
  resetOrderType,
  fetchLocations,
  selectRevenueCenters,
  resetCheckout,
} from '@open-tender/redux'
import {
  makeDisplayedRevenueCenters,
  renameLocation,
  serviceTypeNamesMap,
} from '@open-tender/js'
import {
  Body,
  ButtonLink,
  ButtonStyled,
  Heading,
  Preface,
} from '@open-tender/components'
import {
  selectConfig,
  selectSettings,
  selectGeoLatLng,
  selectIsGroupOrder,
} from '../../../slices'
import { Container, Loading, PageContent, RevenueCenter } from '../..'
import { useTheme } from '@emotion/react'

const RevenueCentersSelectView = styled('div')`
  position: relative;
  z-index: 1;
  flex-grow: 1;
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: 1.5rem 0 0;
  margin: ${(props) => props.theme.layout.navHeight} 0 0;

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 3rem 0 0;
    margin: 44rem 0 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
    margin: ${(props) => props.theme.layout.navHeightMobile} 0
      ${(props) => (props.showMap ? '25rem' : '0')};
    transition: all 0.25s ease;
    transform: translateY(${(props) => (props.showMap ? '25rem' : '0')});
  }
`

const RevenueCentersSelectTitle = styled('div')`
  margin: 0 0 4rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 3rem;
  }

  h2 {
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.big};
    }
  }

  & > p {
    margin: 1rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 1rem 0 0;
      // font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const RevenueCentersSelectShowMap = styled('div')`
  display: none;
  width: 100%;
  margin: 0.5rem 0 1rem;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
  }

  button {
    display: inline-block;
    padding: 0.5rem 0;
  }

  span {
    pointer-events: none;
    display: block;
    line-height: 1;
    color: ${(props) => props.theme.links.primary.color};
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const RevenueCentersSelectList = styled('ul')`
  margin: 0 0 ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.marginMobile};
  }

  & > li {
    margin: ${(props) => props.theme.layout.padding} 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      padding: 0 0
        ${(props) => (props.hasBox ? '0' : props.theme.layout.paddingMobile)};
      border-bottom: ${(props) =>
          props.hasBox ? '0' : props.theme.border.width}
        solid ${(props) => props.theme.border.color};
      margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
    }

    &:last-of-type {
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        padding: 0;
        border: 0;
        margin: 0;
      }
    }
  }
`

const RevenueCentersSelect = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showMap, setShowMap] = useState(false)
  const theme = useTheme()
  const hasBox = theme.cards.default.bgColor !== 'transparent'
  const { revenueCenters: rcConfig } = useSelector(selectConfig)
  const { maxDistance, locationName } = useSelector(selectSettings)
  const geoLatLng = useSelector(selectGeoLatLng)
  const { revenueCenters, loading } = useSelector(selectRevenueCenters)
  const { serviceType, orderType, isOutpost, address, requestedAt } =
    useSelector(selectOrder)
  const coords = address || geoLatLng
  const autoSelect = useSelector(selectAutoSelect)
  const isGroupOrder = useSelector(selectIsGroupOrder)
  const [title, setTitle] = useState(rcConfig.title)
  const [msg, setMsg] = useState(rcConfig.subtitle)
  const [error, setError] = useState(null)
  const [displayedRevenueCenters, setDisplayedRevenueCenters] = useState([])
  const isLoading = loading === 'pending'
  const missingAddress = serviceType === 'DELIVERY' && !address
  const hasCount = displayedRevenueCenters && displayedRevenueCenters.length > 0
  const showRevenueCenters = hasCount && !isLoading && !error && !missingAddress
  const names = locationName[isOutpost ? 'OUTPOST' : serviceType]
  const renamedTitle = renameLocation(title, names)
  const renamedError = renameLocation(error, names)
  const renamedMsg = renameLocation(msg, names)
  const groupOrderNA = isGroupOrder && !showRevenueCenters
  const serviceTypeName = serviceTypeNamesMap[serviceType]

  useEffect(() => {
    if (orderType) {
      let params = { type: orderType }
      if (isOutpost) params = { ...params, is_outpost: true }
      if (coords) params = { ...params, lat: coords.lat, lng: coords.lng }
      if (orderType === 'CATERING' && requestedAt) {
        params = { ...params, requestedAt }
      }
      dispatch(fetchLocations(params))
    }
  }, [orderType, isOutpost, coords, requestedAt, dispatch])

  const autoRouteCallack = useCallback(
    (revenueCenter) => {
      dispatch(setRevenueCenter(revenueCenter))
      return navigate(`/menu/${revenueCenter.slug}`)
    },
    [dispatch, navigate]
  )

  useEffect(() => {
    const { title, msg, error, displayed } = makeDisplayedRevenueCenters(
      revenueCenters,
      serviceType,
      address,
      geoLatLng,
      maxDistance,
      isGroupOrder
    )
    const count = displayed ? displayed.length : 0
    if (count && autoSelect && !error && !missingAddress) {
      autoRouteCallack(displayed[0])
    } else {
      setTitle(title)
      setMsg(msg)
      setError(error)
      setDisplayedRevenueCenters(displayed)
    }
  }, [
    revenueCenters,
    serviceType,
    address,
    geoLatLng,
    maxDistance,
    autoSelect,
    autoRouteCallack,
    missingAddress,
    isGroupOrder,
  ])

  const startOver = () => {
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    navigate(`/order-type`)
  }

  return (
    <RevenueCentersSelectView showMap={showMap}>
      <Container>
        {isLoading ? (
          <PageContent>
            <Loading text="Retrieving nearest locations..." />
          </PageContent>
        ) : (
          <>
            <RevenueCentersSelectTitle>
              <RevenueCentersSelectShowMap>
                <ButtonLink onClick={() => setShowMap(!showMap)}>
                  <Preface>{showMap ? 'Hide Map' : 'Show Map'}</Preface>
                </ButtonLink>
              </RevenueCentersSelectShowMap>
              {groupOrderNA ? (
                <>
                  <Heading as="h2">
                    We're sorry but Group Ordering {serviceTypeName} isn't
                    available in your area at this time
                  </Heading>
                  <Body as="p">
                    Please go back and choose a different order type
                  </Body>
                </>
              ) : (
                <>
                  <Heading as="h2">{renamedTitle}</Heading>
                  <Body as="p">{renamedError || renamedMsg}</Body>
                </>
              )}
            </RevenueCentersSelectTitle>
            {showRevenueCenters ? (
              <RevenueCentersSelectList hasBox={hasBox}>
                {displayedRevenueCenters.map((revenueCenter) => (
                  <li
                    id={revenueCenter.slug}
                    key={revenueCenter.revenue_center_id}
                  >
                    <RevenueCenter
                      revenueCenter={revenueCenter}
                      showImage={true}
                    />
                  </li>
                ))}
              </RevenueCentersSelectList>
            ) : (
              <div style={{ margin: '3rem auto 0' }}>
                <ButtonStyled onClick={startOver}>Start Over</ButtonStyled>
              </div>
            )}
          </>
        )}
      </Container>
    </RevenueCentersSelectView>
  )
}

RevenueCentersSelect.displayName = 'RevenueCentersSelect'
RevenueCentersSelect.propTypes = {
  revenueCenters: propTypes.array,
  setCenter: propTypes.func,
  maps: propTypes.object,
  map: propTypes.object,
  sessionToken: propTypes.object,
  autocomplete: propTypes.object,
}
export default RevenueCentersSelect
