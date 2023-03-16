import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BgImage } from '@open-tender/components'

const MenuHeroView = styled(BgImage)`
  position: relative;
  width: 100%;
  min-height: 32rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${(props) => props.theme.bgColors.tertiary};
  padding: 6rem ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    min-height: 0;
    padding: 3rem ${(props) => props.theme.layout.paddingMobile};
  }

  > div {
    opacity: 0;
    animation: slide-up 0.25s ease-in-out 0.125s forwards;
  }
`

const MenuHero = ({ imageUrl, children }) => {
  const bgStyle = imageUrl ? { backgroundImage: `url(${imageUrl}` } : null
  return <MenuHeroView style={bgStyle}>{children}</MenuHeroView>
}

MenuHero.displayName = 'MenuHero'
MenuHero.propTypes = {
  imageUrl: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default MenuHero
