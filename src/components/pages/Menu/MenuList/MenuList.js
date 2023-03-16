import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuListItem from './MenuListItem'

const MenuListView = styled.div`
  margin: ${(props) => props.theme.layout.padding} auto;
  max-width: ${(props) => props.theme.categories.desktop.containerMaxWidth};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: ${(props) => props.theme.categories.mobile.containerMaxWidth};
  }
`

const MenuListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => props.theme.categories.desktop.justifyContent};
  margin: 0 -${(props) => props.theme.categories.desktop.gap};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    width: 100%;
    margin: 0;
    // margin: 0 -${(props) => props.theme.categories.mobile.gap};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    justify-content: ${(props) => props.theme.categories.mobile.justifyContent};
    // margin: 0 -${(props) => props.theme.categories.mobile.gap};
  }
`

const MenuList = ({ categories }) => {
  if (!categories || !categories.length) return null

  return (
    <MenuListView>
      <MenuListContainer>
        {categories.map((category, index) => (
          <MenuListItem
            key={category.name}
            category={category}
            isLast={categories.length - 1 === index}
          />
        ))}
      </MenuListContainer>
    </MenuListView>
  )
}

MenuList.displayName = 'MenuCards'
MenuList.propTypes = {
  categories: propTypes.array,
}

export default MenuList
