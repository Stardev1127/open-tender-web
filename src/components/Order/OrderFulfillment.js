import propTypes from 'prop-types'

const OrderFulfillment = ({
  arrival_info,
  has_arrived,
  vehicle_color,
  vehicle_id,
  vehicle_type,
}) => {
  return (
    <>
      <p>
        {vehicle_color} {vehicle_type}
      </p>
      {vehicle_id ? <p>With license plate {vehicle_id}</p> : null}
      {has_arrived && (
        <p>Has arrived{arrival_info ? ` in spot ${arrival_info}` : null}</p>
      )}
    </>
  )
}

OrderFulfillment.displayName = 'OrderFulfillment'
OrderFulfillment.propTypes = {
  arrival_info: propTypes.string,
  has_arrived: propTypes.bool,
  vehicle_color: propTypes.string,
  vehicle_id: propTypes.string,
  vehicle_type: propTypes.string,
}

export default OrderFulfillment
