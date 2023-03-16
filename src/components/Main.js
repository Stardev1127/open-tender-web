import propTypes from 'prop-types'
import styled from '@emotion/styled'

const MainView = styled.main`
  label: Main;

  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.bgColors[props.bgColor]};
  padding-top: ${(props) => props.theme.layout.navHeight};
  ${(props) =>
    props.imageUrl
      ? `background-image: url(${props.imageUrl});
    background-color: ${props.theme.bgColors.dark};`
      : null}
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding-top: ${(props) => props.theme.layout.navHeightMobile};
  }
`

const Main = ({ bgColor = 'primary', imageUrl, style, children }) => {
  return (
    <MainView
      role="main"
      id="main"
      bgColor={bgColor}
      imageUrl={imageUrl}
      style={style}
    >
      {children}
    </MainView>
  )
}

Main.displayName = 'Main'
Main.propTypes = {
  padding: propTypes.string,
  bgColor: propTypes.string,
  imageUrl: propTypes.string,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Main
