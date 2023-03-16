import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { selectCartIds, selectMenu } from '@open-tender/redux'
import { makeMenuItemLookup, makeUpsellItems } from '@open-tender/js'
import { Body, Heading } from '@open-tender/components'
import { selectContentSection } from '../slices'
import UpsellItem from './UpsellItem'

const UpsellItemsView = styled.div`
  padding: 2rem 0 0;
`

const UpsellItemsHeader = styled.div`
  margin: 0 2rem 0.5rem;
`

const UpsellItemsTitle = styled(Heading)`
  display: block;
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const UpsellItemsSubtitle = styled(Body)`
  display: block;
  margin: 0.75rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const UpsellItemsItems = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: stretch;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

const UpsellItemsItem = styled.div`
  flex: 0 0 31rem;
  padding: 1.5rem 0;
  margin-right: 2rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex: 0 0 22rem;
    margin-right: 2rem;
  }

  &:first-of-type {
    margin-left: 2rem;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-left: 2rem;
    }
  }

  & > div {
    height: 100%;
  }
`

const UpsellItems = () => {
  const cartIds = useSelector(selectCartIds)
  const { categories, soldOut } = useSelector(selectMenu)
  const itemLookup = useMemo(() => makeMenuItemLookup(categories), [categories])
  const upsells = useSelector(selectContentSection('upsells')) || {}
  const { show, title, subtitle } = upsells?.cart || {}

  if (!show) return null

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

  if (!upsellItems.length) return null

  return (
    <UpsellItemsView>
      <UpsellItemsHeader>
        <UpsellItemsTitle>{title}</UpsellItemsTitle>
        {subtitle && <UpsellItemsSubtitle>{subtitle}</UpsellItemsSubtitle>}
      </UpsellItemsHeader>
      <UpsellItemsItems className="centered">
        {upsellItems.map((item) => (
          <UpsellItemsItem key={item.id}>
            <UpsellItem orderItem={item} showDesc={false} />
          </UpsellItemsItem>
        ))}
      </UpsellItemsItems>
    </UpsellItemsView>
  )
}

export default UpsellItems
