import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { selectBrand } from '../slices'

const HeaderLogoLink = styled.a`
  display: block;
  max-width: 14rem;
  margin: 0.4rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 13rem;
  }

  img {
    pointer-events: none;
  }
`

const HeaderLogo = ({ useLight = false }) => {
  const { url, logo, logoLight } = useSelector(selectBrand)
  const logoUrl = useLight ? logoLight : logo

  return (
    <HeaderLogoLink
      isMobile={isMobile}
      href={url || '/'}
      rel="noopener noreferrer"
    >
      <img src={logoUrl} alt="logo" />
    </HeaderLogoLink>
  )
}

HeaderLogo.displayName = 'HeaderLogo'

export default HeaderLogo
