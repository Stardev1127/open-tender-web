import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { DonationForm, FormWrapper } from '@open-tender/components'
import {
  selectDonation,
  resetDonation,
  purchaseDonation,
  selectCustomer,
  fetchCustomerCreditCards,
  selectCustomerCreditCardsForPayment,
  setAlert,
} from '@open-tender/redux'

import { selectBrand, selectConfig, selectRecaptcha } from '../../../slices'
import {
  Content,
  Main,
  PageTitle,
  PageContent,
  HeaderDefault,
  PageContainer,
} from '../..'
import { cardIconsMap } from '../../cardIcons'

const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY

const Donations = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { donations: config } = useSelector(selectConfig)
  const { donations: includeRecaptcha } = useSelector(selectRecaptcha)
  const { title: siteTitle, has_donations } = useSelector(selectBrand)
  const { profile: customer } = useSelector(selectCustomer) || {}
  const creditCards = useSelector(selectCustomerCreditCardsForPayment)
  const { success, loading, error, donation } = useSelector(selectDonation)
  const purchase = useCallback(
    (data, callback) => dispatch(purchaseDonation(data, callback)),
    [dispatch]
  )
  const reset = useCallback(() => dispatch(resetDonation()), [dispatch])
  const showAlert = useCallback((obj) => dispatch(setAlert(obj)), [dispatch])

  useEffect(() => {
    if (!has_donations) return navigate('/account')
  }, [has_donations, navigate])

  useEffect(() => {
    return () => dispatch(resetDonation())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCustomerCreditCards())
  }, [dispatch, customer])

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...config} />
            <FormWrapper>
              <DonationForm
                customer={customer}
                creditCards={creditCards}
                purchase={purchase}
                reset={reset}
                setAlert={showAlert}
                success={success}
                donation={donation}
                loading={loading}
                error={error}
                recaptchaKey={includeRecaptcha ? recaptchaKey : null}
                cardIconMap={cardIconsMap}
              />
            </FormWrapper>
            {success && (
              <PageContent>
                <p>
                  {customer ? (
                    <Link to="/account">Head back to your account page</Link>
                  ) : (
                    <Link to="/account">
                      Head back to the home page to start an order
                    </Link>
                  )}
                </p>
              </PageContent>
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Donations.displayName = 'Donations'
export default Donations
