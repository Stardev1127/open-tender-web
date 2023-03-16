import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Body, Heading } from '@open-tender/components'

const MenuCategoryHeaderView = styled.div`
  margin: 0 auto 3rem;
  max-width: ${(props) => props.theme.items.desktop.containerMaxWidth};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 auto ${(props) => props.theme.layout.marginMobile};
    max-width: ${(props) => props.theme.items.mobile.containerMaxWidth};
  }
`

const MenuCategoryHeaderTitle = styled(Heading)`
  margin: 0 0 0 -0.1rem;
  font-size: ${(props) =>
    props.theme.fonts.sizes[props.isChild ? 'xBig' : 'xxBig']};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) =>
      props.theme.fonts.sizes[props.isChild ? 'big' : 'xBig']};
  }
`

const MenuCategoryHeaderSubtitle = styled(Body)`
  margin: 1rem 0 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0.5rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const MenuCategoryHeader = ({ title, subtitle, isChild }) => {
  return (
    <MenuCategoryHeaderView>
      <MenuCategoryHeaderTitle as="p" isChild={isChild}>
        {title}
      </MenuCategoryHeaderTitle>
      {subtitle && (
        <MenuCategoryHeaderSubtitle as="p">
          {subtitle}
        </MenuCategoryHeaderSubtitle>
      )}
    </MenuCategoryHeaderView>
  )
}

MenuCategoryHeader.displayName = 'MenuCategoryHeader'
MenuCategoryHeader.propTypes = {
  title: propTypes.string,
  subtitle: propTypes.string,
  isChild: propTypes.bool,
}

export default MenuCategoryHeader
