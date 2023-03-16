import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { isBrowser } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { selectContentSection } from '../slices'
import { Tag } from '.'
import { AlertCircle, Slash } from './icons'

const MenuItemTagAlertView = styled.div`
  position: absolute;
  z-index: 2;
  top: -1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuItemTagAlert = ({ isSoldOut, allergenAlert }) => {
  const { soldOutMessage } = useSelector(selectContentSection('menu'))
  const soldOutMsg = isBrowser
    ? soldOutMessage || 'Sold out for day'
    : 'Sold out'

  const itemTag = isSoldOut ? (
    <Tag icon={<Slash />} text={soldOutMsg} color="alert" />
  ) : allergenAlert ? (
    <Tag icon={<AlertCircle />} text={allergenAlert} color="alert" />
  ) : null

  return itemTag ? <MenuItemTagAlertView>{itemTag}</MenuItemTagAlertView> : null
}

MenuItemTagAlert.displayName = 'MenuItemTagAlert'
MenuItemTagAlert.propTypes = {
  isSoldOut: propTypes.bool,
  allergenAlert: propTypes.string,
}

export default MenuItemTagAlert
