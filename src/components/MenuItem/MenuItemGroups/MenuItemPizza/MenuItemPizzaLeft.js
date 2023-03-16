import styled from '@emotion/styled'

const MenuItemPizzaLeftView = styled.button`
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

const MenuItemPizzaLeftInner = styled.span`
  content: '';
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
  height: 2rem;
  width: 1.1rem;
  border-radius: 2.4rem 0 0 2.4rem;
  background-color: ${(props) => props.theme.colors.primary};
`

const MenuItemPizzaLeft = ({ onClick, isSelected }) => {
  return (
    <MenuItemPizzaLeftView onClick={onClick} isSelected={isSelected}>
      <MenuItemPizzaLeftInner />
    </MenuItemPizzaLeftView>
  )
}

export default MenuItemPizzaLeft
