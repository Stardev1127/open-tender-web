import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { animateScroll as scroll } from 'react-scroll'
import ClipLoader from 'react-spinners/ClipLoader'
import {
  selectOrder,
  setOrderServiceType,
  selectRevenueCenters,
} from '@open-tender/redux'
import { makeOrderTypeFromParam } from '@open-tender/js'
import { GoogleMap, GoogleMapsMarker } from '@open-tender/components'

import {
  selectBrand,
  selectSettings,
  selectGeoLatLng,
  // selectHeaderHeight,
} from '../../../slices'
import {
  Content,
  Header,
  Main,
  MapsAutocomplete,
  ScreenreaderTitle,
} from '../..'
import RevenueCentersSelect from './RevenueCentersSelect'
import { Back, Cart, NavMenu } from '../../buttons'

const RevenueCenters = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeMarker, setActiveMarker] = useState(null)
  const { title: siteTitle } = useSelector(selectBrand)
  // const headerHeight = useSelector(selectHeaderHeight)
  // const offset = headerHeight + 20
  const { orderType, serviceType, address } = useSelector(selectOrder)
  const { googleMaps } = useSelector(selectSettings)
  const { apiKey, defaultCenter, zoom, styles, icons } = googleMaps
  const geoLatLng = useSelector(selectGeoLatLng)
  const initialCenter = address
    ? { lat: address.lat, lng: address.lng }
    : geoLatLng || defaultCenter
  const [center, setCenter] = useState(initialCenter)
  const { revenueCenters } = useSelector(selectRevenueCenters)
  const hasTypes = orderType && serviceType
  const query = new URLSearchParams(useLocation().search)
  const param = query.get('type')
  const missingAddress = serviceType === 'DELIVERY' && !address
  const backPath =
    orderType === 'CATERING' ? '/catering-address' : '/order-type'

  useEffect(() => {
    let paramOrderType = null
    if (param) {
      const [orderType, serviceType, isOutpost] = makeOrderTypeFromParam(param)
      if (paramOrderType) {
        dispatch(setOrderServiceType(orderType, serviceType, isOutpost))
        if (paramOrderType[0] === 'CATERING') navigate('/catering-address')
      }
    }
    if (!hasTypes && !paramOrderType) navigate('/account')
  }, [hasTypes, param, dispatch, navigate])

  const setActive = useCallback(
    (revenueCenter) => {
      if (revenueCenter) {
        const { revenue_center_id, address, slug } = revenueCenter
        setActiveMarker(revenue_center_id)
        setCenter({ lat: address.lat, lng: address.lng })
        const element = document.getElementById(slug)
        if (element) {
          const position = element.offsetTop
          scroll.scrollTo(position, {
            duration: 500,
            smooth: true,
            offset: 0,
          })
        }
      } else {
        setActiveMarker(null)
        const newCenter = address
          ? { lat: address.lat, lng: address.lng }
          : geoLatLng || defaultCenter
        setCenter(newCenter)
      }
    },
    [address, defaultCenter, geoLatLng]
  )

  return (
    <>
      <Helmet>
        <title>Locations | {siteTitle}</title>
      </Helmet>
      <Content maxWidth="76.8rem">
        <Header
          maxWidth="76.8rem"
          style={{ boxShadow: 'none' }}
          left={<Back path={backPath} />}
          right={
            <>
              <Cart />
              <NavMenu />
            </>
          }
        />
        <Main>
          <ScreenreaderTitle>Locations</ScreenreaderTitle>
          {apiKey && (
            <GoogleMap
              apiKey={apiKey}
              zoom={zoom}
              styles={styles}
              center={center}
              loader={<ClipLoader size={30} loading={true} />}
              // events={null}
            >
              <MapsAutocomplete setCenter={setCenter} center={center} />
              <RevenueCentersSelect />
              {revenueCenters.map((i) => {
                const isActive = i.revenue_center_id === activeMarker
                const icon = isActive ? icons.locationSelected : icons.location
                return (
                  <GoogleMapsMarker
                    key={i.revenue_center_id}
                    title={i.name}
                    position={{
                      lat: i.address.lat,
                      lng: i.address.lng,
                    }}
                    icon={icon.url}
                    size={icon.size}
                    anchor={icon.anchor}
                    events={
                      missingAddress ? {} : { onClick: () => setActive(i) }
                    }
                  />
                )
              })}
              {(address || geoLatLng) && (
                <GoogleMapsMarker
                  title="Your Location"
                  position={{
                    lat: center.lat,
                    lng: center.lng,
                  }}
                  icon={icons.user.url}
                  size={icons.user.size}
                  anchor={icons.user.anchor}
                  drop={null}
                />
              )}
            </GoogleMap>
          )}
        </Main>
      </Content>
    </>
  )
}

RevenueCenters.displayName = 'RevenueCenters'
export default RevenueCenters
