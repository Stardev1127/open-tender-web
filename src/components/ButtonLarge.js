import styled from '@emotion/styled'
import { ButtonStyled } from '@open-tender/components'

const ButtonLargeContent = styled.span`
  width: 100%;
  height: 2.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: block;
  }

  span + span {
    position: relative;
    top: 0.1rem;
  }
`

const ButtonLarge = ({ onClick, text, children, color = 'secondary' }) => {
  return (
    <ButtonStyled onClick={onClick} size="big" color={color}>
      <ButtonLargeContent>
        <span>{text}</span>
        <span>{children}</span>
      </ButtonLargeContent>
    </ButtonStyled>
  )
}

ButtonLarge.displayName = 'ButtonLarge'

export default ButtonLarge
