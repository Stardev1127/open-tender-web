import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  selectOrder,
  fetchLocation,
  resetOrderType,
  setOrderServiceType,
} from '@open-tender/redux'
import { BgImage, useGeolocation } from '@open-tender/components'

import {
  selectBrand,
  selectConfig,
  setGeoLatLng,
  setGeoError,
  setGeoLoading,
} from '../../../slices'
import {
  Background,
  Container,
  Content,
  HeaderDefault,
  Loading,
  Main,
  RevenueCenter as RevenueCenterCard,
  ScreenreaderTitle,
} from '../..'
import { isMobileOnly } from 'react-device-detect'

const makeImageUrl = (images, defaultImageUrl) => {
  if (!images) return defaultImageUrl || null
  const largeImage = images
    ? images.find((i) => i.type === 'LARGE_IMAGE')
    : null
  let imageUrl = largeImage ? largeImage.url : null
  return imageUrl || defaultImageUrl || null
}

const RevenueCenterView = styled.div`
  margin: 4rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 2.5rem 0 0;
  }
`

const RevenueCenterHero = styled(BgImage)`
  height: 24rem;
  background-image: url(${(props) => props.imageUrl});
`

const RevenueCenter = () => {
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState(null)
  const { slug } = useParams()
  const { geoLatLng, geoError } = useGeolocation()
  const { title: siteTitle } = useSelector(selectBrand)
  const { revenueCenters: config } = useSelector(selectConfig)
  const order = useSelector(selectOrder)
  const { revenueCenter, loading } = order
  const isLoading = loading === 'pending'
  const title = revenueCenter ? revenueCenter.name : config.title

  useEffect(() => {
    dispatch(setGeoLoading())
    dispatch(resetOrderType())
    dispatch(fetchLocation(slug))
  }, [dispatch, slug])

  useEffect(() => {
    if (geoLatLng) {
      dispatch(setGeoLatLng(geoLatLng))
    } else if (geoError) {
      dispatch(setGeoError(geoError))
    }
  }, [geoLatLng, geoError, dispatch])

  useEffect(() => {
    if (revenueCenter) {
      const { images, service_types, revenue_center_type } = revenueCenter
      setImageUrl(makeImageUrl(images, config.background))
      let serviceType =
        service_types && service_types.length
          ? service_types.includes('PICKUP')
            ? 'PICKUP'
            : 'DELIVERY'
          : null
      if (serviceType) {
        dispatch(setOrderServiceType(revenue_center_type, serviceType))
      }
    }
  }, [revenueCenter, config.background, dispatch])

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Background imageUrl={imageUrl || config.background} />
      <Content maxWidth="76.8rem">
        <HeaderDefault maxWidth="76.8rem" />
        <Main>
          {isMobileOnly && imageUrl && (
            <RevenueCenterHero imageUrl={imageUrl} />
          )}
          <Container>
            <ScreenreaderTitle>{title}</ScreenreaderTitle>
            <RevenueCenterView>
              {isLoading ? (
                <Loading text="Retrieving nearest locations..." />
              ) : revenueCenter ? (
                <RevenueCenterCard
                  revenueCenter={revenueCenter}
                  showImage={isMobileOnly ? false : true}
                  isLanding={true}
                />
              ) : (
                <p>
                  Location not found. Please try a different URL or{' '}
                  <Link to="/account">head back to our home page</Link>.
                </p>
              )}
            </RevenueCenterView>
          </Container>
        </Main>
      </Content>
    </>
  )
}

RevenueCenter.displayName = 'RevenueCenter'
export default RevenueCenter
