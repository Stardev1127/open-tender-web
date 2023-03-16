import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCustomer,
  sendCustomerVerificationEmail,
} from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'

import { selectBrand } from '../slices'

const VerifyAccountView = styled('div')`
  margin: 0 0 ${(props) => props.theme.layout.padding};
  margin: 2rem 0;

  p {
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  p + p {
    margin: 0.5rem 0 0;
  }

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const VerifyAccount = ({ style }) => {
  const dispatch = useDispatch()
  const { has_deals } = useSelector(selectBrand)
  const { profile } = useSelector(selectCustomer)

  const verifyAccount = () => {
    const linkUrl = `${window.location.origin}/verify`
    dispatch(sendCustomerVerificationEmail(linkUrl))
  }

  if (!has_deals || !profile || profile.is_verified) return null

  return (
    <VerifyAccountView style={style}>
      <p>
        Your account has not yet been verified, which gives you access to
        certain deals and rewards that are made available only to verified
        accounts.{' '}
      </p>
      <p>
        <ButtonLink onClick={verifyAccount}>
          Click here to verify your account.
        </ButtonLink>
      </p>
    </VerifyAccountView>
  )
}

VerifyAccount.displayName = 'VerifyAccount'
VerifyAccount.propTypes = {
  style: propTypes.object,
}

export default VerifyAccount
