import propTypes from 'prop-types'
import styled from '@emotion/styled'
import MenuSquare from './MenuSquare'

const MenuSquaresView = styled.div`
  margin: ${(props) => props.theme.layout.padding} auto;
  max-width: ${(props) => props.theme.categories.desktop.containerMaxWidth};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} auto;
    max-width: ${(props) => props.theme.categories.mobile.containerMaxWidth};
  }
`

const MenuSquaresContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  justify-content: ${(props) => props.theme.categories.desktop.justifyContent};
  margin: -${(props) => props.theme.categories.desktop.gapHalf};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    justify-content: ${(props) => props.theme.categories.mobile.justifyContent};
    margin: -${(props) => props.theme.categories.mobile.gapHalf};
  }
`

const MenuSquares = ({ categories }) => {
  if (!categories || !categories.length) return null

  return (
    <MenuSquaresView>
      <MenuSquaresContainer>
        {categories.map((category, index) => (
          <MenuSquare
            key={category.name}
            category={category}
            isLast={categories.length - 1 === index}
          />
        ))}
      </MenuSquaresContainer>
    </MenuSquaresView>
  )
}

MenuSquares.displayName = 'MenuSquares'
MenuSquares.propTypes = {
  categories: propTypes.array,
}

export default MenuSquares
