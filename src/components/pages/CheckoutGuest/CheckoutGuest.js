import { useSelector } from 'react-redux'
import { selectOrder } from '@open-tender/redux'
import Helmet from 'react-helmet'

import { selectBrand } from '../../../slices'
import { Content, HeaderCheckout, Main, PageContainer } from '../..'
import CheckoutDineInForm from './CheckoutDineInForm'
import CheckoutGuestForm from './CheckoutGuestForm'

const CheckoutGuest = () => {
  const { title: siteTitle } = useSelector(selectBrand)
  const { serviceType } = useSelector(selectOrder)

  return (
    <>
      <Helmet>
        <title>Checkout Guest | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderCheckout />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            {serviceType === 'WALKIN' ? (
              <CheckoutDineInForm />
            ) : (
              <CheckoutGuestForm />
            )}
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CheckoutGuest.displayName = 'CheckoutGuest'
export default CheckoutGuest
