import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { selectSelectedAllergenNames } from '@open-tender/redux'
import { formatDollars } from '@open-tender/js'
import {
  BgImage,
  Body,
  ButtonLink,
  Heading,
  Preface,
} from '@open-tender/components'
import { selectDisplaySettings } from '../../../slices'
import { AlertCircle } from '../../icons'
import {
  Collapsible,
  MenuItemIngredients,
  MenuItemNutrition,
  MenuItemPriceCals,
  MenuItemTagsAllergens,
  Quantity,
} from '../..'
import MenuItemRadio from './MenuItemRadio'
import MenuItemPizza from './MenuItemPizza/MenuItemPizza'

const MenuItemOptionView = styled.div`
  width: 100%;
  // background-color: pink;
`

const MenuItemOptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-top-style: solid;
  border-top-width: ${(props) =>
    props.isFirst ? '0' : props.theme.border.width};
  border-top-color: ${(props) => props.theme.border.color};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 10px 0;
  }
`

const MenuItemOptionImage = styled(BgImage)`
  position: relative;
  flex-grow: 0;
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  background-color: ${(props) => props.theme.bgColors.tertiary};
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 5rem;
    height: 5rem;
  }
`

const MenuItemOptionText = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0
    ${(props) => (props.showImage ? props.theme.layout.paddingMobile : '0')};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding-right: 0;
  }
`

const MenuItemOptionName = styled(Heading)`
  margin: 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const MenuItemOptionDescription = styled(Body)`
  margin: 5px 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
`

const MenuItemOptionQuantity = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  min-width: 9.2rem;
  justify-content: center;
  text-align: center;
`

const MenuItemOptionSoldOut = styled(Body)`
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors.error};
`

const MenuItemOptionButtons = styled.div`
  margin-top: 4px;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
  }
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

const MenuItemOptionSoldOutOverlay = () => (
  <MenuItemOptionOverlay overlay="dark">
    <div>
      <Preface>Sold Out</Preface>
    </div>
  </MenuItemOptionOverlay>
)

const MenuItemOptionAllergenOverlay = () => (
  <MenuItemOptionOverlay overlay="alert">
    <MenuItemOptionOverlayAlert>
      <AlertCircle />
    </MenuItemOptionOverlayAlert>
  </MenuItemOptionOverlay>
)

const MenuItemOption = ({
  index,
  group,
  option,
  toggleOption,
  incrementOption,
  decrementOption,
  setOptionQuantity,
}) => {
  const {
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
    modifierImage: showImage = true,
    modifierDescription: showDescription = true,
  } = useSelector(selectDisplaySettings)
  const allergenAlerts = useSelector(selectSelectedAllergenNames)
  const [showInfo, setShowInfo] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const isFirst = index === 0
  const { name, description, imageUrl, isSoldOut } = option
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  const isCheckbox = group.options.filter((i) => i.max !== 1).length === 0
  const groupAtMax = group.max !== 0 && group.quantity === group.max
  const optionAtMax = option.max !== 0 && option.quantity === option.max
  const incrementDisabled = groupAtMax || optionAtMax
  const decrementDisabled = option.quantity === 0
  const hidePrice =
    group.included !== 0 &&
    (group.included === group.max || group.quantity < group.included)
  const price = hidePrice ? null : formatDollars(option.price)
  const cals = showCals ? option.cals : null
  const allergens = showAllergens ? option.allergens : []
  const tags = showTags ? option.tags : []
  const isRadio = group.min === 1 && group.max === 1
  const hasIngredients = option.ingredients && option.ingredients.length > 0
  const hasCals = cals !== null
  const itemAllergens =
    allergens && allergens.length
      ? allergens.filter((allergen) => allergenAlerts.includes(allergen))
      : []
  const allergenAlert = itemAllergens.length > 0

  const toggle = () => {
    toggleOption(group.id, option.id)
  }

  const increment = () => {
    incrementOption(group.id, option.id)
  }

  const decrement = () => {
    decrementOption(group.id, option.id)
  }

  const adjust = (quantity, nested) => {
    setOptionQuantity(group.id, option.id, quantity, nested)
  }

  const toggleShowInfo = () => {
    if (showIngredients) setShowIngredients(false)
    setShowInfo(!showInfo)
  }

  const toggleShowIngredients = () => {
    if (showInfo) setShowInfo(false)
    setShowIngredients(!showIngredients)
  }

  return (
    <MenuItemOptionView>
      <MenuItemOptionContainer isFirst={isFirst}>
        {showImage && (
          <MenuItemOptionImage style={bgStyle}>
            {isSoldOut ? (
              <MenuItemOptionSoldOutOverlay />
            ) : allergenAlert ? (
              <MenuItemOptionAllergenOverlay />
            ) : null}
          </MenuItemOptionImage>
        )}
        <MenuItemOptionText showImage={showImage}>
          <MenuItemOptionName as="p">{name}</MenuItemOptionName>
          {showDescription && description ? (
            <MenuItemOptionDescription as="p">
              {description}
            </MenuItemOptionDescription>
          ) : null}
          <MenuItemPriceCals
            price={price}
            cals={cals}
            size="xSmall"
            style={{ marginTop: '0.5rem' }}
          />
          <MenuItemTagsAllergens
            tags={tags}
            allergens={allergens}
            style={{ marginTop: '0.5rem' }}
          />
          {hasCals || hasIngredients ? (
            <MenuItemOptionButtons>
              {hasCals ? (
                <ButtonLink onClick={toggleShowInfo} size="xSmall">
                  {!showInfo ? 'show' : 'hide'} nutritional info
                </ButtonLink>
              ) : null}
              {hasCals && hasIngredients ? (
                <Body size="xSmall">{' | '}</Body>
              ) : null}
              {hasIngredients ? (
                <ButtonLink onClick={toggleShowIngredients} size="xSmall">
                  {!showIngredients ? 'show' : 'hide'} ingredients
                </ButtonLink>
              ) : null}
            </MenuItemOptionButtons>
          ) : null}
        </MenuItemOptionText>
        <MenuItemOptionQuantity>
          {isSoldOut ? (
            <MenuItemOptionSoldOut>Out of stock</MenuItemOptionSoldOut>
          ) : group.isPizza && option.groups ? (
            <MenuItemPizza groups={option.groups} adjust={adjust} />
          ) : isRadio ? (
            <MenuItemRadio option={option} handler={toggle} />
          ) : (
            <Quantity
              item={option}
              increment={increment}
              decrement={decrement}
              adjust={adjust}
              incrementDisabled={incrementDisabled}
              decrementDisabled={decrementDisabled}
              showAdd={true}
              isCheckbox={isCheckbox}
            />
          )}
        </MenuItemOptionQuantity>
      </MenuItemOptionContainer>
      {hasCals ? (
        <Collapsible show={showInfo}>
          <MenuItemNutrition nutritionalInfo={option.nutritionalInfo} />
        </Collapsible>
      ) : null}
      {hasIngredients ? (
        <Collapsible show={showIngredients}>
          <MenuItemIngredients ingredients={option.ingredients} />
        </Collapsible>
      ) : null}
    </MenuItemOptionView>
  )
}

MenuItemOption.displayName = 'MenuItemOption'
MenuItemOption.propTypes = {
  group: propTypes.object,
  option: propTypes.object,
  toggleOption: propTypes.func,
  setOptionQuantity: propTypes.func,
  incrementOption: propTypes.func,
  decrementOption: propTypes.func,
}

export default MenuItemOption
