import { useEffect, useRef, useState } from 'react'
import propTypes from 'prop-types'
import { isBrowser, isMobile } from 'react-device-detect'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'

const HeaderContainer = styled.nav``

const HeaderView = styled.div`
  position: fixed;
  z-index: 14;
  top: 0;
  right: 0;
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  height: ${(props) => props.theme.layout.navHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.25s ease;
  background-color: ${(props) =>
    props.theme.header[props.stuck ? 'stuck' : 'primary']};
  box-shadow: ${(props) =>
    props.stuck ? props.theme.boxShadow.outer : 'none'};
  border: 0;
  border-bottom-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) =>
    props.borderColor || props.theme.header[props.stuck ? 'stuck' : 'primary']};
  // padding: 0 ${(props) =>
    props.isMobile ? '0' : props.theme.layout.padding};
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
    height: ${(props) => props.theme.layout.navHeightMobile};
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: ${(props) => props.theme.layout.navHeightMobile};
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const HeaderTitle = styled.div`
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

  > span {
    display: block;
    max-width: 26rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: ${(props) => props.theme.fonts.headings.family};
    font-weight: ${(props) => props.theme.fonts.headings.weight};
    letter-spacing: ${(props) => props.theme.fonts.headings.letterSpacing};
    text-transform: ${(props) => props.theme.fonts.headings.textTransform};
    -webkit-font-smoothing: ${(props) =>
      props.theme.fonts.headings.fontSmoothing};
    font-size: ${(props) => props.theme.fonts.sizes.big};
    color: ${(props) => props.theme.buttons.colors.header.color};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }
`

const HeaderNav = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const Header = ({
  left,
  title,
  right,
  bgColor = 'primary',
  borderColor = null,
  maxWidth = '100%',
  style = null,
}) => {
  const header = useRef(null)
  const theme = useTheme()
  const { navHeight, navHeightMobile } = theme.layout
  const height = isBrowser ? navHeight : navHeightMobile
  const [stuck, setStuck] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (header.current) {
        setStuck(header.current.getBoundingClientRect().top < 0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])

  return (
    <HeaderContainer
      ref={header}
      role="navigation"
      aria-label="Primary Navigation"
    >
      <HeaderView
        height={height}
        stuck={stuck}
        bgColor={bgColor}
        borderColor={borderColor}
        maxWidth={maxWidth}
        isMobile={isMobile}
        style={style}
      >
        <HeaderNav>{left}</HeaderNav>
        {title && (
          <HeaderTitle>
            <span>{title}</span>
          </HeaderTitle>
        )}
        <HeaderNav isBrowser={isBrowser}>{right}</HeaderNav>
      </HeaderView>
    </HeaderContainer>
  )
}

Header.displayName = 'Header'
Header.propTypes = {
  left: propTypes.element,
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  right: propTypes.element,
  bgColor: propTypes.string,
  borderColor: propTypes.string,
  maxWidth: propTypes.string,
}

export default Header
