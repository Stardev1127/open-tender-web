import React, { useEffect, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { formatDollars } from '@open-tender/js'
import { ButtonStyled, Heading, Preface } from '@open-tender/components'
import { selectDisplaySettings } from '../../slices'
import { Minus, Plus, X } from '../icons'

const MenuItemFooterView = styled.div`
  label: MenuItemFooter;
  flex: 0 0 auto;
  position: relative;
  padding: ${(props) => props.theme.item.desktop.padding};
  background-color: ${(props) => props.theme.bgColors.primary};
  box-shadow: 0 -15px 30px ${(props) => props.theme.overlay.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    padding: ${(props) => props.theme.item.mobile.padding};
    // padding-bottom: env(
    //   safe-area-inset-bottom,
    //   ${(props) => props.theme.item.mobile.padding}
    // );
  }
`

const MenuItemFooterButtons = styled.div`
  margin: 0 -0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MenuItemFooterButton = styled.div`
  flex: 1 1 50%;
  padding: 0 0.6rem;

  button {
    width: 100%;
    height: 5rem;
    padding: 0;
  }
`

const MenuItemFooterDefault = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MenuItemFooterDefaultCircle = styled.div`
  flex: 0 0 5rem;
  width: 5rem;
  height: 5rem;
  margin-right: ${(props) => props.theme.item.desktop.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-right: ${(props) => props.theme.item.mobile.padding};
    flex: 0 0 4rem;
    width: 4rem;
    height: 4rem;
  }

  button {
    width: 100%;
    height: 100%;
    padding: 0;
    border-radius: 2.5rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      border-radius: 2rem;
    }
  }
`

const MenuItemFooterDefaultQuantity = styled.div`
  min-width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    min-width: 4rem;
    height: 4rem;
  }
`

const MenuItemFooterDefaultCount = styled(Heading)`
  display: block;
`

const MenuItemFooterDefaultButton = styled.div`
  flex: 1 1 auto;

  button {
    width: 100%;
    padding: 0;
    height: 5rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      height: 4.4rem;
    }
  }
`

const MenuItemFooterDefaultPrice = styled.span`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }

  span {
    padding: 0 0.5rem;
  }
`

const MenuItemFooterRequired = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }

  span {
    display: block;
    padding: 0 0.3rem;
  }
`

const MenuItemFooterRequiredAlert = styled(Preface)`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0.2rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const MenuItemFooter = ({
  builtItem,
  increment,
  decrement,
  addItem,
  cancel,
  hasCustomize,
  isCustomize,
  setIsCustomize,
}) => {
  const [init, setInit] = useState(true)
  const { skipToCustomize, skipToCustomizeMobile } = useSelector(
    selectDisplaySettings
  )
  const skip = isMobile ? skipToCustomizeMobile : skipToCustomize
  const { groups, quantity, totalPrice } = builtItem
  const sizeGroup = groups ? groups.find((g) => g.isSize) : null
  const missingSize = sizeGroup
    ? !sizeGroup.options.find((i) => i.quantity >= 1)
    : false
  const hasGroups = groups ? groups.filter((g) => !g.isSize).length > 0 : false
  const groupsBelowMin = groups
    ? groups.filter((g) => g.quantity < g.min).length > 0
    : false
  const isIncomplete = totalPrice === 0 || quantity === '' || groupsBelowMin
  const requiresCustomization = isIncomplete && !missingSize
  const shouldSkip = hasCustomize ? hasGroups && skip : false

  useEffect(() => {
    if (init) {
      setInit(false)
      if (shouldSkip) setIsCustomize(true)
    }
  }, [init, shouldSkip, setIsCustomize])

  return (
    <MenuItemFooterView>
      {!hasCustomize ? (
        <MenuItemFooterDefault>
          <MenuItemFooterDefaultCircle>
            <ButtonStyled onClick={cancel} size="big" color="secondary">
              <X size={25} />
            </ButtonStyled>
          </MenuItemFooterDefaultCircle>
          <MenuItemFooterDefaultCircle style={{ margin: 0 }}>
            <ButtonStyled onClick={decrement} size="big" color="primary">
              <Minus size={25} />
            </ButtonStyled>
          </MenuItemFooterDefaultCircle>
          <MenuItemFooterDefaultQuantity>
            <MenuItemFooterDefaultCount size="xBig">
              {quantity}
            </MenuItemFooterDefaultCount>
          </MenuItemFooterDefaultQuantity>
          <MenuItemFooterDefaultCircle>
            <ButtonStyled onClick={increment} size="big" color="primary">
              <Plus size={25} />
            </ButtonStyled>
          </MenuItemFooterDefaultCircle>
          <MenuItemFooterDefaultButton>
            <ButtonStyled
              onClick={() => addItem(builtItem)}
              disabled={isIncomplete}
              size="big"
            >
              Add To Order
              <MenuItemFooterDefaultPrice>
                <span>&mdash;</span>
                {formatDollars(totalPrice)}
              </MenuItemFooterDefaultPrice>
            </ButtonStyled>
          </MenuItemFooterDefaultButton>
        </MenuItemFooterDefault>
      ) : isCustomize ? (
        <MenuItemFooterButtons>
          <MenuItemFooterButton>
            <ButtonStyled
              onClick={() => setIsCustomize(false)}
              size="big"
              color="secondary"
            >
              Cancel
            </ButtonStyled>
          </MenuItemFooterButton>
          <MenuItemFooterButton>
            <ButtonStyled
              onClick={() => setIsCustomize(false)}
              disabled={isIncomplete}
              size="big"
            >
              All Done
            </ButtonStyled>
          </MenuItemFooterButton>
        </MenuItemFooterButtons>
      ) : (
        <MenuItemFooterButtons>
          {hasGroups && (
            <MenuItemFooterButton>
              <ButtonStyled
                onClick={() => setIsCustomize(true)}
                size="big"
                color={requiresCustomization ? 'primary' : 'secondary'}
              >
                {requiresCustomization ? (
                  <MenuItemFooterRequired>
                    <span>Customize</span>
                    <MenuItemFooterRequiredAlert color="error">
                      (required)
                    </MenuItemFooterRequiredAlert>
                  </MenuItemFooterRequired>
                ) : (
                  'Customize'
                )}
              </ButtonStyled>
            </MenuItemFooterButton>
          )}
          <MenuItemFooterButton>
            <ButtonStyled
              onClick={() => addItem(builtItem)}
              disabled={isIncomplete}
              size="big"
            >
              Add To Order
              {!isIncomplete && (
                <MenuItemFooterDefaultPrice>
                  <span>&mdash;</span>
                  {formatDollars(totalPrice)}
                </MenuItemFooterDefaultPrice>
              )}
            </ButtonStyled>
          </MenuItemFooterButton>
        </MenuItemFooterButtons>
      )}
    </MenuItemFooterView>
  )
}

MenuItemFooter.displayName = 'MenuItemFooter'
MenuItemFooter.propTypes = {
  builtItem: propTypes.object,
  addItem: propTypes.func,
  isCustomize: propTypes.bool,
  setIsCustomize: propTypes.func,
}

export default MenuItemFooter
