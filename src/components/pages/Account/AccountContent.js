import propTypes from 'prop-types'
import { HtmlContent } from '../..'
import AccountSection from './AccountSection'

const AccountContent = ({ content }) => {
  return (
    <AccountSection>
      <HtmlContent content={content} />
    </AccountSection>
  )
}

AccountContent.displayName = 'AccountContent'
AccountContent.propTypes = {
  content: propTypes.string,
}

export default AccountContent
