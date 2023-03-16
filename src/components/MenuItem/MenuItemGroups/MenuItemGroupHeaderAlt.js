import propTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { Heading } from '@open-tender/components'
import { selectDisplaySettings } from '../../../slices'

const MenuItemGroupHeaderAltView = styled('div')`
  display: flex;
  margin: 0 0 1rem;
  justify-content: space-between;
  align-items: flex-end;
`

const MenuItemGroupHeaderAltName = styled(Heading)`
  margin-bottom: 0.5rem;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const MenuItemGroupHeaderAltNameQuantity = styled.span`
  padding: 0 0 0 0.5rem;
  ${(props) =>
    props.belowMin
      ? `color: ${props.theme.colors.error};`
      : props.belowIncluded
      ? `color: ${props.theme.colors.success};`
      : ''}
`

const MenuItemGroupHeaderAltDescription = styled.p`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const MenuItemGroupHeaderAlt = ({ group }) => {
  const { quantity, min, max, included } = group
  const belowMin = quantity < min
  const { modifierGroupDescription: showDesc } = useSelector(
    selectDisplaySettings
  )
  const displayDescription = showDesc && group.description ? true : false

  return (
    <MenuItemGroupHeaderAltView>
      <div>
        <MenuItemGroupHeaderAltName as="p">
          {group.name}
          <MenuItemGroupHeaderAltNameQuantity
            belowMin={belowMin}
            belowIncluded={quantity < included}
          >
            ({quantity}
            {max ? `/${max}` : ' selected'}
            {min && belowMin
              ? `, ${min} required`
              : included && quantity < included
              ? `, ${included} included`
              : ''}
            )
          </MenuItemGroupHeaderAltNameQuantity>
        </MenuItemGroupHeaderAltName>
        {displayDescription && (
          <MenuItemGroupHeaderAltDescription>
            {group.description}
          </MenuItemGroupHeaderAltDescription>
        )}
      </div>
    </MenuItemGroupHeaderAltView>
  )
}

MenuItemGroupHeaderAlt.displayName = 'MenuItemGroupHeaderAlt'
MenuItemGroupHeaderAlt.propTypes = {
  group: propTypes.object,
}

export default MenuItemGroupHeaderAlt
