import React from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import { ButtonStyled } from '@open-tender/components'
import { openModal, selectBrand, toggleNavSite } from '../../slices'
import { LogOut, UserCircle } from '../icons'
import NavSiteClose from './NavSiteClose'

const navSiteButtons = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Menu',
    path: '/menu',
  },
  {
    title: 'Locations',
    path: '/restaurants',
  },
  {
    title: 'Catering',
    path: '/catering',
  },
  {
    title: 'Careers',
    path: '/careers',
  },
  {
    title: 'About',
    path: '/about',
  },
]

const NavSiteView = styled.nav`
  position: fixed;
  z-index: 101;
  top: 0;
  bottom: 0;
  right: 0;
  width: 28rem;
  max-width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: ${(props) => props.theme.bgColors.primary};
`

const NavSiteContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // padding-top: ${(props) => props.theme.layout.navHeightMobile};
`

const NaveSiteLogo = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.theme.layout.navHeightMobile};
  padding: 0 0 0 3rem;
  display: flex;
  align-items: center;

  button {
    display: block;
  }

  img {
    display: block;
    max-width: 13rem;
    pointer-events: none;
  }
`

const NavSiteLinks = styled.nav`
  width: 100%;
`

const NavSiteLink = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  line-height: 0;
  width: 100%;
  padding: 2rem 1rem 2rem 3rem;
  color: ${(props) => props.theme.links.dark.color};

  &:hover {
    color: ${(props) => props.theme.links.dark.hover};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.links.dark.color};
    }
  }
`

const NavSiteLinkTitle = styled.span`
  display: block;
  flex-grow: 1;
  font-size: ${(props) => props.theme.fonts.sizes.main};
`

const NavSiteButton = styled.div`
  padding: 0 0 1rem 3rem;

  button {
    padding: 0.75em 1.25em;
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const NavSiteFooter = styled.div`
  width: 100%;
  padding: 3rem 0 0;
`

const NavSiteItem = styled.button`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  line-height: 0;
  padding: 1.25rem 1rem 1.25rem 3rem;
  color: ${(props) => props.theme.links.dark.color};

  &:hover {
    color: ${(props) => props.theme.links.dark.hover};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.links.dark.color};
    }
  }
`

const NavSiteIcon = styled.span`
  display: block;
  line-height: 0;
  position: relative;
  width: 1.8rem;
  height: 1.8rem;
  margin: 0 1.5rem 0 0;
  line-height: 0;
`

const NavSiteTitle = styled.span`
  display: block;
  flex-grow: 1;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const NavSiteContent = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { logo, title } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)

  const closeGo = (evt, path) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNavSite())
    navigate(path)
  }

  const orderNow = (path) => {
    dispatch(toggleNavSite())
    navigate(path)
  }

  const login = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNavSite())
    dispatch(openModal({ type: 'login' }))
  }

  const logout = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNavSite())
    dispatch(logoutCustomer())
  }

  return (
    <NavSiteView ref={ref}>
      <NavSiteContainer>
        <NavSiteClose />
        <NaveSiteLogo>
          <button onClick={(evt) => closeGo(evt, '/')}>
            <img src={logo} alt={title} />
          </button>
        </NaveSiteLogo>
        <NavSiteLinks>
          {navSiteButtons.map((i) => (
            <NavSiteLink key={i.path} onClick={(evt) => closeGo(evt, i.path)}>
              <NavSiteLinkTitle>{i.title}</NavSiteLinkTitle>
            </NavSiteLink>
          ))}
        </NavSiteLinks>
        <NavSiteFooter>
          <NavSiteButton>
            <ButtonStyled
              size="small"
              onClick={() => orderNow(auth ? '/account' : '/guest')}
            >
              Order Now
            </ButtonStyled>
          </NavSiteButton>
          {auth ? (
            <>
              <NavSiteItem onClick={(evt) => closeGo(evt, '/account')}>
                <NavSiteIcon>
                  <UserCircle />
                </NavSiteIcon>
                <NavSiteTitle>Account</NavSiteTitle>
              </NavSiteItem>
              <NavSiteItem onClick={logout}>
                <NavSiteIcon>
                  <LogOut />
                </NavSiteIcon>
                <NavSiteTitle>Sign Out</NavSiteTitle>
              </NavSiteItem>
            </>
          ) : (
            <NavSiteItem onClick={login}>
              <NavSiteIcon>
                <UserCircle />
              </NavSiteIcon>
              <NavSiteTitle>Sign In</NavSiteTitle>
            </NavSiteItem>
          )}
        </NavSiteFooter>
      </NavSiteContainer>
    </NavSiteView>
  )
})

NavSiteContent.displayName = 'NavSiteContent'

export default NavSiteContent
