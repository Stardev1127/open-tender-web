import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ArrowRight } from '../icons'

const RevenueCenterActionView = styled.div`
  display: flex;
  align-items: center;
  margin: 0.75rem 0 0;
`

const RevenueCenterActionIcon = styled.div`
  position: relative;
  top: 0.1rem;
  width: 1.4rem;
  height: 1.5rem;
  line-height: 0;
  color: ${(props) => props.theme.fonts.body.color};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }
`

const RevenueCenterActionArrow = styled(RevenueCenterActionIcon)`
  transition: all 0.15s ease;
  line-height: 0;
  transform: translateX(0);
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: none;
  }

  a:hover &,
  button:hover & {
    transform: translateX(0.5rem);
  }
`

const RevenueCenterActionArrowText = styled.div`
  width: 100%;
  padding: 0 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0;
  }

  p {
    color: ${(props) => props.theme.fonts.body.color};
    font-size: ${(props) => props.theme.fonts.sizes.small};
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    }
  }
`

const RevenueCenterAction = ({ icon, text, style = null }) => {
  return (
    <RevenueCenterActionView style={style}>
      <RevenueCenterActionIcon>{icon}</RevenueCenterActionIcon>
      <RevenueCenterActionArrowText>
        <p>{text}</p>
      </RevenueCenterActionArrowText>
      <RevenueCenterActionArrow>
        <ArrowRight />
      </RevenueCenterActionArrow>
    </RevenueCenterActionView>
  )
}

RevenueCenterAction.displayName = 'RevenueCenterAction'
RevenueCenterAction.propTypes = {
  icon: propTypes.element,
  text: propTypes.oneOfType([propTypes.string, propTypes.element]),
  style: propTypes.object,
}

export default RevenueCenterAction
