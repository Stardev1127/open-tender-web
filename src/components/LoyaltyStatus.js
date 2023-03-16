import styled from '@emotion/styled'
import propTypes from 'prop-types'
import { Headline, Preface } from '@open-tender/components'

const LoyaltyStatusView = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`

const LoyaltyStatusCount = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: -0.2 rem;

  span {
    display: block;
    line-height: 1;
  }
`

const LoyaltyStatusLabel = styled(Preface)`
  margin: 0 0 0.3rem 0.6rem;
`

const LoyaltyStatus = ({ count, name, children }) => {
  return (
    <LoyaltyStatusView>
      <LoyaltyStatusCount>
        <Headline size="h1">{count}</Headline>
        <LoyaltyStatusLabel size="xSmall">{name}</LoyaltyStatusLabel>
      </LoyaltyStatusCount>
      {children}
    </LoyaltyStatusView>
  )
}

LoyaltyStatus.displayName = 'LoyaltyStatus'
LoyaltyStatus.propTypes = {
  count: propTypes.oneOfType([propTypes.number, propTypes.string]),
  name: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default LoyaltyStatus
