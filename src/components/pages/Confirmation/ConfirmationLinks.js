import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonLink } from '@open-tender/components'
import styled from '@emotion/styled'

const ConfirmationLinksView = styled('div')`
  margin: 1.5rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 1.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const ConfirmationLinks = ({ auth, brand }) => {
  const navigate = useNavigate()

  return (
    <ConfirmationLinksView>
      <p>
        {auth ? (
          <ButtonLink onClick={() => navigate('/account')}>
            Head back to your account
          </ButtonLink>
        ) : (
          <a href={brand.url} rel="noopener noreferrer">
            Head back to our website
          </a>
        )}
        <span> or </span>
        <ButtonLink onClick={() => navigate('/account')}>
          start another order
        </ButtonLink>
      </p>
    </ConfirmationLinksView>
  )
}

ConfirmationLinks.displayName = 'ConfirmationLinks'
export default ConfirmationLinks
