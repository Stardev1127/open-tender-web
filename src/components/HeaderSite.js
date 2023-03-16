import { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { isMobile } from 'react-device-detect'
import { selectCustomer } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { selectBrand } from '../slices'
import { NavSiteMenu, User } from './buttons'
import { Container } from '.'

const HeaderSiteView = styled.div`
  position: fixed;
  z-index: 14;
  top: 0;
  right: 0;
  width: 100%;
  height: 9.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s ease;
  background-color: ${(props) =>
    props.stuck ? props.theme.bgColors.dark : 'transparent'};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const HeaderSiteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const HeaderSiteLogo = styled.div`
  position: relative;
  z-index: 2;
  max-width: 18rem;
  margin: 0.4rem 0 0;
  margin-left: ${(props) => (props.isMobile ? '1.5rem' : '0')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 13rem;
  }

  img {
    pointer-events: none;
  }
`

const HeaderSiteNav = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${(props) => props.theme.colors.light};
`

const HeaderSiteLinks = styled.ul`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  li {
    display: block;
    margin: 0 4rem 0 0;
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.links.light.color};

    &:hover,
    &:active {
      color: ${(props) => props.theme.links.light.hover};
    }
  }
`

const HeaderSiteNavUser = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  transition: ${(props) => props.theme.links.transition};
  margin: 0 -0.5rem 0 0;

  span {
    background-color: transparent;
    border-color: ${(props) => props.theme.bgColors.primary};
  }
`

const HeaderSiteNavButton = styled.div`
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0.5rem 0 0;
  }

  button {
    padding: 0.75em 1.25em;
    font-size: ${(props) => props.theme.fonts.sizes.main};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      // padding: 0.9rem 1.3rem;
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const links = [
  { path: '/menu', title: 'Menu' },
  { path: '/restaurants', title: 'Locations' },
  { path: '/catering', title: 'Catering' },
  { path: '/careers', title: 'Careers' },
  { path: '/about', title: 'About' },
]

const HeaderSite = ({ useLight = true, style = null }) => {
  const navigate = useNavigate()
  const header = useRef(null)
  const [stuck, setStuck] = useState(false)
  const { logo, logoLight, title } = useSelector(selectBrand)
  const logoUrl = useLight || stuck ? logoLight : logo
  const theme = useTheme()
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    const handleScroll = () => {
      if (header.current) {
        setStuck(header.current.getBoundingClientRect().top < -50)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])

  return (
    <nav ref={header} role="navigation" aria-label="Primary Navigation">
      <HeaderSiteView stuck={stuck} isMobile={isMobile} style={style}>
        <Container>
          <HeaderSiteContainer>
            <HeaderSiteLogo>
              <Link to="/">
                <img src={logoUrl} alt={title} />
              </Link>
            </HeaderSiteLogo>
            <HeaderSiteNav useLight={useLight} stuck={stuck}>
              {isMobile ? (
                <>
                  {auth ? (
                    <HeaderSiteNavUser onClick={() => navigate('/guest')}>
                      <User />
                    </HeaderSiteNavUser>
                  ) : (
                    <HeaderSiteNavButton>
                      <ButtonStyled
                        color="light"
                        size="small"
                        onClick={() => navigate('/guest')}
                      >
                        Order Now
                      </ButtonStyled>
                    </HeaderSiteNavButton>
                  )}
                  <NavSiteMenu color={theme.colors.light} />
                </>
              ) : (
                <>
                  <HeaderSiteLinks>
                    {links.map((link) => (
                      <li key={link.path}>
                        <Link to={link.path}>{link.title}</Link>
                      </li>
                    ))}
                  </HeaderSiteLinks>
                  <HeaderSiteNavButton>
                    <ButtonStyled
                      color="light"
                      size="small"
                      onClick={() => navigate('/guest')}
                    >
                      Order Now
                    </ButtonStyled>
                  </HeaderSiteNavButton>
                </>
              )}
            </HeaderSiteNav>
          </HeaderSiteContainer>
        </Container>
      </HeaderSiteView>
    </nav>
  )
}

HeaderSite.displayName = 'HeaderSite'
HeaderSite.propTypes = {
  style: propTypes.object,
}

export default HeaderSite
