import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Heading } from '@open-tender/components'

const MenuItemPriceCalsView = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const MenuItemPrice = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes[props.size]};
  ${(props) =>
    props.theme.cards.menuItem.overrideFontColors
      ? `color: ${props.theme.cards.menuItem.priceColor};`
      : ''};
`

const MenuItemCals = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes[props.size]};
  ${(props) =>
    props.theme.cards.menuItem.overrideFontColors
      ? `color: ${props.theme.cards.menuItem.caloriesColor};`
      : ''};
`

const MenuItemPriceSep = styled.span`
  display: block;
  width: 8px;
  height: 1px;
  margin: 0 3px;
  background-color: ${(props) => props.theme.fonts.body.color};
  ${(props) =>
    props.theme.cards.menuItem.overrideFontColors
      ? `background-color: ${props.theme.cards.menuItem.textColor};`
      : ''};
`

const MenuItemPriceCals = ({
  price,
  cals,
  size = 'small',
  children,
  style,
}) => {
  return (
    <MenuItemPriceCalsView style={style}>
      {price ? <MenuItemPrice size={size}>{price}</MenuItemPrice> : null}
      {price && cals ? <MenuItemPriceSep /> : null}
      {cals ? <MenuItemCals size={size}>{cals} Cal</MenuItemCals> : null}
      {children}
    </MenuItemPriceCalsView>
  )
}

MenuItemPriceCals.displayName = 'MenuItemPriceCals'
MenuItemPriceCals.propTypes = {
  price: propTypes.string,
  cals: propTypes.oneOfType([propTypes.string, propTypes.number]),
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default MenuItemPriceCals
