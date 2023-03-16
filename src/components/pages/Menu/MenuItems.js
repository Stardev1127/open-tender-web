import { Children } from 'react'
import styled from '@emotion/styled'

const MenuItemsView = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.items.desktop.containerMaxWidth};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: ${(props) => props.theme.items.mobile.containerMaxWidth};
  }
`

const MenuItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -${(props) => props.theme.items.desktop.gapHalf};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: -${(props) => props.theme.items.mobile.gapHalf};
  }
`

const MenuItemsChild = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: ${(props) => props.theme.items.desktop.width};
  min-width: ${(props) =>
    props.minWidth ? props.minWidth : props.theme.items.desktop.minWidth};
  padding: ${(props) => props.theme.items.desktop.gapHalf};
  margin-bottom: ${(props) => props.theme.items.desktop.marginBottom};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    flex-basis: 50%;
    min-width: ${(props) =>
      props.minWidth ? props.minWidth : props.theme.items.mobile.minWidth};
    padding: ${(props) => props.theme.items.mobile.gapHalf};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-basis: ${(props) => props.theme.items.mobile.width};
    margin-bottom: ${(props) => props.theme.items.mobile.marginBottom};
  }
`

const makeNumbers = (n) => {
  let numbers = []
  for (let i = 2; i <= n; i++) {
    numbers.push(i)
  }
  return numbers
}

const makeEmpty = (perRow, count) => {
  const numbers = makeNumbers(perRow)
  return numbers.reduce((arr, i, index) => {
    const leftOver = count % i
    return leftOver ? [...arr, index] : arr
  }, [])
}

const MenuItems = ({ children, minWidth }) => {
  const perRow = 5
  const arrayChildren = Children.toArray(children)
  const count = arrayChildren.length
  const empty = makeEmpty(perRow, count)
  return (
    <MenuItemsView>
      <MenuItemsContainer>
        {Children.map(arrayChildren, (child) => (
          <MenuItemsChild minWidth={minWidth}>{child}</MenuItemsChild>
        ))}
        {empty.map((idx) => (
          <MenuItemsChild minWidth={minWidth} key={idx} />
        ))}
      </MenuItemsContainer>
    </MenuItemsView>
  )
}

export default MenuItems
