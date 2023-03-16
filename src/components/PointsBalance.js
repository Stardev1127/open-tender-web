import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { formatQuantity } from '@open-tender/js'
import { Heading } from '@open-tender/components'
import { Star } from './icons'

const PointsBalanceView = styled('div')`
  text-align: center;
`

const PointsBalancePoints = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    display: block;
    margin: 0 0 0 -0.1rem;
    font-size: ${(props) => props.theme.fonts.sizes.h1};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.h2};
    }
  }

  span {
    display: block;
    width: 3rem;
    height: 3rem;
    margin: 0 0 0 0.5rem;
    line-height: 0;
    color: ${(props) => props.theme.colors.primary};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0 0 0 0.3rem;
      width: 2.2rem;
      height: 2.2rem;
    }

    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const PointsBalance = ({ name, points }) => {
  return (
    <PointsBalanceView>
      <PointsBalancePoints>
        <Heading as="p">{formatQuantity(points)}</Heading>
        <span>
          <Star />
        </span>
      </PointsBalancePoints>
      <p>{name} Balance</p>
    </PointsBalanceView>
  )
}

PointsBalance.displayName = 'PointsBalance'
PointsBalance.propTypes = {
  name: propTypes.string,
  points: propTypes.number,
}

export default PointsBalance
