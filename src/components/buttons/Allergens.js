import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { openModal } from '../../slices'
import { Sliders } from '../icons'
import Icon from './Icon'

const Allergens = ({ style }) => {
  const dispatch = useDispatch()

  return (
    <Icon
      onClick={() => dispatch(openModal({ type: 'allergens' }))}
      style={style}
    >
      <Sliders size={19} />
    </Icon>
  )
}

Allergens.displayName = 'Allergens'
Allergens.propTypes = {
  style: propTypes.object,
}

export default Allergens
