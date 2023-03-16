import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { isMobile } from 'react-device-detect'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { ButtonStyled } from '@open-tender/components'
import { NavScroll } from '.'

const NavStickyView = styled('div')`
  width: 100%;
  height: ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const NavStickyInner = styled('div')`
  width: 100%;
  background-color: ${(props) => props.theme.bgColors.dark};
  ${(props) =>
    props.stuck &&
    `position: fixed;
      z-index: 10;
      top: ${props.theme.layout.navHeight};
      left: 0;
      right: 0;`}
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    ${(props) =>
      props.stuck &&
      `position: fixed;
      z-index: 10;
      top: ${props.theme.layout.navHeightMobile};
      left: 0;
      right: 0;`}
  }
`

const NavStickyContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const NavStickyFilter = styled('div')`
  height: 100%;
  flex: 0 0;
  padding: 0 0 0 ${(props) => props.theme.layout.padding};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 100%;
    min-height: ${(props) => props.theme.layout.navHeight};
    padding: 0;
    justify-content: center;
  }
`

const NavStickyLogo = styled('div')`
  min-width: 4rem;
  padding: 0;
  margin: 0 2rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};

  img {
    display: block;
    width: auto;
    max-width: none;
    height: 4rem;
  }
`

const NavSticky = ({ items, offset = 0, revenueCenter, change }) => {
  const [stuck, setStuck] = useState(false)
  const stickyRef = useRef(null)
  const theme = useTheme()
  const { navHeight, navHeightMobile } = theme.layout
  const height = isMobile ? navHeightMobile : navHeight
  const heightInPixels = parseInt(height.replace('rem', '')) * 10
  const topOffset = heightInPixels

  const showNav = !(isMobile && revenueCenter)

  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        setStuck(stickyRef.current.getBoundingClientRect().top <= topOffset)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [topOffset])

  return (
    <NavStickyView ref={stickyRef}>
      <NavStickyInner stuck={stuck}>
        <NavStickyContainer>
          {revenueCenter && (
            <NavStickyFilter>
              <NavStickyLogo>
                <img
                  src={revenueCenter.app_image_url}
                  alt={revenueCenter.name}
                />
              </NavStickyLogo>
              <div>
                <ButtonStyled
                  onClick={() => change(null)}
                  size="small"
                  color="secondary"
                >
                  Switch
                </ButtonStyled>
              </div>
            </NavStickyFilter>
          )}
          {showNav && <NavScroll items={items} offset={offset} />}
        </NavStickyContainer>
      </NavStickyInner>
    </NavStickyView>
  )
}

NavSticky.displayName = 'NavSticky'
NavSticky.propTypes = {
  items: propTypes.array,
  offset: propTypes.number,
  revenueCenter: propTypes.object,
  change: propTypes.func,
}

export default NavSticky
