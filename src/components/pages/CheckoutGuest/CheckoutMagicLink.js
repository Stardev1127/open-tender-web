import { useDispatch, useSelector } from 'react-redux'
import { fetchGuestThanx, resetGuest, selectGuest } from '@open-tender/redux'
import { ButtonLink } from '@open-tender/components'

import { PageTitle, PageContent } from '../..'
import { selectContent } from '../../../slices'

const defaultText = {
  title: 'Account found!',
  subtitle:
    'We just sent you a magic sign in link! Please open your email on this device and click the link to sign in and continue your order.',
  resend: 'Click here to resend the magic link.',
  changeEmail: 'Or click here to enter a different email address.',
}

const CheckoutMagicLink = () => {
  const dispatch = useDispatch()
  const { checkoutFlow } = useSelector(selectContent)
  const config = checkoutFlow?.sections?.magicLink || defaultText
  const { email, loading } = useSelector(selectGuest)
  const resend = () => dispatch(fetchGuestThanx(email))
  const reset = () => dispatch(resetGuest())

  return (
    <>
      <PageTitle {...config} />
      <PageContent>
        <p>
          <ButtonLink onClick={resend} disabled={loading === 'pending'}>
            {config.resend}
          </ButtonLink>
        </p>
        <p>
          <ButtonLink onClick={reset} disabled={loading === 'pending'}>
            {config.changeEmail}
          </ButtonLink>
        </p>
      </PageContent>
    </>
  )
}

CheckoutMagicLink.displayName = 'CheckoutMagicLink'
export default CheckoutMagicLink
