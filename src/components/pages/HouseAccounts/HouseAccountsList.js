import propTypes from 'prop-types'
import { orderTypeNamesMap, serviceTypeNamesMap } from '@open-tender/js'

import { QRCode, Row } from '../..'
import styled from '@emotion/styled'

const HouseAccountFinePrint = styled('div')`
  & > p:first-of-type {
    margin: 1rem 0 0;
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const HouseAccountsList = ({ houseAccounts }) => {
  return (
    <div>
      {houseAccounts.map((houseAccount) => {
        const orderType = orderTypeNamesMap[houseAccount.revenue_center_type]
        const orderTypes = orderType ? `${orderType} orders` : 'all order types'
        const serviceType = serviceTypeNamesMap[houseAccount.service_type]
        const serviceTypes = serviceType
          ? `the ${serviceType} service type`
          : 'all service types'
        return (
          <Row
            key={houseAccount.house_account_id}
            icon={
              houseAccount.qr_code_url ? (
                <QRCode
                  src={houseAccount.qr_code_url}
                  alt={`House Account ${houseAccount.pin}`}
                />
              ) : null
            }
            content={
              <>
                <p className="title">{houseAccount.name}</p>
                <p>
                  {houseAccount.approved_contact
                    ? 'Your account has been specifically approved for this house account'
                    : `This house account is approved for all email addresses ending in ${houseAccount.domain}`}
                </p>
                <HouseAccountFinePrint>
                  <p>
                    Approved for <span>{orderTypes}</span> and{' '}
                    <span>{serviceTypes}</span>
                  </p>
                </HouseAccountFinePrint>
              </>
            }
          />
        )
      })}
    </div>
  )
}

HouseAccountsList.displayName = 'HouseAccountsList'
HouseAccountsList.propTypes = {
  houseAccounts: propTypes.array,
}

export default HouseAccountsList
