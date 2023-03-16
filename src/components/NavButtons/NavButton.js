import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Body, Heading } from '@open-tender/components'
import { ArrowRight } from '../icons'
import { useTheme } from '@emotion/react'
import { isMobile } from 'react-device-detect'

const NavButtonView = styled('button')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
  height: 7rem;
  padding: 0 2rem 0 2.5rem;
  margin: 0 0 1rem;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out ${(props) => props.delay} forwards;
  transition: ${(props) => props.theme.links.transition};
  border-style: solid;
  border-width: ${(props) => props.theme.buttons.sizes.large.borderWidth};
  border-radius: ${(props) => props.theme.buttons.sizes.large.borderRadius};
  border-color: ${(props) => props.theme.buttons.colors.large.borderColor};
  background-color: ${(props) => props.theme.buttons.colors.large.bgColor};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    ${(props) =>
      !props.isButton
        ? `
    padding: 0 0rem 0 1.75rem;
    margin: 0;
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-radius: 0;
    background-color: transparent;
    border-bottom: ${props.theme.border.width} solid
      ${props.theme.border.color};`
        : 'height: auto; min-height: 6.5rem; padding: 0 1.5rem 0 2rem;'}
  }

  &:hover {
    border-color: ${(props) =>
      props.theme.buttons.colors.largeHover.borderColor};
    background-color: ${(props) =>
      props.theme.buttons.colors.largeHover.bgColor};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      ${(props) =>
        !props.isButton
          ? `
      border-color: ${props.theme.border.color};
      background-color: transparent;`
          : `
      border-color: ${props.theme.buttons.colors.large.borderColor};
      background-color: ${props.theme.buttons.colors.large.bgColor};
      `}
    }
  }

  &:last-of-type {
    margin-bottom: 0;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      ${(props) => (!props.isButton ? `border-bottom: 0;` : '')}
    }
  }
`

const NavButtonIcon = styled('span')`
  position: relative;
  width: 1.8rem;
  height: 1.8rem;
  flex-shrink: 0;
  line-height: 0;
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.buttons.colors.large.iconColor};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 1.6rem;
    height: 1.6rem;
  }

  button:hover & {
    color: ${(props) => props.theme.buttons.colors.largeHover.iconColor};
  }
`

const NavButtonText = styled.span`
  flex-grow: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 2.25rem;
  }
`

const NavButtonTitle = styled(Heading)`
  display: block;
  margin: 0;
  margin-left: ${(props) => props.theme.buttons.sizes.large.titleMarginLeft};
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.buttons.colors.large.color};
  font-size: ${(props) => props.theme.buttons.sizes.large.titleFontSize};
  font-weight: ${(props) => props.theme.buttons.sizes.large.titleFontWeight};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-left: ${(props) =>
      props.theme.buttons.sizes.large.titleMarginLeftMobile};
    font-size: ${(props) =>
      props.theme.buttons.sizes.large.titleFontSizeMobile};
  }

  button:hover & {
    color: ${(props) => props.theme.buttons.colors.largeHover.color};
  }
`

const NavButtonSubtitle = styled(Body)`
  display: block;
  margin: 0;
  margin-top: ${(props) => props.theme.buttons.sizes.large.subtitleMarginTop};
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.buttons.colors.large.subtitleColor};
  font-size: ${(props) => props.theme.buttons.sizes.large.subtitleFontSize};
  font-weight: ${(props) => props.theme.buttons.sizes.large.subtitleFontWeight};

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-top: ${(props) =>
      props.theme.buttons.sizes.large.subtitleMarginTopMobile};
    font-size: ${(props) =>
      props.theme.buttons.sizes.large.subtitleFontSizeMobile};
  }

  button:hover & {
    color: ${(props) => props.theme.buttons.colors.largeHover.subtitleColor};
  }
`

const NavButtonArrow = styled('span')`
  position: relative;
  width: 2.2rem;
  height: 2.2rem;
  line-height: 0;
  flex-shrink: 0;
  color: ${(props) => props.theme.buttons.colors.large.iconColor};
  transition: ${(props) => props.theme.links.transition};
  transform: translateX(0);

  button:hover & {
    transform: translateX(1rem);
    color: ${(props) => props.theme.buttons.colors.largeHover.iconColor};

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      transform: translateX(0);
    }
  }
`

const NavButton = ({ title, subtitle, icon, onClick, delay = '0.125s' }) => {
  const theme = useTheme()
  const { showSubtitle, showSubtitleMobile, showButtonApp } =
    theme.buttons.sizes.large
  const show = isMobile ? showSubtitleMobile : showSubtitle

  const onUp = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    onClick()
  }

  return (
    <NavButtonView onClick={onUp} delay={delay} isButton={showButtonApp}>
      <NavButtonIcon>{icon}</NavButtonIcon>
      <NavButtonText>
        <NavButtonTitle>{title}</NavButtonTitle>
        {subtitle && show ? (
          <NavButtonSubtitle>{subtitle}</NavButtonSubtitle>
        ) : null}
      </NavButtonText>
      <NavButtonArrow>
        <ArrowRight strokeWidth={2} />
      </NavButtonArrow>
    </NavButtonView>
  )
}

NavButton.displayName = 'NavButton'
NavButton.propTypes = {
  title: propTypes.string,
  handler: propTypes.func,
  iconName: propTypes.string,
}
export default NavButton
