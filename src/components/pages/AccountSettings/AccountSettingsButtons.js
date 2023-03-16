import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectBrand } from '../../../slices'
import {
  CreditCard,
  Gift,
  Home,
  Mail,
  MapPin,
  Sliders,
  User,
} from '../../icons'
import { NavButtons } from '../..'

const AccountButtonsView = styled('div')`
  max-width: 54rem;
  margin: 0 auto;

  button {
    height: 6rem;
  }
`

const navButtons = [
  {
    icon: <User />,
    title: 'Profile',
    path: '/account/profile',
  },
  {
    icon: <Mail />,
    title: 'Communicaton Preferences',
    path: '/account/communications',
  },
  {
    icon: <Sliders />,
    title: 'Dietary Preferences',
    path: '/account/allergens',
  },
  {
    icon: <Gift />,
    title: 'Gift Cards',
    path: '/account/gift-cards',
  },
  {
    icon: <CreditCard />,
    title: 'Payment Methods',
    path: '/account/credit-cards',
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
]

const AccountSettingsButtons = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { has_allergens, has_house_accounts, has_gift_cards } =
    useSelector(selectBrand)
  let removed = []
  if (!has_gift_cards) removed.push('/account/gift-cards')
  if (!has_allergens) removed.push('/account/allergens')
  if (!has_house_accounts) removed.push('/account/house-accounts')
  const filteredButtons = navButtons.filter((i) => !removed.includes(i.path))
  const buttons = filteredButtons.map((i) => ({
    ...i,
    onClick: i.path ? () => navigate(i.path) : () => dispatch(i.func()),
  }))

  return (
    <AccountButtonsView>
      <NavButtons buttons={buttons} />
    </AccountButtonsView>
  )
}

AccountSettingsButtons.displayName = 'AccountSettingsButtons'
export default AccountSettingsButtons
