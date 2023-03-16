import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { isBrowser } from 'react-device-detect'
import { useSelector } from 'react-redux'
import { selectContentSection } from '../slices'
import { Tag } from '.'
import { AlertCircle, Slash } from './icons'

const MenuItemOverlayView = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: ${(props) => props.theme.border.radius};
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: ${(props) => props.theme.overlay[props.color]};
`

const MenuItemOverlay = ({ isSoldOut, allergenAlert }) => {
  const { soldOutMessage } = useSelector(selectContentSection('menu'))
  const soldOutMsg = isBrowser
    ? soldOutMessage || 'Sold out for day'
    : 'Sold out'
  const color = isSoldOut ? 'dark' : 'alert'

  const itemTag = isSoldOut ? (
    <Tag icon={<Slash />} text={soldOutMsg} color="alert" />
  ) : allergenAlert ? (
    <Tag icon={<AlertCircle />} text={allergenAlert} color="alert" />
  ) : null

  return itemTag ? (
    <MenuItemOverlayView color={color}>{itemTag}</MenuItemOverlayView>
  ) : null
}

MenuItemOverlay.displayName = 'MenuItemOverlay'
MenuItemOverlay.propTypes = {
  isSoldOut: propTypes.bool,
  allergenAlert: propTypes.string,
}

export default MenuItemOverlay
