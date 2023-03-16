import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { slugify } from '@open-tender/js'
import MenuItemGroupHeaderAlt from './MenuItemGroupHeaderAlt'
import MenuItemGroupsNav from './MenuItemGroupsNav'
import MenuItemOption from './MenuItemOption'
import MenuItemOptionSquare from './MenuItemOptionSquare'

const MenuItemGroupsView = styled.div`
  label: MenuItemGroups;
`

const MenuItemGroupsList = styled.div`
  padding: 0 ${(props) => props.theme.item.desktop.padding};
  margin: 4.5rem 0 ${(props) => props.theme.item.desktop.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 0 ${(props) => props.theme.item.mobile.padding};
    margin: 4.5rem 0 ${(props) => props.theme.item.mobile.padding};
  }
`

const MenuItemGroup = styled.div`
  margin: 0 0 3rem;

  &:last-of-type {
    margin: 0;
  }
`

const MenuItemOptions = styled.div`
  width: 100%;
`

const MenuItemOptionsSquare = styled.div`
  margin: 2rem -0.6rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
`

const MenuItemGroups = ({
  builtItem,
  displaySettings,
  toggleOption,
  incrementOption,
  decrementOption,
  setOptionQuantity,
  scrollContainer,
  topOffset,
  headerHeight,
}) => {
  const { groups } = builtItem
  const nonSizeGroups = groups.filter((i) => !i.isSize)
  const { modifiersType } = displaySettings
  const showCards = modifiersType === 'CARDS'
  const scrollOffset = topOffset + headerHeight

  return (
    <MenuItemGroupsView>
      {scrollContainer && scrollOffset ? (
        <MenuItemGroupsNav
          items={nonSizeGroups}
          scrollContainer={scrollContainer}
          scrollOffset={scrollOffset}
        />
      ) : null}
      <MenuItemGroupsList>
        {nonSizeGroups.map((group) => (
          <MenuItemGroup key={group.id} id={slugify(group.name)} name="section">
            <MenuItemGroupHeaderAlt group={group} />
            {showCards ? (
              <MenuItemOptionsSquare>
                {group.options.map((option) => (
                  <MenuItemOptionSquare
                    key={`${group.id}-${option.id}`}
                    group={group}
                    option={option}
                    incrementOption={incrementOption}
                    decrementOption={decrementOption}
                  />
                ))}
              </MenuItemOptionsSquare>
            ) : (
              <MenuItemOptions>
                {group.options.map((option, index) => (
                  <MenuItemOption
                    key={`${group.id}-${option.id}`}
                    index={index}
                    group={group}
                    option={option}
                    toggleOption={toggleOption}
                    incrementOption={incrementOption}
                    decrementOption={decrementOption}
                    setOptionQuantity={setOptionQuantity}
                  />
                ))}
              </MenuItemOptions>
            )}
          </MenuItemGroup>
        ))}
      </MenuItemGroupsList>
    </MenuItemGroupsView>
  )
}

MenuItemGroups.displayName = 'MenuItemGroups'
MenuItemGroups.propTypes = {
  builtItem: propTypes.object,
  displaySettings: propTypes.object,
  toggleOption: propTypes.func,
  incrementOption: propTypes.func,
  decrementOption: propTypes.func,
  setOptionQuantity: propTypes.func,
  scrollContainer: propTypes.any,
  topOffset: propTypes.number,
  headerHeight: propTypes.number,
}

export default MenuItemGroups
