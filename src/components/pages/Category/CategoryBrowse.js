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
import { Body, Heading } from '@open-tender/components'
import { Container } from '../..'
import { MenuContext } from '../Menu/Menu'

const CategoryBrowseContainer = styled.div``

const CategoryBrowseView = styled.nav`
  display: block;
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: ${(props) => props.theme.layout.navHeight};
  height: ${(props) => props.theme.layout.navHeight};
  border-bottom: ${(props) => props.theme.border.width} solid
    ${(props) => (props.stuck ? props.theme.border.color : 'transparent')};
  background-color: ${(props) => props.theme.bgColors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    top: ${(props) => props.theme.layout.navHeightMobile};
    height: ${(props) => props.theme.layout.navHeightMobile};
    display: none;
  }

  & > div {
    height: 100%;
  }
`

const CategoryBrowseCategories = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: ${(props) => (props.stuck ? 'flex-end' : 'flex-end')};
  overflow-x: scroll;
  margin: 0 -${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 -${(props) => props.theme.layout.paddingMobile};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const CategoryBrowseCategory = styled.div`
  margin: 0 4rem 0 0;
  white-space: nowrap;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    margin: 0 3rem 0 0;
  }

  &:first-of-type {
    margin-left: ${(props) => props.theme.layout.padding};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-left: ${(props) => props.theme.layout.paddingMobile};
    }
  }

  &:last-of-type {
    margin-right: ${(props) => props.theme.layout.padding};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-right: ${(props) => props.theme.layout.paddingMobile};
    }
  }
`

const CategoryBrowseCategoryCurrent = styled(Heading)`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 1;
  padding: 1rem 0 0.3rem;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  border-bottom: 0.1rem solid ${(props) => props.theme.border.color};
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const CategoryBrowseCategoryButton = styled(Body)`
  display: block;
  flex-grow: 0;
  flex-shrink: 0;
  line-height: 1;
  padding: 1rem 0 0.3rem;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  border-bottom: 0.1rem solid transparent;
  @media (max-width: ${(props) => props.theme.breakpoints.narrow}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const CategoryBrowse = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const categoryBrowse = useRef(null)
  const [stuck, setStuck] = useState(false)
  const { categories } = useContext(MenuContext)
  const category = useSelector(selectCurrentCategory)
  const menuSlug = useSelector(selectMenuSlug)

  const browse = (category) => {
    window.scrollTo(0, 0)
    dispatch(setCurrentCategory(category))
    navigate(`${menuSlug}/category/${slugify(category.name)}`)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (categoryBrowse.current) {
        setStuck(categoryBrowse.current.getBoundingClientRect().top < 0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', () => handleScroll)
    }
  }, [])

  return (
    <CategoryBrowseContainer ref={categoryBrowse}>
      <CategoryBrowseView stuck={stuck}>
        <Container>
          <CategoryBrowseCategories stuck={stuck}>
            {categories.map((i) => (
              <CategoryBrowseCategory key={i.id}>
                {i.id === category.id ? (
                  <CategoryBrowseCategoryCurrent>
                    {i.name}
                  </CategoryBrowseCategoryCurrent>
                ) : (
                  <CategoryBrowseCategoryButton
                    as="button"
                    onClick={() => browse(i)}
                  >
                    {i.name}
                  </CategoryBrowseCategoryButton>
                )}
              </CategoryBrowseCategory>
            ))}
          </CategoryBrowseCategories>
        </Container>
      </CategoryBrowseView>
    </CategoryBrowseContainer>
  )
}

export default CategoryBrowse
