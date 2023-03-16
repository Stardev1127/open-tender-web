import styled from '@emotion/styled'
import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectCurrentCategory,
  selectMenuSlug,
  setCurrentCategory,
} from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { MenuContext } from '../Menu/Menu'

const CategorySwitchView = styled.div`
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: ${(props) => props.theme.layout.navHeight};
  height: ${(props) => props.theme.layout.navHeight};
  background-color: ${(props) => props.theme.bgColors.dark};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: ${(props) => props.theme.layout.navHeightMobile};
    height: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const CategorySwitchScroll = styled.div`
  width: 100%;
  overflow-x: scroll;
  transition: all 500ms ease;
  text-align: center;

  &::-webkit-scrollbar {
    display: none;
  }

  ul {
    position: relative;
    display: inline-flex;
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

const CategorySwitchButton = styled.button`
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

const CategorySwitch = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const stickyRef = useRef(null)
  const navRef = useRef(null)
  // const [stuck, setStuck] = useState(false)
  const [offset, setOffset] = useState(0)
  const { categories } = useContext(MenuContext)
  const category = useSelector(selectCurrentCategory)
  const menuSlug = useSelector(selectMenuSlug)

  const browse = (category) => {
    window.scrollTo(0, 0)
    dispatch(setCurrentCategory(category))
    navigate(`${menuSlug}/category/${slugify(category.name)}`)
  }

  useEffect(() => {
    if (offset) {
      navRef.current.scrollLeft = offset
    }
  }, [offset])

  useEffect(() => {
    const navActive = document.getElementById(`nav-${category.id}`)
    if (navActive) {
      const navOffset = navActive.getBoundingClientRect().x
      const parentOffset = navActive.offsetParent.getBoundingClientRect().x
      setOffset(navOffset - parentOffset)
    }
  }, [category.id])

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (stickyRef.current) {
  //       setStuck(stickyRef.current.getBoundingClientRect().top < 0)
  //     }
  //   }
  //   window.addEventListener('scroll', handleScroll)
  //   return () => {
  //     window.removeEventListener('scroll', () => handleScroll)
  //   }
  // }, [])

  return (
    <CategorySwitchView ref={stickyRef}>
      <CategorySwitchScroll ref={navRef}>
        <ul>
          {categories.map((i) => (
            <li key={i.id} id={`nav-${i.id}`}>
              <CategorySwitchButton
                onClick={() => browse(i)}
                active={i.id === category.id}
              >
                {i.name}
              </CategorySwitchButton>
            </li>
          ))}
        </ul>
      </CategorySwitchScroll>
    </CategorySwitchView>
  )
}

export default CategorySwitch
