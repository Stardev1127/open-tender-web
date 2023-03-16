import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { selectOrder, selectCustomerPoints } from '@open-tender/redux'
import { formatQuantity } from '@open-tender/js'
import { ButtonStyled } from '@open-tender/components'
import { openModal } from '../../slices'
import { Star } from '../icons'

const PointsTitle = styled.span``

const PointsIcon = styled.span`
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 0 0 0.4rem;
`

const defaultStyle = { paddingTop: '0', paddingBottom: '0', height: '3.2rem' }

const Points = ({ color = 'cart', size = 'small', style = defaultStyle }) => {
  const dispatch = useDispatch()
  const order = useSelector(selectOrder)
  const loyaltyPoints = useSelector(selectCustomerPoints(order.orderType))
  const { name, points } = loyaltyPoints || {}

  const onClick = () => {
    dispatch(openModal({ type: 'points' }))
  }

  return points ? (
    <ButtonStyled
      onClick={onClick}
      label={`${name} balance`}
      icon={null}
      color={color}
      size={size}
      style={style}
    >
      <PointsTitle>{formatQuantity(points)}</PointsTitle>
      <PointsIcon>
        <Star />
      </PointsIcon>
    </ButtonStyled>
  ) : null
}

Points.displayName = 'Points'
Points.propTypes = {
  color: propTypes.string,
  size: propTypes.string,
  style: propTypes.object,
}

export default Points
