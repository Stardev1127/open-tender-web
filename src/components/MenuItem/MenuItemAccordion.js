import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { calcNutrition, formatDollars } from '@open-tender/js'
import {
  Body,
  ButtonStyled,
  Checkmark,
  Heading,
  Input,
} from '@open-tender/components'
import { ChevronDown, ChevronUp } from '../icons'
import { MenuItemIngredients, MenuItemNutrition, MenuItemPriceCals } from '..'
import MenuItemQuantity from './MenuItemQuantity'

const MenuItemAccordionPlaceholder = styled.div`
  padding-top: ${(props) => props.theme.item.desktop.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding-top: ${(props) => props.theme.item.mobile.padding};
  }
`

const MenuItemAccordionView = styled.div`
  padding: ${(props) => props.theme.item.desktop.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.item.mobile.padding};
  }
`

const MenuItemAccordionContainer = styled.div`
  border-bottom: ${(props) => props.theme.border.width} solid
    ${(props) => props.theme.border.color};
`

const MenuItemAccordionRow = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: ${(props) => props.theme.border.width} solid
    ${(props) => props.theme.border.color};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 3.6rem;
  }
`

const MenuItemAccordionRowButton = ({ name, open, setOpen, children }) => {
  const isOpen = name === open
  const onClick = () => {
    setOpen(isOpen ? null : name)
  }
  return (
    <MenuItemAccordionRow as="button" onClick={onClick}>
      {children}
    </MenuItemAccordionRow>
  )
}

const MenuItemAccordionLabel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  span {
    display: block;
  }
`

const MenuItemAccordionLabelRequired = styled.span`
  color: ${(props) => props.theme.colors.error};
  margin: 0 0 0 0.3rem;
`

const MenuItemAccordionLabelCheckmark = styled.span`
  margin: 0 0 0 0.5rem;

  & > span {
    border-color: ${(props) => props.theme.colors.success};
    background-color: ${(props) => props.theme.colors.success};
  }
`

const MenuItemAccordionToggleView = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const MenuItemAccordionToggleIcon = styled.div`
  width: 2.4rem;
  padding: 0 0 0 0.5rem;
  margin: 0.2rem 0 0 0;
`

const MenuItemAccordionToggle = ({ isOpen, children }) => {
  return (
    <MenuItemAccordionToggleView>
      {children}
      <MenuItemAccordionToggleIcon>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </MenuItemAccordionToggleIcon>
    </MenuItemAccordionToggleView>
  )
}

const MenuItemAccordionQuantity = styled.div`
  height: 100%;
  margin-right: -0.8rem;
`

const MenuItemAccordionSelectedSize = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const MenuItemAccordionMissingSize = styled(Body)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.error};
`

const MenuItemAccordionSectionView = styled.div`
  padding: 0 0 1rem;
  margin: 0 0 0;
`

const MenuItemAccordionSection = ({ isOpen = false, style, children }) => {
  return (
    <TransitionGroup component={null}>
      {isOpen ? (
        <CSSTransition
          key="nutritionalInfo"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <MenuItemAccordionSectionView style={style}>
            {children}
          </MenuItemAccordionSectionView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

const MenuItemAccordionOptionButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem 0.8rem;
  margin: 0.6rem 0 0;
  border-style: solid;
  border-width: ${(props) => props.theme.border.width};
  border-color: ${(props) => props.theme.bgColors.highlight};
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) =>
    props.checked ? props.theme.bgColors.highlight : 'transparent'};

  &:first-of-type {
    margin: 0;
  }

  span {
    transition: ${(props) => props.theme.links.transition};
    color: ${(props) => props.theme.colors.primary};
  }

  &:hover,
  &:active {
    border-color: ${(props) => props.theme.bgColors.highlight};
    background-color: ${(props) => props.theme.bgColors.highlight};

    span {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`

const MenuItemAccordionOptionName = styled(Heading)`
  display: block;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  text-transform: uppercase;
`

const MenuItemAccordionOption = ({ name, price, cals, quantity, toggle }) => {
  const displayPrice = price ? formatDollars(price) : null
  return (
    <MenuItemAccordionOptionButton onClick={toggle} checked={quantity >= 1}>
      <MenuItemAccordionOptionName>{name}</MenuItemAccordionOptionName>
      <MenuItemPriceCals price={displayPrice} cals={cals} />
    </MenuItemAccordionOptionButton>
  )
}

const MenuItemAccordionInstructionsView = styled.div`
  padding: ${(props) => props.theme.layout.padding};
  background-color: ${(props) => props.theme.bgColors.tertiary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
  }
`

const MenuItemAccordionInstructionsContainer = styled.div`
  border-radius: ${(props) => props.theme.border.radius};
  padding: ${(props) => props.theme.layout.padding};
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
  }
`

// const MenuItemAccordionInstructionsTitle = styled(Heading)``

const MenuItemAccordionInstructionsInput = styled.div`
  width: 100%;
  margin: 0 0 2rem;

  label {
    margin: 0;
  }

  // & + div {
  //   margin: 2rem 0 0;
  // }
`

const MenuItemAccordionInstructionsFooter = styled.div`
  margin: 3rem 0 0;
  text-align: center;
`

const MenuItemAccordionInstructions = ({
  hasMadeFor,
  madeFor,
  setMadeFor,
  hasNotes,
  notes,
  setNotes,
  allDone,
}) => {
  return (
    <MenuItemAccordionInstructionsView>
      <MenuItemAccordionInstructionsContainer>
        {hasMadeFor && (
          <MenuItemAccordionInstructionsInput>
            {/* <MenuItemAccordionInstructionsTitle>
            Who is this order for?
          </MenuItemAccordionInstructionsTitle> */}
            <Input
              label="Who is this order for?"
              name="made-for"
              type="text"
              value={madeFor || ''}
              onChange={(evt) => setMadeFor(evt.target.value)}
            />
          </MenuItemAccordionInstructionsInput>
        )}
        {hasNotes && (
          <MenuItemAccordionInstructionsInput>
            {/* <MenuItemAccordionInstructionsTitle>
            Any special instructions?
          </MenuItemAccordionInstructionsTitle> */}
            <Input
              label="Any special instructions?"
              name="notes"
              type="text"
              value={notes || ''}
              onChange={(evt) => setNotes(evt.target.value)}
            />
          </MenuItemAccordionInstructionsInput>
        )}
        <MenuItemAccordionInstructionsFooter>
          <ButtonStyled onClick={allDone}>All Done</ButtonStyled>
        </MenuItemAccordionInstructionsFooter>
      </MenuItemAccordionInstructionsContainer>
    </MenuItemAccordionInstructionsView>
  )
}

const MenuItemAccordion = ({
  hasCustomize,
  builtItem,
  setQuantity,
  increment,
  decrement,
  toggleOption,
  setMadeFor,
  setNotes,
  displaySettings,
  cartId,
}) => {
  const {
    calories: showCals,
    madeFor: showMadeFor,
    notes: showNotes,
  } = displaySettings
  const [open, setOpen] = useState(null)
  const { groups, ingredients, totalCals, madeFor, notes } = builtItem
  const hasMadeFor = showMadeFor && !cartId ? true : false
  const hasNotes = showNotes ? true : false
  const hasInstructions = hasMadeFor || hasNotes
  const hasCals = showCals && totalCals
  const nutritionalInfo = hasCals ? calcNutrition(builtItem) : null
  const hasIngredients = ingredients && ingredients.length > 0
  const specialInstructionTitle =
    hasMadeFor && hasNotes
      ? 'Name / Special Instructions'
      : hasMadeFor
      ? 'Name'
      : hasNotes
      ? 'Special Instructions'
      : ''
  const sizeGroup = groups ? groups.find((i) => i.isSize) : null
  const selectedSize = sizeGroup
    ? sizeGroup.options.find((i) => i.quantity >= 1)
    : null
  const showAccordion =
    sizeGroup || hasCustomize || hasInstructions || hasIngredients || hasCals

  if (!showAccordion) return <MenuItemAccordionPlaceholder />

  const toggleSize = (optionId) => {
    toggleOption(sizeGroup.id, optionId)
    setOpen(null)
  }

  return (
    <MenuItemAccordionView>
      <MenuItemAccordionContainer>
        {!!sizeGroup && (
          <>
            <MenuItemAccordionRowButton
              name="SIZE"
              open={open}
              setOpen={setOpen}
            >
              <MenuItemAccordionLabel>
                Size
                {!selectedSize ? (
                  <MenuItemAccordionLabelRequired>
                    *
                  </MenuItemAccordionLabelRequired>
                ) : (
                  <MenuItemAccordionLabelCheckmark>
                    <Checkmark />
                  </MenuItemAccordionLabelCheckmark>
                )}
              </MenuItemAccordionLabel>
              <MenuItemAccordionToggle isOpen={open === 'SIZE'}>
                {selectedSize ? (
                  <MenuItemAccordionSelectedSize>
                    {selectedSize.name}
                  </MenuItemAccordionSelectedSize>
                ) : (
                  <MenuItemAccordionMissingSize>
                    Select Size...
                  </MenuItemAccordionMissingSize>
                )}
              </MenuItemAccordionToggle>
            </MenuItemAccordionRowButton>
            <MenuItemAccordionSection isOpen={open === 'SIZE'}>
              {sizeGroup.options.map((option) => (
                <MenuItemAccordionOption
                  key={option.id}
                  toggle={() => toggleSize(option.id)}
                  {...option}
                />
              ))}
            </MenuItemAccordionSection>
          </>
        )}
        {hasCustomize && (
          <MenuItemAccordionRow>
            <MenuItemAccordionLabel>Quantity</MenuItemAccordionLabel>
            <MenuItemAccordionQuantity>
              <MenuItemQuantity
                item={builtItem}
                adjust={setQuantity}
                increment={increment}
                decrement={decrement}
              />
            </MenuItemAccordionQuantity>
          </MenuItemAccordionRow>
        )}
        {!!hasInstructions && (
          <>
            <MenuItemAccordionRowButton
              name="INSTRUCTIONS"
              open={open}
              setOpen={setOpen}
            >
              <MenuItemAccordionLabel>
                <span>{specialInstructionTitle}</span>
                {madeFor || notes ? (
                  <MenuItemAccordionLabelCheckmark>
                    <Checkmark />
                  </MenuItemAccordionLabelCheckmark>
                ) : null}
              </MenuItemAccordionLabel>
              <MenuItemAccordionToggle isOpen={open === 'INSTRUCTIONS'} />
            </MenuItemAccordionRowButton>
            <MenuItemAccordionSection isOpen={open === 'INSTRUCTIONS'}>
              <MenuItemAccordionInstructions
                hasMadeFor={hasMadeFor}
                madeFor={madeFor}
                setMadeFor={setMadeFor}
                hasNotes={hasNotes}
                notes={notes}
                setNotes={setNotes}
                allDone={() => setOpen(null)}
              />
            </MenuItemAccordionSection>
          </>
        )}
        {!!hasIngredients && (
          <>
            <MenuItemAccordionRowButton
              name="INGREDIENTS"
              open={open}
              setOpen={setOpen}
            >
              <MenuItemAccordionLabel>Ingredients</MenuItemAccordionLabel>
              <MenuItemAccordionToggle isOpen={open === 'INGREDIENTS'} />
            </MenuItemAccordionRowButton>
            <MenuItemAccordionSection isOpen={open === 'INGREDIENTS'}>
              <MenuItemIngredients ingredients={ingredients} />
            </MenuItemAccordionSection>
          </>
        )}
        {!!hasCals && (
          <>
            <MenuItemAccordionRowButton
              name="INFO"
              open={open}
              setOpen={setOpen}
            >
              <MenuItemAccordionLabel>
                Nutritional Information
              </MenuItemAccordionLabel>
              <MenuItemAccordionToggle isOpen={open === 'INFO'} />
            </MenuItemAccordionRowButton>
            <MenuItemAccordionSection isOpen={open === 'INFO'}>
              <MenuItemNutrition nutritionalInfo={nutritionalInfo} />
            </MenuItemAccordionSection>
          </>
        )}
      </MenuItemAccordionContainer>
    </MenuItemAccordionView>
  )
}

MenuItemAccordion.displayName = 'MenuItemAccordion'
MenuItemAccordion.propTypes = {
  builtItem: propTypes.object,
  setQuantity: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
}

export default MenuItemAccordion
