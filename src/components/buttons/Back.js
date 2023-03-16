import propTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftCircle } from '../icons'
import { Icon } from '.'

const Back = ({ path = '/account', onClick }) => {
  const navigate = useNavigate()
  const back = () => navigate(path)

  return (
    <Icon margin="0 0 0 -1.25rem" onClick={onClick || back}>
      <ChevronLeftCircle size={25} />
    </Icon>
  )
}

Back.displayName = 'Back'
Back.propTypes = {
  path: propTypes.string,
}

export default Back
