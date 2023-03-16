import styled from '@emotion/styled'
import { Container } from '..'

const SliderArrowsView = styled.div`
  label: SliderArrows;
  position: absolute;
  z-index: 12;
  left: 0;
  right: 0;
  ${(props) => props.vertical}: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    ${(props) => props.vertical}: ${(props) =>
      props.theme.layout.paddingMobile};
  }
`

const SliderArrowsContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.horizontal === 'RIGHT' ? 'flex-end' : 'flex-start'};
`

const SliderArrows = ({
  vertical = 'BOTTOM',
  horizontal = 'RIGHT',
  children,
}) => {
  return (
    <SliderArrowsView vertical={vertical.toLowerCase()}>
      <Container>
        <SliderArrowsContent horizontal={horizontal}>
          {children}
        </SliderArrowsContent>
      </Container>
    </SliderArrowsView>
  )
}

SliderArrows.displayName = 'SliderArrows'

export default SliderArrows
