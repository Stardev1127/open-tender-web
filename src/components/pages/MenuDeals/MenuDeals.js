import { useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { selectMenuSlug } from '@open-tender/redux'
import { Container, Content, Loading, Main, Reward } from '../..'
import { MenuCategoryHeader, MenuHeader, MenuItems } from '../Menu'
import { MenuContext } from '../Menu/Menu'

const MenuDealsView = styled.div`
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const MenuDeals = () => {
  const navigate = useNavigate()
  const { deals, isLoading, siteTitle } = useContext(MenuContext)
  const menuSlug = useSelector(selectMenuSlug)
  const shouldRedirect = !isLoading && deals.length === 0

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
          <MenuDealsView>
            <Container>
              <MenuCategoryHeader
                title="Deals"
                subtitle="Valid deals can be applied on the Checkout page"
              />
              {isLoading ? (
                <Loading />
              ) : (
                <MenuItems>
                  {deals.map((item) => (
                    <Reward key={item.discount_id} item={item} />
                  ))}
                </MenuItems>
              )}
            </Container>
          </MenuDealsView>
        </Main>
      </Content>
    </>
  )
}

MenuDeals.displayName = 'MenuDeals'
MenuDeals.propTypes = {}

export default MenuDeals
