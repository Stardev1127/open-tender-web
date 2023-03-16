import propTypes from 'prop-types'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Body, Heading, Preface } from '@open-tender/components'
import MenuItemImage from './MenuItemImage'

const MenuItemButtonView = styled.button`
  flex-grow: 1;
  display: block;
  text-align: left;
  width: 100%;
  margin: 0 0 1.3rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0;
    }
  }

  &:disabled {
    opacity: 1;
  }
`

const MenuItemContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const MenuItemContent = styled.div`
  padding: ${(props) => (props.hasBox ? '1.5rem 1.3rem 0' : '1.1rem 0 0')};

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      padding: ${(props) => (props.hasBox ? '0.9rem 0.9rem' : '0.7rem 0 0')};
    }
  }
`

const MenuItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }

  .centered & {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }
`

const MenuItemName = styled(Heading)`
  display: block;
  flex: 1 1 auto;
  padding: 0 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  ${(props) =>
    props.theme.cards.menuItem.overrideFontColors
      ? `color: ${props.theme.cards.menuItem.titleColor};  font-size: ${props.theme.cards.menuItem.titleSize};`
      : ''};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    ${(props) =>
      props.theme.cards.menuItem.overrideFontColors
        ? `font-size: ${props.theme.cards.menuItem.titleSizeMobile};`
        : ''};
  }

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }

  .centered & {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fonts.sizes.main};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const MenuItemPriceCals = styled.div`
  flex-grow: 0;
  flex-shrink: 0;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0.3rem 0 0;
      text-align: left;
    }
  }

  .centered & {
    width: 100%;
    margin: 0.4rem 0 0;
    text-align: center;
    justify-content: center;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: 0.1rem 0 0;
    }
  }
`

const MenuItemPriceSep = styled.span`
  display: block;
  width: 8px;
  height: 1px;
  margin: 0 3px;
  background-color: ${(props) => props.theme.fonts.body.color};
  ${(props) =>
    props.theme.cards.menuItem.overrideFontColors
      ? `background-color: ${props.theme.cards.menuItem.textColor};`
      : ''};
`

const MenuItemPrice = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.big};
  ${(props) =>
    props.theme.cards.menuItem.overrideFontColors
      ? `color: ${props.theme.cards.menuItem.priceColor}; font-size: ${props.theme.cards.menuItem.priceSize};`
      : ''};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    ${(props) =>
      props.theme.cards.menuItem.overrideFontColors
        ? `font-size: ${props.theme.cards.menuItem.priceSizeMobile};`
        : ''};
  }

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }

  .centered & {
    font-size: ${(props) => props.theme.fonts.sizes.main};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const MenuItemCals = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  ${(props) =>
    props.theme.cards.menuItem.overrideFontColors
      ? `color: ${props.theme.cards.menuItem.caloriesColor}; font-size: ${props.theme.cards.menuItem.priceSize};`
      : ''};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    ${(props) =>
      props.theme.cards.menuItem.overrideFontColors
        ? `font-size: ${props.theme.cards.menuItem.priceSizeMobile};`
        : ''};
  }

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }

  .centered & {
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const MenuItemTagsAllergens = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin: 0.9rem 0 0;

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
  font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
  ${(props) =>
    props.theme.cards.menuItem.overrideFontColors
      ? `color: ${props.theme.cards.menuItem.textColor};`
      : ''};
`

const MenuItemAllergen = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.xxSmall};
  color: ${(props) => props.theme.colors.allergens};
`

const MenuItemDescription = styled(Body)`
  display: block;
  margin: 0.8rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  ${(props) =>
    props.theme.cards.menuItem.overrideFontColors
      ? `color: ${props.theme.cards.menuItem.textColor};`
      : ''};

  .compact & {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      display: none;
    }
  }

  .centered & {
    display: none;
  }
`

const MenuItemButton = ({
  onClick,
  disabled,
  showImage,
  imageUrl,
  imageOverlay,
  name,
  desc,
  price,
  cals,
  tags,
  allergens,
}) => {
  const theme = useTheme()
  const hasBox = theme.cards.menuItem.bgColor !== 'transparent'
  const hasTagsAllergens = tags.length || allergens.length ? true : false
  return (
    <MenuItemButtonView onClick={onClick} disabled={disabled}>
      <MenuItemContainer>
        {showImage && (
          <MenuItemImage imageUrl={imageUrl}>{imageOverlay}</MenuItemImage>
        )}
        <MenuItemContent hasBox={hasBox}>
          <MenuItemInfo>
            <MenuItemName className="title">{name}</MenuItemName>
            {price && price !== '$0.00' ? (
              <MenuItemPriceCals>
                {price ? <MenuItemPrice>{price}</MenuItemPrice> : null}
                {/* {price && cals ? <span> &mdash; </span> : null} */}
                {price && cals ? <MenuItemPriceSep /> : null}
                {cals ? <MenuItemCals>{cals} Cal</MenuItemCals> : null}
              </MenuItemPriceCals>
            ) : null}
          </MenuItemInfo>
          {hasTagsAllergens && (
            <MenuItemTagsAllergens>
              {tags.map((tag) => (
                <MenuItemTag key={tag}>{tag}</MenuItemTag>
              ))}
              {allergens.map((allergen) => (
                <MenuItemAllergen key={allergen}>{allergen}</MenuItemAllergen>
              ))}
            </MenuItemTagsAllergens>
          )}
          {desc && <MenuItemDescription>{desc}</MenuItemDescription>}
        </MenuItemContent>
      </MenuItemContainer>
    </MenuItemButtonView>
  )
}

MenuItemButton.displayName = 'MenuItemButton'
MenuItemButton.propTypes = {
  onClick: propTypes.func,
  disabled: propTypes.bool,
  showImage: propTypes.bool,
  imageUrl: propTypes.string,
  imageOverlay: propTypes.element,
  name: propTypes.string,
  desc: propTypes.string,
  price: propTypes.string,
  cals: propTypes.string,
  tags: propTypes.array,
  allergens: propTypes.array,
}

export default MenuItemButton
