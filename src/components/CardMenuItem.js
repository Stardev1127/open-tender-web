import styled from '@emotion/styled'

const CardMenuItem = styled.div`
  label: CardMenuItem;
  border-style: solid;
  border-width: ${(props) => props.theme.cards.menuItem.borderWidth};
  border-color: ${(props) => props.theme.cards.menuItem.borderColor};
  border-radius: ${(props) => props.theme.cards.menuItem.borderRadius};
  background-color: ${(props) => props.theme.cards.menuItem.bgColor};
  box-shadow: ${(props) => props.theme.cards.menuItem.boxShadow};
`

// const CardMenuItem = styled.div`
//   label: CardMenuItem;
//   border-style: solid;
//   border-width: ${(props) => props.theme.cards.menuItem.borderWidth};
//   border-color: ${(props) => props.theme.cards.menuItem.borderColor};
//   border-radius: ${(props) => props.theme.cards.menuItem.borderRadius};
//   background-color: ${(props) => props.theme.cards.menuItem.bgColor};
//   box-shadow: ${(props) => props.theme.cards.menuItem.boxShadow};

//   div,
//   p,
//   p:first-of-type,
//   p > span,
//   p > span > span,
//   div > span {
//     ${(props) =>
//       props.theme.cards.menuItem.overrideFontColors
//         ? `color: ${props.theme.cards.menuItem.textColor};`
//         : ''};
//   }

//   div.title,
//   p.title,
//   p:first-of-type.title,
//   p > span.title,
//   div > span.title {
//     ${(props) =>
//       props.theme.cards.menuItem.overrideFontColors
//         ? `color: ${props.theme.cards.menuItem.titleColor};`
//         : ''};
//   }
// `

export default CardMenuItem
