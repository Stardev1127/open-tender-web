import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { isMobile } from 'react-device-detect'
import { Container } from '../..'
import MenuCategoryHeader from './MenuCategoryHeader'
import MenuItems from './MenuItems'
import MenuItem from './MenuItem'

export const MenuCategoryView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuCategory = ({ category, isChild }) => {
  const { items } = useTheme()
  const isSimple = isMobile && items.mobile.perRow > 1 ? true : false
  const { name, description } = category
  return (
    <MenuCategoryView isChild={isChild}>
      <Container>
        <MenuCategoryHeader
          title={name}
          subtitle={description}
          isChild={isChild}
        />
        {category.items.length > 0 && (
          <MenuItems>
            {category.items.map((item, index) => (
              <MenuItem
                key={`${item.id}-${index}`}
                item={item}
                isSimple={isSimple}
              />
            ))}
          </MenuItems>
        )}
      </Container>
    </MenuCategoryView>
  )
}

MenuCategory.displayName = 'MenuCategory'
MenuCategory.propTypes = {
  category: propTypes.object,
  isChild: propTypes.bool,
}

export default MenuCategory
