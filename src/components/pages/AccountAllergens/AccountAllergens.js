import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchAllergens,
  selectAllergens,
  selectCustomer,
  selectCustomerAllergens,
  setSelectedAllergens,
  updateCustomerAllergens,
} from '@open-tender/redux'
import { AllergenForm, FormWrapper } from '@open-tender/components'
import { Helmet } from 'react-helmet'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  HeaderUser,
  Loading,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
} from '../..'
import styled from '@emotion/styled'

const AllergenFormView = styled.div`
  max-width: 48rem;
  margin: 0 auto;
`

const AccountAllergens = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { title: siteTitle, has_allergens } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const { allergens: config } = useSelector(selectConfig)
  const brandAllergens = useSelector(selectAllergens)
  const customerAllergens = useSelector(selectCustomerAllergens)
  const isLoading =
    brandAllergens.loading === 'pending' ||
    customerAllergens.loading === 'pending'
  const error = brandAllergens.error || customerAllergens.error
  const setAllergens = useCallback(
    (data) => dispatch(setSelectedAllergens(data)),
    [dispatch]
  )
  const updateAllergens = useCallback(
    (data) => dispatch(updateCustomerAllergens(data)),
    [dispatch]
  )

  useEffect(() => {
    if (!auth || !has_allergens) return navigate('/account')
  }, [auth, has_allergens, navigate])

  useEffect(() => {
    dispatch(fetchAllergens())
  }, [dispatch])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderUser />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...config} />
            <PageContent>
              {brandAllergens.entities.length ? (
                <AllergenFormView>
                  <FormWrapper>
                    <AllergenForm
                      allergens={brandAllergens.entities}
                      selectedAllergens={customerAllergens.entities}
                      isLoading={isLoading}
                      error={error}
                      setAllergens={setAllergens}
                      updateAllergens={updateAllergens}
                    />
                  </FormWrapper>
                </AllergenFormView>
              ) : isLoading ? (
                <Loading text="Retrieving your dietary preferences..." />
              ) : (
                <p>Allergens aren't currently listed on our menu.</p>
              )}
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountAllergens.displayName = 'AccountAllergens'
export default AccountAllergens
