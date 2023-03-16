import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectSelectedAllergenNames } from '@open-tender/redux'
import { BgImage, Body, Heading } from '@open-tender/components'
import { formatDollars, formatQuantity } from '@open-tender/js'
import { selectDisplaySettings } from '../../../slices'
import { AlertCircle, X } from '../../icons'
import { Count, MenuItemPriceCals, MenuItemTagsAllergens } from '../..'

const MenuItemOptionSquareView = styled.div`
  position: relative;
  width: 25%;
  padding: 0 0.6rem;
  margin: 0 0 1.2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 33.33333%;
  }
`

const MenuItemOptionSquareCount = styled.div`
  position: absolute;
  z-index: 2;
  top: -0.8rem;
  right: -0.2rem;
`

const MenuItemOptionSquareRemove = styled.button`
  position: absolute;
  z-index: 2;
  width: 4.4rem;
  height: 4.4rem;
  top: -1.1rem;
  left: -0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuItemOptionSquareRemoveIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MenuItemOptionSquareButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 0 0.8rem;
  border-style: solid;
  border-width: ${(props) => props.theme.cards.modifier.borderWidth};
  border-color: ${(props) => props.theme.cards.modifier.borderColor};
  border-radius: ${(props) => props.theme.cards.modifier.borderRadius};
  background-color: ${(props) => props.theme.cards.modifier.bgColor};
  box-shadow: ${(props) => props.theme.cards.modifier.boxShadow};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`

const MenuItemOptionSquareImageContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  width: 100%;
  height: 6rem;
  padding: 0 1.5rem;
  margin: 0.5rem 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MenuItemOptionImage = styled(BgImage)`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 6rem;
  height: 6rem;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: ${(props) => props.theme.bgColors.tertiary};
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 6rem;
    height: 6rem;
  }
`

const MenuItemOptionSquareText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0.3rem;
`

const MenuItemOptionSquareName = styled(Heading)``

const MenuItemOptionSquareSoldOut = styled(Body)`
  margin: 0.5rem 0 0;
  color: ${(props) => props.theme.colors.error};
`

const MenuItemOptionOverlay = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: ${(props) => props.theme.overlay[props.overlay]};

  span {
    line-height: 1;
    color: ${(props) => props.theme.colors.light};
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const MenuItemOptionOverlayAlert = styled.div`
  width: 2.2rem;
  height: 2.2rem;
  color: ${(props) => props.theme.colors.light};
`

const MenuItemOptionAllergenOverlay = () => (
  <MenuItemOptionOverlay overlay="alert">
    <MenuItemOptionOverlayAlert>
      <AlertCircle />
    </MenuItemOptionOverlayAlert>
  </MenuItemOptionOverlay>
)

const MenuItemOptionSquare = ({
  group,
  option,
  incrementOption,
  decrementOption,
}) => {
  const {
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
    modifierImage: showImage = true,
  } = useSelector(selectDisplaySettings)
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const { colors } = useTheme()
  const { name, imageUrl, isSoldOut } = option
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const groupAtMax = group.max !== 0 && group.quantity === group.max
  const optionAtMax = option.max !== 0 && option.quantity === option.max
  const incrementDisabled = groupAtMax || optionAtMax
  const hidePrice =
    group.included !== 0 &&
    (group.included === group.max || group.quantity < group.included)
  const price = hidePrice ? null : formatDollars(option.price)
  const cals = showCals ? option.cals : null
  const allergens = showAllergens ? option.allergens : []
  const tags = showTags ? option.tags : []
  const disabled = incrementDisabled || isSoldOut
  const itemAllergens =
    allergens && allergens.length
      ? allergens.filter((allergen) => allergenAlerts.includes(allergen))
      : []
  const allergenAlert = itemAllergens.length > 0

  const increment = () => {
    incrementOption(group.id, option.id)
  }

  const decrement = () => {
    decrementOption(group.id, option.id)
  }

  return (
    <MenuItemOptionSquareView>
      {option.quantity > 0 && (
        <>
          <MenuItemOptionSquareCount>
            <Count
              count={formatQuantity(option.quantity)}
              // size={18}
              // fontSize="xSmall"
            />
          </MenuItemOptionSquareCount>
          <MenuItemOptionSquareRemove onClick={decrement}>
            <MenuItemOptionSquareRemoveIcon>
              <X color={colors.error} size={16} strokeWidth={2} />
            </MenuItemOptionSquareRemoveIcon>
          </MenuItemOptionSquareRemove>
        </>
      )}
      <MenuItemOptionSquareButton onClick={increment} disabled={disabled}>
        {showImage && (
          <MenuItemOptionSquareImageContainer>
            <MenuItemOptionImage style={bgStyle}>
              {allergenAlert ? <MenuItemOptionAllergenOverlay /> : null}
            </MenuItemOptionImage>
          </MenuItemOptionSquareImageContainer>
        )}
        <MenuItemOptionSquareText showImage={showImage}>
          <MenuItemOptionSquareName size="xSmall">
            {name}
          </MenuItemOptionSquareName>
          {isSoldOut ? (
            <MenuItemOptionSquareSoldOut size="xSmall">
              Out of stock
            </MenuItemOptionSquareSoldOut>
          ) : (
            <MenuItemPriceCals
              price={price}
              cals={cals}
              size="xSmall"
              style={{ marginTop: '0.5rem' }}
            />
          )}
          <MenuItemTagsAllergens
            tags={tags}
            allergens={allergens}
            style={{ marginTop: '0.5rem' }}
          />
        </MenuItemOptionSquareText>
      </MenuItemOptionSquareButton>
    </MenuItemOptionSquareView>
  )
}

MenuItemOptionSquare.displayName = 'MenuItemOptionSquare'
MenuItemOptionSquare.propTypes = {
  group: propTypes.object,
  option: propTypes.object,
  incrementOption: propTypes.func,
  decrementOption: propTypes.func,
}

export default MenuItemOptionSquare
