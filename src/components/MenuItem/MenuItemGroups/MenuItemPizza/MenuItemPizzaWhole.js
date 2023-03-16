import styled from '@emotion/styled'

const MenuItemPizzaWholeView = styled.button`
  content: '';
  display: inline-block;
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border-radius: 100%;
  border-width: 0.1rem;
  border-style: solid;
  transition: all 0.15s ease;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
`

const MenuItemPizzaWholeInner = styled.span`
  content: '';
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  background-color: ${(props) => props.theme.colors.primary};
  // opacity: ${(props) => (props.isSelected ? '1' : '0.5')};
`

const MenuItemPizzaWhole = ({ onClick, isSelected }) => {
  return (
    <MenuItemPizzaWholeView onClick={onClick} isSelected={isSelected}>
      <MenuItemPizzaWholeInner />
    </MenuItemPizzaWholeView>
  )
}

export default MenuItemPizzaWhole
