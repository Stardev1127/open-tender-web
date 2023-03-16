import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { BackgroundImage } from '../..'

const AccountHeroView = styled.div`
  label: AccountHero;
  display: flex;
  width: 100%;
  height: 80vh;
  min-height: 64rem;
  border-radius: ${(props) => props.theme.border.radius};
  overflow: hidden;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 0 ${(props) => props.theme.layout.paddingMobile};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile} 0 0;
  }
`

const AccountHero = ({ imageUrl }) => {
  return (
    <AccountHeroView>
      <BackgroundImage imageUrl={imageUrl} />
    </AccountHeroView>
  )
}

AccountHero.displayName = 'AccountHero'
AccountHero.propTypes = {
  imageUrl: propTypes.string,
}

export default AccountHero
