import { useContext } from 'react'
import styled from '@emotion/styled'
import { capitalize, slugify } from '@open-tender/js'
import { MenuContext } from './Menu'
import MenuCategory from './MenuCategory'
import CategoryNav from '../Category/CategoryNav'

const makeMenuSections = (displayedSections) => {
  return Object.entries(displayedSections).map(([section, items]) => {
    return {
      name: capitalize(section),
      items,
    }
  })
}

const MenuScrollableView = styled.div``

const MenuScrollable = ({ displayedSections }) => {
  const { categories } = useContext(MenuContext)
  const sections = makeMenuSections(displayedSections)
  // const deals = sections.find((i) => i.name === 'Deals')
  const other = sections
    .filter((i) => i.name !== 'Deals')
    .map((i) => ({ ...i, items: i.items.slice(0, 8) }))
  const navItems = [
    ...other.map((i) => i.name),
    ...categories.map((i) => i.name),
  ]
  return (
    <MenuScrollableView>
      <CategoryNav items={navItems} />
      {other.map((section) => (
        <div key={section.name} id={slugify(section.name)} name="section">
          <MenuCategory category={section} />
        </div>
      ))}
      {categories.map((category) => (
        <div key={category.id} id={slugify(category.name)} name="section">
          <MenuCategory category={category} />
          {category.children.map((child) => (
            <MenuCategory key={child.id} category={child} isChild={true} />
          ))}
        </div>
      ))}
    </MenuScrollableView>
  )
}

export default MenuScrollable
