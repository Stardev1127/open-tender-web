import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { ButtonStyled } from '@open-tender/components'

const OrderTypesFooter = styled('div')`
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.5s forwards;
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    text-align: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }

  & > p {
    font-size: ${(props) => props.theme.fonts.sizes.h4};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h5};
    }
  }
`

const OrderTypesLinks = styled('div')`
  margin: 4rem 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 3rem 0 0;
    justify-content: center;
  }

  button {
    display: block;
    border-color: ${(props) => props.theme.buttons.colors.large.borderColor};

    &:hover,
    &:active {
      // border-color: ${(props) =>
        props.theme.buttons.colors.largeHover.borderColor};
    }
  }

  button + button {
    margin: 0 0 0 1rem;
  }
`

const OrderTypeLinks = ({ orderLinks, contentTypes, icons, handlers }) => {
  const links = orderLinks.map((orderType) => ({
    ...contentTypes[orderType],
    icon: icons[orderType],
    onClick: handlers[orderType],
  }))
  const hasLinks = orderLinks.length > 0

  if (!hasLinks) return null

  return (
    <OrderTypesFooter>
      <OrderTypesLinks>
        {links.map((link) => (
          <ButtonStyled
            key={link.title}
            onClick={link.onClick}
            size="small"
            color="secondary"
          >
            {link.title}
          </ButtonStyled>
        ))}
      </OrderTypesLinks>
    </OrderTypesFooter>
  )
}

OrderTypeLinks.displayName = 'OrderTypeLinks'
OrderTypeLinks.propTypes = {
  orderLinks: propTypes.array,
  contentTypes: propTypes.object,
  icons: propTypes.object,
  handlers: propTypes.object,
}

export default OrderTypeLinks
