import { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { selectGroupOrder, selectOrder } from '@open-tender/redux'
import { serviceTypeNamesMap } from '@open-tender/js'
import { Preface, Heading } from '@open-tender/components'
import {
  Allergens,
  Back,
  Cart,
  GroupOrderIcon,
  LeaveGroupIcon,
  NavMenu,
} from '../../buttons'
import { ChevronDown, ChevronUp } from '../../icons'
import { Header } from '../..'
import MenuMobileMenu from './MenuMobileMenu'
import { openModal, selectDisplaySettings } from '../../../slices'

const MenuHeaderTitleServiceType = styled(Preface)`
  display: block;
  line-height: 1;
  margin: 0.5rem 0 0;
  color: ${(props) => props.theme.buttons.colors.header.color};
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
  }
`

const MenuHeaderTitleRevenueCenter = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.4rem 0 0;
  color: ${(props) => props.theme.buttons.colors.header.color};

  > span {
    display: inline-block;
    color: ${(props) => props.theme.buttons.colors.header.color};
  }
`

const MenuHeaderName = styled.span`
  max-width: 20rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  span {
    color: ${(props) => props.theme.buttons.colors.header.color};
    font-size: ${(props) => props.theme.fonts.sizes.big};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }
`

const MenuHeaderDropdown = styled.span`
  margin: 0.2rem 0 0 0.2rem;
  width: 1.6rem;
  height: 1.6rem;
`

const MenuHeaderTitle = ({
  order,
  isGroupOrder,
  cartGuest,
  showMenu,
  setShowMenu,
}) => {
  const { serviceType, revenueCenter, prepType } = order
  let serviceTypeName = serviceTypeNamesMap[serviceType]
  serviceTypeName = prepType === 'TAKE_OUT' ? 'Take Out' : serviceTypeName
  const orderTypeName =
    revenueCenter && revenueCenter.revenue_center_type === 'CATERING'
      ? ' Catering '
      : ''

  const toggle = (evt) => {
    evt.preventDefault()
    setShowMenu(!showMenu)
  }

  return revenueCenter ? (
    <>
      <MenuHeaderTitleServiceType>
        {isGroupOrder ? 'Group Order ' : 'Ordering '} {orderTypeName}
        {serviceTypeName}
      </MenuHeaderTitleServiceType>
      <MenuHeaderTitleRevenueCenter onClick={toggle}>
        <MenuHeaderName>
          <Heading>{revenueCenter.name}</Heading>
        </MenuHeaderName>
        {!cartGuest ? (
          <MenuHeaderDropdown>
            {showMenu ? <ChevronUp /> : <ChevronDown />}
          </MenuHeaderDropdown>
        ) : null}
      </MenuHeaderTitleRevenueCenter>
    </>
  ) : null
}

MenuHeaderTitle.displayName = 'MenuHeaderTitle'
MenuHeaderTitle.propTypes = {
  order: propTypes.object,
  isGroupOrder: propTypes.bool,
  showMenu: propTypes.bool,
  setShowMenu: propTypes.func,
}

const MenuHeader = ({ backPath = '/locations', backClick }) => {
  const dispatch = useDispatch()
  const { colors, border } = useTheme()
  const [showMenu, setShowMenu] = useState(false)
  const { allergens: displayAllergens } = useSelector(selectDisplaySettings)
  const order = useSelector(selectOrder)
  const { revenueCenter } = order
  const showGroupOrdering =
    !isMobile && revenueCenter ? !!revenueCenter.group_ordering : false
  const { isCartOwner, cartGuest, cartId } = useSelector(selectGroupOrder)
  const showAllergens = displayAllergens && !isMobile ? true : false
  const allowLeave = cartGuest && backPath === '/locations'

  const leave = () => {
    dispatch(openModal({ type: 'groupOrderLeave' }))
  }

  const onClick = allowLeave ? leave : backClick

  return (
    <>
      <Header
        style={{ boxShadow: 'none' }}
        title={
          <MenuHeaderTitle
            order={order}
            cartGuest={cartGuest}
            isGroupOrder={!!cartId}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        }
        borderColor={border.color}
        left={onClick ? <Back onClick={onClick} /> : <Back path={backPath} />}
        right={
          <>
            {showAllergens && <Allergens />}
            {showGroupOrdering ? (
              cartGuest ? (
                <LeaveGroupIcon />
              ) : (
                <GroupOrderIcon fill={isCartOwner ? colors.alert : null} />
              )
            ) : null}
            <Cart />
            <NavMenu />
          </>
        }
      />
      <MenuMobileMenu
        order={order}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </>
  )
}

MenuHeader.displayName = 'MenuHeader'
MenuHeader.propTypes = {
  backPath: propTypes.string,
}

export default MenuHeader
