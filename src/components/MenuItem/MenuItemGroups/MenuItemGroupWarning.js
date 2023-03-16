import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MenuItemGroupWarningContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const MenuItemGroupWarningView = styled.div`
  min-width: 9.2rem;
  padding: 0 1rem;
  border-width: 0.1rem;
  border-style: solid;
  color: ${(props) =>
    props.belowMin ? props.theme.alert.color : props.theme.colors.secondary};
  border-color: ${(props) =>
    props.belowMin ? props.theme.alert.color : props.theme.border.color};
  background-color: ${(props) =>
    props.belowMin ? props.theme.alert.bgColor : props.theme.bgColors.primary};
  border-radius: ${(props) => props.theme.border.radiusSmall};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    text-align: center;
    min-width: 9.2rem;
    padding: 0 0.5rem;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const MenuItemGroupQuantity = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2.8rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: 2.6rem;
  }

  span {
    display: block;
  }

  span + span {
    margin-left: 0.7rem;
  }
`

// const BuildGroupAlert = styled.span`
//   width: 2rem;
//   height: 2rem;
//   margin: 0 0 0 0.3rem;
//   line-height: 2rem;
//   border-radius: 1rem;
//   text-align: center;
//   color: ${(props) => props.theme.colors.light};
//   background-color: ${(props) => props.theme.colors.error};
//   border-color: ${(props) => props.theme.colors.light};
// `

const MenuItemGroupWarning = ({ quantity, min, max }) => {
  const belowMin = quantity < min
  return (
    <MenuItemGroupWarningContainer>
      {/* {included !== 0 && max !== 1 && (
        <MenuItemGroupIncluded remaining={quantity < included}>
          ({included} included)
        </MenuItemGroupIncluded>
      )} */}
      <MenuItemGroupWarningView belowMin={belowMin}>
        {belowMin ? (
          <MenuItemGroupQuantity>
            <span>Select {min - quantity}</span>
          </MenuItemGroupQuantity>
        ) : (
          <MenuItemGroupQuantity>
            <span>
              {quantity}
              {max ? `/${max}` : ''} Selected
            </span>
          </MenuItemGroupQuantity>
        )}
      </MenuItemGroupWarningView>
    </MenuItemGroupWarningContainer>
  )
}

MenuItemGroupWarning.displayName = 'MenuItemGroupWarning'
MenuItemGroupWarning.propTypes = {
  quantity: propTypes.number,
  included: propTypes.number,
  min: propTypes.number,
  max: propTypes.number,
}

export default MenuItemGroupWarning
