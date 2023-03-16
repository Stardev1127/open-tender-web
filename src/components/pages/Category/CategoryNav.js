import { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { isMobile } from 'react-device-detect'
import { useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import CategoryNavScroll from './CategoryNavScroll'

const CategoryNavView = styled.div`
  width: 100%;
  height: ${(props) => props.theme.layout.navHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const CategoryNavInner = styled.div`
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

const CategoryNavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const CategoryNav = ({ items, offset = -30 }) => {
  const [stuck, setStuck] = useState(false)
  const stickyRef = useRef(null)
  const theme = useTheme()
  const { navHeight, navHeightMobile } = theme.layout
  const height = isMobile ? navHeightMobile : navHeight
  const heightInPixels = parseInt(height.replace('rem', '')) * 10
  const topOffset = heightInPixels

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
    <CategoryNavView ref={stickyRef}>
      <CategoryNavInner stuck={stuck}>
        <CategoryNavContainer>
          <CategoryNavScroll items={items} offset={offset} />
        </CategoryNavContainer>
      </CategoryNavInner>
    </CategoryNavView>
  )
}

CategoryNav.displayName = 'CategoryNav'
CategoryNav.propTypes = {
  items: propTypes.array,
  offset: propTypes.number,
}

export default CategoryNav
