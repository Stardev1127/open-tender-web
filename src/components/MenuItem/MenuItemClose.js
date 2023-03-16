import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonStyled } from '@open-tender/components'
import { X } from '../icons'

const MenuItemCloseButton = styled.div`
  position: absolute;
  z-index: 2;
  margin: 1rem;
  top: ${(props) => props.theme.item.desktop.imagePadding};
  right: ${(props) => props.theme.item.desktop.imagePadding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: ${(props) => props.theme.item.mobile.imagePadding};
    right: ${(props) => props.theme.item.mobile.imagePadding};
  }

  button {
    padding: 0.7rem 1.2rem 0.7rem 1rem;
    box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.4);
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.bgColors.primary};

    &:hover {
      color: ${(props) => props.theme.colors.primary};
      background-color: ${(props) => props.theme.bgColors.tertiary};
    }

    > span > span {
      margin-right: 0.4rem;
    }
  }
`

const MenuItemClose = ({ onClick }) => {
  return (
    <MenuItemCloseButton>
      <ButtonStyled icon={<X />} onClick={onClick} size="small" color="header">
        Close
      </ButtonStyled>
    </MenuItemCloseButton>
  )
}

MenuItemClose.displayName = 'MenuItemClose'
MenuItemClose.propTypes = {
  onClick: propTypes.func,
}

export default MenuItemClose
