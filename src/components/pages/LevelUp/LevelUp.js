import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  selectCustomer,
  selectLevelUp,
  fetchLevelUpCustomer,
  resetLevelUpCustomer,
} from '@open-tender/redux'
import { isObject } from '@open-tender/js'
import { Message } from '@open-tender/components'

import { selectBrand, setGeoLatLng } from '../../../slices'
import {
  Content,
  HeaderDefault,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
} from '../..'

const LevelUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { loading, error } = useSelector(selectLevelUp)
  const isLoading = loading === 'pending'
  const errMsg = error
    ? isObject(error)
      ? error.detail || error.message
      : error
    : null
  let { token } = useParams()
  const query = new URLSearchParams(useLocation().search)
  token = token || query.get('user_token')
  const lat = query.get('latitude')
  const lng = query.get('longitude')
  const title = errMsg ? 'Something went wrong' : 'Retrieving your account'
  const subtitle = errMsg
    ? 'Please review the error below and retry your request or contact request'
    : 'Please hang tight. This will only take a second.'

  useEffect(() => {
    if (auth) {
      navigate('/account')
    } else if (token) {
      if (lat && lng) {
        const geoLatLng = { lat: parseFloat(lat), lng: parseFloat(lng) }
        dispatch(setGeoLatLng(geoLatLng))
      }
      dispatch(fetchLevelUpCustomer(token))
    } else {
      navigate('/guest')
    }
    return () => dispatch(resetLevelUpCustomer())
  }, [auth, token, lat, lng, navigate, dispatch])

  return (
    <>
      <Helmet>
        <title>LevelUp | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle title={title} subtitle={subtitle} />
            <PageContent>
              {isLoading ? (
                <Loading text="Contacting LevelUp..." />
              ) : errMsg ? (
                <Message color="error" style={{ width: '100%' }}>
                  {errMsg}
                </Message>
              ) : null}
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

LevelUp.displayName = 'LevelUp'
export default LevelUp
