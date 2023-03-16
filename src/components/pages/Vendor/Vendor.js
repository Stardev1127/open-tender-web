import { useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isMobile } from 'react-device-detect'
import { Helmet } from 'react-helmet'
import { selectCurrentVendor, selectMenuSlug } from '@open-tender/redux'
import { slugify } from '@open-tender/js'
import { Content, Main, PageHero, ScreenreaderTitle } from '../..'
import { MenuContext } from '../Menu/Menu'
import { MenuHeader, MenuCategory } from '../Menu'
import CategoryNav from '../Category/CategoryNav'
import VendorInfo from './VendorInfo'

const VendorView = styled.div``

const VendorHero = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.layout.paddingMobile};
  }
`

const Vendor = () => {
  const navigate = useNavigate()
  const menuSlug = useSelector(selectMenuSlug)
  const { categories, siteTitle, displaySettings } = useContext(MenuContext)
  const { menuHeroChild, menuHeroChildMobile } = displaySettings
  const showHero =
    menuHeroChild === undefined
      ? true
      : isMobile
      ? menuHeroChildMobile
      : menuHeroChild
  const vendor = useSelector(selectCurrentVendor)
  const { revenue_center_id: id, name, large_image_url } = vendor || {}
  const imageUrl = showHero ? large_image_url : null
  const heroHeight = isMobile ? 'auto' : '36rem'
  const vendorCategories = categories.filter((i) => i.revenue_center_id === id)
  const navItems = vendorCategories.map(({ name }) => name)
  const vendorCategory = { name, description: null, items: [] }

  useEffect(() => {
    if (!vendor) navigate(menuSlug)
  }, [vendor, navigate, menuSlug])

  if (!vendor) return null

  return (
    <>
      <Helmet>
        <title>
          Menu - {name} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <MenuHeader backPath={menuSlug} />
        <Main>
          <ScreenreaderTitle>{name}</ScreenreaderTitle>
          <PageHero height={heroHeight} imageUrl={imageUrl}>
            <VendorHero>
              <VendorInfo vendor={vendor} />
            </VendorHero>
          </PageHero>
          {navItems.length > 0 && <CategoryNav items={navItems} />}
          <VendorView>
            {!imageUrl ? <MenuCategory category={vendorCategory} /> : null}
            {vendorCategories.map((cat) => (
              <div key={cat.id} id={slugify(cat.name)} name="section">
                <MenuCategory category={cat} />
                {cat.children.map((child) => (
                  <MenuCategory
                    key={child.id}
                    category={child}
                    isChild={true}
                  />
                ))}
              </div>
            ))}
          </VendorView>
        </Main>
      </Content>
    </>
  )
}

export default Vendor
