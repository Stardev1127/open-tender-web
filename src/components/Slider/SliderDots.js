import styled from '@emotion/styled'

const SliderDots = styled.div`
  position: absolute;
  z-index: 13;
  bottom: ${(props) => props.theme.layout.padding};
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    bottom: ${(props) => props.theme.layout.paddingMobile};
    padding: 0;
    justify-content: center;
    align-items: center;
  }
`

SliderDots.displayName = 'SliderDots'

export default SliderDots
