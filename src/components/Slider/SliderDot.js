import styled from '@emotion/styled'

const SliderDot = styled.button`
  width: 100%;
  margin: 0 0.3rem;
  height: 0.6rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.colors.light};
  max-width: ${(props) => (props.active ? '3rem' : '0.6rem')};
  opacity: ${(props) => (props.active ? '1' : '0.5')};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    max-width: ${(props) => (props.active ? '1.5rem' : '0.3rem')};
    height: 0.3rem;
    border-radius: 0.15rem;
  }
`

SliderDot.displayName = 'SliderDot'

export default SliderDot
