import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { ButtonStyled } from '@open-tender/components'

const BackgroundCtaView = styled.div`
  margin: 2rem 0 0;

  button {
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }
`

const BackgroundCta = ({ url, urlText, children }) => {
  const navigate = useNavigate()
  const isNavigate = url ? url.includes(window.location.origin) : false
  const linkUrl = isNavigate ? url.replace(window.location.origin, '') : url

  if (!children && (!url || !urlText)) return null

  return (
    <BackgroundCtaView>
      {children ? (
        children
      ) : isNavigate ? (
        <ButtonStyled
          onClick={() => navigate(linkUrl)}
          size="big"
          color="light"
        >
          {urlText}
        </ButtonStyled>
      ) : (
        <form action={url}>
          <ButtonStyled type="submit" size="big" color="light">
            {urlText}
          </ButtonStyled>
        </form>
      )}
    </BackgroundCtaView>
  )
}

BackgroundCta.displayName = 'BackgroundCta'
BackgroundCta.propTypes = {
  url: propTypes.string,
  urlText: propTypes.string,
}

export default BackgroundCta
