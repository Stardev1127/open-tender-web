import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
  authCustomerThanx,
  selectCanOrder,
  selectCartQuantity,
  selectCartTotal,
  selectCustomer,
  selectMenuSlug,
  selectOrderLimits,
} from '@open-tender/redux'
import { isObject } from '@open-tender/js'
import { Message } from '@open-tender/components'

import { selectBrand } from '../../../slices'
import {
  Content,
  HeaderDefault,
  Main,
  PageTitle,
  PageContainer,
  PageContent,
  Loading,
} from '../..'

const Thanx = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth, loading, error } = useSelector(selectCustomer)
  const menuSlug = useSelector(selectMenuSlug)
  const cartCount = useSelector(selectCartQuantity)
  const cartTotal = useSelector(selectCartTotal)
  const { orderMinimum, orderMaximum } = useSelector(selectOrderLimits)
  const canOrder = useSelector(selectCanOrder)
  const belowMinimum = orderMinimum && cartTotal < orderMinimum
  const aboveMaximum = orderMaximum && cartTotal > orderMaximum
  const canCheckout =
    canOrder && cartCount !== 0 && !belowMinimum && !aboveMaximum
  const canMenu = canOrder && cartCount !== 0 && menuSlug
  const redirect = canCheckout ? '/checkout' : canMenu ? menuSlug : '/account'
  const isLoading = loading === 'pending'
  const errMsg = error
    ? isObject(error)
      ? error.detail || error.message
      : error
    : null
  const title = errMsg ? 'Something went wrong' : 'Retrieving your account'
  const subtitle = errMsg
    ? 'Please review the error below and retry your request or contact support'
    : 'Please hang tight. This will only take a second.'
  const query = new URLSearchParams(useLocation().search)
  const code = query.get('code')

  useEffect(() => {
    if (auth) {
      navigate(redirect)
    } else if (code) {
      dispatch(authCustomerThanx(code))
    } else {
      navigate('/account')
    }
  }, [auth, code, redirect, navigate, dispatch])

  return (
    <>
      <Helmet>
        <title>Thanx | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle title={title} subtitle={subtitle} />
            <PageContent>
              {isLoading ? (
                <Loading text="Contacting Thanx..." />
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

Thanx.displayName = 'Thanx'
export default Thanx
