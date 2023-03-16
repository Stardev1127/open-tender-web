import { useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import { isMobile } from 'react-device-detect'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { selectMenuSlug } from '@open-tender/redux'
import { makeFeatured } from '@open-tender/js'
import { Container, Content, Loading, Main } from '../..'
import { MenuCategoryHeader, MenuHeader, MenuItems, MenuItem } from '../Menu'
import { MenuContext } from '../Menu/Menu'

const MenuFeaturedView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuFeatured = () => {
  const navigate = useNavigate()
  const { categories, isLoading, siteTitle } = useContext(MenuContext)
  const { items } = useTheme()
  const isSimple = isMobile && items.mobile.perRow > 1 ? true : false
  const menuSlug = useSelector(selectMenuSlug)
  const featured = makeFeatured(categories)
  const shouldRedirect = !isLoading && featured.length === 0

  useEffect(() => {
    if (shouldRedirect) navigate(menuSlug)
  }, [navigate, shouldRedirect, menuSlug])

  if (isLoading) return null

  return (
    <>
      <Helmet>
        <title>Favorites | {siteTitle}</title>
      </Helmet>
      <Content scrollTop={false}>
        <MenuHeader backPath={menuSlug} />
        <Main>
          <MenuFeaturedView>
            <Container>
              <MenuCategoryHeader title="Featured" />
              {isLoading ? (
                <Loading />
              ) : (
                <MenuItems>
                  {featured.map((item, index) => (
                    <MenuItem
                      key={`${item.id}-${index}`}
                      item={item}
                      isSimple={isSimple}
                    />
                  ))}
                </MenuItems>
              )}
            </Container>
          </MenuFeaturedView>
        </Main>
      </Content>
    </>
  )
}

MenuFeatured.displayName = 'MenuFeatured'
MenuFeatured.propTypes = {}

export default MenuFeatured
