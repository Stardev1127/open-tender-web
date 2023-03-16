import styled from '@emotion/styled'

const ModalView = styled('div')`
  position: relative;
  width: 48rem;
  max-width: 90%;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-radius: ${(props) => props.theme.border.radius};
  margin: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile};
  }
`

export default ModalView
