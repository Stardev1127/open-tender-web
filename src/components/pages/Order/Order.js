import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCustomer,
  fetchCustomerOrder,
  selectCustomerOrder,
} from '@open-tender/redux'
import { Helmet } from 'react-helmet'
import { selectBrand } from '../../../slices'
import {
  Content,
  HeaderDefault,
  Main,
  Order as OrderSummary,
  PageContainer,
} from '../..'

const Order = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id: orderId } = useParams()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const customerOrder = useSelector(selectCustomerOrder)
  const title = `Order #${orderId}`

  useEffect(() => {
    if (!auth) return navigate('/guest')
  }, [auth, navigate])

  useEffect(() => {
    dispatch(fetchCustomerOrder(orderId))
  }, [dispatch, orderId])

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault path="/orders" />
        <Main>
          <PageContainer>
            <OrderSummary {...customerOrder} />
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Order.displayName = 'Order'
export default Order
