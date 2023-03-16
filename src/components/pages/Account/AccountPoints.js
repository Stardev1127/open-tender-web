import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { formatQuantity } from '@open-tender/js'
import { Heading } from '@open-tender/components'
import { Star } from '../../icons'

const AccountPointsView = styled.div`
  flex-grow: 0;
`

const AccountPointsCount = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  p {
    display: block;
    margin: 0 0 0 -0.1rem;
    font-size: ${(props) => props.theme.fonts.sizes.h2};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h4};
    }
  }

  span {
    display: block;
    width: 2.4rem;
    height: 2.4rem;
    margin: 0 0 0 0.5rem;
    line-height: 0;
    color: ${(props) => props.theme.colors.primary};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0 0 0 0.3rem;
      width: 2rem;
      height: 2rem;
    }

    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const AccountPointsBalance = styled.p`
  margin: 0.3rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const AccountPoints = ({ name, points }) => {
  return (
    <AccountPointsView>
      <AccountPointsCount>
        <Heading as="p">{formatQuantity(points)}</Heading>
        <span>
          <Star />
        </span>
      </AccountPointsCount>
      {/* <AccountPointsBalance>{name} Balance</AccountPointsBalance> */}
      <AccountPointsBalance>
        <Link to="/loyalty">see details</Link>
      </AccountPointsBalance>
    </AccountPointsView>
  )
}

AccountPoints.displayName = 'AccountPoints'
AccountPoints.propTypes = {
  name: propTypes.string,
  points: propTypes.number,
}

export default AccountPoints
