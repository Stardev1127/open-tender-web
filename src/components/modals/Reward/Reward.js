import { useState } from 'react'
import propTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCustomer } from '@open-tender/redux'
import {
  ButtonLink,
  ButtonStyled,
  Heading,
  Text,
  Message,
} from '@open-tender/components'

import { closeModal, openModal, selectApi, selectBrand } from '../../../slices'
import { ModalContent, ModalView, QRCode } from '../..'
import RewardImage from './RewardImage'
import { makeLimitations } from '../../Reward'

const RewardView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
  text-align: center;
`

const RewardHeader = styled.div`
  margin: 0 0 1rem;

  & > p {
    margin: 0;
  }

  p:first-of-type {
    font-size: ${(props) => props.theme.fonts.sizes.h3};
    line-height: 1.1;
    margin: 0;
  }

  p + p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    margin: 1rem 0 0;
  }
`

const RewardFinePrint = styled.div`
  & > p {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    // margin: 0 !important;
  }
`

const RewardContent = styled.div`
  label: RewardContent;
  width: 100%;
  margin: 1.5rem 0 1rem;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};

    button {
      margin: 1rem 0 0;
    }
  }
`

const RewardQRCodeView = styled.div`
  width: 16rem;
  margin: 1rem auto;
`

const RewardNote = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0.5rem;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};

  span {
    display: block;
    line-height: 1.4;
  }
`

const errors = {
  default: 'Failed to retrieve QR Code. Please try again or contact support.',
  account: 'Account required. Please login and try again',
  verified:
    'Verfied account required. Please clink the link in the email that was just sent to you, and then try again.',
}

const Reward = ({ reward }) => {
  const dispatch = useDispatch()
  const [qrCodeUrl, setQRCodeUrl] = useState(null)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState(null)
  const { title, description, imageUrl, expiration, service_type } = reward
  const limitations = makeLimitations(reward)
  const api = useSelector(selectApi)
  const { profile } = useSelector(selectCustomer)
  const { has_pos } = useSelector(selectBrand)
  const { customer_id, is_verified } = profile || {}
  const hasQRCode = has_pos && (!service_type || service_type === 'WALKIN')

  const scan = async () => {
    setFetching(true)
    try {
      const { qr_code_url } = await api.getDiscountQRCode(
        reward.discount_id,
        customer_id
      )
      setQRCodeUrl(qr_code_url)
    } catch (err) {
      if (!err.code) {
        setError(errors.default)
      } else if (err.code === 'ACCOUNT_REQUIRED') {
        setError(errors.account)
      } else if (err.code === 'VERIFIED_ACCOUNT_REQUIRED') {
        setError(errors.verified)
      } else {
        setError(err.detail)
      }
    }
    setFetching(false)
  }

  const signUp = () => {
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(openModal({ type: 'signUp' }))
    }, 250)
  }

  return (
    <ModalView style={{ maxWidth: '36rem' }}>
      <ModalContent>
        <RewardView>
          <RewardHeader>
            <Heading as="p">{title}</Heading>
            {description && <p>{description}</p>}
          </RewardHeader>
          <RewardFinePrint>
            {expiration ? (
              <Text color="alert" size="small" as="p">
                Use by {expiration}
              </Text>
            ) : null}
            {reward.per_order === 1 && (
              <Text color="alert" size="small" as="p">
                Cannot be used with any other discounts
              </Text>
            )}
            {reward.auth_type === 'ACCOUNT' && !customer_id && (
              <>
                <Text color="alert" size="small" as="p">
                  Account required to redeem this discount.
                </Text>
                <p>
                  <ButtonLink onClick={signUp}>
                    Click here to sign up.
                  </ButtonLink>
                </p>
              </>
            )}
            {reward.auth_type === 'VERIFIED' && !is_verified && (
              <Text color="alert" size="small" as="p">
                Verified account required to redeem this discount.
              </Text>
            )}
          </RewardFinePrint>
          <RewardContent>
            {qrCodeUrl ? (
              <>
                <p>Scan to redeem in-store</p>
                <RewardQRCodeView>
                  <QRCode src={qrCodeUrl} alt={title} />
                </RewardQRCodeView>
              </>
            ) : imageUrl ? (
              <RewardImage src={imageUrl} alt={title} />
            ) : null}
            <RewardNote>{limitations}</RewardNote>
            {service_type !== 'WALKIN' && (
              <p>
                To redeem online, add the relevant items to your cart and apply
                this reward on the Checkout page
              </p>
            )}
            {hasQRCode && !qrCodeUrl && (
              <>
                {error && (
                  <Message size="small" color="error">
                    {error}
                  </Message>
                )}
                <p>
                  <ButtonStyled
                    color="primary"
                    onClick={scan}
                    disabled={fetching}
                  >
                    {fetching ? 'Retrieving QR Code' : 'Scan In-store'}
                  </ButtonStyled>
                </p>
              </>
            )}
          </RewardContent>
          <div>
            <ButtonStyled
              color="secondary"
              onClick={() => dispatch(closeModal())}
            >
              Close
            </ButtonStyled>
          </div>
        </RewardView>
      </ModalContent>
    </ModalView>
  )
}

Reward.displayName = 'Reward'
Reward.propTypes = {
  reward: propTypes.object,
}

export default Reward
