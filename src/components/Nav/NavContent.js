import React from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomer, logoutCustomer } from '@open-tender/redux'
import { openModal, selectBrand, toggleNav } from '../../slices'
import NavClose from './NavClose'
import {
  Award,
  CreditCard,
  DollarSign,
  Gift,
  Heart,
  Home,
  LogOut,
  Mail,
  MapPin,
  PlusCircle,
  ShoppingBag,
  Slash,
  Sliders,
  Tag,
  User,
  UserCircle,
} from '../icons'

const guestButtons = [
  {
    icon: <Home />,
    title: 'Home',
    path: '/account',
  },
  {
    icon: <Tag />,
    title: 'Deals',
    path: '/deals',
  },
  {
    icon: <Gift />,
    title: 'Gift Cards',
    path: '/gift-cards',
  },
  {
    icon: <DollarSign />,
    title: 'Donations',
    path: '/donations',
  },
  {
    icon: <PlusCircle />,
    title: 'Sign Up',
    path: '/signup',
  },
]

const navButtons = [
  {
    icon: <UserCircle />,
    title: 'Account',
    path: '/account',
  },
  {
    icon: <ShoppingBag />,
    title: 'Order History',
    path: '/orders',
  },
  // {
  //   icon: <Heart />,
  //   title: 'Favorites',
  //   path: '/favorites',
  // },
  {
    icon: <Heart />,
    title: 'Loyalty',
    path: '/loyalty',
  },
  {
    icon: <Award />,
    title: 'Rewards',
    path: '/rewards',
  },
  {
    icon: <Tag />,
    title: 'Deals',
    path: '/deals',
  },
  {
    icon: <User />,
    title: 'Profile',
    path: '/account/profile',
  },
  {
    icon: <Mail />,
    title: 'Communication Preferences',
    path: '/account/communications',
  },
  {
    icon: <Sliders />,
    title: 'Dietary Preferences',
    path: '/account/allergens',
  },
  {
    icon: <CreditCard />,
    title: 'Payment Methods',
    path: '/account/credit-cards',
  },
  {
    icon: <Gift />,
    title: 'Gift Cards',
    path: '/account/gift-cards',
  },
  {
    icon: <MapPin />,
    title: 'Addresses',
    path: '/account/addresses',
  },
  {
    icon: <Home />,
    title: 'House Accounts',
    path: '/account/house-accounts',
  },
  {
    icon: <DollarSign />,
    title: 'Donations',
    path: '/donations',
  },
]

const NavView = styled.nav`
  position: fixed;
  z-index: 102;
  top: 0;
  bottom: 0;
  right: 0;
  width: 28rem;
  max-width: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: ${(props) => props.theme.bgColors.primary};
`

const NavContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const NavItems = styled.nav`
  width: 100%;
  padding: 2rem 0 2rem;
`

const NavItem = styled.button`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  line-height: 0;
  padding: 1rem 1rem 1rem 3rem;
  color: ${(props) => props.theme.links.dark.color};

  &:hover {
    color: ${(props) => props.theme.links.dark.hover};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.links.dark.color};
    }
  }
`

const NavIcon = styled.span`
  display: block;
  line-height: 0;
  position: relative;
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 1.7rem 0 0;
  line-height: 0;
`

const NavTitle = styled.span`
  display: block;
  flex-grow: 1;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  line-height: ${(props) => props.theme.fonts.body.lineHeight};
`

const NavFooter = styled.div`
  width: 100%;
  padding: 0 0 2rem;
`

const Nav = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { auth } = useSelector(selectCustomer)
  const brand = useSelector(selectBrand)
  const {
    has_rewards,
    has_thanx,
    has_levelup,
    has_deals,
    has_loyalty,
    has_gift_cards,
    has_donations,
    has_allergens,
    has_house_accounts,
    has_favorites,
  } = brand
  const hasRewards = has_rewards || has_thanx || has_levelup
  let removed = []
  if (!hasRewards) removed.push('/rewards')
  if (!has_loyalty) removed.push('/loyalty')
  if (!has_deals) removed.push('/deals')
  if (!has_gift_cards) {
    removed.push('/gift-cards')
    removed.push('/account/gift-cards')
  }
  if (!has_donations) removed.push('/donations')
  if (!has_allergens) removed.push('/account/allergens')
  if (!has_house_accounts) removed.push('/account/house-accounts')
  if (!has_favorites) removed.push('/favorites')
  const buttons = auth ? navButtons : guestButtons
  const filteredButtons = buttons.filter((i) => !removed.includes(i.path))

  const closeGo = (evt, path) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    navigate(path)
  }

  const login = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    dispatch(openModal({ type: 'login' }))
  }

  const logout = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    dispatch(toggleNav())
    dispatch(logoutCustomer())
  }

  return (
    <NavView ref={ref}>
      <NavContainer>
        <NavClose />
        <NavItems>
          {filteredButtons.map((i) => (
            <NavItem key={i.path} onClick={(evt) => closeGo(evt, i.path)}>
              <NavIcon>{i.icon}</NavIcon>
              <NavTitle>{i.title}</NavTitle>
            </NavItem>
          ))}
        </NavItems>
        <NavFooter>
          {auth ? (
            <>
              <NavItem onClick={logout}>
                <NavIcon>
                  <LogOut />
                </NavIcon>
                <NavTitle>Sign Out</NavTitle>
              </NavItem>
              <NavItem onClick={(evt) => closeGo(evt, '/account/delete')}>
                <NavIcon>
                  <Slash />
                </NavIcon>
                <NavTitle>Delete Account</NavTitle>
              </NavItem>
            </>
          ) : (
            <NavItem onClick={login}>
              <NavIcon>
                <UserCircle />
              </NavIcon>
              <NavTitle>Sign In</NavTitle>
            </NavItem>
          )}
        </NavFooter>
      </NavContainer>
    </NavView>
  )
})

Nav.displayName = 'Nav'

export default Nav
