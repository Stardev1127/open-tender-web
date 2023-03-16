import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box, Heading, Preface } from '@open-tender/components'
import { useTheme } from '@emotion/react'

const CardView = styled(Box)`
  position: relative;
  height: 100%;
  padding: 1.5rem 1.5rem 1rem;
  ${(props) =>
    !props.hasBox
      ? `border: ${props.theme.border.width} solid ${props.theme.border.color};`
      : ''};
`

const CardContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

const CardHeader = styled.div`
  flex-grow: 0;
`

const CardPreface = styled.p`
  span {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const CardTitle = styled(Heading)`
  margin: 0.5rem 0;
`

const CardSubtitle = styled.p`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const CardContent = styled.div`
  margin: 1rem 0 0;
  flex-grow: 1;

  > p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
  }
`

const CardFooter = styled.div`
  flex-grow: 0;
  margin: 1.9rem 0 0;

  > div {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    button {
      margin: 0 0.5rem 0.5rem 0;
      &:last-child {
        margin: 0;
      }
    }
  }
`

const Card = ({ tag, preface, title, subtitle, content, footer, style }) => {
  const theme = useTheme()
  const hasBox = theme.cards.default.bgColor !== 'transparent'
  return (
    <CardView hasBox={hasBox} style={style}>
      {tag}
      <CardContainer>
        <CardHeader>
          {preface && (
            <CardPreface>
              <Preface>{preface}</Preface>
            </CardPreface>
          )}
          {title && (
            <CardTitle as="p" className="title">
              {title}
            </CardTitle>
          )}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter>
          <div>{footer}</div>
        </CardFooter>
      </CardContainer>
    </CardView>
  )
}

Card.displayName = 'Card'
Card.propTypes = {
  tag: propTypes.element,
  preface: propTypes.oneOfType([propTypes.string, propTypes.element]),
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  subtitle: propTypes.oneOfType([propTypes.string, propTypes.element]),
  content: propTypes.element,
  footer: propTypes.element,
  style: propTypes.object,
}

export default Card
