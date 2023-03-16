import { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { animateScroll as scroll } from 'react-scroll'
import styled from '@emotion/styled'
import { slugify } from '@open-tender/js'
import Count from '../../Count'
import { useTheme } from '@emotion/react'
import { Check } from '../../icons'

const MenuItemGroupsNavScrollButtonView = styled.button`
  position: relative;
  height: 4.5rem;
  padding: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) =>
    props.belowMin ? props.theme.colors.error : props.theme.colors.primary};
`

const MenuItemGroupsNavScrollButtonContainer = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    display: block;
  }

  span + span {
    margin-left: 0.5rem;
  }
`

const MenuItemGroupsNavScrollButtonCompleted = styled.span`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.8rem;
  color: ${(props) => props.theme.colors.light};
  background-color: ${(props) => props.theme.colors.success};

  & > span {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const MenuItemGroupsNavScrollButtonActive = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.2rem;
  background-color: ${(props) =>
    props.belowMin ? props.theme.colors.error : props.theme.colors.primary};
`

const MenuItemGroupsNavScrollButton = ({ item, active, offset = 0 }) => {
  const { colors } = useTheme()
  const { name, quantity, min } = item
  const id = slugify(name)
  const belowMin = quantity < min
  const remaining = min - quantity
  const isCompleted = min > 0 && quantity >= min

  const onClick = (evt) => {
    evt.preventDefault()
    evt.target.blur()
    const element = document.getElementById(id)
    const position = element.offsetTop - offset
    scroll.scrollTo(position, {
      containerId: 'menu-item-content',
      duration: 500,
      smooth: true,
      offset: 0,
    })
    const items = element.querySelectorAll('button')
    const firstItem = items.length ? items[0] : null
    if (firstItem) firstItem.focus()
  }

  return (
    <MenuItemGroupsNavScrollButtonView
      onClick={onClick}
      active={active}
      belowMin={belowMin}
    >
      <MenuItemGroupsNavScrollButtonContainer>
        <span>{name}</span>
        {belowMin && (
          <span>
            <Count
              count={remaining}
              size={16}
              color={colors.light}
              bgColor={colors.error}
              fontSize="xxSmall"
            />
          </span>
        )}
        {isCompleted && (
          <MenuItemGroupsNavScrollButtonCompleted>
            <span>
              <Check size={10} strokeWidth={3} />
            </span>
          </MenuItemGroupsNavScrollButtonCompleted>
        )}
      </MenuItemGroupsNavScrollButtonContainer>
      {active && <MenuItemGroupsNavScrollButtonActive belowMin={belowMin} />}
    </MenuItemGroupsNavScrollButtonView>
  )
}

const MenuItemGroupsNavScrollView = styled.div`
  width: 100%;
  overflow-x: scroll;
  transition: all 500ms ease;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 4.5rem;

    li {
      display: block;
      flex-shrink: 0;
      padding: 0 3rem 0 ${(props) => props.theme.item.desktop.padding};
      @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
        padding: 0 2rem 0 ${(props) => props.theme.item.mobile.padding};
      }

      &:last-of-type {
        padding-right: ${(props) => props.theme.item.desktop.padding};
        @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
          padding-right: ${(props) => props.theme.item.mobile.padding};
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

const shs = (e, scrollCounter, eAmt, start) => {
  const scrolledAmount = eAmt * scrollCounter + start
  e.scrollLeft = scrolledAmount
}

const getActiveElement = (elements, navOffset) => {
  return elements
    .filter((i) => i.getBoundingClientRect().top <= navOffset)
    .reduce((max, i) => {
      return max &&
        max.getBoundingClientRect().top > i.getBoundingClientRect().top
        ? max
        : i
    }, null)
}

const MenuItemGroupsNavScroll = ({ items, scrollContainer, scrollOffset }) => {
  const navRef = useRef(null)
  const listRef = useRef(null)
  const [active, setActive] = useState(null)
  const [sections, setSections] = useState([])
  const [current, setCurrent] = useState(null)
  const navBarHeight = navRef.current?.offsetHeight || 45
  const topOffset = scrollOffset + navBarHeight
  const paddingTop = 20
  const navOffset = topOffset + paddingTop
  const elements = Array.from(document.getElementsByName('section'))
  const buttonOffset = (navBarHeight || 45) + 45 + paddingTop - 1

  useEffect(() => {
    const handleScroll = () => {
      if (elements.length) {
        setActive(getActiveElement(elements, navOffset + 10))
      }
    }
    scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer.removeEventListener('scroll', () => handleScroll)
    }
  }, [navOffset, elements, active, scrollContainer])

  useEffect(() => {
    const navSections = Array.from(
      document.getElementsByClassName('nav-section')
    ).reduce((arr, i) => {
      return [
        ...arr,
        { name: i.id.replace('nav-', ''), offset: i.getBoundingClientRect().x },
      ]
    }, [])
    setSections(navSections)
  }, [])

  useEffect(() => {
    if (active && sections.length) {
      if (active.id === current) return
      const currentSection =
        sections.find((i) => i.name === current) || sections[0]
      const activeSection = sections.find((i) => i.name === active.id)
      if (!currentSection || !activeSection) return
      const start = currentSection.offset - sections[0].offset
      const amountToMove = activeSection.offset - currentSection.offset
      if (navRef.current) {
        smoothHorizontalScrolling(navRef.current, 250, amountToMove, start)
      }
      setCurrent(active.id)
    }
  }, [active, current, sections])

  return (
    <MenuItemGroupsNavScrollView ref={navRef}>
      <ul ref={listRef}>
        {items.map((i, index) => {
          const sectionId = slugify(i.name)
          const activeId = active ? active.id : null
          return (
            <li
              key={`${sectionId}-${index}`}
              id={`nav-${sectionId}`}
              className="nav-section"
            >
              <MenuItemGroupsNavScrollButton
                item={i}
                offset={buttonOffset}
                active={activeId === sectionId}
              />
            </li>
          )
        })}
      </ul>
    </MenuItemGroupsNavScrollView>
  )
}

MenuItemGroupsNavScroll.displayName = 'MenuItemGroupsNavScroll'
MenuItemGroupsNavScroll.propTypes = {
  items: propTypes.array,
  scrollContainer: propTypes.any,
  scrollOffset: propTypes.number,
}

export default MenuItemGroupsNavScroll
