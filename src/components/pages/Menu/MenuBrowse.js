import { useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Heading } from '@open-tender/components'
import { selectCategoryType } from '../../../slices'
import { Container } from '../..'
import { MenuContext } from './Menu'
import MenuCards from './MenuCards'
import MenuList from './MenuList'
import MenuSquares from './MenuSquares'

const MenuBrowseView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
    ${(props) =>
      props.hasTop ? '' : `margin-top: ${props.theme.layout.paddingMobile};`}
  }
`

const MenuBrowseHeader = styled.div`
  padding: 0 0 1rem;
  margin: 0 auto;
  max-width: ${(props) => props.theme.categories.desktop.containerMaxWidth};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
    max-width: ${(props) => props.theme.categories.mobile.containerMaxWidth};
  }
`

const MenuBrowseTitle = styled(Heading)`
  line-height: 1;
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const MenuBrowse = ({ categories, isRcs }) => {
  const { hasTop } = useContext(MenuContext)
  const displayType = useSelector(selectCategoryType(isMobile))
  console.log('displayType', displayType)
  // const displayType = 'LIST'

  if (!categories || !categories.length) return null

  return (
    <Container>
      <MenuBrowseView id="full-menu" hasTop={hasTop}>
        {hasTop && (
          <MenuBrowseHeader>
            <MenuBrowseTitle>
              Browse by {isRcs ? 'Vendor' : 'Category'}
            </MenuBrowseTitle>
          </MenuBrowseHeader>
        )}
        {displayType === 'CARDS' ? (
          <MenuCards categories={categories} />
        ) : displayType === 'SQUARES' ? (
          <MenuSquares categories={categories} />
        ) : (
          <MenuList categories={categories} />
        )}
      </MenuBrowseView>
    </Container>
  )
}

MenuBrowse.displayName = 'MenuBrowse'
MenuBrowse.propTypes = {
  categories: propTypes.array,
  isRcs: propTypes.bool,
}

export default MenuBrowse
