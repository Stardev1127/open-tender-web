import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '@open-tender/components'

const TagView = styled('span')`
  display: inline-block;
  padding: 0.5rem 1rem 0.5rem;
  border-radius: 1.5rem;
  line-height: 0;
  // color: ${(props) => props.theme.colors.light};
  // background-color: ${(props) => props.theme.colors[props.bgColor]};
  color: ${(props) =>
    props.color ? props.theme[props.color].color : props.theme.colors.light};
  background-color: ${(props) =>
    props.color ? props.theme[props.color].bgColor : props.theme.bgColors.dark};
`

const TagContainer = styled('span')`
  display: flex;
  align-items: center;
  line-height: 0;

  span {
    display: inline-block;
    // padding: 0.1rem 0 0;
  }
`

const TagIcon = styled('span')`
  position: relative;
  // top: -0.1rem;
  width: 1.2rem;
  height: 1.2rem;
  padding: 0;
  margin-right: 0.5rem;
  flex-shrink: 0;
  color: ${(props) =>
    props.color ? props.theme[props.color].color : props.theme.colors.light};
`

const TagText = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) =>
    props.color ? props.theme[props.color].color : props.theme.colors.light};
  line-height: 1.2;
`

const Tag = ({ text, icon, color }) => {
  return (
    <TagView color={color}>
      <TagContainer>
        {icon && <TagIcon color={color}>{icon}</TagIcon>}
        <TagText color={color}>{text}</TagText>
      </TagContainer>
    </TagView>
  )
}

Tag.displayName = 'Tag'
Tag.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
  bgColor: propTypes.string,
}
export default Tag
