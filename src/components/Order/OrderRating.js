import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Star } from '../icons'

const OrderRatingView = styled.div`
  p + p {
    margin: 0.8rem 0 0;
  }
`

const OrderRatingStars = styled('div')`
  display: flex;
  margin: 0.25rem 0 0.5rem;

  span {
    display: block;
    margin: 0 0.5rem 0 0;
    width: 2rem;
    height: 2rem;
    color: ${(props) => props.theme.colors.primary};

    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const OrderRating = ({ rating, comments }) => {
  const stars = []
  for (let i = 0; i < rating; i++) {
    stars.push(i)
  }
  return (
    <OrderRatingView>
      <p>
        <OrderRatingStars>
          {stars.map((star) => (
            <span key={star}>
              <Star />
            </span>
          ))}
        </OrderRatingStars>
      </p>
      {comments.length ? <p>{comments}</p> : null}
    </OrderRatingView>
  )
}

OrderRating.displayName = 'OrderRating'
OrderRating.propTypes = {
  rating: propTypes.number,
  comments: propTypes.string,
}

export default OrderRating
