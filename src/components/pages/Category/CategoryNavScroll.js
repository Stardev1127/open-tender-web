import { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { animateScroll as scroll } from 'react-scroll'
import { isBrowser } from 'react-device-detect'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { slugify } from '@open-tender/js'

const getActiveElement = (elements, topOffset) => {
  return elements
    .filter((i) => i.getBoundingClientRect().top <= topOffset)
    .reduce(
      (max, i) =>
        max && max.getBoundingClientRect().top > i.getBoundingClientRect().top
          ? max
          : i,
      null
    )
}

const CategoryNavScrollButtonView = styled.button`
  font-family: ${(props) => props.theme.fonts.preface.family};
  font-weight: ${(props) => props.theme.fonts.preface.weight};
  letter-spacing: ${(props) => props.theme.fonts.preface.letterSpacing};
  text-transform: ${(props) => props.theme.fonts.preface.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.fonts.preface.fontSmoothing};
  font-size: ${(props) => props.theme.fonts.preface.fontSize};
  color: ${(props) =>
    props.theme.links.light[props.active ? 'hover' : 'color']};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }

  &:hover,
  &:focus {
    color: ${(props) => props.theme.links.light.hover};
  }
`

const CategoryNavScrollButton = ({ name, active, offset = 0 }) => {
  const id = slugify(name)

  const onClick = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const element = document.getElementById(id)
    const position = element.offsetTop + offset
    scroll.scrollTo(position, {
      duration: 500,
      smooth: true,
      offset: 0,
    })
    const items = element.querySelectorAll('button')
    const firstItem = items.length ? items[0] : null
    if (firstItem) firstItem.focus()
  }

  return (
    <CategoryNavScrollButtonView onClick={onClick} active={active}>
      {name}
    </CategoryNavScrollButtonView>
  )
}

const CategoryNavScrollView = styled.div`
  width: 100%;
  overflow-x: scroll;
  transition: all 500ms ease;
  text-align: center;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    text-align: left;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    position: relative;
    display: inline-flex;
    // justify-content: center;
    align-items: center;
    height: ${(props) => props.theme.layout.navHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      height: ${(props) => props.theme.layout.navHeightMobile};
      justify-content: flex-start;
    }

    li {
      display: block;
      flex-shrink: 0;
      font-size: ${(props) => props.theme.fonts.preface.fontSize};
      padding: 0 0 0 ${(props) => props.theme.layout.padding};
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        padding-left: ${(props) => props.theme.layout.paddingMobile};
        // padding-right: ${(props) => props.theme.layout.paddingMobile};
        padding-right: 1rem;
      }

      &:last-child {
        padding-right: ${(props) => props.theme.layout.padding};
        @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
          padding-right: ${(props) => props.theme.layout.paddingMobile};
        }
      }
    }
  }
`

// https://stackoverflow.com/questions/51229742/javascript-window-scroll-behavior-smooth-not-working-in-safari
const smoothHorizontalScrolling = (container, time, amount, start) => {
  let eAmt = amount / 100
  let curTime = 0
  let scrollCounter = 0
  while (curTime <= time) {
    window.setTimeout(shs, curTime, container, scrollCounter, eAmt, start)
    curTime += time / 100
    scrollCounter++
  }
}

const shs = (e, sc, eAmt, start) => {
  e.scrollLeft = eAmt * sc + start
}

const CategoryNavScroll = ({ items, offset = 0 }) => {
  const navRef = useRef(null)
  const listRef = useRef(null)
  const [active, setActive] = useState(null)
  const theme = useTheme()
  const { navHeight, navHeightMobile } = theme.layout
  const height = isBrowser ? navHeight : navHeightMobile
  const heightInPixels = parseInt(height.replace('rem', '')) * 10
  const topOffset = heightInPixels * 2 + 1
  const elements = Array.from(document.getElementsByName('section'))
  const navOffset = offset - topOffset

  useEffect(() => {
    const handleScroll = () => {
      if (elements.length) {
        setActive(getActiveElement(elements, -navOffset + 1))
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [navOffset, elements, active])

  useEffect(() => {
    if (active) {
      const navActive = document.getElementById(`nav-${active.id}`)
      if (navActive) {
        const navOffset = navActive.getBoundingClientRect().x
        const parentOffset = navActive.offsetParent.getBoundingClientRect().x
        if (navRef.current) {
          smoothHorizontalScrolling(
            navRef.current,
            250,
            navOffset,
            -parentOffset
          )
        }
      }
    }
  }, [active])

  return (
    <CategoryNavScrollView ref={navRef}>
      <ul ref={listRef}>
        {items.map((name, index) => {
          const sectionId = slugify(name)
          const activeId = active ? active.id : null
          return (
            <li key={`${sectionId}-${index}`} id={`nav-${sectionId}`}>
              <CategoryNavScrollButton
                name={name}
                offset={navOffset}
                active={activeId === sectionId}
              />
            </li>
          )
        })}
      </ul>
    </CategoryNavScrollView>
  )
}

CategoryNavScroll.displayName = 'CategoryNavScroll'
CategoryNavScroll.propTypes = {
  items: propTypes.array,
  offset: propTypes.number,
}

export default CategoryNavScroll
