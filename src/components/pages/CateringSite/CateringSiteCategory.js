import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { Container } from '../..'
import MenuItem from '../Menu/MenuItem'

export const CateringSiteCategoryView = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.125s forwards;
  padding: ${(props) => (props.isChild ? '2rem 0 0' : '4rem 0 0')};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => (props.isChild ? '2rem 0 0' : '3rem 0 0')};
  }
`

export const CateringSiteCategoryHeader = styled('div')`
  margin: 0 0 1rem;
  text-align: center;

  h2 {
    margin: 0 0 0 -0.1rem;
    font-size: ${(props) => props.theme.fonts.sizes.h1};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }

  h3 {
    margin: 0 0 0 -0.1rem;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.h5};
    }
  }

  p {
    margin: 0.5rem 0 0;
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.big};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const MenuItems = styled('div')`
  display: grid;

  justify-content: center;
  align-items: stretch;
  padding: ${(props) => props.theme.layout.padding};
  gap: ${(props) => props.theme.layout.padding};
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 1560px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
    gap: ${(props) => props.theme.layout.paddingMobile};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    gap: 0.6rem;
  }
`

const CateringSiteCategory = ({ category, isChild }) => {
  return (
    <CateringSiteCategoryView isChild={isChild}>
      <CateringSiteCategoryHeader>
        <Container>
          {isChild ? <h3>{category.name}</h3> : <h2>{category.name}</h2>}
          {category.description && <p>{category.description}</p>}
        </Container>
      </CateringSiteCategoryHeader>
      {category.items.length > 0 && (
        <MenuItems>
          {category.items.map((item) => (
            <MenuItem key={item.id} item={item} displayOnly={true} />
          ))}
        </MenuItems>
      )}
    </CateringSiteCategoryView>
  )
}

CateringSiteCategory.displayName = 'CateringSiteCategory'
CateringSiteCategory.propTypes = {
  category: propTypes.object,
  isChild: propTypes.bool,
}

export default CateringSiteCategory
