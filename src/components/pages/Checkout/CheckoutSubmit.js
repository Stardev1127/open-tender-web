import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectCheckout, setSubmitting, submitOrder } from '@open-tender/redux'
import { checkAmountRemaining, formatDollars } from '@open-tender/js'
import { ButtonStyled, Message } from '@open-tender/components'
import CheckoutSection from './CheckoutSection'

const CheckoutSubmitButton = styled.div`
  display: flex;
  justify-content: flex-start;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    justify-content: center;
  }
`

const CheckoutSubmitMessage = styled.div`
  margin: 3rem 0 0;

  > div {
    margin: 0 0 3rem;
  }
`

const CheckoutSubmit = () => {
  const dispatch = useDispatch()
  const { check, form, submitting, loading } = useSelector(selectCheckout)
  const updating = submitting ? false : loading === 'pending'
  const { total } = check.totals
  const amountRemaining = checkAmountRemaining(total, form.tenders)
  const isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'
  const submitDisabled = submitting || !isPaid || updating
  const hasTotal = total && parseFloat(total) >= 0 ? true : false
  const totalAmount = hasTotal ? ` ${formatDollars(total)}` : ''

  const submitPayment = () => {
    dispatch(setSubmitting(true))
    dispatch(submitOrder())
  }

  return (
    <CheckoutSection>
      <CheckoutSubmitMessage>
        {!isPaid ? (
          <Message
            as="div"
            size="small"
            color="alert"
            style={{ width: '100%', padding: '1rem 1.5rem' }}
          >
            There is a balance of ${amountRemaining.toFixed(2)} remaining on
            your order. Please add a payment above.
          </Message>
        ) : null}
      </CheckoutSubmitMessage>
      <CheckoutSubmitButton>
        <ButtonStyled
          onClick={submitPayment}
          disabled={submitDisabled}
          size="big"
          color="primary"
        >
          {updating ? 'Updating...' : `Submit Order${totalAmount}`}
        </ButtonStyled>
      </CheckoutSubmitButton>
    </CheckoutSection>
  )
}

CheckoutSubmit.displayName = 'CheckoutSubmit'
CheckoutSubmit.propTypes = {}

export default CheckoutSubmit
