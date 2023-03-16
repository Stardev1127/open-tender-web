import styled from '@emotion/styled'

const ButtonText = styled('span')`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export default ButtonText
