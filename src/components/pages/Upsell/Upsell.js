import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled'
import {
  selectCartIds,
  selectCustomer,
  selectMenu,
  selectMenuSlug,
} from '@open-tender/redux'
import { makeMenuItemLookup, makeUpsellItems } from '@open-tender/js'
import {
  Body,
  ButtonLink,
  ButtonStyled,
  Heading,
} from '@open-tender/components'
import { selectBrand, selectContentSection } from '../../../slices'
import { Back } from '../../buttons'
import {
  Container,
  Content,
  Header,
  Main,
  SeeMoreLink,
  UpsellItem,
} from '../..'
import { useNavigate } from 'react-router-dom'

const UpsellView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const UpsellHeader = styled.div`
  text-align: center;
  margin: 0 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const UpsellTitle = styled(Heading)`
  display: block;
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
`

const UpsellSubtitle = styled(Body)`
  display: block;
  margin: 0.75rem 0 0;
  // font-size: ${(props) => props.theme.fonts.sizes.small};
`

const UpsellItems = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: auto;
  margin: 0 -${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 -${(props) => props.theme.layout.paddingMobile};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const UpsellItemsWrapper = styled.div`
  flex: ${(props) => (props.count >= 4 ? '1' : '0')} 0 31rem;
  padding: 3rem 0;
  margin-right: ${(props) => props.theme.layout.padding};
  @media (max-width: 1390px) {
    flex: 0 0 31rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 22rem;
    margin-right: ${(props) => props.theme.layout.paddingMobile};
  }

  &:first-of-type {
    margin-left: ${(props) => props.theme.layout.padding};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-left: ${(props) => props.theme.layout.paddingMobile};
    }
  }

  & > div {
    height: 100%;
  }
`

const UpsellFooter = styled.div`
  text-align: center;
  padding: ${(props) => props.theme.layout.padding} 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: ${(props) => props.theme.layout.paddingMobile} 0 0;
  }
`

const Upsell = () => {
  const navigate = useNavigate()
  const [itemAdded, setItemAdded] = useState(false)
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)
  const menuSlug = useSelector(selectMenuSlug)
  const cartIds = useSelector(selectCartIds)
  const { categories, soldOut } = useSelector(selectMenu)
  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])
  const upsells = useSelector(selectContentSection('upsells')) || {}
  const { show, title, subtitle, decline, proceed } = upsells?.checkout || {}
  const menuItems = cartIds.map((id) => itemLookup[id])
  const upsellItemIds = menuItems.reduce(
    (arr, i) => [...arr, ...(i?.upsell_items || i?.upsellItems || [])],
    []
  )
  const uniqueIds = [...new Set(upsellItemIds)]
  const itemIds = uniqueIds.filter(
    (id) => !cartIds.includes(id) && !soldOut.includes(id)
  )
  const upsellItems = makeUpsellItems(itemIds, itemLookup)
  const hasItems = upsellItems.length > 0
  const path = auth ? '/checkout' : '/checkout/guest'
  const skip = !show || !hasItems

  const checkout = () => navigate(path)

  useEffect(() => {
    if (skip) navigate(path)
  }, [skip, path, navigate])

  if (skip) return null

  return (
    <>
      <Helmet>
        <title>Add-ons | {siteTitle}</title>
      </Helmet>
      <Content>
        <Header
          left={<Back path={menuSlug} />}
          right={<SeeMoreLink to={path} text="Skip" />}
        />
        <Main>
          <UpsellView>
            <Container>
              <UpsellHeader>
                <UpsellTitle>{title}</UpsellTitle>
                {subtitle && <UpsellSubtitle>{subtitle}</UpsellSubtitle>}
              </UpsellHeader>
              <UpsellItems className="centered">
                {upsellItems.map((item) => (
                  <UpsellItemsWrapper key={item.id} count={upsellItems.length}>
                    <UpsellItem
                      orderItem={item}
                      showDesc={false}
                      addCallback={() => setItemAdded(true)}
                    />
                  </UpsellItemsWrapper>
                ))}
              </UpsellItems>
              <UpsellFooter>
                {itemAdded ? (
                  <ButtonStyled onClick={checkout}>{proceed}</ButtonStyled>
                ) : (
                  <ButtonLink onClick={checkout}>{decline}</ButtonLink>
                )}
              </UpsellFooter>
            </Container>
          </UpsellView>
        </Main>
      </Content>
    </>
  )
}

export default Upsell
