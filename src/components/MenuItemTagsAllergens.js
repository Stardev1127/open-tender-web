import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const MenuItemTagsAllergensView = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isCentered ? 'center' : 'flex-start')};
  align-items: center;
  flex-wrap: wrap;
  margin: 0.8rem 0 0;

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }

  .centered & {
    justify-content: center;
  }

  span {
    display: block;
  }

  span + span {
    margin-left: 2rem;
  }
`

const MenuItemTag = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes[props.size]};
`

const MenuItemAllergen = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes[props.size]};
  color: ${(props) => props.theme.colors.allergens};
`

const MenuItemTagsAllergens = ({
  tags,
  allergens,
  size = 'xxSmall',
  isCentered,
  style,
}) => {
  const hasTags = tags?.length > 0
  const hasAllergens = allergens?.length > 0

  if (!hasTags && !hasAllergens) return null

  return (
    <MenuItemTagsAllergensView isCentered={isCentered} style={style}>
      {hasTags
        ? tags.map((tag) => (
            <MenuItemTag key={tag} size={size}>
              {tag}
            </MenuItemTag>
          ))
        : null}
      {hasAllergens
        ? allergens.map((allergen) => (
            <MenuItemAllergen key={allergen} size={size}>
              {allergen}
            </MenuItemAllergen>
          ))
        : null}
    </MenuItemTagsAllergensView>
  )
}

MenuItemTagsAllergens.displayName = 'MenuItemTagsAllergens'
MenuItemTagsAllergens.propTypes = {
  tags: propTypes.array,
  allergens: propTypes.array,
  size: propTypes.string,
  isCentered: propTypes.bool,
  style: propTypes.object,
}

export default MenuItemTagsAllergens
