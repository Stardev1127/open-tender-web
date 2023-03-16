import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { isMobile } from 'react-device-detect'
import { makeSlides } from '@open-tender/js'
import { BackgroundLoading, Slider } from '../..'

const AccountSliderView = styled.div`
  display: none;
  flex: 1;
  width: 100%;
  padding: 0 ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: flex;
    min-height: 16rem;
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
    // margin: calc(${(props) => props.theme.layout.marginMobile} / 2) 0;
    margin: 2rem 0;
  }

  & > div {
    overflow: hidden;
    border-radius: ${(props) => props.theme.border.radius};
  }
`

const AccountSlider = ({ announcements, style }) => {
  const { settings, entities, loading, error } = announcements || {}
  const slides = error ? null : makeSlides(entities, isMobile)
  const isLoading = loading === 'pending'

  if (!slides) return null

  return (
    <AccountSliderView style={style}>
      {isLoading ? (
        <BackgroundLoading />
      ) : slides ? (
        <Slider settings={settings} slides={slides} />
      ) : null}
    </AccountSliderView>
  )
}

AccountSlider.displayName = 'AccountSlider'
AccountSlider.propTypes = {
  announcements: propTypes.object,
  style: propTypes.object,
}

export default AccountSlider
